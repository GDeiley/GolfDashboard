"use client";

import Navbar from "@/components/ui/navbar";
import GolfOuting from "@/components/ui/datepicker";
import GolfMonthCalendar from "@/components/ui/golfmonth"; // 👈 Import this
import { addGolfDate } from "@/lib/senddate";

export default function Dashboard() {
  return (
    <div>
      <Navbar title="Dashboard" />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-6 p-6">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <GolfOuting onDateSelected={addGolfDate} />
        </div>

        <div className="w-full max-w-md">
          <GolfMonthCalendar /> {/* 👈 Add calendar here */}
        </div>
      </div>
    </div>
  );
}
