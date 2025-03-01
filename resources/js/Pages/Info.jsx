import AppLayout from "@/Layouts/AppLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AccessibilityInfo() {
    const accessibilityTests = {
        "Content and Structure": [
            {
                id: "document-title",
                name: "Document Title",
                description:
                    "Ensures that the page has a clear and descriptive title. This helps screen reader users quickly identify the content of the page.",
            },
            {
                id: "html-has-lang",
                name: "HTML Language",
                description:
                    "Checks if the HTML document has a `lang` attribute specifying the language of the content. This helps screen readers pronounce text correctly.",
            },
            {
                id: "heading-order",
                name: "Heading Order",
                description:
                    "Ensures that headings are used in a logical order. This is important for screen reader users to understand the structure of the content.",
            },
            {
                id: "landmark-one-main",
                name: "Main Landmark",
                description:
                    "Checks if the page contains a `<main>` landmark, which identifies the primary content area. This helps screen reader users quickly jump to the main content.",
            },
            {
                id: "landmarks",
                name: "Landmarks",
                description:
                    "Ensures that the page uses landmarks such as `<header>`, `<nav>`, `<main>`, and `<footer>`. This allows screen readers to navigate between key sections.",
            },
            {
                id: "region",
                name: "Content Regions",
                description:
                    "Ensures that important content regions are clearly identified using ARIA regions or landmarks, which helps screen readers navigate the page quickly.",
            },
        ],
        "Visual and Color": [
            {
                id: "color-contrast",
                name: "Color Contrast",
                description:
                    "Ensures there is sufficient contrast between text and background colors. Poor contrast makes text hard to read for users with low vision or color blindness.",
            },
            {
                id: "image-alt",
                name: "Image Alt Text",
                description:
                    "Verifies that images have descriptive alt text. Alt text allows screen reader users to understand what the image conveys.",
            },
        ],
        "Interactive Elements": [
            {
                id: "button-name",
                name: "Button Names",
                description:
                    "Ensures buttons have clear, descriptive names that convey their function. This is crucial for screen reader users.",
            },
            {
                id: "link-name",
                name: "Link Names",
                description:
                    "Checks if links are properly labeled with descriptive text. Links that are not clearly labeled can confuse screen reader users.",
            },
            {
                id: "tabindex",
                name: "Tabindex",
                description:
                    "Ensures that all interactive elements (like buttons, links, and form fields) are reachable using the keyboard's `Tab` key.",
            },
            {
                id: "target-size",
                name: "Target Size",
                description:
                    "Ensures that clickable elements are large enough to be easily interacted with, particularly for users with limited dexterity.",
            },
            {
                id: "accesskeys",
                name: "Access Keys",
                description:
                    "Ensures that interactive elements are accessible via keyboard shortcuts, making it easier for users with motor impairments.",
            },
            {
                id: "logical-tab-order",
                name: "Logical Tab Order",
                description:
                    "Verifies that the tab order follows a logical sequence. This is essential for users who rely on keyboard navigation.",
            },
            {
                id: "interactive-content",
                name: "Interactive Content",
                description:
                    "Checks that all interactive content is accessible, meaning buttons, links, and forms should be properly labeled and navigable.",
            },
        ],
        "Forms and Input": [
            {
                id: "form-field-multiple-labels",
                name: "Form Field Labels",
                description:
                    "Checks that form fields are associated with a single, clear label. Multiple or missing labels can cause confusion for screen reader users.",
            },
            {
                id: "no-autofill",
                name: "Autofill",
                description:
                    "Ensures that the page does not interfere with autofill functionality, which can cause problems for users with cognitive or motor disabilities.",
            },
        ],
        Multimedia: [
            {
                id: "video-caption",
                name: "Video Captions",
                description:
                    "Ensures videos have captions for users who are deaf or hard of hearing. Captions provide access to spoken content.",
            },
        ],
        "Navigation and Layout": [
            {
                id: "bypass",
                name: "Skip to Content",
                description:
                    "Checks whether the website offers a mechanism to skip repetitive content. This is important for screen reader or keyboard users.",
            },
            {
                id: "meta-viewport",
                name: "Meta Viewport",
                description:
                    "Checks if the page is mobile-friendly by ensuring the `meta-viewport` tag is used.",
            },
        ],
    };

    return (
        <AppLayout>
            <div className="container py-8 mx-auto space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">
                            Web Accessibility Tests
                        </CardTitle>
                        <CardDescription>
                            A comprehensive guide to accessibility tests that
                            ensure your website is usable by all.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-lg">
                            Web accessibility is crucial for ensuring that your
                            website can be used by everyone, including people
                            with disabilities. The following tests cover various
                            aspects of web accessibility, from content structure
                            to interactive elements.
                        </p>
                    </CardContent>
                </Card>

                <Tabs defaultValue="Content and Structure">
                    <TabsList className="mb-4">
                        {Object.keys(accessibilityTests).map((category) => (
                            <TabsTrigger key={category} value={category}>
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {Object.entries(accessibilityTests).map(
                        ([category, tests]) => (
                            <TabsContent key={category} value={category}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>{category}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Accordion
                                            type="single"
                                            collapsible
                                            className="w-full"
                                        >
                                            {tests.map((test) => (
                                                <AccordionItem
                                                    key={test.id}
                                                    value={test.id}
                                                >
                                                    <AccordionTrigger>
                                                        {test.name}
                                                    </AccordionTrigger>
                                                    <AccordionContent>
                                                        {test.description}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        )
                    )}
                </Tabs>
            </div>
        </AppLayout>
    );
}
