import { format } from "date-fns";
import { DateFormatTypeName } from "../types/global";

export const nearlyEqual = (a: number, b: number, epsilon = 1e-6): boolean => {
    return Math.abs(a - b) < epsilon;
};

export const formatDate = (
    dateString: string,
    formatType: DateFormatTypeName
): string => {
    if (!dateString) {
        return "Invalid date"; // Handle blank date strings
    }

    // If the input is in dd/MM/yyyy, split manually
    const isDDMMYYYY = /^\d{2}\/\d{2}\/\d{4}$/.test(dateString);
    let date: Date;

    if (isDDMMYYYY) {
        const [day, month, year] = dateString.split("/").map(Number);
        date = new Date(year, month - 1, day);
    } else {
        date = new Date(dateString);
    }

    if (isNaN(date.getTime())) {
        return "Invalid date"; // Handle invalid dates
    }

    const pad = (n: number): string => n.toString().padStart(2, "0");
    const monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    switch (formatType) {
        case "long":
            return `${date.toLocaleString("default", {
                month: "long",
            })} ${date.getDate()}, ${date.getFullYear()}`;
        case "short":
            return `${pad(date.getDate())}/${pad(
                date.getMonth() + 1
            )}/${date.getFullYear()}`;
        case "db_format":
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
                date.getDate()
            )}`;
        case "datetime_long":
            return `${date.toLocaleString("default", {
                month: "long",
            })} ${date.getDate()}, ${date.getFullYear()} ${pad(
                date.getHours()
            )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        case "datetime_short":
            return `${pad(date.getDate())}/${pad(
                date.getMonth() + 1
            )}/${date.getFullYear()} ${pad(date.getHours())}:${pad(
                date.getMinutes()
            )}`;
        case "db_format_time":
            return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
                date.getDate()
            )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
                date.getSeconds()
            )}`;
        case "day_only": 
            return date.toLocaleString("default", { weekday: "long" });
        case "dd-MMM-yyyy":
            return `${pad(date.getDate())}-${monthsShort[date.getMonth()]}-${date.getFullYear()}`;    
        default:
            throw new Error(`Unsupported format type: ${formatType}`);
    }
};

// Utility function to format date and time
export const formatDateTime = (dateStr: string, formatType: string): string => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return ""; // Handle invalid date

    // Choose the format based on the formatType
    switch (formatType) {
        case "long":
            return format(date, "PPpp"); // Example: Jul 29, 2024 at 10:00 AM
        case "short":
            return format(date, "Pp"); // Example: 07/29/2024, 10:00 AM
        default:
            return date.toISOString(); // Default ISO format
    }
};

export const formatTime = (
    date: Date,
    formatType: "12-hour" | "24-hour"
): string => {
    const pad = (n: number): string => n.toString().padStart(2, "0");

    switch (formatType) {
        case "12-hour":
            return date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
        case "24-hour":
            return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
        default:
            throw new Error(`Unsupported format type: ${formatType}`);
    }
};
