import { CheckCircle, XCircle } from "lucide-react";
import AppLayout from "@/Layouts/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ShowReport({ report }) {
    const failed = JSON.parse(report.failed);
    const passed = JSON.parse(report.passed);

    return (
        <AppLayout>
            <div className="container py-6 mx-auto space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold tracking-tight">
                            Test Report
                        </h1>
                        <div className="flex items-center gap-4">
                            <Badge
                                variant="outline"
                                className="flex items-center gap-1 text-green-700 border-green-200 bg-green-50"
                            >
                                <CheckCircle className="h-3.5 w-3.5" />
                                <span>{passed.length} Passed</span>
                            </Badge>
                            <Badge
                                variant="outline"
                                className="flex items-center gap-1 text-red-700 border-red-200 bg-red-50"
                            >
                                <XCircle className="h-3.5 w-3.5" />
                                <span>{failed.length} Failed</span>
                            </Badge>
                        </div>
                    </div>
                    <div className="px-4 py-2 rounded-md bg-muted">
                        <p className="flex items-center text-sm text-muted-foreground">
                            <span className="mr-2 font-medium">Test URL:</span>
                            <a
                                href={report.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 truncate hover:underline"
                            >
                                {report.url}
                            </a>
                        </p>
                    </div>
                </div>

                <Tabs defaultValue="passed" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="passed">Passed Tests</TabsTrigger>
                        <TabsTrigger value="failed">Failed Tests</TabsTrigger>
                    </TabsList>

                    <TabsContent value="passed" className="space-y-4">
                        {passed.length === 0 ? (
                            <p className="py-8 text-center text-muted-foreground">
                                No passed tests to display
                            </p>
                        ) : (
                            passed.map((item) => (
                                <Card
                                    key={item.id}
                                    className="border-l-4 border-l-green-500"
                                >
                                    <CardHeader className="pb-2">
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span>Test #{item.id}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </TabsContent>

                    <TabsContent value="failed" className="space-y-4">
                        {failed.length === 0 ? (
                            <p className="py-8 text-center text-muted-foreground">
                                No failed tests to display
                            </p>
                        ) : (
                            failed.map((item) => (
                                <Card
                                    key={item.id}
                                    className="border-l-4 border-l-red-500"
                                >
                                    <CardHeader className="pb-2">
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <XCircle className="w-5 h-5 text-red-500" />
                                            <span>Test #{item.id}</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}
