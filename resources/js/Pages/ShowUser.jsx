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
    History,
} from "lucide-react";
import { Link, router } from "@inertiajs/react";
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
    const reportContainers = auth.report_containers;

    const [searchTerm, setSearchTerm] = useState("");
    const [containerToDelete, setContainerToDelete] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const filteredContainers = reportContainers.filter((container) =>
        container.url.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteClick = (container) => {
        setContainerToDelete(container);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (containerToDelete) {
            router.delete(
                route("container.delete", { id: containerToDelete.id })
            );
        }
        setIsDeleteDialogOpen(false);
        setContainerToDelete(null);
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
            <div className="container py-6 mx-auto space-y-6 bg-[#faf6e6]">
                <Card className="border-0 shadow-md bg-[#EDE9DA]">
                    <CardHeader>
                        <div className="flex items-center space-x-4">
                            <div>
                                <CardTitle className="text-2xl">
                                    {auth.name}
                                </CardTitle>
                                <CardDescription>{auth.email}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                                <CalendarDays className="w-4 h-4 mr-1" />
                                Joined{" "}
                                {new Date(auth.created_at).toLocaleDateString()}
                            </div>
                            <div>
                                <Badge variant="secondary">
                                    {reportContainers.length} Websites
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="flex items-center gap-2 text-2xl font-bold">
                            <BarChart className="w-6 h-6" />
                            Websites
                        </h2>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search websites..."
                                className="pl-8 w-[250px] bg-[#faf6e6] border-[#EDE9DA]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {filteredContainers.length === 0 ? (
                        <Card className="p-8 text-center bg-[#EDE9DA]">
                            <p className="text-muted-foreground">
                                No websites found
                            </p>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {filteredContainers.map((container) => {
                                const latestReportObject = container.reports[0];

                                const score = latestReportObject.score;
                                const date = latestReportObject.created_at;
                                const latestReport = JSON.parse(
                                    latestReportObject.report
                                );
                                console.log(latestReport);
                                return (
                                    <Card
                                        key={container.id}
                                        className="overflow-hidden transition-all duration-200 hover:shadow-lg bg-[#EDE9DA]"
                                    >
                                        <CardHeader className="pb-2">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1 truncate">
                                                    <CardTitle className="flex items-center gap-2 text-lg truncate">
                                                        <LinkIcon className="flex-shrink-0 w-4 h-4" />
                                                        <span
                                                            className="truncate"
                                                            title={
                                                                container.url
                                                            }
                                                        >
                                                            {formatUrl(
                                                                container.url
                                                            )}
                                                        </span>
                                                    </CardTitle>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="-mt-1 -mr-2 text-red-500 hover:text-red-700 hover:bg-[#faf6e6]"
                                                    onClick={() =>
                                                        handleDeleteClick(
                                                            container
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                            <CardDescription className="flex items-center justify-between gap-1">
                                                <div className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {new Date(
                                                        date
                                                    ).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs">
                                                    <History className="w-3 h-3" />
                                                    {container.reports.length}{" "}
                                                    reports
                                                </div>
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pb-3">
                                            <div className="flex justify-center py-2">
                                                <ScoreIndicator score={score} />
                                            </div>
                                        </CardContent>
                                        <CardFooter className="flex justify-end pt-0">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full bg-[#faf6e6] hover:bg-[#EDE9DA]"
                                                asChild
                                            >
                                                <Link
                                                    href={route(
                                                        "container.show",
                                                        {
                                                            id: container.id,
                                                        }
                                                    )}
                                                    className="flex items-center justify-center gap-1"
                                                >
                                                    View Reports
                                                    <ExternalLink className="w-3 h-3 ml-1" />
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>

            <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
            >
                <DialogContent className="bg-[#faf6e6]">
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete all reports for this
                            website?
                            {containerToDelete && (
                                <p className="mt-2 font-medium">
                                    {containerToDelete.url}
                                </p>
                            )}
                            This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            className="bg-[#EDE9DA] hover:bg-[#faf6e6]"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmDelete}
                            className="hover:bg-red-700"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
