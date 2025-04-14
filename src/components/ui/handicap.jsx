import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
export default function Handicap() {
    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex items-center mb-2">
                    <TrendingUp className="mr-2" />
                    <h2 className="text-xl font-semibold">Handicap Tracker</h2>
                </div>
                <p className="text-sm">Current Handicap: <span className="font-medium">9.2</span></p>
                <p className="text-sm">Last 5 Rounds Avg: <span className="font-medium">82.4</span></p>
            </CardContent>
        </Card>
    )
}