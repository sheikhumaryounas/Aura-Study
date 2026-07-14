import type { Metadata } from "next";
import Link from "next/link";
import {
  Timer,
  BookOpen,
  BarChart2,
  Trophy,
  FolderOpen,
  Zap,
  Star,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AuraStudy — Premium AI Study Companion",
  description:
    "Level up your learning with AI-powered focus sessions, smart subject tracking, study streaks, and detailed analytics. Join thousands of top students.",
};

const FEATURES = [
  {
    icon: Timer,
    title: "Pomodoro Focus Timer",
    desc: "Deep work sessions with customizable intervals, ambient soundscapes, and automatic break scheduling.",
    color: "#7c3aed",
    href: "/focus",
    id: "feature-focus",
  },
  {
    icon: BookOpen,
    title: "Subject Tracker",
    desc: "Organize courses with progress bars, study goals, and priority tagging so nothing falls behind.",
    color: "#06b6d4",
    href: "/subjects",
    id: "feature-subjects",
  },
  {
    icon: BarChart2,
    title: "Study Analytics",
    desc: "Visualize weekly study hours, streaks, XP earned, and efficiency trends with beautiful charts.",
    color: "#f59e0b",
    href: "/analytics",
    id: "feature-analytics",
  },
  {
    icon: Trophy,
    title: "Global Leaderboard",
    desc: "Compete with friends and top students worldwide. Earn badges, climb ranks, and stay motivated.",
    color: "#10b981",
    href: "/leaderboard",
    id: "feature-leaderboard",
  },
  {
    icon: FolderOpen,
    title: "Resource Vault",
    desc: "Save notes, links, PDFs, and flashcards in one organized space, searchable in milliseconds.",
    color: "#ef4444",
    href: "/resources",
    id: "feature-resources",
  },
  {
    icon: Zap,
    title: "AI Study Tips",
    desc: "Get personalized suggestions based on your study patterns and upcoming exam schedule.",
    color: "#8b5cf6",
    href: "/about",
    id: "feature-ai",
  },
];

const STATS = [
  { value: "50K+", label: "Active Students", icon: Users },
  { value: "2.4M", label: "Focus Sessions", icon: Timer },
  { value: "98%", label: "Satisfaction Rate", icon: Star },
  { value: "4.8★", label: "App Rating", icon: TrendingUp },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero Section ── */}
      <section
        id="hero"
        style={{ padding: "120px 0 80px" }}
        className="page-section"
      >
        <div className="page-container" style={{ textAlign: "center" }}>
          {/* Eyebrow badge */}
          <div style={{ marginBottom: "24px" }}>
            <span className="badge badge-primary">
              <Zap size={11} />
              AI-Powered Study Platform
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: "24px",
              color: "var(--text-main)",
            }}
          >
            Study smarter with{" "}
            <span className="gradient-text">AI-powered</span>
            <br />
            focus sessions
          </h1>

          {/* Subheadline */}
          <p
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "var(--text-muted)",
              maxWidth: "600px",
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            AuraStudy combines Pomodoro timers, smart subject tracking, study streaks,
            and detailed analytics to help you achieve more in less time.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/auth" id="hero-cta-primary" className="btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }}>
              Start Studying Free
              <ArrowRight size={16} />
            </Link>
            <Link href="/focus" id="hero-cta-secondary" className="btn-secondary" style={{ fontSize: "15px", padding: "14px 32px" }}>
              Try Focus Timer
            </Link>
          </div>

          {/* Social Proof */}
          <p style={{ marginTop: "28px", fontSize: "13px", color: "var(--text-faint)" }}>
            Trusted by 50,000+ students · No credit card required
          </p>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section id="stats" style={{ padding: "0 0 60px" }}>
        <div className="page-container">
          <div
            className="glass-strong"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "1px",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            {STATS.map(({ value, label, icon: Icon }, i) => (
              <div
                key={i}
                style={{
                  padding: "28px 20px",
                  textAlign: "center",
                  background: "var(--bg-card)",
                }}
              >
                <Icon size={20} color="var(--color-primary-light)" style={{ margin: "0 auto 10px" }} />
                <div
                  style={{
                    fontFamily: "var(--font-outfit), sans-serif",
                    fontSize: "28px",
                    fontWeight: 800,
                    color: "var(--text-main)",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" style={{ padding: "60px 0 80px" }}>
        <div className="page-container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="badge badge-cyan" style={{ marginBottom: "16px" }}>
              Everything you need
            </span>
            <h2
              style={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 800,
                color: "var(--text-main)",
                letterSpacing: "-0.02em",
              }}
            >
              One platform.{" "}
              <span className="gradient-text">Infinite focus.</span>
            </h2>
            <p style={{ color: "var(--text-muted)", marginTop: "14px", fontSize: "16px" }}>
              Every tool you need to ace your studies, beautifully integrated.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {FEATURES.map(({ icon: Icon, title, desc, color, href, id }) => (
              <Link
                key={id}
                id={id}
                href={href}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="glass stat-card"
                  style={{
                    height: "100%",
                    cursor: "pointer",
                  }}
                >
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
                      marginBottom: "16px",
                    }}
                  >
                    <Icon size={20} color={color} />
                  </div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "var(--text-main)",
                      marginBottom: "8px",
                    }}
                  >
                    {title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--text-muted)", lineHeight: 1.6 }}>
                    {desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section id="cta-banner" style={{ padding: "0 0 100px" }}>
        <div className="page-container">
          <div
            style={{
              borderRadius: "24px",
              padding: "60px 40px",
              background: "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(6,182,212,0.1) 100%)",
              border: "1px solid rgba(124,58,237,0.25)",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: "clamp(24px, 3.5vw, 40px)",
                fontWeight: 800,
                color: "var(--text-main)",
                marginBottom: "16px",
                letterSpacing: "-0.02em",
              }}
            >
              Ready to level up your{" "}
              <span className="gradient-text">study game?</span>
            </h2>
            <p style={{ color: "var(--text-muted)", marginBottom: "32px", fontSize: "16px" }}>
              Join 50,000+ students who study smarter with AuraStudy.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/auth" id="cta-banner-btn" className="btn-primary" style={{ fontSize: "15px", padding: "14px 32px" }}>
                Get Started Free
                <ArrowRight size={16} />
              </Link>
              <Link href="/health" id="cta-healthcheck" className="btn-secondary" style={{ fontSize: "15px", padding: "14px 32px" }}>
                View System Health
              </Link>
            </div>
            <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
              {["No credit card", "Free forever plan", "Cancel anytime"].map((t) => (
                <span key={t} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "var(--text-muted)" }}>
                  <CheckCircle size={13} color="#10b981" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
