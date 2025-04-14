import Course_Ratings from "@/components/ui/course_ratings"
import Link from "next/link";
import Navbar from "@/components/ui/navbar"


export default function Page() {
    return (
        <div>
            <Navbar title="Coure Ratings" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <Course_Ratings />
            </div>
        </div>
    );
}
