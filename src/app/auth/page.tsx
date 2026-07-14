import type { Metadata } from "next";
import Link from "next/link";
import { LogIn, UserPlus, Eye, EyeOff, Zap, BookOpen, Timer, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In · Get Started",
  description:
    "Sign in or create your free AuraStudy account to start tracking your study sessions, subjects, and progress.",
};

export default function AuthPage() {
  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "420px" }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "18px",
              background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 0 40px rgba(124,58,237,0.4)",
            }}
          >
            <Zap size={30} color="#fff" fill="#fff" />
          </div>
          <h1
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "28px",
              fontWeight: 800,
              color: "var(--text-main)",
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            Welcome to AuraStudy
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Sign in to your account or create one for free
          </p>
        </div>

        {/* Auth Card */}
        <div className="glass-strong" style={{ padding: "32px", borderRadius: "24px" }}>
          {/* Tab Switcher */}
          <div
            style={{
              display: "flex",
              gap: "4px",
              background: "rgba(255,255,255,0.04)",
              padding: "4px",
              borderRadius: "12px",
              marginBottom: "28px",
            }}
          >
            <button
              id="auth-tab-signin"
              type="button"
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "9px",
                background: "rgba(124,58,237,0.2)",
                border: "1px solid rgba(124,58,237,0.3)",
                color: "var(--color-primary-light)",
                fontSize: "13px",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <LogIn size={14} />
              Sign In
            </button>
            <button
              id="auth-tab-register"
              type="button"
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "9px",
                background: "transparent",
                border: "1px solid transparent",
                color: "var(--text-muted)",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <UserPlus size={14} />
              Register
            </button>
          </div>

          {/* Form Fields */}
          <form id="auth-form" noValidate>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
              <div>
                <label htmlFor="auth-email" style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Email Address
                </label>
                <input
                  id="auth-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "10px",
                    color: "var(--text-main)",
                    fontSize: "14px",
                    outline: "none",
                    transition: "border-color 0.2s",
                  }}
                />
              </div>

              <div>
                <label htmlFor="auth-password" style={{ fontSize: "12px", fontWeight: 600, color: "var(--text-muted)", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    id="auth-password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    style={{
                      width: "100%",
                      padding: "12px 44px 12px 16px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "10px",
                      color: "var(--text-main)",
                      fontSize: "14px",
                      outline: "none",
                    }}
                  />
                  <button
                    id="auth-toggle-password"
                    type="button"
                    aria-label="Toggle password visibility"
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--text-faint)",
                      padding: "4px",
                    }}
                  >
                    <Eye size={16} />
                  </button>
                </div>
              </div>
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center", padding: "14px", fontSize: "15px" }}
            >
              <LogIn size={16} />
              Sign In to AuraStudy
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <a href="#" id="auth-forgot-password" style={{ fontSize: "13px", color: "var(--color-primary-light)", textDecoration: "none" }}>
              Forgot your password?
            </a>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
            <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
            <span style={{ fontSize: "12px", color: "var(--text-faint)" }}>or continue with</span>
            <div style={{ flex: 1, height: "1px", background: "var(--border-subtle)" }} />
          </div>

          {/* OAuth Stubs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <button id="auth-google-btn" type="button" className="btn-secondary" style={{ fontSize: "13px", padding: "10px", justifyContent: "center" }}>
              <span style={{ fontSize: "16px" }}>G</span>
              Google
            </button>
            <button id="auth-github-btn" type="button" className="btn-secondary" style={{ fontSize: "13px", padding: "10px", justifyContent: "center" }}>
              <span style={{ fontSize: "16px" }}>⌘</span>
              GitHub
            </button>
          </div>
        </div>

        {/* What You Get */}
        <div style={{ marginTop: "28px", padding: "20px", borderRadius: "16px", background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.15)" }}>
          <p style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
            Free account includes
          </p>
          {[
            { icon: Timer, text: "Unlimited Pomodoro sessions" },
            { icon: BookOpen, text: "Up to 10 subjects" },
            { icon: Trophy, text: "Global leaderboard access" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <Icon size={14} color="var(--color-primary-light)" />
              <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
