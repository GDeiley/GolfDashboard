import { Card, CardContent } from "@/components/ui/card";
import { Flag } from "lucide-react";
export default function Recent_Rounds() {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center mb-2">
                    <Flag className="mr-2" />
                    <h2 className="text-xl font-semibold">Recent Rounds</h2>
                </div>
                <ul className="list-disc pl-6 text-sm">
                    <li>03/29 - Pebble Beach - 83 (+11)</li>
                    <li>03/22 - Augusta - 79 (+7)</li>
                    <li>03/14 - St. Andrews - 81 (+9)</li>
                </ul>
            </CardContent>
        </Card>
    )
}