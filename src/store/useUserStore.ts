import { create } from "zustand";
import { User, Session } from "@supabase/supabase-js";
import { Json } from "@/integrations/supabase/types";

export interface UserDashboard {
  id: string;
  user_id: string;
  layout: Json;
  widgets: Json;
  theme: Json;
  created_at: string;
  updated_at: string;
}

export interface UserStats {
  id: string;
  user_id: string;
  total_incidents: number | null;
  ai_queries: number | null;
  workflows_count: number | null;
  digital_twins_count: number | null;
  last_active: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  company: string | null;
  phone: string | null;
}

interface UserState {
  // Auth state
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  
  // User data (multi-tenant isolated)
  profile: UserProfile | null;
  dashboard: UserDashboard | null;
  stats: UserStats | null;
  
  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setProfile: (profile: UserProfile | null) => void;
  setDashboard: (dashboard: UserDashboard | null) => void;
  setStats: (stats: UserStats | null) => void;
  
  // Reset all user data on logout
  clearUserData: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  // Initial state
  user: null,
  session: null,
  isLoading: true,
  profile: null,
  dashboard: null,
  stats: null,
  
  // Actions
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  setProfile: (profile) => set({ profile }),
  setDashboard: (dashboard) => set({ dashboard }),
  setStats: (stats) => set({ stats }),
  
  // Clear all user data on logout
  clearUserData: () => set({
    user: null,
    session: null,
    profile: null,
    dashboard: null,
    stats: null,
  }),
}));
