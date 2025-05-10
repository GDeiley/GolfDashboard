"use client";

import Navbar from "@/components/ui/navbar";
import AddRound from "@/components/ui/add_round";
import { addGolfOuting } from "@/lib/senddate";
import Clubs from "@/components/ui/clubs"


export default function Dashboard() {
    return (
        <div>
            <Navbar title="Dashboard Page" />

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-6 p-6">
                <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
                    <AddRound onDateSelected={addGolfOuting} />
                    <Clubs />

                </div>
            </div>
        </div>
    );
}