import { createClient } from '@supabase/supabase-js';
console.log('Supabase Key:', process.env.REACT_APP_SUPABASE_KEY);


const supabaseUrl = 'https://xlfahconivyvqlfrbobi.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error('supabaseKey is required.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
