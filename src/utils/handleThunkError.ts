export function handleThunkError(err: any, defaultMsg = 'Something went wrong') {
    return (
        err?.response?.data?.message ||
        err?.message ||
        defaultMsg
    );
}