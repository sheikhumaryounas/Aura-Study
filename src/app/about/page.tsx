import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Timer, BookOpen, BarChart2, Trophy, FolderOpen, GitBranch, ExternalLink, Heart, Code2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about AuraStudy, our mission to help students learn smarter, and the technology that powers the platform.",
};

const TECH_STACK = [
  { name: "Next.js 14", desc: "App Router · Server Components · SSR", emoji: "⚡", color: "#f0f0f0" },
  { name: "TypeScript", desc: "End-to-end type safety", emoji: "🔷", color: "#3178c6" },
  { name: "Tailwind CSS", desc: "Utility-first styling", emoji: "🎨", color: "#06b6d4" },
  { name: "Lucide React", desc: "Beautiful icon system", emoji: "✨", color: "#f59e0b" },
  { name: "Google Fonts", desc: "Inter + Outfit typefaces", emoji: "🔤", color: "#7c3aed" },
  { name: "Vercel", desc: "Preview deployments on every push", emoji: "▲", color: "#ffffff" },
];

const FEATURES_TIMELINE = [
  { phase: "Phase 1", title: "Foundation", desc: "Next.js scaffold, routing, Tailwind, Vercel CI/CD", done: true },
  { phase: "Phase 2", title: "Core UI", desc: "Interactive Pomodoro timer, subject CRUD, analytics charts", done: false },
  { phase: "Phase 3", title: "Auth & Data", desc: "Supabase authentication, real-time database, sync", done: false },
  { phase: "Phase 4", title: "AI Layer", desc: "OpenAI study tips, smart scheduling, voice notes", done: false },
  { phase: "Phase 5", title: "Community", desc: "Live leaderboard, friends, challenges, badges", done: false },
];

export default function AboutPage() {
  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="page-container" style={{ maxWidth: "900px" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "24px",
              background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 0 60px rgba(124,58,237,0.4)",
            }}
          >
            <Zap size={40} color="#fff" fill="#fff" />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 900,
              color: "var(--text-main)",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            About <span className="gradient-text">AuraStudy</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "17px", lineHeight: 1.7, maxWidth: "600px", margin: "0 auto" }}>
            AuraStudy was built for one reason: students deserve a tool that matches the ambition
            of what they&apos;re trying to accomplish. We combine the science of deep work with
            the motivation of gamification.
          </p>
        </div>

        {/* Mission */}
        <div
          className="glass-strong"
          style={{ padding: "40px", borderRadius: "24px", marginBottom: "48px", textAlign: "center" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "28px",
              fontWeight: 800,
              color: "var(--text-main)",
              marginBottom: "16px",
            }}
          >
            Our Mission
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "16px", lineHeight: 1.7, maxWidth: "560px", margin: "0 auto" }}>
            To make structured, focused studying accessible, measurable, and enjoyable for every
            student — from high school to postgraduate.
          </p>
        </div>

        {/* Features Overview */}
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "22px",
              fontWeight: 800,
              color: "var(--text-main)",
              marginBottom: "24px",
            }}
          >
            What AuraStudy Offers
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {[
              { icon: Timer, href: "/focus", title: "Focus Timer", desc: "Pomodoro-based deep work sessions", color: "#7c3aed" },
              { icon: BookOpen, href: "/subjects", title: "Subject Tracker", desc: "Progress tracking for all courses", color: "#06b6d4" },
              { icon: BarChart2, href: "/analytics", title: "Analytics", desc: "Study patterns & efficiency insights", color: "#f59e0b" },
              { icon: Trophy, href: "/leaderboard", title: "Leaderboard", desc: "Global and friends rankings", color: "#10b981" },
              { icon: FolderOpen, href: "/resources", title: "Resources", desc: "Notes, links & PDF vault", color: "#ef4444" },
              { icon: Zap, href: "/", title: "AI Tips", desc: "Personalized study recommendations", color: "#8b5cf6" },
            ].map(({ icon: Icon, href, title, desc, color }) => (
              <Link key={title} href={href} style={{ textDecoration: "none" }}>
                <div className="glass stat-card" style={{ cursor: "pointer" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: `${color}20`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                    <Icon size={18} color={color} />
                  </div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)", marginBottom: "4px" }}>{title}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "22px",
              fontWeight: 800,
              color: "var(--text-main)",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Code2 size={20} color="var(--color-primary-light)" />
            Technology Stack
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px" }}>
            Built with modern, production-grade tools for performance and developer experience.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
            {TECH_STACK.map(({ name, desc, emoji }) => (
              <div key={name} className="glass" style={{ padding: "16px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "24px" }}>{emoji}</span>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)" }}>{name}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap */}
        <div style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "22px",
              fontWeight: 800,
              color: "var(--text-main)",
              marginBottom: "20px",
            }}
          >
            Development Roadmap
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {FEATURES_TIMELINE.map(({ phase, title, desc, done }) => (
              <div
                key={phase}
                className="glass"
                style={{
                  padding: "20px 24px",
                  borderRadius: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  border: done ? "1px solid rgba(16,185,129,0.3)" : "1px solid var(--border-subtle)",
                  background: done ? "rgba(16,185,129,0.05)" : "var(--bg-card)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: done ? "rgba(16,185,129,0.15)" : "rgba(124,58,237,0.1)",
                    border: `2px solid ${done ? "#10b981" : "rgba(124,58,237,0.3)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    fontSize: "16px",
                  }}
                >
                  {done ? "✓" : "○"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: done ? "#10b981" : "var(--color-primary-light)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "2px" }}>{phase}</div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-main)" }}>{title}</div>
                  <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{desc}</div>
                </div>
                {done && <span className="badge badge-green" style={{ flexShrink: 0 }}>Live ✓</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" id="about-github-link" className="btn-secondary" style={{ fontSize: "13px", padding: "10px 20px" }}>
              <GitBranch size={15} />
              View on GitHub
              <ExternalLink size={12} />
            </a>
            <Link href="/health" id="about-health-link" className="btn-secondary" style={{ fontSize: "13px", padding: "10px 20px" }}>
              <Zap size={15} />
              System Health
            </Link>
            <Link href="/auth" id="about-cta" className="btn-primary" style={{ fontSize: "13px", padding: "10px 20px" }}>
              <Heart size={15} />
              Join AuraStudy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
