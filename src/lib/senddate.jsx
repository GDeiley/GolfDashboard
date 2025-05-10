import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function addGolfOuting({ played_on, course_name, score, course_par, course_rating, holes }) {
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error('User not authenticated:', userError);
        return;
    }

    const { error } = await supabase
        .from('golf_outings')
        .insert([
            {
                player_id: user.id,
                played_on: played_on.toISOString().split('T')[0], // format as YYYY-MM-DD
                course_name,
                score,
                course_par,
                course_rating,
                holes
            }
        ]);

    if (error) {
        console.error('Error inserting outing:', error);
    } else {
        console.log('Outing inserted successfully!');
    }
}
