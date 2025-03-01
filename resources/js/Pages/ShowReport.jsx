import { CheckCircle, ExternalLink, Info, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppLayout from "@/Layouts/AppLayout";
import ScoreIndicator from "@/Components/my-components/ScoreIndicator";

export default function TestReport({ report }) {
    const score = report.score;
    const reportJson = JSON.parse(report.report);

    const failed = reportJson.failed || [];
    const passed = reportJson.passed || [];
    const notApplicable = reportJson.not_applicable || [];

    return (
        <AppLayout>
            <div className="container py-6 mx-auto space-y-6">
                {/* Header Section */}
                <Card className="border-0 shadow-lg">
                    <CardHeader className="pb-2">
                        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                            <div className="flex flex-col items-center md:items-start">
                                <CardTitle className="mb-2 text-3xl font-bold tracking-tight">
                                    Accessibility Test Report
                                </CardTitle>
                                {report.url && (
                                    <a
                                        href={report.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary truncate hover:underline flex items-center gap-1.5"
                                    >
                                        {report.url}
                                        <ExternalLink className="h-3.5 w-3.5" />
                                    </a>
                                )}
                            </div>
                            <div className="flex items-center gap-6">
                                <ScoreIndicator score={score} />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 md:justify-start">
                            <Badge
                                variant="outline"
                                className="flex items-center gap-1.5 px-3 py-1.5 text-green-700 border-green-200 bg-green-50"
                            >
                                <CheckCircle className="h-3.5 w-3.5" />
                                <span className="font-medium">
                                    {passed.length} Passed
                                </span>
                            </Badge>
                            <Badge
                                variant="outline"
                                className="flex items-center gap-1.5 px-3 py-1.5 text-red-700 border-red-200 bg-red-50"
                            >
                                <XCircle className="h-3.5 w-3.5" />
                                <span className="font-medium">
                                    {failed.length} Failed
                                </span>
                            </Badge>
                            <Badge
                                variant="outline"
                                className="flex items-center gap-1.5 px-3 py-1.5 text-gray-700 border-gray-200 bg-gray-50"
                            >
                                <Info className="h-3.5 w-3.5" />
                                <span className="font-medium">
                                    {notApplicable.length} N/A
                                </span>
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabs Section */}
                <Tabs defaultValue="failed" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                        <TabsTrigger
                            value="failed"
                            className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700"
                        >
                            Failed Tests
                        </TabsTrigger>
                        <TabsTrigger
                            value="passed"
                            className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700"
                        >
                            Passed Tests
                        </TabsTrigger>
                        <TabsTrigger
                            value="na"
                            className="data-[state=active]:bg-gray-50 data-[state=active]:text-gray-700"
                        >
                            Not Applicable
                        </TabsTrigger>
                    </TabsList>

                    {/* Failed Tests Content */}
                    <TabsContent value="failed" className="space-y-6">
                        {failed.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <CheckCircle className="w-12 h-12 mb-4 text-green-500" />
                                <h3 className="mb-2 text-xl font-medium">
                                    All tests passed!
                                </h3>
                                <p className="max-w-md text-muted-foreground">
                                    No accessibility issues were found in this
                                    test run.
                                </p>
                            </div>
                        ) : (
                            failed.map((item) => (
                                <Card
                                    key={item.id}
                                    className="overflow-hidden border-l-4 border-l-red-500"
                                >
                                    <CardHeader>
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-1.5">
                                                <CardTitle className="flex items-center gap-2 text-lg">
                                                    <XCircle className="flex-shrink-0 w-5 h-5 text-red-500" />
                                                    <span>{item.title}</span>
                                                </CardTitle>
                                                <CardDescription
                                                    className="leading-normal"
                                                    dangerouslySetInnerHTML={{
                                                        __html: item.description,
                                                    }}
                                                />
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className="flex-shrink-0 text-red-700 border-red-200 bg-red-50"
                                            >
                                                {item.id}
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="p-4 rounded-lg bg-muted/50">
                                            <div className="mb-4 text-sm whitespace-pre-wrap text-muted-foreground">
                                                {item.issues.explanation}
                                            </div>
                                            <div className="space-y-3">
                                                {item.issues.snippets.map(
                                                    (snippet, index) => (
                                                        <div key={index}>
                                                            <pre className="p-3 overflow-x-auto font-mono text-xs rounded bg-muted">
                                                                <code>
                                                                    {
                                                                        snippet.code_snippet
                                                                    }
                                                                </code>
                                                            </pre>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </TabsContent>

                    {/* Passed Tests Content */}
                    <TabsContent value="passed" className="space-y-4">
                        {passed.length === 0 ? (
                            <Card className="p-6">
                                <p className="text-center text-muted-foreground">
                                    No passed tests to display
                                </p>
                            </Card>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2">
                                {passed.map((item) => (
                                    <Card
                                        key={item.id}
                                        className="border-l-4 border-l-green-500"
                                    >
                                        <CardHeader className="pb-2">
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="flex items-center gap-2 text-base">
                                                    <CheckCircle className="flex-shrink-0 w-4 h-4 text-green-500" />
                                                    <span>{item.title}</span>
                                                </CardTitle>
                                                <Badge
                                                    variant="outline"
                                                    className="text-green-700 border-green-200 bg-green-50"
                                                >
                                                    {item.id}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* Not Applicable Tests Content */}
                    <TabsContent value="na" className="space-y-4">
                        {notApplicable.length === 0 ? (
                            <Card className="p-6">
                                <p className="text-center text-muted-foreground">
                                    No not-applicable tests to display
                                </p>
                            </Card>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {notApplicable.map((item) => (
                                    <Card
                                        key={item.id}
                                        className="border-l-4 border-l-gray-300"
                                    >
                                        <CardHeader className="pb-2">
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="flex items-center gap-2 text-base">
                                                    <Info className="flex-shrink-0 w-4 h-4 text-gray-500" />
                                                    <span className="line-clamp-1">
                                                        {item.title}
                                                    </span>
                                                </CardTitle>
                                                <Badge
                                                    variant="outline"
                                                    className="text-gray-700 border-gray-200 bg-gray-50"
                                                >
                                                    {item.id}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
