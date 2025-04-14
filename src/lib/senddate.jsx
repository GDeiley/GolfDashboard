import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function addGolfDate(date) {
    const { error } = await supabase
        .from('golf_sessions')
        .insert([
            { date_played: date.toISOString().split('T')[0] } // format as YYYY-MM-DD
        ]);

    if (error) console.error('Error inserting date:', error);
    else console.log('Date inserted successfully!');
}
