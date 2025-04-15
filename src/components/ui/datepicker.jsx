'use client';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/app/styles/globals.css';
import { useState } from 'react';
import { addGolfOuting } from '@/lib/senddate';
import { motion } from 'framer-motion';
import { CalendarIcon, FlagIcon, TargetIcon } from 'lucide-react';

function DatePicker() {
    const [showForm, setShowForm] = useState(false);
    const [date, setDate] = useState(new Date());
    const [courseName, setCourseName] = useState('');
    const [score, setScore] = useState('');
    const [coursePar, setCoursePar] = useState('');

    const handleSubmit = async () => {
        if (!courseName || !score || !coursePar) {
            alert('Please fill out all fields');
            return;
        }

        await addGolfOuting({
            played_on: date,
            course_name: courseName,
            score: parseInt(score, 10),
            course_par: parseInt(coursePar, 10),
        });

        // Reset fields
        setCourseName('');
        setScore('');
        setCoursePar('');
        setShowForm(false);
    };

    return (
        <div className="relative text-center">
            <button
                className="cool-golf-button text-white bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded-xl shadow-md transition"
                onClick={() => setShowForm(!showForm)}
            >
                ⛳ Add Golf Outing
            </button>

            {showForm && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-16 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-2xl shadow-2xl p-6 w-96 space-y-5"
                >
                    <h2 className="text-xl font-bold text-green-700 mb-2">Track Your Round</h2>

                    <div className="border rounded-xl p-3">
                        <Calendar onChange={setDate} value={date} />
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <FlagIcon className="text-green-600" />
                            <input
                                type="text"
                                placeholder="Course Name"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                className="w-full border-b border-gray-300 focus:border-green-500 focus:outline-none p-2"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <TargetIcon className="text-green-600" />
                            <input
                                type="number"
                                placeholder="Your Score"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                className="w-full border-b border-gray-300 focus:border-green-500 focus:outline-none p-2"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <CalendarIcon className="text-green-600" />
                            <input
                                type="number"
                                placeholder="Course Par"
                                value={coursePar}
                                onChange={(e) => setCoursePar(e.target.value)}
                                className="w-full border-b border-gray-300 focus:border-green-500 focus:outline-none p-2"
                            />
                        </div>
                    </div>

                    <button
                        className="w-full bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition"
                        onClick={handleSubmit}
                    >
                        Save Round
                    </button>
                </motion.div>
            )}
        </div>
    );
}

export default DatePicker;
