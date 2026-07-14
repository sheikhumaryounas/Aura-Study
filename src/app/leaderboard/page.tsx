"use client"

import { useState, useEffect } from "react"
import { Trophy, Crown, Flame, Star, Zap, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { motion } from "framer-motion"

type Leader = {
  id: string
  name: string
  avatar: string
  xp: number
  streak: number
  sessions: number
  rank: number
}

const RANK_COLORS = ["#fcd34d", "#cbd5e1", "#d97706"]

// Static fallback leaders if DB is empty
const DEMO_LEADERS: Leader[] = [
  { id: "1", rank: 1, name: "Sofia K.", avatar: "SK", xp: 12400, streak: 45, sessions: 62 },
  { id: "2", rank: 2, name: "Arjun M.", avatar: "AM", xp: 11850, streak: 38, sessions: 58 },
  { id: "3", rank: 3, name: "Chen L.", avatar: "CL", xp: 11200, streak: 31, sessions: 55 },
  { id: "4", rank: 4, name: "Fatima A.", avatar: "FA", xp: 10700, streak: 29, sessions: 52 },
  { id: "5", rank: 5, name: "James O.", avatar: "JO", xp: 9900, streak: 22, sessions: 48 },
  { id: "6", rank: 6, name: "Amara N.", avatar: "AN", xp: 9100, streak: 18, sessions: 44 },
  { id: "7", rank: 7, name: "Lucas S.", avatar: "LS", xp: 8500, streak: 15, sessions: 40 },
]

export default function LeaderboardPage() {
  const { data: session } = useSession()
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await fetch("/api/leaderboard")
        const data = await res.json()
        setLeaders(data.length > 0 ? data : DEMO_LEADERS)
      } catch {
        setLeaders(DEMO_LEADERS)
      }
      setLoading(false)
    }
    fetchLeaders()
  }, [])

  const top3 = leaders.slice(0, 3)
  const rest = leaders.slice(3)
  const myRank = leaders.find((l) => session?.user?.email && l.name.includes((session.user.email || "").split("@")[0]))

  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="page-container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span className="badge badge-amber" style={{ marginBottom: "16px" }}>
            <Trophy size={11} />
            Leaderboard
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "var(--font-outfit), sans-serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, color: "var(--text-main)", letterSpacing: "-0.02em", marginBottom: "10px" }}
          >
            Global{" "}
            <span className="gradient-text-amber">Champions</span>
          </motion.h1>
          <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
            Top students ranked by study XP this week. Who will claim the crown?
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "80px", color: "var(--text-muted)" }}>
            <Loader2 size={32} style={{ animation: "spin 1s linear infinite", margin: "0 auto 12px" }} />
            <p>Loading leaderboard...</p>
          </div>
        ) : (
          <>
            {/* Podium */}
            {top3.length >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", gap: "16px", marginBottom: "48px" }}
              >
                {[top3[1], top3[0], top3[2]].map((user, i) => {
                  const podiumOrder = [2, 1, 3]
                  const podiumRank = podiumOrder[i]
                  const heights = [140, 180, 110]
                  const color = RANK_COLORS[podiumRank - 1]
                  return (
                    <div key={user.id} id={`leaderboard-podium-${podiumRank}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                      {podiumRank === 1 && <Crown size={28} color="#fcd34d" fill="#fcd34d" />}
                      <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: `linear-gradient(135deg, ${color}40, ${color}20)`, border: `2px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 800, color }}>
                        {user.avatar}
                      </div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)", textAlign: "center" }}>{user.name}</div>
                      <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{user.xp.toLocaleString()} XP</div>
                      <div style={{ width: "100px", height: `${heights[i]}px`, background: `linear-gradient(180deg, ${color}30 0%, ${color}10 100%)`, border: `1px solid ${color}40`, borderRadius: "12px 12px 0 0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: 900, color, fontFamily: "var(--font-outfit)" }}>
                        {podiumRank}
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            )}

            {/* Leaderboard Table */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-strong"
              style={{ borderRadius: "20px", overflow: "hidden" }}
            >
              <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-subtle)", display: "flex", gap: "12px", alignItems: "center" }}>
                <span style={{ fontSize: "12px", color: "var(--text-faint)", width: "32px" }}>#</span>
                <span style={{ fontSize: "12px", color: "var(--text-faint)", flex: 1 }}>Student</span>
                <span style={{ fontSize: "12px", color: "var(--text-faint)", width: "80px", textAlign: "right" }}>Streak</span>
                <span style={{ fontSize: "12px", color: "var(--text-faint)", width: "100px", textAlign: "right" }}>XP</span>
              </div>
              {rest.map((user, i) => (
                <motion.div
                  key={user.id}
                  id={`leaderboard-row-${user.rank}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  style={{ padding: "14px 24px", borderBottom: i < rest.length - 1 ? "1px solid var(--border-subtle)" : "none", display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-faint)", width: "32px" }}>{user.rank}</span>
                  <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "var(--color-primary-light)" }}>
                      {user.avatar}
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-main)" }}>{user.name}</div>
                  </div>
                  <div style={{ width: "80px", textAlign: "right", fontSize: "13px", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                    <Flame size={12} />
                    {user.streak}d
                  </div>
                  <div style={{ width: "100px", textAlign: "right", fontSize: "13px", fontWeight: 700, color: "var(--text-main)", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "4px" }}>
                    <Star size={11} color="#fcd34d" />
                    {user.xp.toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Your Rank */}
            <div className="glass" style={{ marginTop: "24px", padding: "20px 24px", borderRadius: "16px", border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", background: "rgba(124,58,237,0.06)" }}>
              {session && myRank ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ fontSize: "24px", fontWeight: 900, color: "var(--color-primary-light)", fontFamily: "var(--font-outfit)" }}>#{myRank.rank}</div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)" }}>Your Position</div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>{myRank.xp.toLocaleString()} XP · {myRank.streak} day streak</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ fontSize: "24px", fontWeight: 900, color: "var(--text-faint)", fontFamily: "var(--font-outfit)" }}>#???</div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)" }}>Your Position</div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>Sign in to claim your rank</div>
                    </div>
                  </div>
                  <Link href="/auth" id="leaderboard-auth-cta" className="btn-primary" style={{ padding: "10px 20px", fontSize: "13px" }}>
                    <Zap size={14} />
                    Join the Competition
                  </Link>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
