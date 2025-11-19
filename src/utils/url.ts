export function buildQueryParams(params: Record<string, any>): string {
    const urlParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            urlParams.append(key, String(value));
        }
    });

    return urlParams.toString();
}
