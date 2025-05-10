import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon, FlagIcon, TargetIcon, StarIcon } from 'lucide-react';
import StarRating from '@/components/ui/star_rating';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { addGolfOuting } from '@/lib/senddate';

function AddRound() {
    const [showForm, setShowForm] = useState(false);
    const [date, setDate] = useState(new Date());
    const [courseName, setCourseName] = useState('');
    const [score, setScore] = useState('');
    const [coursePar, setCoursePar] = useState('');
    const [courseRating, setCourseRating] = useState(0); // Ensure it's a number
    const [holes, setHoles] = useState()

    const holeOptions = ["18 holes", "9 holes"];

    // Ensure you're setting the rating correctly
    const handleRating = (rating) => {
        setCourseRating(rating); // This saves the rating to state
    };

    const handleSubmit = async () => {
        if (!courseName || !score || !coursePar || courseRating === 0 || !holes) {
            alert('Please fill out all fields');
            return;
        }

        await addGolfOuting({
            played_on: date,
            course_name: courseName,
            score: parseInt(score, 10),
            course_par: parseInt(coursePar, 10),
            course_rating: courseRating, // Sending the correct rating here
            holes: holes,
        });

        console.log("Submitting holes:", holes);


        // Reset fields
        setCourseName('');
        setScore('');
        setCoursePar('');
        setShowForm(false);
        setCourseRating(0);
        setHoles('');
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
                        <div>
                            <label>
                            </label>
                            <div>
                                <FlagIcon />
                                <select
                                    id="holes"
                                    value={holes}
                                    onChange={(e) => setHoles(e.target.value)}
                                >
                                    <option value="">Select Number of Holes</option>
                                    {holeOptions.map((holes, index) => (
                                        <option key={index} value={holes}>
                                            {holes}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <span>
                            </span>
                            <div>
                                <StarRating
                                    totalStars={5}
                                    onRate={handleRating}
                                    initialRating={courseRating}
                                />
                            </div>
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

export default AddRound;
