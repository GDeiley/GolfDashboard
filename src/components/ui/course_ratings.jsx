import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
export default function Course_Ratings() {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center mb-2">
                    <MapPin className="mr-2" />
                    <h2 className="text-xl font-semibold">Course Ratings</h2>
                </div>
                <ul className="list-disc pl-6 text-sm">
                    <li>Augusta National</li>
                    <li>St. Andrews</li>
                    <li>Pebble Beach</li>
                </ul>
            </CardContent>
        </Card>
    )
}