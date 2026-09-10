/** @type {import('tailwindcss').Config} */
import { fontSize } from "./src/data/constants/font_size";
import { colors } from "./src/data/constants/colors";
import typography from "@tailwindcss/typography";

export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors,
            fontSize,
            animation: {
                toast: "appear 0.3s forwards, disappear 0.3s 2.5s forwards",
                ripple: "ripple 0.6s linear forwards",
            },
            keyframes: {
                appear: {
                    "0%": { maxHeight: "0", opacity: "0", right: "-100%" },
                    "100%": { maxHeight: "160px", opacity: "1", right: "20px" },
                },
                disappear: {
                    "0%": { maxHeight: "160px", opacity: "1", right: "20px" },
                    "100%": { maxHeight: "0", opacity: "0", right: "-100%" },
                },
                ripple: {
                    "0%": {
                        transform: "translate(-50%, -50%) scale(0)",
                        opacity: "1",
                    },
                    "100%": {
                        transform: "translate(-50%, -50%) scale(2)",
                        opacity: "0",
                    },
                },
            },
        },
        container: {
            padding: "32px",
            center: true,
        },
    },
    plugins: [typography],
};
