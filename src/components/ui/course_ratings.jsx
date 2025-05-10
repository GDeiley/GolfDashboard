import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Navbar from "@/component/ui/navbar";
export default function Course_Ratings() {
    return (
        <div>
            <Navbar title="Course Ratings" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <Recent_Rounds />
            </div>
        </div>
    )
}