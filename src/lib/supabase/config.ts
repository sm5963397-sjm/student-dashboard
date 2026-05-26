function normalizeEnvValue(value: string | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return undefined;
  }

  const wrappedInDoubleQuotes = trimmed.startsWith('"') && trimmed.endsWith('"');
  const wrappedInSingleQuotes = trimmed.startsWith("'") && trimmed.endsWith("'");

  if (wrappedInDoubleQuotes || wrappedInSingleQuotes) {
    const unquoted = trimmed.slice(1, -1).trim();
    return unquoted || undefined;
  }

  return trimmed;
}

export function getSupabaseConfig() {
  const supabaseUrl = normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const supabaseAnonKey = normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const hasValidUrl = Boolean(supabaseUrl?.startsWith("https://"));
  const hasValidAnonKey = Boolean(supabaseAnonKey && supabaseAnonKey.length > 20);

  return {
    supabaseUrl,
    supabaseAnonKey,
    isConfigured: hasValidUrl && hasValidAnonKey,
  };
}
