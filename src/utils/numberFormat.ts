import { FormatNumberOptions } from "../types/global";

export const formatNumber = (
    value: number,
    options: FormatNumberOptions = {}
): string => {
    const {
        decimalPlaces = 2, // Default to 2 decimal places
        currency = "", // No currency by default
        useCommaSeparator = true, // Enable comma separation by default
    } = options;

    // Determine if the value is negative
    const isNegative = value < 0;

    // Work with the absolute value for formatting
    const absoluteValue = Math.abs(value);

    // Format the number to a fixed number of decimal places
    let formattedValue = absoluteValue.toFixed(decimalPlaces);

    if (useCommaSeparator) {
        // Add comma separators for thousands
        const parts = formattedValue.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        formattedValue = parts.join(".");
    }

    // Add the currency symbol if provided
    const formattedWithCurrency = currency
        ? `${currency} ${formattedValue}`
        : formattedValue;

    // Wrap negative numbers in parentheses
    return isNegative ? `(${formattedWithCurrency})` : formattedWithCurrency;
};
