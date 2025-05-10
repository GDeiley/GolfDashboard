'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const DisplayCourseHandicapGraph = () => {
    const [user, setUser] = useState(null);
    const [differentials, setDifferentials] = useState([]);
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

            const { data: userOutings, error: handicapError } = await supabase
                .from('golf_outings')
                .select('*')
                .eq('player_id', session.user.id)
                .order('played_on', { ascending: true });

            if (handicapError) {
                setError('Error fetching golf outings');
                setLoading(false);
                return;
            }

            if (userOutings) {
                const calculatedDifferentials = userOutings.map((outing) => {
                    const differential = ((outing.score - outing.course_par) * 113 / 120).toFixed(1);
                    return { differential, date: new Date(outing.played_on).toLocaleDateString() };
                });
                setDifferentials(calculatedDifferentials);
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    const chartData = {
        labels: differentials.map((data) => data.date),
        datasets: [
            {
                label: 'Handicap Differential',
                data: differentials.map((data) => data.differential),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                pointRadius: 5,
                pointBackgroundColor: 'rgb(75, 192, 192)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Your Handicap Differential Over Time',
                font: {
                    size: 18,
                },
                className: 'handicap-graph-title', // Apply CSS class for title
            },
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                title: {
                    display: true,
                    text: 'Handicap Differential',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Date of Round',
                },
            },
        },
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div className="handicap-graph-container">
            {user && differentials.length > 0 ? (
                <div className="handicap-graph">
                    <Line data={chartData} options={chartOptions} />
                </div>
            ) : (
                user && <p className="handicap-no-data">No golf outings recorded yet to display handicap differential graph.</p>
            )}
        </div>
    );
};

export default DisplayCourseHandicapGraph;