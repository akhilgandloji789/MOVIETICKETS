import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://zjyxkxdsruwhcufqynz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inphanl4a3hkc3J1d2hjdWZxeW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDYwNzYsImV4cCI6MjEwMjcyMjA3Nn0.iqRCoOWpmFXoE-3T23kHuNR6g6r4CvJzR7PLT_Dr9wY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
