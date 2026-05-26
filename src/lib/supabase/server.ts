import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getSupabaseConfig } from "@/lib/supabase/config";

export async function createSupabaseServerClient() {
  const { supabaseUrl, supabaseAnonKey, isConfigured } = getSupabaseConfig();

  if (!isConfigured || !supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase client configuration is incomplete.");
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components cannot always write cookies. Middleware can refresh sessions.
        }
      },
    },
  });
}
