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
                    "Ensures that the page has a clear and descriptive title. This helps screen reader users quickly identify the content of the page. Without a proper title, users may struggle to understand the purpose of the page, especially when navigating between multiple tabs or windows.",
                importance:
                    "A descriptive title is crucial for screen reader users, as it is the first thing they hear when landing on a page. It also helps search engines understand the content of the page, improving SEO.",
                affectedUsers:
                    "Blind and visually impaired users who rely on screen readers, as well as users with cognitive disabilities who benefit from clear and concise page titles.",
            },
            {
                id: "html-has-lang",
                name: "HTML Language",
                description:
                    "Checks if the HTML document has a `lang` attribute specifying the language of the content. This helps screen readers pronounce text correctly and ensures proper language-specific rendering.",
                importance:
                    "The `lang` attribute is essential for screen readers to correctly pronounce words and for browsers to display text in the appropriate language. It also helps search engines index content accurately.",
                affectedUsers:
                    "Screen reader users, multilingual users, and search engines.",
            },
            {
                id: "heading-order",
                name: "Heading Order",
                description:
                    "Ensures that headings are used in a logical order (e.g., `<h1>` followed by `<h2>`, etc.). This is important for screen reader users to understand the structure and hierarchy of the content.",
                importance:
                    "A logical heading structure allows screen reader users to navigate the page efficiently and understand the relationships between sections. It also improves readability for all users.",
                affectedUsers:
                    "Blind and visually impaired users who rely on screen readers, as well as users with cognitive disabilities who benefit from clear content organization.",
            },
            {
                id: "landmark-one-main",
                name: "Main Landmark",
                description:
                    "Checks if the page contains a `<main>` landmark, which identifies the primary content area. This helps screen reader users quickly jump to the main content without navigating through repetitive elements.",
                importance:
                    "The `<main>` landmark improves navigation efficiency for screen reader users by allowing them to skip directly to the primary content. It also enhances the semantic structure of the page.",
                affectedUsers:
                    "Blind and visually impaired users who rely on screen readers.",
            },
            {
                id: "landmarks",
                name: "Landmarks",
                description:
                    "Ensures that the page uses landmarks such as `<header>`, `<nav>`, `<main>`, and `<footer>`. These landmarks allow screen readers to navigate between key sections of the page.",
                importance:
                    "Landmarks provide a way for screen reader users to quickly navigate to different parts of the page, improving usability and efficiency.",
                affectedUsers:
                    "Blind and visually impaired users who rely on screen readers.",
            },
            {
                id: "region",
                name: "Content Regions",
                description:
                    "Ensures that important content regions are clearly identified using ARIA regions or landmarks. This helps screen readers navigate the page quickly and understand the layout.",
                importance:
                    "Clearly defined regions improve navigation for screen reader users and ensure that all content is accessible and logically organized.",
                affectedUsers:
                    "Blind and visually impaired users who rely on screen readers.",
            },
        ],
        "Visual and Color": [
            {
                id: "color-contrast",
                name: "Color Contrast",
                description:
                    "Ensures there is sufficient contrast between text and background colors. Poor contrast makes text hard to read for users with low vision or color blindness.",
                importance:
                    "Adequate color contrast ensures that text is readable for all users, including those with visual impairments or color vision deficiencies. It also improves readability in low-light conditions.",
                affectedUsers:
                    "Users with low vision, color blindness, or situational impairments (e.g., glare on screens).",
            },
            {
                id: "image-alt",
                name: "Image Alt Text",
                description:
                    "Verifies that images have descriptive alt text. Alt text allows screen reader users to understand what the image conveys, even if they cannot see it.",
                importance:
                    "Alt text provides context for images, ensuring that screen reader users receive the same information as sighted users. It also helps when images fail to load.",
                affectedUsers:
                    "Blind and visually impaired users who rely on screen readers.",
            },
        ],
        "Interactive Elements": [
            {
                id: "button-name",
                name: "Button Names",
                description:
                    "Ensures buttons have clear, descriptive names that convey their function. This is crucial for screen reader users to understand what the button does.",
                importance:
                    "Descriptive button names improve usability for screen reader users and ensure that all users can interact with the interface effectively.",
                affectedUsers:
                    "Blind and visually impaired users who rely on screen readers, as well as users with cognitive disabilities.",
            },
            {
                id: "link-name",
                name: "Link Names",
                description:
                    "Checks if links are properly labeled with descriptive text. Links that are not clearly labeled can confuse screen reader users and make navigation difficult.",
                importance:
                    "Descriptive link text helps users understand where a link will take them, improving navigation and reducing frustration.",
                affectedUsers:
                    "Blind and visually impaired users who rely on screen readers, as well as users with cognitive disabilities.",
            },
            {
                id: "tabindex",
                name: "Tabindex",
                description:
                    "Ensures that all interactive elements (like buttons, links, and form fields) are reachable using the keyboard's `Tab` key. This is essential for users who cannot use a mouse.",
                importance:
                    "Keyboard accessibility is critical for users with motor disabilities who rely on keyboards or alternative input devices to navigate the web.",
                affectedUsers:
                    "Users with motor disabilities, temporary injuries, or those who prefer keyboard navigation.",
            },
            {
                id: "target-size",
                name: "Target Size",
                description:
                    "Ensures that clickable elements are large enough to be easily interacted with, particularly for users with limited dexterity or those using touchscreens.",
                importance:
                    "Larger target sizes reduce the likelihood of errors and make it easier for all users to interact with the interface, especially on mobile devices.",
                affectedUsers:
                    "Users with motor disabilities, temporary injuries, or those using touchscreens.",
            },
            {
                id: "accesskeys",
                name: "Access Keys",
                description:
                    "Ensures that interactive elements are accessible via keyboard shortcuts, making it easier for users with motor impairments to navigate the page.",
                importance:
                    "Access keys provide an alternative way to navigate and interact with content, improving accessibility for users who cannot use a mouse.",
                affectedUsers:
                    "Users with motor disabilities or those who prefer keyboard shortcuts.",
            },
            {
                id: "logical-tab-order",
                name: "Logical Tab Order",
                description:
                    "Verifies that the tab order follows a logical sequence. This is essential for users who rely on keyboard navigation to move through interactive elements.",
                importance:
                    "A logical tab order ensures that users can navigate the page in a predictable and intuitive way, reducing confusion and frustration.",
                affectedUsers:
                    "Users with motor disabilities or those who rely on keyboard navigation.",
            },
            {
                id: "interactive-content",
                name: "Interactive Content",
                description:
                    "Checks that all interactive content is accessible, meaning buttons, links, and forms should be properly labeled and navigable.",
                importance:
                    "Accessible interactive content ensures that all users can complete tasks and interact with the website effectively.",
                affectedUsers:
                    "Blind, visually impaired, and motor-impaired users, as well as those with cognitive disabilities.",
            },
        ],
        "Forms and Input": [
            {
                id: "form-field-multiple-labels",
                name: "Form Field Labels",
                description:
                    "Checks that form fields are associated with a single, clear label. Multiple or missing labels can cause confusion for screen reader users.",
                importance:
                    "Clear and concise labels ensure that users understand what information is required in each form field, reducing errors and improving usability.",
                affectedUsers:
                    "Blind and visually impaired users who rely on screen readers, as well as users with cognitive disabilities.",
            },
            {
                id: "no-autofill",
                name: "Autofill",
                description:
                    "Ensures that the page does not interfere with autofill functionality, which can cause problems for users with cognitive or motor disabilities.",
                importance:
                    "Autofill helps users complete forms quickly and accurately, especially those with cognitive or motor impairments who may struggle with manual input.",
                affectedUsers:
                    "Users with cognitive or motor disabilities, as well as those who rely on autofill for convenience.",
            },
        ],
        Multimedia: [
            {
                id: "video-caption",
                name: "Video Captions",
                description:
                    "Ensures videos have captions for users who are deaf or hard of hearing. Captions provide access to spoken content and improve comprehension.",
                importance:
                    "Captions make video content accessible to users who cannot hear the audio, ensuring that everyone can access the information.",
                affectedUsers:
                    "Deaf and hard-of-hearing users, as well as users in noisy environments or those who prefer to watch videos without sound.",
            },
        ],
        "Navigation and Layout": [
            {
                id: "bypass",
                name: "Skip to Content",
                description:
                    "Checks whether the website offers a mechanism to skip repetitive content. This is important for screen reader or keyboard users who want to jump directly to the main content.",
                importance:
                    "A skip link improves navigation efficiency by allowing users to bypass repetitive elements like navigation menus, reducing frustration and saving time.",
                affectedUsers:
                    "Blind and visually impaired users who rely on screen readers, as well as keyboard-only users.",
            },
            {
                id: "meta-viewport",
                name: "Meta Viewport",
                description:
                    "Checks if the page is mobile-friendly by ensuring the `meta-viewport` tag is used. This ensures that the page scales properly on different devices.",
                importance:
                    "A responsive design improves usability for all users, especially those on mobile devices or with low vision who rely on zooming.",
                affectedUsers:
                    "Mobile users, users with low vision, and those who rely on responsive design for accessibility.",
            },
        ],
    };

    return (
        <AppLayout>
            <div className="container py-8 mx-auto space-y-8 bg-[#faf6e6]">
                <Card className="bg-[#F0E8D2]">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">
                            Web Accessibility Standards
                        </CardTitle>
                        <CardDescription>
                            A comprehensive guide to accessibility that ensure
                            your website is usable by all.
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
                    <TabsList className="mb-4 bg-[#F0E8D2]">
                        {Object.keys(accessibilityTests).map((category) => (
                            <TabsTrigger key={category} value={category}>
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {Object.entries(accessibilityTests).map(
                        ([category, tests]) => (
                            <TabsContent key={category} value={category}>
                                <Card className="bg-[#F0E8D2]">
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
                                                        <p className="mb-2">
                                                            <strong>
                                                                Description:
                                                            </strong>{" "}
                                                            {test.description}
                                                        </p>
                                                        <p className="mb-2">
                                                            <strong>
                                                                Importance:
                                                            </strong>{" "}
                                                            {test.importance}
                                                        </p>
                                                        <p>
                                                            <strong>
                                                                Affected Users:
                                                            </strong>{" "}
                                                            {test.affectedUsers}
                                                        </p>
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
