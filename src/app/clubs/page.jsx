import Navbar from "@/components/ui/navbar"
import DisplayClubs from "@/components/ui/displayclubs";

export default function Page() {
    return (
        <div>
            <Navbar title="Clubs In the Bag" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <DisplayClubs />
            </div>
        </div>
    );
}
