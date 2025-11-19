import React, {
    useRef,
    useImperativeHandle,
    forwardRef,
    ReactNode,
} from "react";

type SmartFormProps = {
    children: ReactNode;
    inputRefs?: React.RefObject<(HTMLInputElement | HTMLSelectElement) | null>[];
};

export type SmartFormHandle = {
    focusNext: () => void;
    focusPrev: () => void;
};

const SmartForm = forwardRef<SmartFormHandle, SmartFormProps>(({ children, inputRefs = [] }, ref) => {
    const formRefs = useRef<(HTMLInputElement | HTMLSelectElement | null)[]>([]);

    // registerRefs from inputRefs props
    React.useEffect(() => {
        formRefs.current = inputRefs.map((r) => r.current);
    }, [inputRefs]);

    useImperativeHandle(ref, () => ({
        focusNext: () => {
            
            const activeIndex = formRefs.current.findIndex(
                (el) => el === document.activeElement
            );
            const next = formRefs.current[activeIndex + 1];
            if (next) next.focus();
        },
        focusPrev: () => {
            const activeIndex = formRefs.current.findIndex(
                (el) => el === document.activeElement
            );
            const prev = formRefs.current[activeIndex - 1];
            if (prev) prev.focus();
        },
    }));

    return <div>{children}</div>;
});

export default SmartForm;
