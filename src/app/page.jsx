"use client";

import Navbar from "@/components/ui/navbar";
import DatePicker from "@/components/ui/datepicker";
import { addGolfOuting } from "@/lib/senddate";

export default function Dashboard() {
  return (
    <div>
      <Navbar title="Dashboard" />

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 gap-6 p-6">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
          <DatePicker onDateSelected={addGolfOuting} />
        </div>
      </div>
    </div>
  );
}
