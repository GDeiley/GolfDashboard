import { supabase } from '@/lib/supabaseClient';
// Adjust the path if your file is in a different folder

export async function addGolfClubs({ club, average_distance_yards, max_distance_yards, min_distance_yards, notes }) {
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    // Debugging: Log the user data and error
    console.log('User:', user);
    console.log('User Error:', userError);

    if (userError || !user?.id) {
        console.error("User not found or not authenticated");
        return;
    }

    const playerId = user.id;

    const { error } = await supabase
        .from('clubsanddistances')
        .insert([
            {
                player_id: playerId,
                club_name: club,
                average_distance_yards,
                max_distance_yards,
                min_distance_yards,
                notes
            }
        ]);

    if (error) {
        console.error('Error inserting clubs:', error);
    } else {
        console.log('Clubs inserted successfully!');
    }
}
