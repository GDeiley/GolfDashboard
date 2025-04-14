import Recent_Rounds from "@/components/ui/recent_rounds";
import Link from "next/link";
import Navbar from "@/components/ui/navbar"

export default function Page() {
    return (
        <div>
            <Navbar title="Recent Rounds" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <Recent_Rounds />
            </div>
        </div>
    );
}
