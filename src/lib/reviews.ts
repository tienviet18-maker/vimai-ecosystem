import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/utils";
import type { Locale, Review } from "@/types";

export async function getApprovedReviews(locale?: Locale, productId?: string | null) {
  if (!isSupabaseConfigured()) return [] as Review[];
  const supabase = await createClient();
  if (!supabase) return [];

  let query = supabase
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (productId) query = query.eq("product_id", productId);
  if (locale) query = query.or(`locale.eq.${locale},locale.is.null`);

  const { data, error } = await query;
  if (error || !data) return [];
  return data as Review[];
}

export async function getAllReviews() {
  if (!isSupabaseConfigured()) return [] as Review[];
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("reviews")
    .select("*")
    .order("created_at", { ascending: false });
  return (data ?? []) as Review[];
}
