import Clubs from "@/components/ui/clubs";
import Link from "next/link";
import Navbar from "@/components/ui/navbar"

export default function Page() {
    return (
        <div>
            <Navbar title="Clubss" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <Clubs />
            </div>
        </div>
    );
}
