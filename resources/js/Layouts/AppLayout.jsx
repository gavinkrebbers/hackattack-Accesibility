import Navbar from "@/Components/my-components/NavBar";
import { Head } from "@inertiajs/react";

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="h-[calc(100vh-64px)] pt-20">{children}</main>
        </div>
    );
}
