import { useState } from "react";
import AppLayout from "@/Layouts/AppLayout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CalendarDays, LinkIcon, Search, Trash2 } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

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

    return (
        <AppLayout>
            <div className="container py-6 mx-auto space-y-6 bg-gray-100">
                <Card>
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
                        <h2 className="text-2xl font-bold">Reports</h2>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search reports..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <ScrollArea className="h-[600px]">
                        {filteredReports.length === 0 ? (
                            <p className="py-4 text-center text-muted-foreground">
                                No reports found
                            </p>
                        ) : (
                            filteredReports.map((report) => (
                                <Card
                                    key={report.id}
                                    className="relative mx-4 mb-4"
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="absolute text-red-500 top-2 right-2 hover:text-red-700 hover:bg-red-100"
                                        onClick={() =>
                                            handleDeleteClick(report)
                                        }
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">
                                            <LinkIcon className="w-4 h-4" />
                                            <Link
                                                href={`/reports/${report.id}`}
                                                className="hover:underline"
                                            >
                                                {report.url}
                                            </Link>
                                        </CardTitle>
                                        <CardDescription>
                                            Created on{" "}
                                            {new Date(
                                                report.created_at
                                            ).toLocaleString()}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <div className="space-x-2">
                                                <Badge
                                                    variant="outline"
                                                    className="text-green-700 border-green-200 bg-green-50"
                                                >
                                                    {
                                                        JSON.parse(
                                                            report.passed
                                                        ).length
                                                    }{" "}
                                                    Passed
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="text-red-700 border-red-200 bg-red-50"
                                                >
                                                    {
                                                        JSON.parse(
                                                            report.failed
                                                        ).length
                                                    }{" "}
                                                    Failed
                                                </Badge>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={`/reports/${report.id}`}
                                                >
                                                    View Report
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </ScrollArea>
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
