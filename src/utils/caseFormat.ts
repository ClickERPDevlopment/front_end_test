
export const toTitleCase = (text: string): string => {
    return text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export const formatLabel = (input: string): string => {
    return input
        .replace(/([a-z])([A-Z])/g, '$1 $2') // insert space before capital letters
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // handle consecutive capitals
        .replace(/^./, str => str.toUpperCase()); // capitalize first letter
}