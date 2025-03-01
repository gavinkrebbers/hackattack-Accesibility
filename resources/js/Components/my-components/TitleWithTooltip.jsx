export default function TitleWithTooltip({ title, icon: Icon, iconClassName }) {
    // console.log(title);
    return (
        <>
            <h1>this is a test</h1>
        </>
    );
    return (
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
}
