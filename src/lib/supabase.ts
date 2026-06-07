import { createClient } from '@supabase/supabase-js';

// ከ .env.local ላይ ቁልፎቹን መሳብ
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ሰርቨሩ ቁልፎቹን ካጣ በጭፍን ተነስቶ እንዳይሰበር እዚሁ ላይ በንጽህና እንዲይዘው እናደርጋለን
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ ⚠️ የጎንደር ሲቲ ሆቴል ማስጠንቀቂያ: የ Supabase URL ወይም KEY በ .env.local ውስጥ አልተገኘም!");
}

// ሊንኩ ባዶ ከሆነ ባዶ ስትሪንግ በመስጠት 'Invalid supabaseUrl' ኢረር እንዳይጥል መከላከል
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url-until-env-loads.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
);