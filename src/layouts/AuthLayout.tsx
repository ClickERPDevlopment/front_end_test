import { ReactNode } from "react";

interface AuthLayoutProps {
    children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="min-h-screen default flex justify-center bg-white">
            {/* Shadowed Panel */}
            {children}
        </div>
    );
};

export default AuthLayout;
