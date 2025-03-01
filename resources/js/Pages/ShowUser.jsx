"use client";

import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    CalendarDays,
    ExternalLink,
    LinkIcon,
    Search,
    Trash2,
    Clock,
    BarChart,
} from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import ScoreIndicator from "@/Components/my-components/ScoreIndicator";

export default function ShowUser({ auth }) {
    const user = auth;
    const reports = user.reports;

    const [searchTerm, setSearchTerm] = useState("");
    const [reportToDelete, setReportToDelete] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const filteredReports = reports.filter((report) =>
        report.url.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (report) => {
        setReportToDelete(report);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (reportToDelete) {
            router.delete(route("report.delete", { id: reportToDelete.id }));
        }
        setIsDeleteDialogOpen(false);
        setReportToDelete(null);
    };

    const formatUrl = (url) => {
        try {
            const urlObj = new URL(url);
            return (
                urlObj.hostname +
                (urlObj.pathname !== "/" ? urlObj.pathname : "")
            );
        } catch (e) {
            return url;
        }
    };

    return (
        <AppLayout>
            <div className="container py-6 mx-auto space-y-6 bg-slate-100">
                <Card className="border-0 shadow-md">
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            <div>
                                <CardTitle className="text-2xl">
                                    {user.name}
                                </CardTitle>
                                <CardDescription>{user.email}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <CalendarDays className="w-4 h-4 mr-1" />
                                Joined{" "}
                                {new Date(user.created_at).toLocaleDateString()}
                            </div>
                            <div>
                                <Badge variant="secondary">
                                    {reports.length} Reports
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-2xl font-bold">
                            <BarChart className="w-6 h-6" />
                            Reports
                        </h2>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search reports..."
                                className="pl-8 w-[250px]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {filteredReports.length === 0 ? (
                        <Card className="p-8 text-center">
                            <p className="text-muted-foreground">
                                No reports found
                            </p>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {filteredReports.map((report) => (
                                <Card
                                    key={report.id}
                                    className="overflow-hidden transition-all duration-200 hover:shadow-lg"
                                >
                                    <CardHeader className="pb-2">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1 truncate">
                                                <CardTitle className="flex items-center gap-2 text-lg truncate">
                                                    <LinkIcon className="flex-shrink-0 w-4 h-4" />
                                                    <span
                                                        className="truncate"
                                                        title={report.url}
                                                    >
                                                        {formatUrl(report.url)}
                                                    </span>
                                                </CardTitle>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="-mt-1 -mr-2 text-red-500 hover:text-red-700 hover:bg-red-100"
                                                onClick={() =>
                                                    handleDeleteClick(report)
                                                }
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <CardDescription className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(
                                                report.created_at
                                            ).toLocaleDateString()}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="pb-3">
                                        <div className="flex justify-center py-2">
                                            <ScoreIndicator
                                                score={report.score}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex justify-end pt-0">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                            asChild
                                        >
                                            <Link
                                                href={`/report/${report.id}`}
                                                className="flex items-center justify-center gap-1"
                                            >
                                                View Report
                                                <ExternalLink className="w-3 h-3 ml-1" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this report?
                            {reportToDelete && (
                                <p className="mt-2 font-medium">
                                    {reportToDelete.url}
                                </p>
                            )}
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmDelete}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
