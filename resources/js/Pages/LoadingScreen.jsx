import { Loader2 } from "lucide-react";
import TestImage from "/public/gamspin.gif";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F0E8D2]/90 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 p-8 bg-[#E0D6BA] border rounded-lg">
                <img src={TestImage} />
                <div className="space-y-2 text-center">
                    <h2 className="text-xl font-semibold">Analyzing Website</h2>
                    <p className="text-sm text-black animate-pulse">
                        Please wait while we check your website for
                        accessibility issues...
                    </p>
                </div>
            </div>
        </div>
    );
}
