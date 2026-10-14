import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://wmrgwpwfszpmqlbenqah.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_3m_p6aPqHxa_2ZjhpJ9i7A_uo7-dSGv';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);