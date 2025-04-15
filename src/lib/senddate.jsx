import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function addGolfOuting({ played_on, course_name, score, course_par }) {
    const { error } = await supabase
        .from('golf_outings')
        .insert([
            {
                played_on: played_on.toISOString().split('T')[0], // format as YYYY-MM-DD
                course_name,
                score,
                course_par
            }
        ]);

    if (error) {
        console.error('Error inserting outing:', error);
    } else {
        console.log('Outing inserted successfully!');
    }
}
