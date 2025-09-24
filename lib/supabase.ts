// lib/supabase.ts
'use client';

/**
 * Lightweight Supabase client for client-side usage (optional).
 * Safe no-op if env vars are missing, so importing this file never crashes.
 *
 * If you don't need client-side Supabase yet, you can keep this file
 * and simply not import it anywhere.
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Export a hydrated client when env exists; otherwise export `null`.
 * This pattern prevents runtime errors in local/preview when you haven't
 * set up Supabase yet.
 */
export const supabase: SupabaseClient | null =
  url && anon ? createClient(url, anon, { auth: { persistSession: false } }) : null;
