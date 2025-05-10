'use client';
import { useState } from "react";
import { CalendarIcon, FlagIcon, TargetIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

export default function Clubs() {

    const [showForm, setShowForm] = useState(false);
    const [clubName, setclubName] = useState('');
    const [maxDistance, setmaxDistance] = useState('');
    const [minDistance, setminDistance] = useState('');
    const [avgDistance, setavgDistance] = useState('');
    const [notes, setNotes] = useState('');

    const clubOptions = [
        "Driver", "3 Wood", "5 Wood", "7 Wood",
        "3 Iron", "4 Iron", "5 Iron", "6 Iron", "7 Iron", "8 Iron", "9 Iron",
        "Pitching Wedge", "Sand Wedge", "Lob Wedge", "Gap Wedge",
        "Putter"
    ];

    const handleSubmit = async () => {
        if (!clubName || !maxDistance || !minDistance || !avgDistance) {
            alert('Please fill out all distance fields and select a club');
            return;
        }

        const {
            data: { user },
            error: userError
        } = await supabase.auth.getUser();

        if (userError || !user) {
            console.error('User not authenticated:', userError?.message);
            alert('You must be logged in to add a club.');
            return;
        }

        const newClub = {
            player_id: user.id,
            club_name: clubName,
            max_distance_yards: parseInt(maxDistance),
            min_distance_yards: parseInt(minDistance),
            average_distance_yards: parseInt(avgDistance),
            notes: notes
        };

        const { data, error } = await supabase
            .from('clubsanddistances') // replace with your actual table name
            .insert([newClub]);

        if (error) {
            console.error('Error inserting club:', error.message);
            alert('Failed to add club.');
            return;
        }

        console.log('Inserted club:', data);
        // In a real application, you would send this data to your backend

        // Reset fields
        setmaxDistance('');
        setminDistance('');
        setavgDistance('');
        setNotes('');
        setclubName('');
        setShowForm(false); // Close the form after submission
    };

    return (
        <div>
            <button
                className="cool-golf-button mb-6"
                onClick={() => setShowForm(!showForm)}
            >
                <span className="mr-2">⛳</span> My Golf Bag
            </button>

            {showForm && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Add a New Club</h2>

                    <div>
                        <label htmlFor="clubName" className="block text-gray-700 text-sm font-bold mb-2">
                            Club Type
                        </label>
                        <div>
                            <FlagIcon />
                            <select
                                id="clubName"
                                value={clubName}
                                onChange={(e) => setclubName(e.target.value)}
                                className="golf-input"
                            >
                                <option value="">Select a Club</option>
                                {clubOptions.map((club, index) => (
                                    <option key={index} value={club}>
                                        {club}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="minDistance" className="block text-gray-700 text-sm font-bold mb-2">
                                Min Distance (Yards)
                            </label>
                            <div className="relative">
                                <TargetIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="number"
                                    id="minDistance"
                                    placeholder="e.g., 100"
                                    value={minDistance}
                                    onChange={(e) => setminDistance(e.target.value)}
                                    className="golf-input"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="maxDistance" className="block text-gray-700 text-sm font-bold mb-2">
                                Max Distance (Yards)
                            </label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="number"
                                    id="maxDistance"
                                    placeholder="e.g., 120"
                                    value={maxDistance}
                                    onChange={(e) => setmaxDistance(e.target.value)}
                                    className="golf-input"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="avgDistance" className="block text-gray-700 text-sm font-bold mb-2">
                            Average Distance (Yards)
                        </label>
                        <div className="relative">
                            <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="number"
                                id="avgDistance"
                                placeholder="e.g., 110"
                                value={avgDistance}
                                onChange={(e) => setavgDistance(e.target.value)}
                                className="golf-input"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">
                            Notes (Optional)
                        </label>
                        <textarea
                            id="notes"
                            placeholder="e.g., Good for tight fairways"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="golf-input"
                            rows="3"
                        />
                    </div>

                    <button
                        className="cool-golf-button"
                        onClick={handleSubmit}
                    >
                        Add to Bag
                    </button>
                </motion.div>
            )}
        </div>
    );
}