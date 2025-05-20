const flashcards = [
    {
        question: "What is web accessibility?",
        answer: "Web accessibility means designing and developing websites, tools, and technologies so that people with disabilities can perceive, understand, navigate, and interact with them effectively.",
    },
    {
        question: "What is the purpose of ARIA in web accessibility?",
        answer: "ARIA (Accessible Rich Internet Applications) is a set of attributes that make web content and applications more accessible to people with disabilities, especially for dynamic content and advanced user interface controls.",
    },
    {
        question:
            "What is the minimum contrast ratio required for normal text under WCAG AA standards?",
        answer: "The minimum contrast ratio for normal text is 4.5:1 under WCAG AA standards.",
    },
    {
        question: "What is the purpose of alt text in images?",
        answer: "Alt text (alternative text) provides a textual description of an image, making it accessible to screen readers and users who cannot see the image.",
    },
    {
        question: "What is a screen reader?",
        answer: "A screen reader is assistive technology that reads aloud the content of a webpage, enabling visually impaired users to navigate and interact with the web.",
    },
    {
        question:
            "What is the difference between WCAG Level A and Level AA compliance?",
        answer: "Level A is the minimum level of accessibility, while Level AA addresses the most common barriers for disabled users. Most organizations aim for Level AA compliance.",
    },
    {
        question: "How can you make a website keyboard accessible?",
        answer: "Ensure all interactive elements (links, buttons, forms) can be accessed and operated using only the keyboard, typically via the Tab key and Enter key.",
    },
    {
        question: "What is the purpose of semantic HTML in accessibility?",
        answer: "Semantic HTML (e.g., <header>, <nav>, <main>, <button>) provides meaning and structure to web content, making it easier for assistive technologies to interpret and navigate.",
    },
    {
        question: "What is the role of focus indicators in accessibility?",
        answer: "Focus indicators (e.g., outlines around focused elements) help users who navigate with a keyboard understand which element is currently active.",
    },
    {
        question: "What is a skip link?",
        answer: "A skip link is a hidden link at the top of a webpage that allows keyboard users to skip repetitive content (e.g., navigation) and jump directly to the main content.",
    },
    {
        question:
            "What is the purpose of captions and transcripts in multimedia?",
        answer: "Captions and transcripts make audio and video content accessible to users who are deaf or hard of hearing, as well as those who cannot play sound.",
    },
    {
        question: "What is the difference between accessibility and usability?",
        answer: "Accessibility ensures that people with disabilities can use a product, while usability ensures that a product is easy and efficient for all users to use.",
    },
    {
        question: "What is the purpose of the lang attribute in HTML?",
        answer: "The lang attribute specifies the language of the content, helping screen readers pronounce text correctly and improving accessibility for multilingual users.",
    },
    {
        question: "What is the purpose of form labels in accessibility?",
        answer: "Form labels associate text with form inputs, making it clear what information is required and helping screen readers identify input fields.",
    },
    {
        question: "What is the purpose of the aria-label attribute?",
        answer: "The aria-label attribute provides an accessible name for an element when the visible text is not descriptive enough or absent.",
    },
    {
        question: "What is the purpose of the tabindex attribute?",
        answer: "The tabindex attribute controls the order in which elements receive focus when navigating with a keyboard. Use tabindex='0' to make an element focusable and tabindex='-1' to remove it from the tab order.",
    },
    {
        question: "What is the purpose of the title attribute?",
        answer: "The title attribute provides additional information about an element, often displayed as a tooltip. However, it is not accessible to screen readers, so it should not be used as the sole means of conveying important information.",
    },
    {
        question:
            "What is the purpose of testing with real users in accessibility?",
        answer: "Testing with real users, including those with disabilities, helps identify usability and accessibility issues that automated tools might miss.",
    },
    {
        question: "What is the purpose of the aria-describedby attribute?",
        answer: "The aria-describedby attribute associates additional descriptive text with an element, which can be read by screen readers to provide more context.",
    },
    {
        question: "What is the purpose of the aria-hidden attribute?",
        answer: "The aria-hidden='true' attribute hides an element from screen readers while keeping it visible on the screen.",
    },
    {
        question: "What is the purpose of the role attribute in ARIA?",
        answer: "The role attribute defines the purpose of an element (e.g., role='button'), helping assistive technologies understand its function.",
    },
    {
        question: "What is the purpose of the aria-live attribute?",
        answer: "The aria-live attribute informs screen readers of dynamic content changes (e.g., notifications), ensuring users are aware of updates.",
    },
    {
        question: "What is the purpose of the aria-expanded attribute?",
        answer: "The aria-expanded attribute indicates whether a collapsible element (e.g., a dropdown menu) is currently expanded or collapsed.",
    },
    {
        question: "What is the purpose of the aria-required attribute?",
        answer: "The aria-required attribute indicates that a form input must be filled out before submitting the form.",
    },
    {
        question: "What is the purpose of the aria-invalid attribute?",
        answer: "The aria-invalid attribute indicates that the value entered into a form input is invalid.",
    },
    {
        question: "What is the purpose of the aria-current attribute?",
        answer: "The aria-current attribute indicates the current item in a set of related elements (e.g., the current page in a navigation menu).",
    },
    {
        question: "What is the purpose of the aria-disabled attribute?",
        answer: "The aria-disabled attribute indicates that an element is visible but not interactive.",
    },
    {
        question: "What is the purpose of the aria-pressed attribute?",
        answer: "The aria-pressed attribute indicates the current state of a toggle button (e.g., pressed or not pressed).",
    },
];

