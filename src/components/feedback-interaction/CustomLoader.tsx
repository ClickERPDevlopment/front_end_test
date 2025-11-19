import React from "react";

interface LoaderProps {
    size?: number;       // diameter of the spinner
    color?: string;      // Tailwind color (e.g. "bg-blue-500")
    fullScreen?: boolean;
}

const CustomLoader: React.FC<LoaderProps> = ({
    size = 40,
    color = "bg-blue-500",
    fullScreen = false,
}) => {
    const dotCount = 12;
    const dots = Array.from({ length: dotCount });

    const loader = (
        <div
            className="relative"
            style={{ width: size, height: size }}
        >
            {dots.map((_, i) => {
                const rotate = (360 / dotCount) * i;
                return (
                    <span
                        key={i}
                        className={`absolute top-1/2 left-1/2 block rounded-full ${color}`}
                        style={{
                            width: size * 0.12,  // dot size relative to loader
                            height: size * 0.12,
                            margin: -(size * 0.06),
                            transform: `rotate(${rotate}deg) translate(${size / 2.5}px)`,
                            animation: "ios-spin 1s linear infinite",
                            animationDelay: `${i * 0.08}s`,
                        }}
                    />
                );
            })}
        </div>
    );

    const wrapper = (
        <div className="flex items-center justify-center">
            {loader}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                {loader}
            </div>
        );
    }

    return wrapper;
};

export default CustomLoader;
