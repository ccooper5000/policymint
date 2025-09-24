type ModelOut =
  | { tos_markdown: string; privacy_markdown: string; notes?: string }
  | null;

export async function callModel(prompt: string, format: 'json' | 'text' = 'json'): Promise<ModelOut> {
  // No provider key? Return null → API route will fallback to deterministic.
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  // Example wiring (commented out). Implement your provider and return parsed JSON.
  /*
  const res = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-5.1-mini',
      input: prompt,
      temperature: 0.2,
      response_format: format === 'json' ? { type: 'json_object' } : undefined,
    }),
  });

  if (!res.ok) throw new Error(`LLM HTTP ${res.status}`);
  const data = await res.json();
  const text = data.output_text as string;
  const parsed = JSON.parse(text);
  return {
    tos_markdown: String(parsed.tos_markdown ?? ''),
    privacy_markdown: String(parsed.privacy_markdown ?? ''),
    notes: String(parsed.notes ?? ''),
  };
  */

  return null;
}
