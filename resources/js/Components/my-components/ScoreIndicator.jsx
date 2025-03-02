"use client";

import { useState, useEffect } from "react";
import ThumbsUp from "/public/good_score.png";
import HappyGam from "/public/gam_happy_sticker.png";
import Sleeping from "/public/gam_zzz_sticker.png";
import Crying from "/public/gam_cry_sticker.png";
import Splat from "/public/youdidsobadGAMdied.png";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ScoreIndicator({ score }) {
    const [image, setImage] = useState(ThumbsUp);
    const [message, setMessage] = useState("");
    const [bgColor, setBgColor] = useState("bg-gray-50");
    const [textColor, setTextColor] = useState("text-gray-800");

    useEffect(() => {
        if (score == 100) {
            setImage(ThumbsUp);
            setMessage("Excellent!");
            setBgColor("bg-green-50");
            setTextColor("text-green-800");
        } else if (score >= 90) {
            setImage(HappyGam);
            setMessage("Good job!");
            setBgColor("bg-blue-50");
            setTextColor("text-blue-800");
        } else if (score >= 80) {
            setImage(Sleeping);
            setMessage("Needs improvement");
            setBgColor("bg-yellow-50");
            setTextColor("text-yellow-800");
        } else if (score >= 70) {
            setImage(Crying);
            setMessage("Poor score");
            setBgColor("bg-orange-50");
            setTextColor("text-orange-800");
        } else {
            setImage(Splat);
            setMessage("Critical issues!");
            setBgColor("bg-red-50");
            setTextColor("text-red-800");
        }
    }, [score]);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={`flex flex-col items-center p-3 rounded-lg border ${bgColor} transition-all duration-300 hover:shadow-md cursor-help`}
                    >
                        <div className="w-24 h-24 mb-2">
                            <img
                                src={image}
                                alt={`Score indicator: ${score}`}
                                width={96}
                                height={96}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <span
                                className={`text-sm ${textColor} font-medium`}
                            >
                                You Scored {score}!
                            </span>
                        </div>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Accessibility Score: {score}/100</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
