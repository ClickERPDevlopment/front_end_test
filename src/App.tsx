import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./hooks/useAuth";
import AppRoutes from "./routes";
import { useEffect } from "react";
import { initDB } from "./app/idb/dbConnection";
import { BrowserRouter } from "react-router-dom";
import { useNotification } from "./hooks/useNotification";
import { useTnaCommentNotification } from "./modules/planning/hooks/useTnaCommentNotification";
import { ToastBar, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { durationTypes } from './modules/planning/pages/tnaTaskSetup/tnaTaskType.interface';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
    useNotification();
    useTnaCommentNotification();
    useEffect(() => {
        // Initialize DB when app loads
        const initializeApp = async () => {
            try {
                await initDB();
                // console.log('IndexedDB initialized successfully');
            } catch (error) {
                // console.error('Failed to initialize IndexedDB:', error);
            }
        };

        initializeApp();
    }, []);

    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ToastContainer />
                <div>
                    <Toaster>
                        {(t) => (
                            <ToastBar
                                toast={t}
                                style={{
                                    ...t.style,
                                    animation: t.visible
                                        ? "slide-up-fade-in 0.3s ease forwards"
                                        : "fly-right-fade-out 0.5s ease forwards",
                                }}
                            />
                        )}
                    </Toaster>
                </div>
                <BrowserRouter>
                    {/* <RouteChangeWatcher /> */}
                    <AppRoutes />
                </BrowserRouter>

            </AuthProvider>
        </QueryClientProvider>
    );
};

export default App;
