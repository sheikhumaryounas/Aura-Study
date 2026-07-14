import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Plus, CheckCircle, Clock, Target, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Subjects",
  description:
    "Track all your courses and subjects with progress bars, study goals, and priority tagging. Stay on top of every class with AuraStudy.",
};

const SUBJECTS = [
  { name: "Advanced Mathematics", category: "Science", progress: 68, sessions: 24, goal: 40, color: "#7c3aed", emoji: "📐", priority: "High" },
  { name: "Organic Chemistry", category: "Science", progress: 45, sessions: 12, goal: 30, color: "#ef4444", emoji: "⚗️", priority: "High" },
  { name: "World History", category: "Humanities", progress: 82, sessions: 31, goal: 35, color: "#06b6d4", emoji: "🌍", priority: "Medium" },
  { name: "English Literature", category: "Humanities", progress: 55, sessions: 18, goal: 28, color: "#10b981", emoji: "📖", priority: "Medium" },
  { name: "Computer Science", category: "Technology", progress: 91, sessions: 40, goal: 45, color: "#f59e0b", emoji: "💻", priority: "Low" },
  { name: "Physics", category: "Science", progress: 30, sessions: 8, goal: 32, color: "#8b5cf6", emoji: "⚛️", priority: "High" },
];

const PRIORITY_COLORS: Record<string, string> = {
  High: "#ef4444",
  Medium: "#f59e0b",
  Low: "#10b981",
};

export default function SubjectsPage() {
  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="page-container">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: "12px" }}>
              <BookOpen size={11} />
              Subjects
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
              My Subjects
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
              Track progress across all your courses and hit your study goals.
            </p>
          </div>
          <button id="subjects-add-btn" type="button" className="btn-primary">
            <Plus size={16} />
            Add Subject
          </button>
        </div>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          {[
            { label: "Total Subjects", value: "6", icon: BookOpen, color: "#7c3aed" },
            { label: "Avg Progress", value: "62%", icon: TrendingUp, color: "#06b6d4" },
            { label: "Sessions This Week", value: "14", icon: Clock, color: "#f59e0b" },
            { label: "Goals Met", value: "2/6", icon: Target, color: "#10b981" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="stat-card">
              <Icon size={18} color={color} style={{ marginBottom: "10px" }} />
              <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>{value}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Subjects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {SUBJECTS.map(({ name, category, progress, sessions, goal, color, emoji, priority }) => (
            <div key={name} id={`subject-${name.toLowerCase().replace(/\s+/g, "-")}`} className="glass stat-card">
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: `${color}20`,
                      border: `1px solid ${color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                    }}
                  >
                    {emoji}
                  </div>
                  <div>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-main)" }}>{name}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{category}</div>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    background: `${PRIORITY_COLORS[priority]}15`,
                    color: PRIORITY_COLORS[priority],
                    border: `1px solid ${PRIORITY_COLORS[priority]}30`,
                    textTransform: "uppercase",
                  }}
                >
                  {priority}
                </span>
              </div>

              {/* Progress */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Progress</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-main)" }}>{progress}%</span>
                </div>
                <div className="progress-track">
                  <div className="progress-fill" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${color}, ${color}99)` }} />
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: "flex", gap: "16px" }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={11} />
                  {sessions} sessions
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Target size={11} />
                  Goal: {goal} sessions
                </div>
                {progress >= 80 && (
                  <div style={{ fontSize: "12px", color: "#10b981", display: "flex", alignItems: "center", gap: "4px", marginLeft: "auto" }}>
                    <CheckCircle size={11} />
                    On track
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "16px", fontSize: "14px" }}>
            Sign in to save your subjects and track progress across devices
          </p>
          <Link href="/auth" id="subjects-auth-cta" className="btn-primary">
            <BookOpen size={16} />
            Save My Subjects
          </Link>
        </div>
      </div>
    </div>
  );
}
