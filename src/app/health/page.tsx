import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, XCircle, Clock, Zap, Database, Globe, Server, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "System Health",
  description:
    "Live system health check for AuraStudy. Shows real-time API status, response times, and fetched data.",
};

// ── Types ──────────────────────────────────────────────────────────────
interface TriviaResult {
  category: string;
  type: string;
  difficulty: string;
  question: string;
}

interface TriviaResponse {
  response_code: number;
  results: TriviaResult[];
}

interface HealthData {
  status: "healthy" | "degraded" | "down";
  apiUrl: string;
  responseMs: number;
  question: TriviaResult | null;
  fetchedAt: string;
  appVersion: string;
  environment: string;
  error?: string;
}

// ── Server-side data fetch (runs on every request, no caching) ──────────
async function fetchHealthData(): Promise<HealthData> {
  const apiUrl = "https://opentdb.com/api.php?amount=1&type=multiple";
  const start = Date.now();

  try {
    const res = await fetch(apiUrl, {
      cache: "no-store", // Always fetch fresh — demonstrates Server Component data fetching
      signal: AbortSignal.timeout(8000),
    });

    const responseMs = Date.now() - start;

    if (!res.ok) {
      return {
        status: "degraded",
        apiUrl,
        responseMs,
        question: null,
        fetchedAt: new Date().toISOString(),
        appVersion: "1.0.0",
        environment: process.env.NODE_ENV ?? "production",
        error: `API returned HTTP ${res.status}`,
      };
    }

    const data: TriviaResponse = await res.json();
    const question = data.results?.[0] ?? null;

    return {
      status: "healthy",
      apiUrl,
      responseMs,
      question,
      fetchedAt: new Date().toISOString(),
      appVersion: "1.0.0",
      environment: process.env.NODE_ENV ?? "production",
    };
  } catch (err) {
    return {
      status: "down",
      apiUrl,
      responseMs: Date.now() - start,
      question: null,
      fetchedAt: new Date().toISOString(),
      appVersion: "1.0.0",
      environment: process.env.NODE_ENV ?? "production",
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────
function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

function formatTimestamp(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "long",
  });
}

// ── Page Component (Server Component — no "use client") ──────────────────
export default async function HealthPage() {
  const health = await fetchHealthData();

  const statusConfig = {
    healthy: { icon: <CheckCircle size={20} color="#10b981" />, color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.3)", label: "All Systems Operational" },
    degraded: { icon: <RefreshCw size={20} color="#f59e0b" />, color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", label: "Degraded Performance" },
    down: { icon: <XCircle size={20} color="#ef4444" />, color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", label: "Service Unavailable" },
  }[health.status];

  const difficultyColor: Record<string, string> = {
    easy: "#10b981",
    medium: "#f59e0b",
    hard: "#ef4444",
  };

  return (
    <div style={{ padding: "60px 0 100px" }}>
      <div className="page-container" style={{ maxWidth: "760px" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <span className="badge badge-cyan" style={{ marginBottom: "12px" }}>
            <Server size={11} />
            Health Check
          </span>
          <h1
            style={{
              fontFamily: "var(--font-outfit), sans-serif",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 800,
              color: "var(--text-main)",
              letterSpacing: "-0.02em",
              marginBottom: "8px",
            }}
          >
            System Health
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "15px" }}>
            Live status check rendered server-side on every request. Data is never cached.
          </p>
        </div>

        {/* Overall Status Banner */}
        <div
          id="health-status-banner"
          style={{
            padding: "20px 24px",
            borderRadius: "16px",
            background: statusConfig.bg,
            border: `1px solid ${statusConfig.border}`,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          {statusConfig.icon}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "16px", fontWeight: 700, color: statusConfig.color }}>{statusConfig.label}</div>
            <div style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "2px" }}>
              Last checked: {formatTimestamp(health.fetchedAt)}
            </div>
          </div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: "999px",
              background: statusConfig.bg,
              color: statusConfig.color,
              border: `1px solid ${statusConfig.border}`,
              textTransform: "uppercase",
            }}
          >
            {health.status}
          </span>
        </div>

        {/* Error Box */}
        {health.error && (
          <div
            id="health-error-box"
            style={{
              padding: "16px 20px",
              borderRadius: "12px",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.25)",
              marginBottom: "28px",
              fontSize: "13px",
              color: "#fca5a5",
              fontFamily: "monospace",
            }}
          >
            Error: {health.error}
          </div>
        )}

        {/* Metrics Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          {[
            {
              id: "health-metric-response",
              icon: <Clock size={18} color="#7c3aed" />,
              label: "Response Time",
              value: `${health.responseMs}ms`,
              sub: health.responseMs < 500 ? "Fast ✓" : health.responseMs < 1500 ? "Acceptable" : "Slow ⚠️",
              color: health.responseMs < 500 ? "#10b981" : health.responseMs < 1500 ? "#f59e0b" : "#ef4444",
            },
            {
              id: "health-metric-env",
              icon: <Server size={18} color="#06b6d4" />,
              label: "Environment",
              value: health.environment,
              sub: "Node.js runtime",
              color: "#06b6d4",
            },
            {
              id: "health-metric-version",
              icon: <Zap size={18} color="#f59e0b" />,
              label: "App Version",
              value: `v${health.appVersion}`,
              sub: "AuraStudy",
              color: "#f59e0b",
            },
            {
              id: "health-metric-api",
              icon: <Globe size={18} color="#10b981" />,
              label: "External API",
              value: health.status === "healthy" ? "Online" : "Offline",
              sub: "Open Trivia DB",
              color: health.status === "healthy" ? "#10b981" : "#ef4444",
            },
          ].map(({ id, icon, label, value, sub, color }) => (
            <div key={id} id={id} className="stat-card">
              <div style={{ marginBottom: "10px" }}>{icon}</div>
              <div style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-main)", fontFamily: "var(--font-outfit)" }}>{value}</div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "3px" }}>{label}</div>
              <div style={{ fontSize: "11px", color, marginTop: "2px", fontWeight: 600 }}>{sub}</div>
            </div>
          ))}
        </div>

        {/* Live Fetched Data */}
        <div className="glass" style={{ padding: "28px", borderRadius: "20px", marginBottom: "28px" }}>
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "var(--text-main)",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Database size={16} color="var(--color-secondary)" />
            Live Fetched Data
            <span className="badge badge-cyan" style={{ fontSize: "10px", padding: "2px 8px", marginLeft: "auto" }}>
              Server-rendered · No cache
            </span>
          </h2>

          {health.question ? (
            <div id="health-live-data">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "20px" }}>
                {[
                  { label: "Category", value: decodeHtml(health.question.category) },
                  { label: "Type", value: health.question.type === "multiple" ? "Multiple Choice" : "True/False" },
                  {
                    label: "Difficulty",
                    value: health.question.difficulty.charAt(0).toUpperCase() + health.question.difficulty.slice(1),
                    color: difficultyColor[health.question.difficulty],
                  },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ padding: "12px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-subtle)" }}>
                    <div style={{ fontSize: "11px", color: "var(--text-faint)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px" }}>{label}</div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: color ?? "var(--text-main)" }}>{value}</div>
                  </div>
                ))}
              </div>

              <div
                id="health-question-text"
                style={{
                  padding: "16px 20px",
                  borderRadius: "12px",
                  background: "rgba(124,58,237,0.06)",
                  border: "1px solid rgba(124,58,237,0.15)",
                }}
              >
                <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  Sample Question
                </p>
                <p style={{ fontSize: "14px", color: "var(--text-main)", lineHeight: 1.6 }}>
                  {decodeHtml(health.question.question)}
                </p>
              </div>
            </div>
          ) : (
            <div id="health-no-data" style={{ padding: "24px", textAlign: "center", color: "var(--text-muted)", fontSize: "14px" }}>
              ⚠️ Could not fetch live data. External API may be unavailable.
            </div>
          )}
        </div>

        {/* Endpoint Info */}
        <div className="glass" style={{ padding: "24px", borderRadius: "16px", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-main)", marginBottom: "16px" }}>
            Checked Endpoints
          </h2>
          <div
            id="health-endpoint-row"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 0",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: health.status === "healthy" ? "#10b981" : "#ef4444",
                flexShrink: 0,
                boxShadow: health.status === "healthy" ? "0 0 8px #10b981" : "0 0 8px #ef4444",
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-main)", fontFamily: "monospace" }}>
                GET {health.apiUrl}
              </div>
              <div style={{ fontSize: "11px", color: "var(--text-muted)", marginTop: "2px" }}>
                Open Trivia DB — free, no API key required
              </div>
            </div>
            <span style={{ fontSize: "12px", color: health.status === "healthy" ? "#10b981" : "#ef4444", fontWeight: 700 }}>
              {health.responseMs}ms
            </span>
          </div>
        </div>

        {/* Implementation Note */}
        <div
          style={{
            padding: "20px 24px",
            borderRadius: "14px",
            background: "rgba(6,182,212,0.06)",
            border: "1px solid rgba(6,182,212,0.2)",
            marginBottom: "32px",
          }}
        >
          <h3 style={{ fontSize: "13px", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "8px" }}>
            ⚙️ How This Works
          </h3>
          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
            This page is a <strong style={{ color: "var(--text-main)" }}>Next.js Server Component</strong> — it runs on the server
            on every request (no client-side JavaScript involved). The data above was fetched from the Open Trivia
            DB API at request time with <code style={{ background: "rgba(255,255,255,0.06)", padding: "1px 6px", borderRadius: "4px", fontSize: "12px" }}>cache: &quot;no-store&quot;</code>.
            Refresh the page to get a new question!
          </p>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link href="/health" id="health-refresh-btn" className="btn-primary">
            <RefreshCw size={15} />
            Refresh Health Check
          </Link>
          <Link href="/" id="health-home-btn" className="btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
