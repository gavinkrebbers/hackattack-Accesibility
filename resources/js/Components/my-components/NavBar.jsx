import { useState } from "react";
import { Link, usePage, router } from "@inertiajs/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { BarChart2, Book, Info, Shield } from "lucide-react";

const Navbar = () => {
    const { auth, url } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#F0E8D2] border-b border-[#faf6e6] bg-opacity-80 backdrop-blur-md dark:bg-[#F0E8D2] dark:border-[#faf6e6] dark:bg-opacity-80">
            <div className="container flex items-center justify-between h-16 px-4 mx-auto">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-xl font-bold text-primary sm:text-2xl"
                >
                    <Shield className="w-6 h-6" />
                    <span className="xs:hidden">A11Y</span>
                </Link>
                <div className="items-center hidden space-x-4 md:flex">
                    <Link
                        href={route("user.show")}
                        className="flex items-center gap-1 text-sm font-medium transition-colors text-primary hover:text-primary/80"
                    >
                        <BarChart2 className="w-4 h-4" />
                        Reports
                    </Link>
                    <Link
                        href={route("flashcards")}
                        className="flex items-center gap-1 text-sm font-medium transition-colors text-primary hover:text-primary/80"
                    >
                        <Book className="w-4 h-4" />
                        Flashcards
                    </Link>
                    <Link
                        href={route("info")}
                        className="flex items-center gap-1 text-sm font-medium transition-colors text-primary hover:text-primary/80"
                    >
                        <Info className="w-4 h-4" />
                        Info
                    </Link>

                    <AuthButton />
                </div>

                {/* Mobile Navigation */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild className="md:hidden">
                        <Button
                            variant="outline"
                            size="sm"
                            className="p-2 bg-[#faf6e6] hover:bg-[#F0E8D2]"
                        >
                            <Menu className="w-5 h-5" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-[80%] sm:w-[350px] pt-10 bg-[#faf6e6]"
                    >
                        <div className="flex flex-col space-y-6">
                            <Link
                                href={route("user.show")}
                                className="flex items-center gap-2 p-3 text-base font-medium transition-colors rounded-md bg-[#F0E8D2] text-primary hover:bg-[#F0E8D2]/80 active:bg-[#F0E8D2]/90"
                                onClick={() => setIsOpen(false)}
                            >
                                <BarChart2 className="w-5 h-5" />
                                Reports
                            </Link>
                            <Link
                                href={route("flashcards")}
                                className="flex items-center gap-2 p-3 text-base font-medium transition-colors rounded-md bg-[#F0E8D2] text-primary hover:bg-[#F0E8D2]/80 active:bg-[#F0E8D2]/90"
                            >
                                <Book className="w-4 h-4" />
                                Flashcards
                            </Link>
                            <Link
                                href={route("info")}
                                className="flex items-center gap-2 p-3 text-base font-medium transition-colors rounded-md bg-[#F0E8D2] text-primary hover:bg-[#F0E8D2]/80 active:bg-[#F0E8D2]/90"
                                onClick={() => setIsOpen(false)}
                            >
                                <Info className="w-5 h-5" />
                                Info
                            </Link>
                            <div className="pt-4">
                                <AuthButton
                                    isMobile
                                    onClick={() => setIsOpen(false)}
                                />
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

const AuthButton = ({ isMobile = false, onClick = () => {} }) => {
    const { auth, url } = usePage().props;
    const user = auth.user;

    if (user || auth.id) {
        return (
            <Button
                onClick={() => {
                    router.post(route("logout"));
                    onClick();
                }}
                className={`text-white bg-red-600 hover:bg-red-700 ${
                    isMobile ? "w-full" : ""
                }`}
            >
                Logout
            </Button>
        );
    }

    return (
        <div
            className={`flex ${
                isMobile ? "flex-col space-y-2" : "flex-row space-x-2"
            }`}
        >
            <Button
                asChild
                variant="outline"
                className={`bg-[#faf6e6] hover:bg-[#F0E8D2] ${
                    isMobile ? "w-full" : ""
                }`}
                onClick={onClick}
            >
                <Link href="/login">Login</Link>
            </Button>
            <Button
                asChild
                className={`text-white bg-primary hover:bg-primary/90 ${
                    isMobile ? "w-full" : ""
                }`}
                onClick={onClick}
            >
                <Link href="/register">Register</Link>
            </Button>
        </div>
    );
};

export default Navbar;
