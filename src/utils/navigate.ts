let navigateFunction: ((to: string) => void) | null = null;

export const setNavigate = (navFn: (to: string) => void) => {
    navigateFunction = navFn;
};

export const navigate = (to: string) => {
    if (navigateFunction) {
        navigateFunction(to);
    } else {
        console.warn("Navigate function not set yet!");
    }
};
