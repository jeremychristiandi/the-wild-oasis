import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://yzcpksvshgypqjagdxhx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6Y3Brc3ZzaGd5cHFqYWdkeGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY3MTM2OTcsImV4cCI6MjAyMjI4OTY5N30.hG9P0RSAltrMM4pZrsMhhczrMzNmS-Pda1wmsjXHc_M";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
