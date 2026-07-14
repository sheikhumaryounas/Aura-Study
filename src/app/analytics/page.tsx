import type { Metadata } from "next";
import Link from "next/link";
import { BarChart2, Flame, Clock, Zap, TrendingUp, Calendar, Award, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Analytics",
  description:
    "Visualize your study hours, streaks, XP earned, and efficiency trends. Deep insights to help you study smarter on AuraStudy.",
};

const WEEKLY_DATA = [
  { day: "Mon", hours: 2.5, sessions: 5 },
  { day: "Tue", hours: 3.2, sessions: 7 },
  { day: "Wed", hours: 1.8, sessions: 4 },
  { day: "Thu", hours: 4.1, sessions: 8 },
  { day: "Fri", hours: 3.6, sessions: 7 },
  { day: "Sat", hours: 5.0, sessions: 10 },
  { day: "Sun", hours: 2.0, sessions: 4 },
];

const MAX_HOURS = 5;

const ACTIVITY_GRID = Array.from({ length: 70 }, (_, i) => ({
  active: Math.random() > 0.4,
  intensity: Math.floor(Math.random() * 4),
}));

export default function AnalyticsPage() {
  const totalHours = WEEKLY_DATA.reduce((a, d) => a + d.hours, 0).toFixed(1);
  const totalSessions = WEEKLY_DATA.reduce((a, d) => a + d.sessions, 0);

  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="page-container">
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <span className="badge badge-amber" style={{ marginBottom: "12px" }}>
            <BarChart2 size={11} />
            Analytics
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
            Study Analytics
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
            Your detailed learning performance overview for this week.
          </p>
        </div>

        {/* KPI Row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          {[
            { label: "Study Hours", value: `${totalHours}h`, sub: "this week", icon: Clock, color: "#7c3aed" },
            { label: "Sessions", value: `${totalSessions}`, sub: "completed", icon: Zap, color: "#06b6d4" },
            { label: "Current Streak", value: "12", sub: "days 🔥", icon: Flame, color: "#f59e0b" },
            { label: "XP Earned", value: "3,420", sub: "this week", icon: Award, color: "#10b981" },
            { label: "Best Day", value: "Sat", sub: "5.0h logged", icon: TrendingUp, color: "#8b5cf6" },
            { label: "Goals Met", value: "5/6", sub: "subjects", icon: Target, color: "#ef4444" },
          ].map(({ label, value, sub, icon: Icon, color }) => (
            <div key={label} className="stat-card">
              <Icon size={18} color={color} style={{ marginBottom: "10px" }} />
              <div style={{ fontSize: "26px", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>{value}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "3px" }}>{label}</div>
              <div style={{ fontSize: "11px", color, marginTop: "2px", fontWeight: 600 }}>{sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "24px" }}>
          {/* Bar Chart */}
          <div className="glass" style={{ padding: "28px", borderRadius: "20px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-main)", marginBottom: "24px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Calendar size={16} color="var(--color-primary-light)" />
              Weekly Study Hours
            </h2>
            <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "160px" }}>
              {WEEKLY_DATA.map(({ day, hours }) => (
                <div key={day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", height: "100%" }}>
                  <div style={{ flex: 1, display: "flex", alignItems: "flex-end", width: "100%" }}>
                    <div
                      id={`analytics-bar-${day.toLowerCase()}`}
                      style={{
                        width: "100%",
                        height: `${(hours / MAX_HOURS) * 100}%`,
                        background: day === "Sat"
                          ? "linear-gradient(180deg, #7c3aed, #a78bfa)"
                          : "linear-gradient(180deg, rgba(124,58,237,0.6), rgba(124,58,237,0.2))",
                        borderRadius: "6px 6px 0 0",
                        minHeight: "8px",
                        transition: "all 0.4s ease",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: day === "Sat" ? 700 : 400 }}>{day}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Subject Breakdown */}
          <div className="glass" style={{ padding: "28px", borderRadius: "20px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-main)", marginBottom: "20px" }}>
              Time by Subject
            </h2>
            {[
              { name: "Mathematics", pct: 35, color: "#7c3aed" },
              { name: "Chemistry", pct: 22, color: "#ef4444" },
              { name: "History", pct: 18, color: "#06b6d4" },
              { name: "CS", pct: 15, color: "#f59e0b" },
              { name: "Other", pct: 10, color: "#6b7280" },
            ].map(({ name, pct, color }) => (
              <div key={name} style={{ marginBottom: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{name}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-main)" }}>{pct}%</span>
                </div>
                <div className="progress-track" style={{ height: "5px" }}>
                  <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}80)` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="glass" style={{ padding: "28px", borderRadius: "20px", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-main)", marginBottom: "20px" }}>
            10-Week Activity Heatmap
          </h2>
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {ACTIVITY_GRID.map((cell, i) => (
              <div
                key={i}
                id={`heatmap-cell-${i}`}
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "3px",
                  background: cell.active
                    ? `rgba(124, 58, 237, ${0.2 + cell.intensity * 0.22})`
                    : "rgba(255,255,255,0.04)",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center", marginTop: "12px" }}>
            <span style={{ fontSize: "11px", color: "var(--text-faint)" }}>Less</span>
            {[0.15, 0.3, 0.5, 0.75, 1].map((o) => (
              <div key={o} style={{ width: "10px", height: "10px", borderRadius: "2px", background: `rgba(124,58,237,${o})` }} />
            ))}
            <span style={{ fontSize: "11px", color: "var(--text-faint)" }}>More</span>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/auth" id="analytics-auth-cta" className="btn-primary">
            <BarChart2 size={16} />
            Unlock Full Analytics
          </Link>
        </div>
      </div>
    </div>
  );
}
