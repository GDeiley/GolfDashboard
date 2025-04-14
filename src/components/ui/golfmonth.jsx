'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function GolfMonthCalendar() {
    const [golfDates, setGolfDates] = useState([]);

    useEffect(() => {
        const fetchGolfDates = async () => {
            const today = new Date();
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

            const { data, error } = await supabase
                .from('golf_sessions')
                .select('*')
                .gte('date_played', firstDay.toISOString().split('T')[0])
                .lte('date_played', lastDay.toISOString().split('T')[0]);

            if (error) console.error('Error fetching golf sessions:', error);
            else setGolfDates(data.map(d => d.date_played));
        };

        fetchGolfDates();
    }, []);

    return (
        <div className="flex justify-center mt-6">
            <Calendar
                tileClassName={({ date }) => {
                    const formatted = date.toISOString().split('T')[0];
                    return golfDates.includes(formatted)
                        ? 'golf-day'
                        : null;
                }}
            />
        </div>
    );
}

export default GolfMonthCalendar;
