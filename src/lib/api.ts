/**
 * AuraStudy API helpers
 * Phase 1: Open Trivia DB integration for the health-check page
 * Phase 3+: Supabase / custom backend calls
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "https://opentdb.com";

// ── Types ──────────────────────────────────────────────────────────────
export interface TriviaQuestion {
  category: string;
  type: "multiple" | "boolean";
  difficulty: "easy" | "medium" | "hard";
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaResponse {
  response_code: number; // 0=Success, 1=No results, 2=Invalid param, 3=Token not found, 4=Token empty
  results: TriviaQuestion[];
}

// ── Trivia API ──────────────────────────────────────────────────────────
/**
 * Fetches trivia questions from Open Trivia DB.
 * Called server-side — supports cache control options.
 */
export async function fetchTriviaQuestions(
  amount = 1,
  options?: RequestInit
): Promise<TriviaResponse> {
  const url = `${API_BASE}/api.php?amount=${amount}&type=multiple`;

  const res = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Trivia API responded with HTTP ${res.status}`);
  }

  return res.json() as Promise<TriviaResponse>;
}

// ── Utilities ──────────────────────────────────────────────────────────
/**
 * Decode HTML entities in trivia question strings.
 */
export function decodeHtmlEntities(html: string): string {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&ldquo;/g, "\u201c")
    .replace(/&rdquo;/g, "\u201d");
}

/**
 * Shuffle an array (Fisher-Yates). Used to randomize answer order.
 */
export function shuffleArray<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
