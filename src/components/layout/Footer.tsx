import Link from "next/link";
import { Zap, Heart, GitBranch, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-subtle)",
        backgroundColor: "rgba(8, 11, 20, 0.9)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="page-container" style={{ padding: "40px 24px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "32px",
            marginBottom: "32px",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "8px",
                  background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Zap size={14} color="#fff" fill="#fff" />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-outfit), sans-serif",
                  fontWeight: 800,
                  fontSize: "16px",
                  background: "linear-gradient(135deg, #a78bfa 0%, #67e8f9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AuraStudy
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: "220px" }}>
              Your premium AI-powered study companion. Focus better, learn smarter.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
              Product
            </h3>
            {[
              { href: "/focus", label: "Focus Timer" },
              { href: "/subjects", label: "Subjects" },
              { href: "/analytics", label: "Analytics" },
              { href: "/leaderboard", label: "Leaderboard" },
              { href: "/resources", label: "Resources" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{ display: "block", fontSize: "13px", color: "var(--text-muted)", textDecoration: "none", marginBottom: "8px", transition: "color 0.15s" }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Company Links */}
          <div>
            <h3 style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
              Company
            </h3>
            {[
              { href: "/about", label: "About" },
              { href: "/settings", label: "Settings" },
              { href: "/auth", label: "Sign In" },
              { href: "/health", label: "System Health" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                style={{ display: "block", fontSize: "13px", color: "var(--text-muted)", textDecoration: "none", marginBottom: "8px", transition: "color 0.15s" }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p style={{ fontSize: "12px", color: "var(--text-faint)", display: "flex", alignItems: "center", gap: "4px" }}>
            Built with <Heart size={12} color="#ef4444" fill="#ef4444" /> for learners everywhere · © {new Date().getFullYear()} AuraStudy
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: "var(--text-faint)", transition: "color 0.15s" }}>
              <GitBranch size={16} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" style={{ color: "var(--text-faint)", transition: "color 0.15s" }}>
              <MessageCircle size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
