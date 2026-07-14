import type { Metadata } from "next";
import Link from "next/link";
import { Trophy, Medal, Crown, Flame, Star, Zap, ArrowUp, ArrowDown, Minus } from "lucide-react";

export const metadata: Metadata = {
  title: "Leaderboard",
  description:
    "Compete with top students globally. Earn badges, climb the ranks, and stay motivated on AuraStudy's real-time leaderboard.",
};

const LEADERS = [
  { rank: 1, name: "Sofia K.", country: "🇩🇪", xp: 12400, streak: 45, badge: "Golden Legend", trend: "up", avatar: "SK" },
  { rank: 2, name: "Arjun M.", country: "🇮🇳", xp: 11850, streak: 38, badge: "Golden Legend", trend: "up", avatar: "AM" },
  { rank: 3, name: "Chen L.", country: "🇨🇳", xp: 11200, streak: 31, badge: "Silver Expert", trend: "same", avatar: "CL" },
  { rank: 4, name: "Fatima A.", country: "🇸🇦", xp: 10700, streak: 29, badge: "Silver Expert", trend: "down", avatar: "FA" },
  { rank: 5, name: "James O.", country: "🇬🇧", xp: 9900, streak: 22, badge: "Silver Expert", trend: "up", avatar: "JO" },
  { rank: 6, name: "Amara N.", country: "🇳🇬", xp: 9100, streak: 18, badge: "Bronze Pro", trend: "up", avatar: "AN" },
  { rank: 7, name: "Lucas S.", country: "🇧🇷", xp: 8500, streak: 15, badge: "Bronze Pro", trend: "down", avatar: "LS" },
  { rank: 8, name: "Yuki T.", country: "🇯🇵", xp: 7800, streak: 12, badge: "Bronze Pro", trend: "same", avatar: "YT" },
  { rank: 9, name: "Ali H.", country: "🇵🇰", xp: 7200, streak: 10, badge: "Rookie", trend: "up", avatar: "AH" },
  { rank: 10, name: "Maria G.", country: "🇲🇽", xp: 6900, streak: 8, badge: "Rookie", trend: "up", avatar: "MG" },
];

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  "Golden Legend": { bg: "rgba(245,158,11,0.15)", color: "#fcd34d" },
  "Silver Expert": { bg: "rgba(148,163,184,0.15)", color: "#cbd5e1" },
  "Bronze Pro": { bg: "rgba(180,83,9,0.15)", color: "#d97706" },
  "Rookie": { bg: "rgba(99,102,241,0.15)", color: "#a5b4fc" },
};

const TREND_ICON: Record<string, React.ReactNode> = {
  up: <ArrowUp size={12} color="#10b981" />,
  down: <ArrowDown size={12} color="#ef4444" />,
  same: <Minus size={12} color="#6b7280" />,
};

const RANK_COLORS = ["#fcd34d", "#cbd5e1", "#d97706"];

export default function LeaderboardPage() {
  const top3 = LEADERS.slice(0, 3);
  const rest = LEADERS.slice(3);

  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="page-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="badge badge-amber" style={{ marginBottom: "16px" }}>
            <Trophy size={11} />
            Leaderboard
          </span>
          <h1
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              color: "var(--text-main)",
              letterSpacing: "-0.02em",
              marginBottom: "10px",
            }}
          >
            Global{" "}
            <span className="gradient-text-amber">Champions</span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
            Top students worldwide this week. Who will claim the crown?
          </p>
        </div>

        {/* Podium */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "48px",
          }}
        >
          {[top3[1], top3[0], top3[2]].map((user, i) => {
            const podiumOrder = [2, 1, 3]; // 2nd, 1st, 3rd
            const podiumRank = podiumOrder[i];
            const heights = [140, 180, 110];
            const color = RANK_COLORS[podiumRank - 1];

            return (
              <div
                key={user.name}
                id={`leaderboard-podium-${podiumRank}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* Crown for #1 */}
                {podiumRank === 1 && <Crown size={28} color="#fcd34d" fill="#fcd34d" />}

                {/* Avatar */}
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${color}40, ${color}20)`,
                    border: `2px solid ${color}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    fontWeight: 800,
                    color,
                  }}
                >
                  {user.avatar}
                </div>

                <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)", textAlign: "center" }}>
                  {user.name}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                  {user.xp.toLocaleString()} XP
                </div>

                {/* Podium Block */}
                <div
                  style={{
                    width: "100px",
                    height: `${heights[i]}px`,
                    background: `linear-gradient(180deg, ${color}30 0%, ${color}10 100%)`,
                    border: `1px solid ${color}40`,
                    borderRadius: "12px 12px 0 0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "28px",
                    fontWeight: 900,
                    color,
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  {podiumRank}
                </div>
              </div>
            );
          })}
        </div>

        {/* Rest of Leaderboard */}
        <div className="glass-strong" style={{ borderRadius: "20px", overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-subtle)", display: "flex", gap: "12px", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "var(--text-faint)", width: "32px" }}>#</span>
            <span style={{ fontSize: "12px", color: "var(--text-faint)", flex: 1 }}>Student</span>
            <span style={{ fontSize: "12px", color: "var(--text-faint)", width: "80px", textAlign: "right" }}>Streak</span>
            <span style={{ fontSize: "12px", color: "var(--text-faint)", width: "100px", textAlign: "right" }}>XP</span>
          </div>
          {rest.map((user, i) => {
            const badgeStyle = BADGE_COLORS[user.badge];
            return (
              <div
                key={user.name}
                id={`leaderboard-row-${user.rank}`}
                style={{
                  padding: "14px 24px",
                  borderBottom: i < rest.length - 1 ? "1px solid var(--border-subtle)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-faint)", width: "32px" }}>
                  {user.rank}
                </span>

                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "rgba(124,58,237,0.15)",
                      border: "1px solid rgba(124,58,237,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--color-primary-light)",
                    }}
                  >
                    {user.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "6px" }}>
                      {user.country} {user.name}
                      {TREND_ICON[user.trend]}
                    </div>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "2px 8px",
                        borderRadius: "999px",
                        background: badgeStyle.bg,
                        color: badgeStyle.color,
                      }}
                    >
                      {user.badge}
                    </span>
                  </div>
                </div>

                <div style={{ width: "80px", textAlign: "right", fontSize: "13px", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                  <Flame size={12} />
                  {user.streak}d
                </div>
                <div style={{ width: "100px", textAlign: "right", fontSize: "13px", fontWeight: 700, color: "var(--text-main)", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                  <Star size={11} color="#fcd34d" />
                  {user.xp.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Your Rank Preview */}
        <div
          className="glass"
          style={{
            marginTop: "24px",
            padding: "20px 24px",
            borderRadius: "16px",
            border: "1px solid rgba(124,58,237,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            background: "rgba(124,58,237,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ fontSize: "24px", fontWeight: 900, color: "var(--text-faint)", fontFamily: "var(--font-outfit)" }}>#247</div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)" }}>Your Position</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Sign in to claim your rank</div>
            </div>
          </div>
          <Link href="/auth" id="leaderboard-auth-cta" className="btn-primary" style={{ padding: "10px 20px", fontSize: "13px" }}>
            <Zap size={14} />
            Join the Competition
          </Link>
        </div>
      </div>
    </div>
  );
}
