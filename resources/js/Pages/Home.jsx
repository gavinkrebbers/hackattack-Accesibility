import GamGam from "/public/gamsitting.png";
import Laptop from "/public/splaptop.gif";
import Teacher from "/public/sp1.gif";
import { useEffect, useState } from "react";
import { ArrowRight, Check, Shield } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import AppLayout from "@/Layouts/AppLayout";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import { motion, useScroll } from "framer-motion";
import LoadingScreen from "./LoadingScreen";
import spwalk from "../../../public/spwalk.gif";

export default function Home() {
    const [url, setUrl] = useState("");
    const [isValidUrl, setIsValidUrl] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showAuthNotification, setShowAuthNotification] = useState(false);
    const { auth } = usePage().props;

    const { scrollYProgress } = useScroll();
    const [gifPosition, setGifPosition] = useState(0);
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (progress) => {
            setGifPosition(progress * 90);
        });

        return () => unsubscribe();
    }, [scrollYProgress]);

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            setIsValidUrl(true);
            setIsLoading(true);

            const formattedUrl = url.startsWith("http")
                ? url
                : `https://${url}`;
            router.post(route("report.create", { url: formattedUrl }), {
                onError: () => {
                    setIsLoading(false);
                },
            });
        } catch {
            setIsValidUrl(false);
        }
    };

    return (
        <AppLayout>
            {isLoading && <LoadingScreen />}

            <main className="flex flex-col min-h-screen bg-[#faf6e6]">
                {/* First Section: Introduction */}
                <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F0E8D2] flex gap-0 justify-center">
                    <div className="container px-4 md:px-6">
                        <div className="grid items-center grid-cols-1 gap-0 lg:grid-cols-2">
                            <div className="flex flex-col justify-center space-y-6">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Teaching Web Developers How to Keep the
                                        Web Accessible for Everyone
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Our tool helps identify and fix
                                        accessibility barriers that prevent
                                        people with disabilities from using your
                                        website effectively.
                                    </p>
                                </div>
                                <form
                                    onSubmit={handleSubmit}
                                    className="w-full max-w-sm space-y-2"
                                >
                                    <div className="flex flex-col gap-2">
                                        {showAuthNotification && !auth.user && (
                                            <div className="p-3 text-sm rounded-md shadow-lg text-primary-foreground bg-primary animate-in fade-in-0 slide-in-from-top-1">
                                                Please sign in to use the
                                                accessibility checker
                                            </div>
                                        )}
                                        <Input
                                            type="text"
                                            placeholder="Enter website URL (e.g., example.com)"
                                            value={url}
                                            onChange={(e) => {
                                                if (auth.user) {
                                                    setUrl(e.target.value);
                                                } else {
                                                    setShowAuthNotification(
                                                        true
                                                    );
                                                }
                                            }}
                                            onFocus={() => {
                                                if (!auth.user) {
                                                    setShowAuthNotification(
                                                        true
                                                    );
                                                }
                                            }}
                                            className={`bg-[#faf6e6] border ${
                                                isValidUrl
                                                    ? ""
                                                    : "border-destructive"
                                            }`}
                                            aria-label="Website URL"
                                        />
                                        {!isValidUrl && (
                                            <p className="text-sm text-destructive">
                                                Please enter a valid URL
                                            </p>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={!auth.user}
                                    >
                                        Check Accessibility{" "}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </form>
                            </div>
                            <div className="flex items-center justify-center lg:-ml-8">
                                <img
                                    src={GamGam || "/placeholder.svg"}
                                    alt="Accessibility mascot"
                                    className="h-auto max-w-full rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    id="common-errors"
                    className="w-full py-12 md:py-24 lg:py-32 bg-[#faf6e6]"
                >
                    <div className="container flex items-center px-4 mx-auto md:px-6 max-w-8xl">
                        {/* Left Image */}
                        <div className="flex-shrink-0 hidden ml-4 lg:block">
                            <img
                                src={Teacher}
                                alt="Teacher illustration"
                                className="h-auto max-w-[150px]"
                            />
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                        Key Accessibility Checks We Perform
                                    </h2>
                                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                        Ensuring Your Website Meets
                                        Accessibility Standards
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 py-12 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-3">
                                <Card className="bg-[#F0E8D2]">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        <Check className="w-8 h-8 text-primary" />
                                        <CardTitle className="text-xl">
                                            Missing ARIA Labels
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm text-muted-foreground">
                                            Ensure interactive elements like
                                            buttons and links have proper ARIA
                                            labels for screen readers.
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                                <Card className="bg-[#F0E8D2]">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        <Check className="w-8 h-8 text-primary" />
                                        <CardTitle className="text-xl">
                                            Missing Alt Text
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm text-muted-foreground">
                                            Add descriptive alt text to images
                                            so screen readers can convey their
                                            meaning to visually impaired users.
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                                <Card className="bg-[#F0E8D2]">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        <Check className="w-8 h-8 text-primary" />
                                        <CardTitle className="text-xl">
                                            Poor Font Sizes
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm text-muted-foreground">
                                            Use relative units like `em` or
                                            `rem` for font sizes to ensure text
                                            scales properly when users zoom in.
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                                <Card className="bg-[#F0E8D2]">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        <Check className="w-8 h-8 text-primary" />
                                        <CardTitle className="text-xl">
                                            Zoom Functionality
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm text-muted-foreground">
                                            Ensure your website is fully
                                            functional and readable when users
                                            zoom in up to 200%.
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                                <Card className="bg-[#F0E8D2]">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        <Check className="w-8 h-8 text-primary" />
                                        <CardTitle className="text-xl">
                                            Keyboard Navigation
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm text-muted-foreground">
                                            Test your site to ensure all
                                            interactive elements are accessible
                                            via keyboard navigation.
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                                <Card className="bg-[#F0E8D2]">
                                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                        <Check className="w-8 h-8 text-primary" />
                                        <CardTitle className="text-xl">
                                            Color Contrast
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-sm text-muted-foreground">
                                            Ensure text and background colors
                                            meet WCAG contrast ratios for
                                            readability.
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="flex-shrink-0 hidden mr-4 lg:block">
                            <img
                                src={Laptop}
                                alt="Laptop illustration"
                                className="h-auto max-w-[150px]"
                            />
                        </div>
                    </div>
                </section>
                {/* Footer */}
                <footer className="w-full py-6 border-t md:py-8 bg-[#F0E8D2]">
                    <div className="container flex items-center justify-around gap-4 text-center md:flex-row md:gap-8">
                        <div className="flex items-center gap-2 font-bold">
                            <Shield className="w-5 h-5 text-primary" />
                            <span>A11Y</span>
                        </div>
                        <p className="text-sm text-center text-muted-foreground md:text-left">
                            © {new Date().getFullYear()} A11Y. Created by Gavin,
                            An, Matthew, and Megan
                        </p>
                    </div>
                    <motion.img
                        src={spwalk}
                        alt="Moving mascot"
                        className="moving-gif"
                        style={{
                            position: "fixed",
                            bottom: "10px",
                            left: `${gifPosition}%`, // Moves left to right as you scroll
                            width: "100px",
                            height: "auto",
                        }}
                    />
                </footer>
            </main>
        </AppLayout>
    );
}
