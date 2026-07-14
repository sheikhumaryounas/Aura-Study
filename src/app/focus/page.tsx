import type { Metadata } from "next";
import Link from "next/link";
import { Timer, Play, Coffee, Settings2, Headphones, Flame } from "lucide-react";

export const metadata: Metadata = {
  title: "Focus Timer",
  description:
    "Deep work Pomodoro sessions with customizable intervals, ambient soundscapes, and automatic break scheduling on AuraStudy.",
};

const PRESETS = [
  { label: "Classic", work: 25, rest: 5, icon: "🍅" },
  { label: "Deep Work", work: 50, rest: 10, icon: "🔥" },
  { label: "Quick Sprint", work: 15, rest: 3, icon: "⚡" },
  { label: "Ultra Focus", work: 90, rest: 20, icon: "🚀" },
];

const SOUNDS = [
  { label: "Rain", emoji: "🌧️" },
  { label: "Café", emoji: "☕" },
  { label: "Forest", emoji: "🌲" },
  { label: "White Noise", emoji: "🌊" },
  { label: "Lo-fi", emoji: "🎵" },
  { label: "Silence", emoji: "🔇" },
];

export default function FocusPage() {
  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="page-container">
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <span className="badge badge-primary" style={{ marginBottom: "16px" }}>
            <Timer size={11} />
            Focus Timer
          </span>
          <h1
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              color: "var(--text-main)",
              letterSpacing: "-0.02em",
              marginBottom: "12px",
            }}
          >
            Deep Focus Mode
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "16px", maxWidth: "500px" }}>
            Structured Pomodoro sessions with ambient soundscapes to keep you in the zone.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px", alignItems: "start" }}>
          {/* Timer Display */}
          <div className="glass-strong" style={{ padding: "48px", textAlign: "center", borderRadius: "24px" }}>
            {/* Circular Timer Visual */}
            <div
              id="focus-timer-display"
              style={{
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                border: "3px solid rgba(124,58,237,0.2)",
                background: "radial-gradient(circle at center, rgba(124,58,237,0.12) 0%, transparent 70%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 32px",
                position: "relative",
                boxShadow: "0 0 60px rgba(124,58,237,0.2)",
              }}
            >
              <div style={{ fontSize: "14px", color: "var(--text-muted)", fontWeight: 600, marginBottom: "4px" }}>FOCUS</div>
              <div
                style={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontSize: "56px",
                  fontWeight: 900,
                  color: "var(--text-main)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                25:00
              </div>
              <div style={{ fontSize: "12px", color: "var(--color-primary-light)", marginTop: "6px" }}>Session 1 of 4</div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "24px" }}>
              <button
                id="focus-btn-start"
                className="btn-primary"
                style={{ padding: "12px 32px", gap: "8px" }}
                type="button"
              >
                <Play size={16} fill="white" />
                Start Session
              </button>
              <button
                id="focus-btn-settings"
                className="btn-secondary"
                style={{ padding: "12px 14px" }}
                type="button"
                aria-label="Timer settings"
              >
                <Settings2 size={16} />
              </button>
            </div>

            {/* Streak */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "var(--color-accent)" }}>
              <Flame size={16} />
              <span style={{ fontSize: "13px", fontWeight: 600 }}>7-day streak · Keep it up!</span>
            </div>
          </div>

          {/* Sidebar: Presets + Sounds */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Session Presets */}
            <div className="glass" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
                Session Presets
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {PRESETS.map(({ label, work, rest, icon }, i) => (
                  <button
                    key={i}
                    id={`focus-preset-${label.toLowerCase().replace(" ", "-")}`}
                    type="button"
                    className="glass"
                    style={{
                      padding: "14px",
                      border: i === 0 ? "1px solid rgba(124,58,237,0.4)" : "1px solid var(--border-subtle)",
                      background: i === 0 ? "rgba(124,58,237,0.1)" : "var(--bg-card)",
                      borderRadius: "12px",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{icon}</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>{label}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{work}m / {rest}m break</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Ambient Sounds */}
            <div className="glass" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Headphones size={14} />
                Ambient Sounds
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
                {SOUNDS.map(({ label, emoji }, i) => (
                  <button
                    key={i}
                    id={`focus-sound-${label.toLowerCase().replace(" ", "-")}`}
                    type="button"
                    className="glass"
                    style={{
                      padding: "10px 8px",
                      borderRadius: "10px",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-card)",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "20px" }}>{emoji}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" }}>{label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Today's Stats */}
            <div className="glass" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
                Today&apos;s Progress
              </h2>
              {[
                { label: "Sessions completed", value: "3 / 8" },
                { label: "Total focus time", value: "1h 15m" },
                { label: "XP earned today", value: "+240 XP" },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{label}</span>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>{value}</span>
                </div>
              ))}
              <div className="progress-track" style={{ marginTop: "8px" }}>
                <div className="progress-fill" style={{ width: "37.5%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "16px", fontSize: "14px" }}>
            Unlock full timer customization, session history, and AI-suggested schedules
          </p>
          <Link href="/auth" id="focus-auth-cta" className="btn-primary">
            <Coffee size={16} />
            Sign up — it&apos;s free
          </Link>
        </div>
      </div>
    </div>
  );
}
