import { useState } from "react";
import {
    ArrowRight,
    Check,
    Gauge,
    Shield,
    Zap,
    Eye,
    Ear,
    Brain,
    HandMetal,
    MousePointer2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AppLayout from "@/Layouts/AppLayout";
import { router } from "@inertiajs/react";

export default function Home() {
    const [url, setUrl] = useState("");
    const [isValidUrl, setIsValidUrl] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route("report.create", { url: url }));
        console.log(url);
    };

    return (
        <AppLayout>
            <main className="flex flex-col min-h-screen">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center text-center lg:text-left">
                            <div className="flex flex-col justify-center max-w-3xl mx-auto space-y-6">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Making the Web Accessible for Everyone
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
                                    className="w-full max-w-sm mx-auto space-y-2 lg:mx-0"
                                >
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            type="text"
                                            placeholder="Enter website URL (e.g., example.com)"
                                            value={url}
                                            onChange={(e) =>
                                                setUrl(e.target.value)
                                            }
                                            className={
                                                isValidUrl
                                                    ? ""
                                                    : "border-destructive"
                                            }
                                            aria-label="Website URL"
                                        />
                                        {!isValidUrl && (
                                            <p className="text-sm text-destructive">
                                                Please enter a valid URL
                                            </p>
                                        )}
                                    </div>
                                    <Button type="submit" className="w-full">
                                        Check Accessibility{" "}
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="disabilities"
                    className="w-full py-12 md:py-24 lg:py-32"
                >
                    <div className="container px-4 pt-48 mx-auto md:px-6 max-w-7xl">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block px-3 py-1 text-sm rounded-lg ">
                                    Inclusive Design
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                    Supporting All Users
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our accessibility checker helps ensure your
                                    website works for people with various
                                    disabilities and impairments.
                                </p>
                            </div>
                        </div>
                        <div className="grid max-w-6xl grid-cols-1 gap-6 py-12 mx-auto md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <Eye className="w-8 h-8 text-primary" />
                                    <CardTitle className="text-xl">
                                        Visual Impairments
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        We check for proper contrast, text
                                        alternatives for images, and screen
                                        reader compatibility to support blind
                                        and low-vision users.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <Ear className="w-8 h-8 text-primary" />
                                    <CardTitle className="text-xl">
                                        Hearing Impairments
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        We ensure audio content has captions or
                                        transcripts, and that visual cues
                                        accompany audio alerts for deaf and
                                        hard-of-hearing users.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <HandMetal className="w-8 h-8 text-primary" />
                                    <CardTitle className="text-xl">
                                        Motor Disabilities
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        We verify keyboard accessibility,
                                        adequate target sizes, and proper focus
                                        management for users with limited
                                        mobility or dexterity.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <Brain className="w-8 h-8 text-primary" />
                                    <CardTitle className="text-xl">
                                        Cognitive Disabilities
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        We check for clear navigation,
                                        consistent layouts, and readable content
                                        for users with cognitive or learning
                                        disabilities.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <MousePointer2 className="w-8 h-8 text-primary" />
                                    <CardTitle className="text-xl">
                                        Seizure Disorders
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        We identify flashing content that could
                                        trigger seizures and ensure animations
                                        respect user preferences for reduced
                                        motion.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <Zap className="w-8 h-8 text-primary" />
                                    <CardTitle className="text-xl">
                                        Temporary Disabilities
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        We ensure your site works for everyone,
                                        including those with temporary
                                        impairments like broken arms or
                                        situational limitations.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section
                    id="features"
                    className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
                >
                    <div className="container px-4 mx-auto md:px-6 max-w-7xl">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <div className="inline-block px-3 py-1 text-sm rounded-lg bg-primary/10">
                                    Key Features
                                </div>
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                    Comprehensive Accessibility Analysis
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Our accessibility scanner provides detailed
                                    insights to help make your website usable by
                                    people with disabilities.
                                </p>
                            </div>
                        </div>
                        <div className="grid max-w-6xl grid-cols-1 gap-6 py-12 mx-auto md:grid-cols-3">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <Gauge className="w-8 h-8 text-primary" />
                                    <CardTitle className="text-xl">
                                        WCAG Compliance
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        Check your site against Web Content
                                        Accessibility Guidelines (WCAG) 2.1 A,
                                        AA, and AAA levels to ensure legal
                                        compliance and best practices.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <Check className="w-8 h-8 text-primary" />
                                    <CardTitle className="text-xl">
                                        Actionable Fixes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        Get clear, step-by-step instructions on
                                        how to fix each accessibility issue,
                                        making your site more inclusive for
                                        people with disabilities.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                                    <Zap className="w-8 h-8 text-primary" />
                                    <CardTitle className="text-xl">
                                        Instant Results
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-sm text-muted-foreground">
                                        Receive your accessibility report in
                                        seconds with prioritized issues and
                                        severity levels, helping you address the
                                        most critical barriers first.
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                <section
                    id="standards"
                    className="w-full py-12 md:py-24 lg:py-32"
                >
                    <div className="container px-4 mx-auto md:px-6 max-w-7xl">
                        <div className="grid max-w-6xl gap-10 mx-auto lg:grid-cols-2">
                            <div className="space-y-4 text-center lg:text-left">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                    Accessibility Standards We Check
                                </h2>
                                <p className="text-muted-foreground md:text-xl">
                                    Our scanner evaluates your website against
                                    established accessibility standards that
                                    ensure people with disabilities can use your
                                    site.
                                </p>
                                <ul className="grid gap-4">
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-primary" />
                                        <span>
                                            WCAG 2.1 A, AA, and AAA compliance -
                                            the international standard for web
                                            accessibility
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-primary" />
                                        <span>
                                            ADA (Americans with Disabilities
                                            Act) requirements for equal access
                                            to digital content
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-primary" />
                                        <span>
                                            Section 508 compliance for
                                            government and federally funded
                                            websites
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-primary" />
                                        <span>
                                            Screen reader compatibility for
                                            blind and visually impaired users
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-primary" />
                                        <span>
                                            Keyboard navigation accessibility
                                            for users with motor disabilities
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Check className="w-5 h-5 text-primary" />
                                        <span>
                                            Color contrast and readability for
                                            users with low vision or color
                                            blindness
                                        </span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex items-center justify-center h-full">
                                <div className="w-full max-w-md p-8 mx-auto border rounded-lg bg-background">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 rounded-full bg-primary/10">
                                                <Shield className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">
                                                    Why Accessibility Matters
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Web accessibility is a
                                                    fundamental right for people
                                                    with disabilities and
                                                    benefits everyone.
                                                </p>
                                            </div>
                                        </div>
                                        <ul className="grid gap-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <Check className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                                                <span>
                                                    15% of the world's
                                                    population lives with some
                                                    form of disability
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                                                <span>
                                                    Legal requirements in many
                                                    countries mandate accessible
                                                    websites
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                                                <span>
                                                    Accessible sites have 20%
                                                    better search engine
                                                    rankings
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                                                <span>
                                                    Accessible design improves
                                                    usability for all users, not
                                                    just those with disabilities
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                                                <span>
                                                    Potential market of over 1
                                                    billion people with
                                                    disabilities worldwide
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
                    <div className="container px-4 mx-auto md:px-6 max-w-7xl">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                                    Start Making Your Website Accessible Today
                                </h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Enter your website URL to get a free
                                    accessibility report and take the first step
                                    toward an inclusive web presence.
                                </p>
                            </div>
                            <div className="w-full max-w-md mx-auto space-y-4">
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col max-w-md gap-3 mx-auto sm:flex-row"
                                >
                                    <Input
                                        type="text"
                                        placeholder="Enter website URL"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        className={
                                            isValidUrl
                                                ? ""
                                                : "border-destructive"
                                        }
                                        aria-label="Website URL"
                                    />
                                    <Button type="submit">Scan Now</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                <footer className="w-full py-6 border-t md:py-8">
                    <div className="container flex items-center justify-around gap-4 text-center md:flex-row md:gap-8">
                        <div className="flex items-center gap-2 font-bold">
                            <Shield className="w-5 h-5 text-primary" />
                            <span>AccessibilityChecker</span>
                        </div>
                        <p className="text-sm text-center text-muted-foreground md:text-left">
                            © {new Date().getFullYear()} AccessibilityChecker.
                            Created by Gavin Krebbers
                        </p>
                    </div>
                </footer>
            </main>
        </AppLayout>
    );
}
