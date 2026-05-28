import { createClient } from "@supabase/supabase-js";

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(
      `Missing ${name}. Add it to frontend/.env (or your deployment env) and restart the dev server.`,
    );
  }
  return value.trim();
}

export const supabase = createClient(
  requireEnv("REACT_APP_SUPABASE_URL"),
  requireEnv("REACT_APP_SUPABASE_ANON_KEY"),
);

