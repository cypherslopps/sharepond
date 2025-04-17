import { createClient } from '@supabase/supabase-js'


const supabaseURL = import.meta.env.VITE_SUPABASE_PROJECT_URL ?? "";
const supabaseAnon = import.meta.env.VITE_SUPABASE_PROJECT_ANON_API_KEY ?? "";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  supabaseURL, 
  supabaseAnon
);

export default supabase;