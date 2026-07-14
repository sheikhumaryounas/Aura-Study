import type { Metadata } from "next";
import Link from "next/link";
import { Settings, User, Bell, Moon, Globe, Shield, Palette, ChevronRight, LogIn } from "lucide-react";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Customize your AuraStudy experience. Manage your profile, notifications, theme, language, and privacy settings.",
};

const SECTIONS = [
  {
    title: "Profile",
    icon: User,
    color: "#7c3aed",
    items: [
      { label: "Display Name", value: "Guest User", id: "settings-display-name" },
      { label: "Email Address", value: "Not signed in", id: "settings-email" },
      { label: "Avatar", value: "Default", id: "settings-avatar" },
    ],
  },
  {
    title: "Appearance",
    icon: Palette,
    color: "#06b6d4",
    items: [
      { label: "Theme", value: "Dark Mode", id: "settings-theme" },
      { label: "Accent Color", value: "Violet", id: "settings-accent" },
      { label: "Font Size", value: "Medium", id: "settings-font-size" },
    ],
  },
  {
    title: "Focus Preferences",
    icon: Moon,
    color: "#8b5cf6",
    items: [
      { label: "Default Session Length", value: "25 minutes", id: "settings-session-length" },
      { label: "Short Break", value: "5 minutes", id: "settings-short-break" },
      { label: "Long Break Interval", value: "Every 4 sessions", id: "settings-long-break" },
      { label: "Auto-start Breaks", value: "On", id: "settings-autostart" },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    color: "#f59e0b",
    items: [
      { label: "Focus Reminders", value: "Daily at 9:00 AM", id: "settings-focus-reminder" },
      { label: "Streak Alerts", value: "Enabled", id: "settings-streak-alerts" },
      { label: "Leaderboard Updates", value: "Weekly", id: "settings-leaderboard-notif" },
    ],
  },
  {
    title: "Language & Region",
    icon: Globe,
    color: "#10b981",
    items: [
      { label: "Language", value: "English (US)", id: "settings-language" },
      { label: "Time Zone", value: "Auto-detect", id: "settings-timezone" },
      { label: "Start of Week", value: "Monday", id: "settings-week-start" },
    ],
  },
  {
    title: "Privacy & Data",
    icon: Shield,
    color: "#ef4444",
    items: [
      { label: "Profile Visibility", value: "Public", id: "settings-visibility" },
      { label: "Data Sharing", value: "Anonymous only", id: "settings-data-sharing" },
      { label: "Export My Data", value: "Download", id: "settings-export" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="page-container" style={{ maxWidth: "800px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <span className="badge badge-primary" style={{ marginBottom: "12px" }}>
            <Settings size={11} />
            Settings
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
            Settings
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
            Personalize your AuraStudy experience.
          </p>
        </div>

        {/* Sign In Nudge */}
        <div
          className="glass-strong"
          style={{
            padding: "20px 24px",
            borderRadius: "16px",
            marginBottom: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            border: "1px solid rgba(124,58,237,0.3)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #7c3aed40, #06b6d420)",
                border: "1px solid rgba(124,58,237,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <User size={20} color="var(--color-primary-light)" />
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)" }}>You&apos;re not signed in</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Sign in to sync settings across devices</div>
            </div>
          </div>
          <Link href="/auth" id="settings-signin-btn" className="btn-primary" style={{ padding: "10px 20px", fontSize: "13px" }}>
            <LogIn size={14} />
            Sign In
          </Link>
        </div>

        {/* Settings Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {SECTIONS.map(({ title, icon: Icon, color, items }) => (
            <div key={title} id={`settings-section-${title.toLowerCase().replace(/\s+/g, "-")}`} className="glass" style={{ padding: "24px", borderRadius: "20px" }}>
              <h2 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "8px",
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={14} color={color} />
                </div>
                {title}
              </h2>
              {items.map(({ label, value, id }, i) => (
                <div
                  key={id}
                  id={id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: i < items.length - 1 ? "1px solid var(--border-subtle)" : "none",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>{label}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "13px", color: "var(--text-main)", fontWeight: 500 }}>{value}</span>
                    <ChevronRight size={14} color="var(--text-faint)" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Danger Zone */}
        <div style={{ marginTop: "24px", padding: "20px 24px", borderRadius: "16px", border: "1px solid rgba(239,68,68,0.25)", background: "rgba(239,68,68,0.05)" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#ef4444", marginBottom: "12px" }}>Danger Zone</h2>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button id="settings-clear-data" type="button" className="btn-secondary" style={{ fontSize: "13px", padding: "8px 16px", color: "#ef4444", borderColor: "rgba(239,68,68,0.3)" }}>
              Clear All Data
            </button>
            <button id="settings-delete-account" type="button" className="btn-secondary" style={{ fontSize: "13px", padding: "8px 16px", color: "#ef4444", borderColor: "rgba(239,68,68,0.3)" }}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
