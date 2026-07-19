import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Camera, Image, X, Loader2, Save, ArrowLeft, Heart, Users, GraduationCap, Briefcase, Rocket, MapPin, Music, Coffee, Globe, Linkedin, Github, Instagram, Shield, Check, AlertCircle, Hash, Trash2, Edit2, ChevronDown, ChevronUp,
} from "lucide-react";
import { firebaseAuth } from "@/lib/firebase";
import { useMyProfile, useUpdateProfile, useUploadPhoto, useDeletePhoto, useReorderPhotos, useUpsertPrompt, useDeletePrompt, usePrompts, useMyPrompts } from "@/hooks/use-dating-api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/dating/profile")({
  head: () => ({
    meta: [{ title: "Edit Profile — Campus Match" }],
  }),
  component: ProfileEditor,
});

const RELATIONSHIP_OPTIONS = [
  { value: "friends", label: "Friends", icon: Users },
  { value: "dating", label: "Dating", icon: Heart },
  { value: "study_buddy", label: "Study Buddy", icon: GraduationCap },
  { value: "networking", label: "Networking", icon: Briefcase },
  { value: "startup_partner", label: "Startup Partner", icon: Rocket },
];

const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Grad Student", "PhD", "Alumni"];

const BRANCH_OPTIONS = [
  "Computer Science", "Electronics", "Mechanical", "Civil", "Electrical", 
  "Chemical", "Biotechnology", "Information Technology", "AI & ML", "Data Science",
  "Mathematics", "Physics", "Chemistry", "Economics", "Management", "Design", "Architecture",
];

const HOSTEL_OPTIONS = ["Hostel A", "Hostel B", "Hostel C", "Hostel D", "Hostel E", "Hostel F", "Off Campus", "Day Scholar"];

const STUDY_SUBJECTS = ["DSA", "DBMS", "OS", "CN", "ML", "AI", "CG", "Compiler Design", "Software Engineering", "Computer Architecture", "Digital Logic", "Theory of Computation"];

