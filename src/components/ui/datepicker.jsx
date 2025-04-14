'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/app/styles/globals.css';
import { useState } from 'react';

function GolfCalendar({ onDateSelected }) {
    const [showCalendar, setShowCalendar] = useState(false);

    const handleDateChange = (selectedDate) => {
        onDateSelected(selectedDate);      // Send date to Supabase
        setShowCalendar(false);            // Hide calendar after selecting
    };

    return (
        <div className="relative text-center">
            <button
                className="cool-golf-button"
                onClick={() => setShowCalendar(!showCalendar)}
            >
                Add Golf Outing
            </button>

            {showCalendar && (
                <div className="absolute top-14 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-xl shadow-xl p-4">
                    <Calendar
                        onChange={handleDateChange}
                    />
                </div>
            )}
        </div>
    );
}

export default GolfCalendar;
