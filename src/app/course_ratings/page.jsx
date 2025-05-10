import Recent_Rounds from "@/components/ui/recent_rounds";
import Link from "next/link";
import Navbar from "@/components/ui/navbar"
import DisplayCourseRatings from "@/components/ui/displaycourseratings";

export default function Page() {
    return (
        <div>
            <Navbar title="Course Ratings" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <DisplayCourseRatings />
            </div>
        </div>
    );
}