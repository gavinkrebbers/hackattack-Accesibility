import Navbar from "@/Components/my-components/NavBar";
import { Head } from "@inertiajs/react";

export default function AppLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#faf6e6]">
            <Head title="Acessibility Checker" />
            <Navbar />
            <main className="h-[calc(100vh-64px)] pt-14 bg-[#faf6e6]">
                {children}
            </main>
        </div>
    );
}
