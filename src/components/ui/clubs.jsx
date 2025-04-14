import { Card, CardContent } from "@/components/ui/card";
import { Settings } from "lucide-react";
export default function Clubs() {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center mb-2">
                    <Settings className="mr-2" />
                    <h2 className="text-xl font-semibold">Clubs & Distances</h2>
                </div>
                <ul className="list-disc pl-6 text-sm">
                    <li>Driver: 270 yds</li>
                    <li>7 Iron: 155 yds</li>
                    <li>Pitching Wedge: 115 yds</li>
                </ul>
            </CardContent>
        </Card>
    )
}
