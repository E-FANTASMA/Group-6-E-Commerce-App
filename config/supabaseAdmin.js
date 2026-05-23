const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAdminKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseAdminKey) {
  throw new Error('Missing Supabase URL or admin key in environment variables');
}

const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey);

module.exports = supabaseAdmin;
