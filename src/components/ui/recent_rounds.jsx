'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const DisplayRecentRounds = () => {
    const [user, setUser] = useState(null);
    const [rounds, setRounds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const {
                data: { session },
                error: sessionError,
            } = await supabase.auth.getSession();

            if (sessionError || !session?.user) {
                setError('You are not logged in');
                setLoading(false);
                return;
            }

            setUser(session.user);

            const { data: userRounds, error: roundsError } = await supabase
                .from('golf_outings')
                .select('*')
                .eq('player_id', session.user.id)
                .order('played_on', { ascending: false })
                .limit(3);

            if (roundsError) {
                setError('Error fetching rounds');
                setLoading(false);
                return;
            }

            setRounds(userRounds);
            setLoading(false);
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="recent-rounds-container">
            {user && (
                <>
                    <h4 className="recent-rounds-title">Your Recent Rounds</h4>
                    <ul className="recent-rounds-list">
                        {rounds.length > 0 ? (
                            rounds.map((round, index) => (
                                <li key={index} className="recent-round-item">
                                    <strong>{round.course_name} ({new Date(round.played_on).toLocaleDateString()})</strong>
                                    <p>Course Par: {round.course_par}</p>
                                    <p>Round Score: {round.score}</p>
                                    <p>Relative Score: {round.score - round.course_par}</p>
                                </li>
                            ))
                        ) : (
                            <p className="no-rounds-message">You haven't added any course rounds yet.</p>
                        )}
                    </ul>
                </>
            )}
        </div>
    );
};

export default DisplayRecentRounds;