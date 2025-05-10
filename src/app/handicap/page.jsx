import Handicap from "@/components/ui/handicap";
import Link from "next/link";
import Navbar from "@/components/ui/navbar"
import DisplayCourseHandicap from "@/components/ui/displayhandicap";

export default function Page() {
    return (
        <div>
            <Navbar title="Handicap" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <DisplayCourseHandicap />
            </div>
        </div>
    );
}
