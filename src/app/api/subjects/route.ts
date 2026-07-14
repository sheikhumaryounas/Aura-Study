import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function GET() {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json([])

  const user = await db.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json([])

  const subjects = await db.subject.findMany({
    where: { userId: user.id },
    include: { tasks: true },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(subjects)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { name, color } = await req.json()
  const user = await db.user.findUnique({ where: { email: session.user.email } })
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 })

  const subject = await db.subject.create({ data: { name, color, userId: user.id } })
  return NextResponse.json(subject)
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await req.json()
  await db.subject.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