function ProfileEditor() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{ uid: string; email: string | null; displayName: string | null; photoURL: string | null } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeSection, setActiveSection] = useState<"basics" | "photos" | "prompts" | "preferences" | "social" | "privacy">("basics");
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const { data: myProfile, isLoading: profileLoading, refetch: refetchProfile } = useMyProfile();
  const { data: allPrompts } = usePrompts();
  const { data: myPrompts = [] } = useMyPrompts();
  const updateProfile = useUpdateProfile();
  const uploadPhoto = useUploadPhoto();
  const deletePhoto = useDeletePhoto();
  const reorderPhotos = useReorderPhotos();
  const upsertPrompt = useUpsertPrompt();
  const deletePrompt = useDeletePrompt();

  useEffect(() => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser({ uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL });
      } else {
        setCurrentUser(null);
        navigate({ to: "/login" });
      }
    });
    return unsub;
  }, [navigate]);

  // Initialize form state from profile
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    age: 20,
    year: "3rd Year",
    branch: "",
    major: "",
    hostel: "",
    bio: "",
    gender: "",
    pronouns: "",
    relationship_preference: [] as string[],
    interests: [] as string[],
    languages: [] as string[],
    clubs: [] as string[],
    societies: [] as string[],
    skills: [] as string[],
    favorite_cafe: "",
    favorite_sport: "",
    instagram_url: "",
    linkedin_url: "",
    github_url: "",
    study_subjects: [] as string[],
    study_cgpa_goal: "",
    study_preferred_time: "",
    study_preferred_location: "",
    startup_looking_for: false,
    startup_role: "",
    startup_skills: [] as string[],
    is_incognito: false,
    show_only: "all",
  });

  // Sync form with profile data
  useEffect(() => {
    if (myProfile) {
      setFormData({
        first_name: myProfile.first_name || "",
        last_name: myProfile.last_name || "",
        age: myProfile.age || 20,
        year: myProfile.year || "3rd Year",
        branch: myProfile.branch || "",
        major: myProfile.major || "",
        hostel: myProfile.hostel || "",
        bio: myProfile.bio || "",
        gender: myProfile.gender || "",
        pronouns: myProfile.pronouns || "",
        relationship_preference: myProfile.relationship_preference || [],
        interests: myProfile.interests || [],
        languages: myProfile.languages || [],
        clubs: myProfile.clubs || [],
        societies: myProfile.societies || [],
        skills: myProfile.skills || [],
        favorite_cafe: myProfile.favorite_cafe || "",
        favorite_sport: myProfile.favorite_sport || "",
        instagram_url: myProfile.instagram_url || "",
        linkedin_url: myProfile.linkedin_url || "",
        github_url: myProfile.github_url || "",
        study_subjects: myProfile.study_subjects || [],
        study_cgpa_goal: myProfile.study_cgpa_goal || "",
        study_preferred_time: myProfile.study_preferred_time || "",
        study_preferred_location: myProfile.study_preferred_location || "",
        startup_looking_for: myProfile.startup_looking_for || false,
        startup_role: myProfile.startup_role || "",
        startup_skills: myProfile.startup_skills || [],
        is_incognito: myProfile.is_incognito || false,
        show_only: myProfile.show_only || "all",
      });
    }
  }, [myProfile]);

  const handleChange = (field: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: string, item: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), item]
        : (prev[field as keyof typeof prev] as string[]).filter(i => i !== item),
    }));
  };

  const handleTagInput = (field: string, value: string) => {
    const tags = value.split(",").map(t => t.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, [field]: tags }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = 3 - (myProfile?.photos?.length || 0);
    
    if (files.length > remainingSlots) {
      toast.error(`Maximum ${remainingSlots} more photos allowed`);
      return;
    }

    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;
      
      // Create preview
      const preview = URL.createObjectURL(file);
      setPhotoPreviews(prev => [...prev, preview]);
      setPhotos(prev => [...prev, file]);
    }
  };

  const handleSavePhotos = async () => {
    if (photos.length === 0) return;
    
    setIsSaving(true);
    try {
      for (let i = 0; i < photos.length; i++) {
        const file = photos[i];
        // In real app, upload to Supabase Storage first
        // For now, simulate with a placeholder URL
        const formData_ = new FormData();
        formData_.append("file", file);
        
        // Simulate upload - replace with actual Supabase upload
        const mockUrl = `https://images.unsplash.com/photo-${Date.now()}-${i}`;
        await uploadPhoto.mutateAsync({
          url: mockUrl,
          storage_path: `dating-photos/${currentUser?.uid}/${file.name}`,
          is_main: i === 0 && !(myProfile?.photos?.length || 0),
          width: 800,
          height: 1000,
          file_size: file.size,
          mime_type: file.type,
        });
      }
      toast.success("Photos uploaded!");
      setPhotos([]);
      setPhotoPreviews([]);
      refetchProfile();
    } catch (error) {
      toast.error("Failed to upload photos");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRemovePhoto = async (photoId: number) => {
    try {
      await deletePhoto.mutateAsync(String(photoId));
      toast.success("Photo removed");
      refetchProfile();
    } catch {
      toast.error("Failed to remove photo");
    }
  };

  const handleReorderPhotos = async (newOrder: number[]) => {
    try {
      const photoOrders = newOrder.map((id, index) => ({ id, display_order: index }));
      await reorderPhotos.mutateAsync(photoOrders);
      toast.success("Photos reordered");
      refetchProfile();
    } catch {
      toast.error("Failed to reorder photos");
    }
  };

  const handlePromptSubmit = async (promptId: number, answer: string, displayOrder: number) => {
    try {
      await upsertPrompt.mutateAsync({ prompt_id: promptId, answer, display_order: displayOrder });
      toast.success("Prompt saved!");
      refetchProfile();
    } catch {
      toast.error("Failed to save prompt");
    }
  };

  const handlePromptDelete = async (promptId: number) => {
    try {
      await deletePrompt.mutateAsync(String(promptId));
      toast.success("Prompt removed");
      refetchProfile();
    } catch {
      toast.error("Failed to remove prompt");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile.mutateAsync(formData);
      toast.success("Profile saved!");
      refetchProfile();
    } catch (error) {
      toast.error("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const availablePrompts = allPrompts?.filter(p => !myPrompts.some(mp => mp.prompt_id === p.id)) || [];

  if (profileLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="hidden w-64 flex-col border-r border-border bg-surface/40 lg:flex">
        <div className="flex items-center gap-3 border-b border-border px-4 py-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/20">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <span className="font-semibold">Edit Profile</span>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4">
          {[
            { id: "basics", label: "Basics", icon: User },
            { id: "photos", label: "Photos", icon: Image },
            { id: "prompts", label: "Prompts", icon: Hash },
            { id: "preferences", label: "Preferences", icon: Heart },
            { id: "social", label: "Social & Links", icon: Globe },
            { id: "privacy", label: "Privacy", icon: Shield },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id as typeof activeSection)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                activeSection === id
                  ? "bg-primary/15 text-foreground font-medium"
                  : "text-muted-foreground hover:bg-surface-elevated hover:text-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4 shrink-0", activeSection === id && "text-primary")} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="border-t border-border p-4">
          <button
            onClick={() => navigate({ to: "/app/dating" })}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-surface-elevated hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Match
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="flex items-center justify-between border-b border-border bg-background/60 px-5 py-3.5 backdrop-blur">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ to: "/app/dating" })}
              className="text-muted-foreground transition hover:text-foreground lg:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold">Edit Profile</h1>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving || updateProfile.isPending}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {isSaving || updateProfile.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {activeSection === "basics" && <BasicsSection formData={formData} onChange={handleChange} />}
            {activeSection === "photos" && (
              <PhotosSection
                myProfile={myProfile}
                photoPreviews={photoPreviews}
                photos={photos}
                onPhotoUpload={handlePhotoUpload}
                onSavePhotos={handleSavePhotos}
                onRemovePhoto={handleRemovePhoto}
                onReorderPhotos={handleReorderPhotos}
                isSaving={isSaving}
              />
            )}
            {activeSection === "prompts" && (
              <PromptsSection
                myPrompts={myPrompts}
                availablePrompts={availablePrompts}
                onPromptSubmit={handlePromptSubmit}
                onPromptDelete={handlePromptDelete}
              />
            )}
            {activeSection === "preferences" && (
              <PreferencesSection formData={formData} onChange={handleChange} onArrayChange={handleArrayChange} handleTagInput={handleTagInput} />
            )}
            {activeSection === "social" && (
              <SocialSection formData={formData} onChange={handleChange} />
            )}
            {activeSection === "privacy" && (
              <PrivacySection formData={formData} onChange={handleChange} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// Section Components
function BasicsSection({ formData, onChange }: { formData: any; onChange: (field: string, value: any) => void }) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border glass p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Basic Information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">First Name</label>
            <input
              value={formData.first_name}
              onChange={e => onChange("first_name", e.target.value)}
              placeholder="Siddharth"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Last Name</label>
            <input
              value={formData.last_name}
              onChange={e => onChange("last_name", e.target.value)}
              placeholder="Mohta"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Age</label>
            <input
              type="number"
              min="17"
              max="35"
              value={formData.age}
              onChange={e => onChange("age", parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Gender</label>
            <select
              value={formData.gender}
              onChange={e => onChange("gender", e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="non_binary">Non-binary</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Pronouns</label>
            <input
              value={formData.pronouns}
              onChange={e => onChange("pronouns", e.target.value)}
              placeholder="He/Him, She/Her, They/Them"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Year</label>
            <select
              value={formData.year}
              onChange={e => onChange("year", e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            >
              {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border glass p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Academic
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Branch</label>
            <select
              value={formData.branch}
              onChange={e => onChange("branch", e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value="">Select branch</option>
              {BRANCH_OPTIONS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Major / Specialization</label>
            <input
              value={formData.major}
              onChange={e => onChange("major", e.target.value)}
              placeholder="Computer Science"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Hostel</label>
            <select
              value={formData.hostel}
              onChange={e => onChange("hostel", e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value="">Select hostel</option>
              {HOSTEL_OPTIONS.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border glass p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Bio
        </h2>
        <textarea
          value={formData.bio}
          onChange={e => onChange("bio", e.target.value)}
          placeholder="Tell others about yourself..."
          rows={4}
          className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary resize-none"
        />
        <p className="mt-1 text-xs text-muted-foreground">Max 500 characters</p>
      </section>
    </div>
  );
}

function PhotosSection({ 
  myProfile, 
  photoPreviews, 
  photos, 
  onPhotoUpload, 
  onSavePhotos, 
  onRemovePhoto, 
  onReorderPhotos,
  isSaving 
}: any) {
  const existingPhotos = myProfile?.photos?.filter(p => p.url).sort((a, b) => a.display_order - b.display_order) || [];
  const totalPhotos = existingPhotos.length + photoPreviews.length;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border glass p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Image className="h-5 w-5 text-primary" />
            Photos ({totalPhotos}/3)
          </h2>
          {photos.length > 0 && (
            <button
              onClick={onSavePhotos}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              Save Photos
            </button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Existing Photos */}
          {existingPhotos.map((photo, index) => (
            <div key={photo.id} className="relative group">
              <div className="aspect-[3/4] rounded-xl overflow-hidden">
                <img
                  src={photo.url}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {photo.is_main && (
                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/90 px-2 py-1 text-[10px] font-semibold text-primary-foreground">
                      Main
                    </span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => onRemovePhoto(photo.id)}
                  className="p-2 rounded-full bg-red-500/90 text-white hover:bg-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                {!photo.is_main && (
                  <button
                    onClick={() => {
                      // Set as main would need API call
                    }}
                    className="p-2 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary transition-colors"
                  >
                    <Shield className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* New Photo Previews */}
          {photoPreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-[3/4] rounded-xl overflow-hidden">
                <img
                  src={preview}
                  alt={`New photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => {
                    setPhotoPreviews(prev => prev.filter((_, i) => i !== index));
                    setPhotos(prev => prev.filter((_, i) => i !== index));
                  }}
                  className="p-2 rounded-full bg-red-500/90 text-white hover:bg-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add Photo */}
          {totalPhotos < 3 && (
            <label className="relative aspect-[3/4] rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer transition hover:border-primary hover:bg-surface-elevated">
              <input
                type="file"
                accept="image/*"
                onChange={onPhotoUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
                multiple
              />
              <Camera className="h-10 w-10 text-muted-foreground" />
              <span className="mt-2 text-sm text-muted-foreground">Add Photo</span>
              <p className="text-[10px] text-muted-foreground/70">Max 3 photos total</p>
            </label>
          )}
        </div>

        {existingPhotos.length > 1 && (
          <p className="mt-4 text-xs text-muted-foreground">
            Drag to reorder (drag-and-drop coming soon)
          </p>
        )}
      </section>
    </div>
  );
}

function PromptsSection({ myPrompts, availablePrompts, onPromptSubmit, onPromptDelete }: any) {
  const [expandedPrompt, setExpandedPrompt] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border glass p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Hash className="h-5 w-5 text-primary" />
          Prompts ({myPrompts.length}/3)
        </h2>

        {myPrompts.length > 0 && (
          <div className="space-y-4 mb-6">
            {myPrompts.map((prompt: any) => (
              <div key={prompt.id} className="rounded-xl border border-border bg-surface/50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                      {prompt.prompt_category || "Prompt"}
                    </p>
                    <p className="text-sm font-medium text-foreground">{prompt.prompt_text}</p>
                    <p className="mt-2 text-sm text-foreground/90 italic">"{prompt.answer}"</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setExpandedPrompt(expandedPrompt === prompt.id ? null : prompt.id)}
                      className="p-2 rounded-full bg-surface hover:bg-border transition"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onPromptDelete(prompt.prompt_id)}
                      className="p-2 rounded-full bg-surface hover:bg-rose-500/10 hover:text-rose-400 transition"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {myPrompts.length < 3 && (
          <div>
            <p className="text-sm text-muted-foreground mb-3">Add a prompt to show more personality</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {availablePrompts.slice(0, 6).map((prompt: any) => (
                <PromptCard key={prompt.id} prompt={prompt} onAdd={onPromptSubmit} />
              ))}
            </div>
            {availablePrompts.length > 6 && (
              <button className="mt-3 text-sm text-primary hover:underline">
                Show all {availablePrompts.length} prompts
              </button>
            )}
          </div>
        )}

        {myPrompts.length >= 3 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            You've added the maximum of 3 prompts
          </p>
        )}
      </section>
    </div>
  );
}

function PromptCard({ prompt, onAdd }: { prompt: any; onAdd: (promptId: number, answer: string, displayOrder: number) => void }) {
  const [showInput, setShowInput] = useState(false);
  const [answer, setAnswer] = useState("");

  if (!showInput) {
    return (
      <button
        onClick={() => setShowInput(true)}
        className="rounded-xl border border-border bg-surface p-4 text-left transition hover:border-primary hover:bg-surface-elevated"
      >
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
          {prompt.category || "Prompt"}
        </p>
        <p className="text-sm font-medium text-foreground">{prompt.text}</p>
      </button>
    );
  }

  return (
    <div className="rounded-xl border border-primary/30 bg-primary/5 p-4">
      <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
        {prompt.category || "Prompt"}
      </p>
      <p className="text-sm font-medium text-foreground mb-3">{prompt.text}</p>
      <textarea
        value={answer}
        onChange={e => setAnswer(e.target.value)}
        placeholder="Your answer..."
        rows={3}
        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary resize-none mb-3"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={() => { setShowInput(false); setAnswer(""); }}
          className="rounded-xl border border-border px-4 py-2 text-sm transition hover:bg-surface-elevated"
        >
          Cancel
        </button>
        <button
          onClick={() => { onAdd(prompt.id, answer, myPrompts.length); setShowInput(false); setAnswer(""); }}
          disabled={!answer.trim()}
          className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          Add
        </button>
      </div>
    </div>
  );
}

function PreferencesSection({ formData, onChange, onArrayChange, handleTagInput }: any) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border glass p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Relationship Preferences
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RELATIONSHIP_OPTIONS.map(({ value, label, icon: Icon }) => (
            <label key={value} className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition hover:border-primary hover:bg-surface-elevated">
              <input
                type="checkbox"
                checked={formData.relationship_preference.includes(value)}
                onChange={e => onArrayChange("relationship_preference", value, e.target.checked)}
                className="h-4 w-4 text-primary rounded border-border focus:ring-primary"
              />
              <Icon className="h-5 w-5 text-primary" />
              <span className="font-medium">{label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border glass p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Hash className="h-5 w-5 text-primary" />
          Interests & Tags
        </h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Interests (comma separated)</label>
            <input
              value={formData.interests.join(", ")}
              onChange={e => handleTagInput("interests", e.target.value)}
              placeholder="Coding, Hackathons, Coffee, Anime"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Languages (comma separated)</label>
            <input
              value={formData.languages.join(", ")}
              onChange={e => handleTagInput("languages", e.target.value)}
              placeholder="English, Hindi, Spanish"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Clubs (comma separated)</label>
            <input
              value={formData.clubs.join(", ")}
              onChange={e => handleTagInput("clubs", e.target.value)}
              placeholder="ACM, IEEE, Dance Club, Debate Society"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Skills (comma separated)</label>
            <input
              value={formData.skills.join(", ")}
              onChange={e => handleTagInput("skills", e.target.value)}
              placeholder="React, Python, Figma, Public Speaking"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border glass p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Coffee className="h-5 w-5 text-primary" />
          Favorites
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Favorite Cafe</label>
            <input
              value={formData.favorite_cafe}
              onChange={e => onChange("favorite_cafe", e.target.value)}
              placeholder="Campus Coffee House"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Favorite Sport</label>
            <input
              value={formData.favorite_sport}
              onChange={e => onChange("favorite_sport", e.target.value)}
              placeholder="Badminton"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border glass p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Study Preferences
        </h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Study Subjects (comma separated)</label>
            <input
              value={formData.study_subjects.join(", ")}
              onChange={e => handleTagInput("study_subjects", e.target.value)}
              placeholder="DSA, DBMS, ML, OS"
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">CGPA Goal</label>
              <input
                value={formData.study_cgpa_goal}
                onChange={e => onChange("study_cgpa_goal", e.target.value)}
                placeholder="9.0"
                className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Preferred Time</label>
              <input
                value={formData.study_preferred_time}
                onChange={e => onChange("study_preferred_time", e.target.value)}
                placeholder="Evenings, Late Night"
                className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Preferred Location</label>
              <input
                value={formData.study_preferred_location}
                onChange={e => onChange("study_preferred_location", e.target.value)}
                placeholder="Library, Hostel Room"
                className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border glass p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Rocket className="h-5 w-5 text-primary" />
          Startup Preferences
        </h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition hover:border-primary hover:bg-surface-elevated">
            <input
              type="checkbox"
              checked={formData.startup_looking_for}
              onChange={e => onChange("startup_looking_for", e.target.checked)}
              className="h-4 w-4 text-primary rounded border-border focus:ring-primary"
            />
            <span className="font-medium">I'm looking for a startup team</span>
          </label>
          {formData.startup_looking_for && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Role Seeking</label>
                <select
                  value={formData.startup_role}
                  onChange={e => onChange("startup_role", e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
                >
                  <option value="">Select role</option>
                  <option value="cofounder">Co-founder</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="ml_engineer">ML Engineer</option>
                  <option value="marketing">Marketing</option>
                  <option value="business">Business</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Skills I Offer (comma separated)</label>
                <input
                  value={formData.startup_skills.join(", ")}
                  onChange={e => handleTagInput("startup_skills", e.target.value)}
                  placeholder="React, Node.js, UI/UX, Fundraising"
                  className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function SocialSection({ formData, onChange }: any) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border glass p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-primary" />
          Social Links
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Instagram className="h-5 w-5 text-pink-400 shrink-0" />
            <input
              value={formData.instagram_url}
              onChange={e => onChange("instagram_url", e.target.value)}
              placeholder="https://instagram.com/username"
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-3">
            <Linkedin className="h-5 w-5 text-blue-400 shrink-0" />
            <input
              value={formData.linkedin_url}
              onChange={e => onChange("linkedin_url", e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-3">
            <Github className="h-5 w-5 text-gray-400 shrink-0" />
            <input
              value={formData.github_url}
              onChange={e => onChange("github_url", e.target.value)}
              placeholder="https://github.com/username"
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">These will be visible on your public profile</p>
      </section>
    </div>
  );
}

function PrivacySection({ formData, onChange }: any) {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border glass p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Profile Visibility
        </h2>
        <div className="space-y-3">
          <label className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition hover:border-primary hover:bg-surface-elevated">
            <input
              type="checkbox"
              checked={formData.is_incognito}
              onChange={e => onChange("is_incognito", e.target.checked)}
              className="h-4 w-4 text-primary rounded border-border focus:ring-primary"
            />
            <div>
              <p className="font-medium">Incognito Mode</p>
              <p className="text-xs text-muted-foreground">Hide my profile from discovery. Only my matches and friends can see me.</p>
            </div>
          </label>
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">Show my profile to</label>
            <select
              value={formData.show_only}
              onChange={e => onChange("show_only", e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-primary"
            >
              <option value="all">Everyone</option>
              <option value="friends">Friends Only</option>
              <option value="dating">Dating Only</option>
            </select>
            <p className="mt-1 text-xs text-muted-foreground">Controls who can see your profile in discovery</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-border glass p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Check className="h-5 w-5 text-primary" />
          Verification
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Identity Verified</p>
                <p className="text-xs text-muted-foreground">Verified with college email</p>
              </div>
            </div>
            <span className={cn(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
              formData.is_verified ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
            )}>
              {formData.is_verified ? "✓ Verified" : "Pending"}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-3">
              <Camera className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Photo Verified</p>
                <p className="text-xs text-muted-foreground">Selfie verification completed</p>
              </div>
            </div>
            <span className={cn(
              "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
              formData.photo_verified ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
            )}>
              {formData.photo_verified ? "✓ Verified" : "Not verified"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

// Import missing icons
import { User } from "lucide-react";
const YEAR_OPTIONS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Grad Student", "PhD", "Alumni"];
const BRANCH_OPTIONS = ["Computer Science", "Electronics", "Mechanical", "Civil", "Electrical", "Chemical", "Biotechnology", "Information Technology", "AI & ML", "Data Science", "Mathematics", "Physics", "Chemistry", "Economics", "Management", "Design", "Architecture"];
const HOSTEL_OPTIONS = ["Hostel A", "Hostel B", "Hostel C", "Hostel D", "Hostel E", "Hostel F", "Off Campus", "Day Scholar"];
const STUDY_SUBJECTS = ["DSA", "DBMS", "OS", "CN", "ML", "AI", "CG", "Compiler Design", "Software Engineering", "Computer Architecture", "Digital Logic", "Theory of Computation"];