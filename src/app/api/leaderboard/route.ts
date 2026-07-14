import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  // Get all users with their total study sessions
  const users = await db.user.findMany({
    include: {
      sessions: true,
    },
    take: 20,
  })

  const ranked = users
    .map((user) => {
      const totalMinutes = user.sessions.reduce((sum, s) => sum + s.duration, 0)
      const sessionCount = user.sessions.length
      const xp = totalMinutes * 2 + sessionCount * 50

      // Calculate streak (consecutive days with sessions)
      const sessionDates = user.sessions.map((s) =>
        new Date(s.completedAt).toDateString()
      )
      const uniqueDates = [...new Set(sessionDates)].sort().reverse()
      let streak = 0
      const today = new Date()
      for (let i = 0; i < uniqueDates.length; i++) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        if (uniqueDates[i] === d.toDateString()) {
          streak++
        } else {
          break
        }
      }

      return {
        id: user.id,
        name: user.name || user.email?.split("@")[0] || "Anonymous",
        avatar: (user.name || user.email || "?").slice(0, 2).toUpperCase(),
        xp,
        streak,
        sessions: sessionCount,
        totalMinutes,
      }
    })
    .sort((a, b) => b.xp - a.xp)
    .map((u, i) => ({ ...u, rank: i + 1 }))

  return NextResponse.json(ranked)
}
