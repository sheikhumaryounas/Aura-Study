"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import {
  BookOpen,
  Timer,
  BarChart2,
  Trophy,
  FolderOpen,
  Settings,
  Info,
  Menu,
  X,
  Zap,
  Sun,
  Moon,
  LogOut,
  User,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Zap },
  { href: "/focus", label: "Focus", icon: Timer },
  { href: "/subjects", label: "Subjects", icon: BookOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/resources", label: "Resources", icon: FolderOpen },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/about", label: "About", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid var(--border-subtle)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: "rgba(8, 11, 20, 0.85)",
      }}
    >
      <div className="page-container" style={{ height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* ── Brand ── */}
        <Link
          href="/"
          id="nav-brand"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          <span
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "18px",
              fontWeight: 800,
              background: "linear-gradient(135deg, #a78bfa 0%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AuraStudy
          </span>
        </Link>

        {/* ── Desktop Navigation ── */}
        <nav
          id="desktop-nav"
          aria-label="Main navigation"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                id={`nav-${label.toLowerCase()}`}
                style={{
                  padding: "6px 14px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--color-primary-light)" : "var(--text-muted)",
                  background: isActive ? "rgba(124, 58, 237, 0.12)" : "transparent",
                  border: isActive ? "1px solid rgba(124, 58, 237, 0.2)" : "1px solid transparent",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ── Right Actions ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          {/* Dark mode toggle */}
          {mounted && (
            <button
              id="nav-theme-toggle"
              aria-label="Toggle dark mode"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "8px",
                color: "var(--text-muted)",
                cursor: "pointer",
                padding: "6px 8px",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s",
              }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}

          {/* Auth CTA */}
          {session ? (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="hidden-mobile">
              <div style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "8px" }}>
                <User size={14} color="var(--color-primary-light)" />
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-primary-light)" }}>{session.user?.name || session.user?.email?.split("@")[0]}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="btn-secondary"
                style={{ padding: "6px 12px", fontSize: "13px", display: "flex", alignItems: "center", gap: "4px" }}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/auth"
              id="nav-cta"
              className="btn-primary hidden-mobile"
              style={{ padding: "8px 18px", fontSize: "13px", borderRadius: "8px" }}
            >
              Get Started
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            id="nav-hamburger"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-main)",
              cursor: "pointer",
              padding: "6px",
              display: "none",
            }}
            className="show-mobile"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          style={{
            borderTop: "1px solid var(--border-subtle)",
            padding: "12px 16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "var(--color-primary-light)" : "var(--text-muted)",
                  background: isActive ? "rgba(124, 58, 237, 0.1)" : "transparent",
                  textDecoration: "none",
                }}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
          <Link
            href="/auth"
            onClick={() => setMobileOpen(false)}
            className="btn-primary"
            style={{ marginTop: "8px", textAlign: "center" }}
          >
            Get Started
          </Link>
        </div>
      )}

      {/* Responsive CSS injected inline for SSR safety */}
      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
          .hidden-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
