import { supabase } from './supabase.js';
import { SEED } from '../data/seedProducts.js';

export async function fetchCatalog() {
  if (!supabase) return { products: SEED, source: 'seed' };
  const { data, error } = await supabase.from('products').select('*').order('sort');
  if (error || !data?.length) return { products: SEED, source: 'seed' };
  return { products: data, source: 'db' };
}
export const updateProduct = (id, patch) =>
  supabase.from('products').update({ ...patch, updated_at: new Date().toISOString() }).eq('id', id);
export const createProduct = (p) => supabase.from('products').insert(p).select().single();
export const deleteProduct = (id) => supabase.from('products').delete().eq('id', id);
export const seedDatabase = () =>
  supabase.from('products').insert(SEED.map(({ id, ...row }) => row));
