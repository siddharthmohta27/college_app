import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Download, BookOpen, FileText, ArrowUpRight, Folder, Tag, Star, Award } from "lucide-react";

export const Route = createFileRoute("/app/resources")({
  head: () => ({
    meta: [{ title: "Academic Resources — Campus Connect" }],
  }),
  component: ResourcesDirectory,
});

type ResourceFile = {
  id: number;
  title: string;
  category: string;
  courseCode: string;
  fileType: string;
  size: string;
  downloads: number;
  contributor: string;
  rating: number;
  isOfficial?: boolean;
};

const CATEGORIES = ["All", "CS Notes", "PYQs", "Syllabus", "E-Books", "Lab Manuals"];

const RESOURCES: ResourceFile[] = [
  { id: 1, title: "Algorithms Lecture Notes (Full Semester)", category: "CS Notes", courseCode: "CS301", fileType: "PDF", size: "14.2 MB", downloads: 412, contributor: "Priya Sharma (TA)", rating: 4.9, isOfficial: true },
  { id: 2, title: "Database Systems End-Sem paper 2025", category: "PYQs", courseCode: "CS302", fileType: "PDF", size: "1.8 MB", downloads: 289, contributor: "Exam Cell", rating: 4.8, isOfficial: true },
  { id: 3, title: "OS Process Management Cheat Sheet", category: "CS Notes", courseCode: "CS303", fileType: "PDF", size: "850 KB", downloads: 189, contributor: "Marcus K.", rating: 4.6 },
  { id: 4, title: "Computer Science 3rd Year Syllabus (2026)", category: "Syllabus", courseCode: "CS-ALL", fileType: "PDF", size: "2.4 MB", downloads: 540, contributor: "HOD Office", rating: 5.0, isOfficial: true },
  { id: 5, name: "Introduction to Algorithms (Cormen) Ebook", title: "Introduction to Algorithms (Cormen)", category: "E-Books", courseCode: "CS301", fileType: "EPUB", size: "48 MB", downloads: 245, contributor: "Central Library", rating: 4.7 },
  { id: 6, title: "Compiler Design Lab Manual — Lab 1 to 8", category: "Lab Manuals", courseCode: "CS304", fileType: "PDF", size: "3.1 MB", downloads: 120, contributor: "Prof. Gupta", rating: 4.5, isOfficial: true },
  { id: 7, title: "Discrete Mathematics Previous Papers (5 Years)", category: "PYQs", courseCode: "MA201", fileType: "ZIP", size: "8.5 MB", downloads: 350, contributor: "Senior Batch", rating: 4.4 },
  { id: 8, title: "Computer Networks Lab Setup Instructions", category: "Lab Manuals", courseCode: "CS306", fileType: "DOCX", size: "1.2 MB", downloads: 98, contributor: "Lab Assistant", rating: 4.2 },
];

function ResourcesDirectory() {
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");
  const [downloadsMap, setDownloadsMap] = useState<Record<number, boolean>>({});

  const handleDownload = (id: number) => {
    setDownloadsMap((prev) => ({ ...prev, [id]: true }));
    // Simulate simple download trigger notification or helper
  };

  const filtered = RESOURCES.filter((res) => {
    const matchCat = selectedCat === "All" || res.category === selectedCat;
    const matchSearch = res.title.toLowerCase().includes(search.toLowerCase()) || res.courseCode.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 pb-28 md:pb-8">
      {/* Header */}
      <div className="animate-fade-up">
        <h2 className="text-xl font-bold">Academic Resources</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">Download lecture notes, lab manuals, and previous year question papers</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-3 animate-fade-up">
        <div className="relative flex-1 min-w-52">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="resources-search"
            placeholder="Search by code or topic (e.g. CS301)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-primary"
          />
        </div>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap gap-2 animate-fade-up">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            id={`resourcecat-${cat.toLowerCase().replace(/[^a-z]/g, "-")}`}
            onClick={() => setSelectedCat(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
              selectedCat === cat ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:border-primary hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Files */}
      <div className="space-y-3">
        {filtered.map((res, i) => {
          const isDownloaded = downloadsMap[res.id];
          return (
            <div
              key={res.id}
              id={`resource-${res.id}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-border glass p-4 transition hover:bg-surface-elevated animate-fade-up"
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-elevated text-primary">
                  {res.category === "PYQs" ? (
                    <FileText className="h-5 w-5" />
                  ) : res.category === "Syllabus" ? (
                    <Folder className="h-5 w-5" />
                  ) : (
                    <BookOpen className="h-5 w-5" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-primary">
                      {res.courseCode}
                    </span>
                    {res.isOfficial && (
                      <span className="rounded bg-yellow-500/10 px-1.5 py-0.5 text-[8px] font-bold uppercase text-primary border border-yellow-500/20">
                        Official
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-foreground truncate mt-0.5">{res.title}</h4>
                  <div className="mt-1 flex items-center gap-3 flex-wrap text-[10px] text-muted-foreground">
                    <span>Type: <strong className="text-foreground">{res.fileType}</strong></span>
                    <span>Size: <strong className="text-foreground">{res.size}</strong></span>
                    <span>By: <strong className="text-foreground">{res.contributor}</strong></span>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                      <span>{res.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground">{res.downloads} downloads</span>
                <button
                  id={`btn-dl-${res.id}`}
                  onClick={() => handleDownload(res.id)}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${
                    isDownloaded ? "bg-emerald-500/20 text-emerald-400" : "bg-primary text-primary-foreground hover:opacity-90"
                  }`}
                >
                  {isDownloaded ? <CheckCircle className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Contribute card */}
      <div className="rounded-2xl border border-border glass p-5 flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-up">
        <div className="flex items-start gap-3">
          <Award className="h-8 w-8 text-primary shrink-0" />
          <div>
            <h4 className="font-bold text-sm">Contribute Study Material</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Share your lecture notes, cheat sheets or exam questions to earn reputation points.</p>
          </div>
        </div>
        <button className="rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition shrink-0">
          Upload File <ArrowUpRight className="inline h-3.5 w-3.5 ml-1" />
        </button>
      </div>
    </div>
  );
}

function CheckCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}
