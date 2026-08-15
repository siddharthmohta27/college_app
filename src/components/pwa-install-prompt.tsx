import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    const dismissed = sessionStorage.getItem("pwa-prompt-dismissed");
    if (dismissed) return;

    // Don't show if already installed (running in standalone/fullscreen)
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as { standalone?: boolean }).standalone === true;
    if (isStandalone) return;

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show after a short delay so the page loads first
      setTimeout(() => setIsVisible(true), 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsVisible(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("pwa-prompt-dismissed", "true");
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div
      className="pwa-install-prompt"
      role="dialog"
      aria-label="Install Campus Connect app"
      id="pwa-install-prompt"
    >
      {/* Glow border effect */}
      <div className="pwa-install-glow" />

      <div className="pwa-install-content">
        {/* App icon */}
        <div className="pwa-install-icon">
          <img
            src="/pwa-192x192.png"
            alt="Campus Connect"
            width={44}
            height={44}
            className="pwa-install-icon-img"
          />
        </div>

        {/* Text */}
        <div className="pwa-install-text">
          <p className="pwa-install-title">Install Campus Connect</p>
          <p className="pwa-install-subtitle">Add to home screen for the best experience</p>
        </div>
      </div>

      {/* Actions */}
      <div className="pwa-install-actions">
        <button
          id="pwa-install-btn"
          onClick={handleInstall}
          className="pwa-install-btn"
          aria-label="Install app"
        >
          <Download size={14} />
          <span>Install</span>
        </button>
        <button
          id="pwa-dismiss-btn"
          onClick={handleDismiss}
          className="pwa-dismiss-btn"
          aria-label="Dismiss install prompt"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
