import type { Metadata } from "next";
import Link from "next/link";
import { FolderOpen, Plus, Link2, FileText, BookOpen, Search, Tag, Star, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Save notes, links, PDFs, and flashcards in one organized vault. Search and access all your study materials instantly on AuraStudy.",
};

const RESOURCES = [
  {
    id: "res-1",
    type: "link",
    title: "Khan Academy — Calculus",
    desc: "Complete series on differentiation and integration",
    subject: "Mathematics",
    tags: ["calculus", "video"],
    saved: "2 days ago",
    starred: true,
  },
  {
    id: "res-2",
    type: "pdf",
    title: "Organic Chemistry Notes — Ch. 7",
    desc: "Alkenes, Alkynes and Aromatic compounds",
    subject: "Chemistry",
    tags: ["notes", "chapter-7"],
    saved: "3 days ago",
    starred: true,
  },
  {
    id: "res-3",
    type: "note",
    title: "WW2 Timeline Summary",
    desc: "Key events, dates, and figures from 1939-1945",
    subject: "History",
    tags: ["summary", "ww2"],
    saved: "1 week ago",
    starred: false,
  },
  {
    id: "res-4",
    type: "flashcard",
    title: "Physics Formulas Deck",
    desc: "50 essential formulas for mechanics and thermodynamics",
    subject: "Physics",
    tags: ["formulas", "flashcards"],
    saved: "1 week ago",
    starred: false,
  },
  {
    id: "res-5",
    type: "link",
    title: "MDN Web Docs — JavaScript",
    desc: "Complete JS reference for web development",
    subject: "Computer Science",
    tags: ["javascript", "reference"],
    saved: "2 weeks ago",
    starred: true,
  },
  {
    id: "res-6",
    type: "pdf",
    title: "English Literature Essay Guide",
    desc: "How to structure analytical essays with examples",
    subject: "English",
    tags: ["essay", "guide"],
    saved: "2 weeks ago",
    starred: false,
  },
];

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  link: { icon: <Link2 size={14} />, color: "#06b6d4", label: "Link" },
  pdf: { icon: <FileText size={14} />, color: "#ef4444", label: "PDF" },
  note: { icon: <BookOpen size={14} />, color: "#7c3aed", label: "Note" },
  flashcard: { icon: <Tag size={14} />, color: "#f59e0b", label: "Flashcard" },
};

export default function ResourcesPage() {
  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="page-container">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <span className="badge" style={{ marginBottom: "12px", background: "rgba(239,68,68,0.12)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.25)" }}>
              <FolderOpen size={11} />
              Resource Vault
            </span>
            <h1
              style={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 800,
                color: "var(--text-main)",
                letterSpacing: "-0.02em",
                marginBottom: "8px",
              }}
            >
              My Resources
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
              All your notes, links, PDFs, and flashcards in one organized space.
            </p>
          </div>
          <button id="resources-add-btn" type="button" className="btn-primary">
            <Plus size={16} />
            Add Resource
          </button>
        </div>

        {/* Search Bar */}
        <div
          className="glass"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "12px 18px",
            borderRadius: "12px",
            marginBottom: "24px",
          }}
        >
          <Search size={18} color="var(--text-faint)" />
          <input
            id="resources-search"
            type="text"
            placeholder="Search notes, links, PDFs…"
            style={{
              flex: 1,
              background: "none",
              border: "none",
              outline: "none",
              color: "var(--text-main)",
              fontSize: "14px",
            }}
            readOnly
          />
        </div>

        {/* Filter Tags */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
          {["All", "Links", "PDFs", "Notes", "Flashcards", "Starred"].map((f, i) => (
            <button
              key={f}
              id={`resources-filter-${f.toLowerCase()}`}
              type="button"
              style={{
                padding: "6px 16px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: 600,
                background: i === 0 ? "rgba(124,58,237,0.15)" : "var(--bg-card)",
                color: i === 0 ? "var(--color-primary-light)" : "var(--text-muted)",
                border: i === 0 ? "1px solid rgba(124,58,237,0.3)" : "1px solid var(--border-subtle)",
                cursor: "pointer",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Resource Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {RESOURCES.map(({ id, type, title, desc, subject, tags, saved, starred }) => {
            const config = TYPE_CONFIG[type];
            return (
              <div key={id} id={`resource-card-${id}`} className="glass stat-card" style={{ cursor: "pointer" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div
                      style={{
                        padding: "6px",
                        borderRadius: "8px",
                        background: `${config.color}15`,
                        color: config.color,
                        border: `1px solid ${config.color}25`,
                      }}
                    >
                      {config.icon}
                    </div>
                    <span style={{ fontSize: "11px", color: config.color, fontWeight: 700 }}>{config.label}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {starred && <Star size={14} color="#fcd34d" fill="#fcd34d" />}
                  </div>
                </div>

                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)", marginBottom: "6px" }}>{title}</h3>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "12px" }}>{desc}</p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    <span className="badge badge-primary" style={{ fontSize: "10px", padding: "2px 8px" }}>{subject}</span>
                    {tags.slice(0, 1).map((t) => (
                      <span key={t} style={{ fontSize: "10px", padding: "2px 8px", borderRadius: "999px", background: "var(--bg-card)", color: "var(--text-faint)", border: "1px solid var(--border-subtle)" }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-faint)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Clock size={10} />
                    {saved}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <Link href="/auth" id="resources-auth-cta" className="btn-primary">
            <FolderOpen size={16} />
            Save Your Resources
          </Link>
        </div>
      </div>
    </div>
  );
}
