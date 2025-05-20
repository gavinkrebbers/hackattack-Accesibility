import { useState } from "react";

import {
    CheckCircle,
    ExternalLink,
    Info,
    XCircle,
    RefreshCw,
} from "lucide-react";
import { Badge } from "@/Components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/Components/ui/tooltip";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import AppLayout from "@/Layouts/AppLayout";
import ScoreIndicator from "@/Components/my-components/ScoreIndicator";
import { Link, router } from "@inertiajs/react";
import LoadingScreen from "./LoadingScreen";

export default function TestReport({ reportContainer }) {
    const [selectedReportId, setSelectedReportId] = useState(
        reportContainer.reports.at(-1).id
    );

    const [isLoading, setIsLoading] = useState(false);

    const currentReport =
        reportContainer.reports.find((r) => r.id === selectedReportId) ||
        reportContainer.reports.at(-1);
    const reportJson = JSON.parse(currentReport.report);

    const failed = reportJson.failed || [];
    const passed = reportJson.passed || [];
    const notApplicable = reportJson.not_applicable || [];

    const regenerateReport = (e) => {
        e.preventDefault();
        setIsLoading(true);
        router.post(
            route("report.new", { containerId: reportContainer.id }),
            {},
            {
                onFinish: () => setIsLoading(false),
            }
        );
    };

    const TitleWithTooltip = ({ title, icon: Icon, iconClassName }) => (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Icon
                            className={`flex-shrink-0 w-4 h-4 ${iconClassName}`}
                        />
                        <span className="line-clamp-1">{title}</span>
                    </CardTitle>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="max-w-xs">{title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );

    return (
        <AppLayout className="bg-[#faf6e6]">
            {isLoading && <LoadingScreen />}
            <div className="container py-6 mx-auto space-y-6 bg-[#faf6e6]">
                {/* Header Section */}
                <Card className="border-0 shadow-lg bg-[#F0E8D2]">
                    <CardHeader className="pb-2">
                        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                            <div className="flex flex-col items-center md:items-start">
                                <CardTitle className="mb-2 text-3xl font-bold tracking-tight">
                                    Accessibility Test Report
                                </CardTitle>
                                <a
                                    href={reportContainer.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary truncate hover:underline flex items-center gap-1.5"
                                >
                                    {reportContainer.url}
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            </div>
                            <div className="flex items-center gap-6">
                                <Select
                                    value={selectedReportId}
                                    onValueChange={setSelectedReportId}
                                >
                                    <SelectTrigger className="w-[200px] bg-[#E0D6BA]">
                                        <SelectValue placeholder="Select report" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {reportContainer.reports.map(
                                            (report, index) => (
                                                <SelectItem
                                                    key={report.id}
                                                    value={report.id}
                                                >
                                                    Report {index + 1} -{" "}
                                                    {new Date(
                                                        report.created_at
                                                    ).toLocaleDateString()}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <button
                                    onClick={regenerateReport}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary transition-all bg-[#faf6e6] rounded-md hover:bg-[#F0E8D2] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    Update Report
                                </button>
                                <div className="flex items-center gap-3">
                                    <ScoreIndicator
                                        score={currentReport.score}
                                    />
                                </div>
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

                {/* Rest of the component remains the same, just using currentReport instead of report */}
                <Tabs defaultValue="failed" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6 bg-[#F0E8D2]">
                        <TabsTrigger
                            value="failed"
                            className="data-[state=active]:bg-[#faf6e6] data-[state=active]:text-primary"
                        >
                            Failed Tests
                        </TabsTrigger>
                        <TabsTrigger
                            value="passed"
                            className="data-[state=active]:bg-[#faf6e6] data-[state=active]:text-primary"
                        >
                            Passed Tests
                        </TabsTrigger>
                        <TabsTrigger
                            value="na"
                            className="data-[state=active]:bg-[#faf6e6] data-[state=active]:text-primary"
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
                            <div>
                                <Card className="mb-5 bg-[#F0E8D2]">
                                    <CardContent>
                                        <p className="pt-4 text-lg text-gray-700 rounded">
                                            Discover how to create a more
                                            inclusive and accessible website by
                                            exploring{" "}
                                            <Link
                                                href="/info"
                                                className="text-blue-600 underline transition-colors hover:text-blue-800"
                                            >
                                                our comprehensive accessibility
                                                guide
                                            </Link>
                                            . Learn best practices, tips, and
                                            tools to ensure your site works for
                                            everyone.
                                        </p>
                                    </CardContent>
                                </Card>
                                {failed.map((item) => (
                                    <Card
                                        key={item.id}
                                        className="overflow-hidden border-l-4 border-l-red-500 bg-[#F0E8D2]"
                                    >
                                        <CardHeader>
                                            <div className="flex items-start justify-between gap-4 ">
                                                <div className="space-y-1.5">
                                                    <TitleWithTooltip
                                                        title={item.title}
                                                        icon={XCircle}
                                                        iconClassName="text-red-500"
                                                    />
                                                    <CardDescription
                                                        className="leading-normal text-black"
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
                                        <CardContent className="space-y-4 ">
                                            <div className="p-4 bg-[#E0D6BA] rounded-lg">
                                                <div className="mb-4 text-sm text-black whitespace-pre-wrap">
                                                    {item.issues.explanation}
                                                </div>
                                                <div className="space-y-3">
                                                    {item.issues.snippets.map(
                                                        (snippet, index) => (
                                                            <div key={index}>
                                                                <pre className="p-3 overflow-x-auto font-mono text-xs rounded bg-[#faf6e6]">
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
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    {/* Passed Tests Content */}
                    <TabsContent value="passed" className="space-y-4">
                        {passed.length === 0 ? (
                            <Card className="p-6 bg-[#F0E8D2]">
                                <p className="text-center text-muted-foreground">
                                    No passed tests to display
                                </p>
                            </Card>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2">
                                {passed.map((item) => (
                                    <Card
                                        key={item.id}
                                        className="border-l-4 border-l-green-500 bg-[#F0E8D2]"
                                    >
                                        <CardHeader className="pb-2">
                                            <div className="flex items-start justify-between">
                                                <TitleWithTooltip
                                                    title={item.title}
                                                    icon={CheckCircle}
                                                    iconClassName="text-green-500"
                                                />
                                                <Badge
                                                    variant="outline"
                                                    className="text-green-700 border-green-200 bg-green-50"
                                                >
                                                    {item.id}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-black">
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
                            <Card className="p-6 bg-[#F0E8D2]">
                                <p className="text-center text-muted-foreground">
                                    No not-applicable tests to display
                                </p>
                            </Card>
                        ) : (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {notApplicable.map((item) => (
                                    <Card
                                        key={item.id}
                                        className="border-l-4 border-l-gray-300 bg-[#F0E8D2]"
                                    >
                                        <CardHeader className="pb-2">
                                            <div className="flex items-start justify-between">
                                                <TitleWithTooltip
                                                    title={item.title}
                                                    icon={Info}
                                                    iconClassName="text-gray-500"
                                                />
                                                <Badge
                                                    variant="outline"
                                                    className="text-gray-700 border-gray-200 bg-gray-50"
                                                >
                                                    {item.id}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-black">
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
