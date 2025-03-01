export default function ScoreIndicator({ score }) {
    if (score === undefined || score === null) {
        return (
            <div className="flex items-center justify-center w-24 h-24 bg-gray-100 border-4 border-gray-300 rounded-full">
                <span className="text-2xl font-bold text-gray-500">N/A</span>
            </div>
        );
    }

    const normalizedScore = Math.max(0, Math.min(100, score));

    const getColor = (score) => {
        const red = Math.round(255 - score * 2.55);
        const green = Math.round(score * 2.55);

        return {
            background: `rgb(${red}, ${green}, 0, 0.15)`,
            border: `rgb(${red}, ${green}, 0)`,
            text: `rgb(${red}, ${green}, 0)`,
        };
    };

    const colors = getColor(normalizedScore);

    return (
        <div
            className="relative flex items-center justify-center w-24 h-24 rounded-full"
            style={{
                backgroundColor: colors.background,
                border: `4px solid ${colors.border}`,
            }}
        >
            <span className="text-2xl font-bold" style={{ color: colors.text }}>
                {Math.round(normalizedScore)}
            </span>
        </div>
    );
}
