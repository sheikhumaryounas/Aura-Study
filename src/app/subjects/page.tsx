"use client"

import { useState, useEffect } from "react"
import { BookOpen, Plus, Trash2, TrendingUp, Clock, Target, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { motion } from "framer-motion"

const COLORS = ["#7c3aed", "#ef4444", "#06b6d4", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#14b8a6"]
const EMOJIS = ["📐", "⚗️", "🌍", "📖", "💻", "⚛️", "🎨", "🧮", "🏛️", "🔬"]

type Subject = {
  id: string
  name: string
  color: string
  tasks: { id: string; completed: boolean }[]
  createdAt: string
}

export default function SubjectsPage() {
  const { data: session } = useSession()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState("")
  const [newColor, setNewColor] = useState(COLORS[0])
  const [saving, setSaving] = useState(false)

  const fetchSubjects = async () => {
    if (!session) return
    setLoading(true)
    try {
      const res = await fetch("/api/subjects")
      const data = await res.json()
      setSubjects(data)
    } catch {}
    setLoading(false)
  }

  useEffect(() => { fetchSubjects() }, [session])

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName.trim()) return
    setSaving(true)
    await fetch("/api/subjects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, color: newColor }),
    })
    setNewName("")
    setNewColor(COLORS[0])
    setShowModal(false)
    await fetchSubjects()
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    await fetch("/api/subjects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    setSubjects((s) => s.filter((sub) => sub.id !== id))
  }

  // Demo subjects for logged-out users
  const DEMO_SUBJECTS = [
    { id: "1", name: "Advanced Mathematics", color: "#7c3aed", tasks: Array(24).fill({ completed: true }), createdAt: "" },
    { id: "2", name: "Organic Chemistry", color: "#ef4444", tasks: Array(12).fill({ completed: false }), createdAt: "" },
    { id: "3", name: "Computer Science", color: "#f59e0b", tasks: Array(40).fill({ completed: true }), createdAt: "" },
    { id: "4", name: "World History", color: "#06b6d4", tasks: Array(31).fill({ completed: true }), createdAt: "" },
  ]

  const displaySubjects = session ? subjects : DEMO_SUBJECTS

  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="page-container">
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: "12px" }}>
              <BookOpen size={11} />
              Subjects
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                fontFamily: "var(--font-outfit), sans-serif",
                fontSize: "clamp(28px, 4vw, 42px)",
                fontWeight: 800,
                color: "var(--text-main)",
                letterSpacing: "-0.02em",
                marginBottom: "8px",
              }}
            >
              My Subjects
            </motion.h1>
            <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
              Track progress across all your courses and hit your study goals.
            </p>
          </div>
          {session && (
            <button onClick={() => setShowModal(true)} className="btn-primary" type="button">
              <Plus size={16} />
              Add Subject
            </button>
          )}
        </div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px", marginBottom: "40px" }}
        >
          {[
            { label: "Total Subjects", value: String(displaySubjects.length), icon: BookOpen, color: "#7c3aed" },
            { label: "Total Tasks", value: String(displaySubjects.reduce((a, s) => a + s.tasks.length, 0)), icon: TrendingUp, color: "#06b6d4" },
            { label: "Completed Tasks", value: String(displaySubjects.reduce((a, s) => a + s.tasks.filter((t) => t.completed).length, 0)), icon: Clock, color: "#f59e0b" },
            { label: "Active This Week", value: String(Math.min(displaySubjects.length, 4)), icon: Target, color: "#10b981" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="stat-card">
              <Icon size={18} color={color} style={{ marginBottom: "10px" }} />
              <div style={{ fontSize: "24px", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>{value}</div>
              <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Subjects Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)" }}>
            <Loader2 size={32} style={{ animation: "spin 1s linear infinite", margin: "0 auto 12px" }} />
            <p>Loading your subjects...</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {displaySubjects.map((sub, i) => {
              const emoji = EMOJIS[i % EMOJIS.length]
              const completedTasks = sub.tasks.filter((t) => t.completed).length
              const totalTasks = sub.tasks.length
              const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
              return (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass stat-card"
                  style={{ position: "relative" }}
                >
                  {session && (
                    <button
                      onClick={() => handleDelete(sub.id)}
                      type="button"
                      style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "var(--text-faint)", cursor: "pointer", padding: "4px" }}
                      aria-label="Delete subject"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: `${sub.color}20`, border: `1px solid ${sub.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                      {emoji}
                    </div>
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-main)" }}>{sub.name}</div>
                      <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>{totalTasks} tasks</div>
                    </div>
                  </div>

                  <div style={{ marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Progress</span>
                      <span style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-main)" }}>{progress}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${sub.color}, ${sub.color}99)`, transition: "width 0.5s ease" }} />
                    </div>
                  </div>

                  <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
                    {completedTasks} of {totalTasks} tasks completed
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* CTA for logged-out users */}
        {!session && (
          <div style={{ marginTop: "48px", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px", fontSize: "14px" }}>
              Sign in to create and save your own subjects
            </p>
            <Link href="/auth" className="btn-primary">
              <BookOpen size={16} />
              Save My Subjects
            </Link>
          </div>
        )}
      </div>

      {/* Add Subject Modal */}
      {showModal && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong"
            style={{ padding: "32px", borderRadius: "24px", width: "100%", maxWidth: "400px", margin: "16px" }}
          >
            <h2 style={{ fontFamily: "var(--font-outfit)", fontSize: "22px", fontWeight: 800, color: "var(--text-main)", marginBottom: "24px" }}>
              Add New Subject
            </h2>
            <form onSubmit={handleAdd}>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Subject Name
                </label>
                <input
                  autoFocus
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Advanced Mathematics"
                  required
                  style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid var(--border-subtle)", borderRadius: "10px", color: "var(--text-main)", fontSize: "14px", outline: "none" }}
                />
              </div>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Color
                </label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewColor(c)}
                      style={{ width: "32px", height: "32px", borderRadius: "8px", background: c, border: newColor === c ? "3px solid white" : "3px solid transparent", cursor: "pointer", transition: "border 0.15s" }}
                    />
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary" style={{ flex: 1, justifyContent: "center" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: "center" }} disabled={saving}>
                  {saving ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Plus size={16} />}
                  {saving ? "Saving..." : "Add Subject"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
