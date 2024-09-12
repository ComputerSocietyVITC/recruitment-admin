import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = "https://niuwcymvlfmcrhzturbo.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdXdjeW12bGZtY3JoenR1cmJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4ODAyMDAsImV4cCI6MjAzOTQ1NjIwMH0.PzTymfMbZYX-2MLqCN79ljwyGIO33sWj0S2AhTH6BGY";

export const createClient = () =>
  createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
