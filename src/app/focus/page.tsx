"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Timer, Play, Pause, RotateCcw, Coffee, Settings2, Headphones, Flame, CheckCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"

const PRESETS = [
  { label: "Classic", work: 25, rest: 5, icon: "🍅" },
  { label: "Deep Work", work: 50, rest: 10, icon: "🔥" },
  { label: "Quick Sprint", work: 15, rest: 3, icon: "⚡" },
  { label: "Ultra Focus", work: 90, rest: 20, icon: "🚀" },
]

const SOUNDS = [
  { label: "Rain", emoji: "🌧️", url: "https://www.youtube.com/embed/mPZkdNFkNps?autoplay=1&controls=0&loop=1" },
  { label: "Café", emoji: "☕", url: "https://www.youtube.com/embed/h2zkV-l_more?autoplay=1&controls=0&loop=1" },
  { label: "Forest", emoji: "🌲", url: "https://www.youtube.com/embed/gWQMod5uBlE?autoplay=1&controls=0&loop=1" },
  { label: "Lo-fi", emoji: "🎵", url: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&controls=0&loop=1" },
  { label: "White Noise", emoji: "🌊", url: "https://www.youtube.com/embed/nMfPqeZjc2c?autoplay=1&controls=0&loop=1" },
  { label: "Silence", emoji: "🔇", url: null },
]

export default function FocusPage() {
  const { data: session } = useSession()
  const [preset, setPreset] = useState(PRESETS[0])
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [seconds, setSeconds] = useState(PRESETS[0].work * 60)
  const [sessionCount, setSessionCount] = useState(0)
  const [completedToday, setCompletedToday] = useState(0)
  const [totalFocusMinutes, setTotalFocusMinutes] = useState(0)
  const [activeSound, setActiveSound] = useState<string | null>(null)
  const [showIframe, setShowIframe] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const totalSeconds = isBreak ? preset.rest * 60 : preset.work * 60
  const progress = ((totalSeconds - seconds) / totalSeconds) * 100
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  const saveSession = useCallback(async (duration: number) => {
    if (!session?.user) return
    try {
      await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ duration }),
      })
    } catch {}
  }, [session])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current!)
            setIsRunning(false)
            if (!isBreak) {
              const duration = preset.work
              setCompletedToday((c) => c + 1)
              setTotalFocusMinutes((m) => m + duration)
              setSessionCount((n) => n + 1)
              saveSession(duration)
              // Switch to break
              setIsBreak(true)
              setSeconds(preset.rest * 60)
            } else {
              setIsBreak(false)
              setSeconds(preset.work * 60)
            }
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current!)
    }
    return () => clearInterval(intervalRef.current!)
  }, [isRunning, isBreak, preset, saveSession])

  const handleReset = () => {
    setIsRunning(false)
    setIsBreak(false)
    setSeconds(preset.work * 60)
    clearInterval(intervalRef.current!)
  }

  const handlePreset = (p: typeof PRESETS[0]) => {
    setPreset(p)
    setIsRunning(false)
    setIsBreak(false)
    setSeconds(p.work * 60)
  }

  const handleSound = (sound: typeof SOUNDS[0]) => {
    if (sound.label === "Silence" || activeSound === sound.label) {
      setActiveSound(null)
      setShowIframe(false)
    } else {
      setActiveSound(sound.label)
      setShowIframe(true)
    }
  }

  const activeIframeUrl = SOUNDS.find((s) => s.label === activeSound)?.url

  // Circumference for SVG circle
  const radius = 100
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

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
            {/* SVG Circular Timer */}
            <div style={{ position: "relative", width: "240px", height: "240px", margin: "0 auto 32px" }}>
              <svg width="240" height="240" style={{ transform: "rotate(-90deg)", position: "absolute", top: 0, left: 0 }}>
                <circle cx="120" cy="120" r={radius} fill="none" stroke="rgba(124,58,237,0.1)" strokeWidth="6" />
                <circle
                  cx="120" cy="120" r={radius} fill="none"
                  stroke={isBreak ? "#06b6d4" : "#7c3aed"}
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: "13px", color: isBreak ? "#67e8f9" : "var(--color-primary-light)", fontWeight: 700, marginBottom: "4px", letterSpacing: "0.1em" }}>
                  {isBreak ? "BREAK" : "FOCUS"}
                </div>
                <div style={{ fontFamily: "var(--font-outfit)", fontSize: "52px", fontWeight: 900, color: "var(--text-main)", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "6px" }}>Session {sessionCount + 1} of 4</div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginBottom: "24px" }}>
              <button
                id="focus-btn-start"
                className="btn-primary"
                style={{ padding: "12px 32px", gap: "8px" }}
                onClick={() => setIsRunning((r) => !r)}
                type="button"
              >
                {isRunning ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
                {isRunning ? "Pause" : "Start Session"}
              </button>
              <button
                id="focus-btn-reset"
                className="btn-secondary"
                style={{ padding: "12px 14px" }}
                onClick={handleReset}
                type="button"
                aria-label="Reset timer"
              >
                <RotateCcw size={16} />
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", justifyContent: "center", gap: "24px" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>{completedToday}</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Sessions</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>{totalFocusMinutes}m</div>
                <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>Focus time</div>
              </div>
            </div>

            {completedToday > 0 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", color: "var(--color-accent)", marginTop: "16px" }}>
                <Flame size={16} />
                <span style={{ fontSize: "13px", fontWeight: 600 }}>{completedToday} session{completedToday > 1 ? "s" : ""} done today!</span>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Session Presets */}
            <div className="glass" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
                Session Presets
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    id={`focus-preset-${p.label.toLowerCase().replace(" ", "-")}`}
                    type="button"
                    onClick={() => handlePreset(p)}
                    className="glass"
                    style={{
                      padding: "14px",
                      border: preset.label === p.label ? "1px solid rgba(124,58,237,0.5)" : "1px solid var(--border-subtle)",
                      background: preset.label === p.label ? "rgba(124,58,237,0.12)" : "var(--bg-card)",
                      borderRadius: "12px",
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>{p.icon}</div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>{p.label}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-muted)" }}>{p.work}m / {p.rest}m break</div>
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
                {SOUNDS.map((sound) => (
                  <button
                    key={sound.label}
                    id={`focus-sound-${sound.label.toLowerCase().replace(" ", "-")}`}
                    type="button"
                    onClick={() => handleSound(sound)}
                    className="glass"
                    style={{
                      padding: "10px 8px",
                      borderRadius: "10px",
                      border: activeSound === sound.label ? "1px solid rgba(6,182,212,0.5)" : "1px solid var(--border-subtle)",
                      background: activeSound === sound.label ? "rgba(6,182,212,0.1)" : "var(--bg-card)",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontSize: "20px" }}>{sound.emoji}</div>
                    <div style={{ fontSize: "11px", color: activeSound === sound.label ? "#67e8f9" : "var(--text-muted)", marginTop: "4px" }}>{sound.label}</div>
                  </button>
                ))}
              </div>
              {/* Hidden music player iframe */}
              {showIframe && activeIframeUrl && (
                <iframe
                  src={activeIframeUrl}
                  allow="autoplay"
                  style={{ display: "none" }}
                  title="ambient-sound"
                />
              )}
              {activeSound && activeSound !== "Silence" && (
                <div style={{ marginTop: "12px", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "#67e8f9" }}>
                  <CheckCircle size={12} /> Now playing: {activeSound}
                </div>
              )}
            </div>

            {/* Today's Stats */}
            <div className="glass" style={{ padding: "24px" }}>
              <h2 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "16px" }}>
                Today&apos;s Progress
              </h2>
              {[
                { label: "Sessions completed", value: `${completedToday} / 8` },
                { label: "Total focus time", value: `${Math.floor(totalFocusMinutes / 60)}h ${totalFocusMinutes % 60}m` },
                { label: "XP earned today", value: `+${completedToday * 50} XP` },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{label}</span>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-main)" }}>{value}</span>
                </div>
              ))}
              <div className="progress-track" style={{ marginTop: "8px" }}>
                <div className="progress-fill" style={{ width: `${Math.min((completedToday / 8) * 100, 100)}%`, transition: "width 0.5s ease" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Auth CTA if not signed in */}
        {!session && (
          <div style={{ marginTop: "48px", textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)", marginBottom: "16px", fontSize: "14px" }}>
              Sign in to save your sessions and track your progress across devices
            </p>
            <Link href="/auth" id="focus-auth-cta" className="btn-primary">
              <Coffee size={16} />
              Sign up — it&apos;s free
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
