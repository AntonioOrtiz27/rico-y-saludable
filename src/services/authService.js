import { supabase } from './supabase.js';
export const getSession = async () => (await supabase.auth.getSession()).data.session;
export const login = (email, password) => supabase.auth.signInWithPassword({ email, password });
export const logout = () => supabase.auth.signOut();
