import Link from "next/link";

export default function Navbar({ title }) {
    return (
        <div className="navbar-container">
            <div className="navbar">
                {/* Dynamic title */}
                <h1 className="navbar-title">{title}</h1>

                {/* Navigation */}
                <nav>
                    <ul className="nav-links">
                        <li><Link href="/dashboard">Dashboard</Link></li>
                        <li><Link href="/clubs">Clubs</Link></li>
                        <li><Link href="/course_ratings">Course Ratings</Link></li>
                        <li><Link href="/handicap">Handicap</Link></li>
                        <li><Link href="/recent_rounds">Recent Rounds</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
