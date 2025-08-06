// backend/supabaseClient.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://knbbnuyjpsqvonrxdhin.supabase.co'; // 🔁 replace this
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuYmJudXlqcHNxdm9ucnhkaGluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2OTY5MzksImV4cCI6MjA2ODI3MjkzOX0.ZFzmL4WQUeEsmhbo6lESqJHTZv5ZTi5sYc32qQHIuvo'; // 🔁 replace this

const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = supabase;
