'use client'; // Make sure this is a client-side component

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const DisplayClubs = () => {
    const [user, setUser] = useState(null);
    const [clubs, setClubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user and their clubs
    useEffect(() => {
        const fetchUserData = async () => {
            const {
                data: { session },
                error: sessionError,
            } = await supabase.auth.getSession();

            if (sessionError || !session) {
                setError('You are not logged in');
                setLoading(false);
                return;
            }

            setUser(session.user);

            const { data: userClubs, error: clubsError } = await supabase
                .from('clubsanddistances')
                .select('*')
                .eq('player_id', session.user.id);

            if (clubsError) {
                setError('Error fetching clubs');
                setLoading(false);
                return;
            }

            setClubs(userClubs);
            setLoading(false);
        };

        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className="bg-gradient-golfbag">
                <div className="golfbag-container">
                    <div className="golfbag-loading">Loading your bag...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gradient-golfbag">
                <div className="golfbag-container">
                    <div className="golfbag-error">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-golfbag">
            <div className="golfbag-container">
                {user && (
                    <>
                        <h4 className="golfbag-title">Your Golf Bag</h4>
                        <ul className="golfbag-club-list">
                            {clubs.length > 0 ? (
                                clubs.map((club, index) => (
                                    <li key={index} className="golfbag-club-item">
                                        <strong className="golfbag-club-name">{club.club_name}</strong>
                                        <p className="golfbag-club-details">Average Distance: {club.average_distance_yards} yards</p>
                                        <p className="golfbag-club-details">Max Distance: {club.max_distance_yards} yards</p>
                                        <p className="golfbag-club-details">Min Distance: {club.min_distance_yards} yards</p>
                                        {club.notes && (
                                            <p className="golfbag-club-notes">Notes: {club.notes}</p>
                                        )}
                                    </li>
                                ))
                            ) : (
                                <p className="golfbag-empty-message">Your golf bag is empty. Add some clubs!</p>
                            )}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default DisplayClubs;