import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";
import { Progress } from "@/Components/ui/progress";
import { ChevronLeft, ChevronRight, Repeat2 } from "lucide-react";
export default function FlashcardApp() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const progress = ((currentIndex + 1) / flashcards.length) * 100;

    const handleNext = () => {
        setIsFlipped(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    };

    const handlePrevious = () => {
        setIsFlipped(false);
        setCurrentIndex(
            (prevIndex) =>
                (prevIndex - 1 + flashcards.length) % flashcards.length
        );
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <AppLayout>
            <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] bg-[#faf6e6] mx-auto">
                <div className="w-full max-w-3xl space-y-8">
                    {/* Header */}
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Web Accessibility Flashcards
                        </h1>
                        <p className="text-muted-foreground">
                            Learn key concepts about web accessibility through
                            interactive flashcards
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                                Progress
                            </span>
                            <span className="font-medium">
                                {currentIndex + 1} of {flashcards.length}
                            </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    {/* Flashcard */}
                    <div className="relative perspective-1000">
                        <Card
                            className={`
          relative w-full min-h-[300px] cursor-pointer transition-transform duration-500
          transform-gpu preserve-3d hover:shadow-lg active:scale-95
          ${isFlipped ? "rotate-y-180" : ""}`}
                            onClick={handleFlip}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleFlip();
                                }
                            }}
                        >
                            {/* Front */}
                            <div
                                className={`absolute inset-0 backface-hidden p-8 rounded
                                      flex flex-col items-center justify-center text-center bg-[#F0E8D2]`}
                            >
                                <div className="space-y-4">
                                    <div className="text-sm font-medium text-muted-foreground">
                                        Question
                                    </div>
                                    <div className="text-xl font-semibold">
                                        {flashcards[currentIndex].question}
                                    </div>
                                </div>
                            </div>

                            {/* Back */}
                            <div
                                className={`absolute inset-0 backface-hidden p-8 rotate-y-180
                                      flex flex-col items-center justify-center text-center bg-[#faf6e6]`}
                            >
                                <div className="space-y-4">
                                    <div className="text-sm font-medium rounded text-muted-foreground">
                                        Answer
                                    </div>
                                    <div className="text-lg">
                                        {flashcards[currentIndex].answer}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                            className="w-[100px] bg-[#F0E8D2]"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                        </Button>

                        <div className="text-center">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleFlip}
                                className="rounded-full bg-[#F0E8D2]"
                            >
                                <Repeat2 className="w-4 h-4" />
                            </Button>
                        </div>

                        <Button
                            onClick={handleNext}
                            disabled={currentIndex === flashcards.length - 1}
                            className="w-[100px] bg-[#76746d]"
                        >
                            Next
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .perspective-1000 {
                    perspective: 1000px;
                }
                .preserve-3d {
                    transform-style: preserve-3d;
                }
                .backface-hidden {
                    backface-visibility: hidden;
                }
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
            `}</style>
        </AppLayout>
    );
}
