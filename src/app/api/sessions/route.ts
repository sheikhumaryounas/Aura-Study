import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { duration } = await req.json()
  const user = await db.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  const studySession = await db.studySession.create({
    data: { duration, userId: user.id },
  })

  return NextResponse.json(studySession)
}

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await db.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json([])

  const sessions = await db.studySession.findMany({
    where: { userId: user.id },
    orderBy: { completedAt: "desc" },
    take: 30,
  })

  return NextResponse.json(sessions)
}
