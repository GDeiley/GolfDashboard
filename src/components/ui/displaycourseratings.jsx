'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { StarIcon } from 'lucide-react';

const DisplayCourseRatings = () => {
    const [user, setUser] = useState(null);
    const [ratings, setRatings] = useState([]);
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

            const { data: userRatings, error: ratingsError } = await supabase
                .from('golf_outings')
                .select('course_name, course_rating')
                .eq('player_id', session.user.id);

            if (ratingsError) {
                setError('Error fetching ratings');
                setLoading(false);
                return;
            }

            setRatings(userRatings);
            setLoading(false);
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="course-ratings-container">
            {user && ratings.length > 0 ? (
                <div className="course-ratings-grid">
                    {ratings.map((rating, index) => (
                        <div key={index} className="course-card">
                            <h3 className="course-name">{rating.course_name}</h3>
                            <div className="star-rating">
                                {[...Array(rating.course_rating)].map((_, starIndex) => (
                                    <StarIcon key={starIndex} className="star-icon" />
                                ))}
                                {[...Array(5 - rating.course_rating)].map((_, emptyStarIndex) => (
                                    <StarIcon key={`empty-${emptyStarIndex}`} className="empty-star-icon" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                user && <p className="no-ratings-message">You haven't added any course ratings yet.</p>
            )}
        </div>
    );
};

export default DisplayCourseRatings;