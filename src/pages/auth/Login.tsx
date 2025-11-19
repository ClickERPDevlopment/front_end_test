import Label from '@/components/form/Label';
import { useHotToast } from "@/utils/hotToast.util";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { AppDispatch } from "../../app/store";
// import bgImage from '../../assets/two.png';
// import image from '../../../public/one.jpeg'
import Button from "../../components/form/Button";
import SimpleInputBox from "../../components/form/SimpleInputBox";
import { BRAND } from "../../config/branding";
import { useAuth } from "../../hooks/useAuth";
import { loginUser } from "../../redux/authSlice";
import { showErrorToast } from "../../utils/toastUtils";

const Login = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const isDev = import.meta.env.MODE === "development";
    const dispatch: AppDispatch = useDispatch();
    const [username, setUsername] = useState<string>(isDev ? "Najmuzzaman" : "");
    const [password, setPassword] = useState<string>(isDev ? "az1423" : "");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showInstall, setShowInstall] = useState<boolean>(false);
    const { setToken, setRefreshToken } = useAuth();
    const navigate = useNavigate();

    const loginSchema = z.object({
        username: z.string().min(1, "Username is required"),
        password: z.string().min(1, "Password is required"),
    });

    useEffect(() => {
        document.title = `${BRAND.name} - Login`;
    }, []);

    const { showHotError, showHotSuccess } = useHotToast();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Start Spinner
        // Validate input
        const validation = loginSchema.safeParse({ username, password });
        if (!validation.success) {
            {
                // showErrorToast(err.message);
                showHotError("Login Failed! Please try again", { bgColor: "#FF0000", textColor: "#ffffff", width: "250px" });
            };
            setLoading(false);
            return;
        }

        try {
            const afterLoginData = await dispatch(
                loginUser({ username, password })
            ).unwrap();

            if (afterLoginData.token) {
                setToken(afterLoginData.token);
                setRefreshToken(afterLoginData.refreshToken);

                // showHotSuccess("Login Successful!", {
                //     icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
                // });
                showHotSuccess("Login Successful!", { bgColor: "#1F7BC9", textColor: "#ffffff", position: "bottom-right", width: "200px" });

            }
            //dummy block start (login error for problem in api)
            // setToken("sdsdsdsd");
            // localStorage.setItem('authToken', "sdsdsdsd");
            // localStorage.setItem('refreshToken', "sdsdsdsd");
            //dummy block end
            document.title = "Dashboard";
            // navigate("/dashboard");
            navigate("/webapp/dashboard");
        } catch (error) {
            console.error(error);
            showHotError("Login Failed! Please try again", { bgColor: "#FF0000", textColor: "#ffffff", width: "250px" });
        } finally {
            setLoading(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        // iOS Safari detection
        const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
        const isInStandaloneMode =
            "standalone" in window.navigator && (window.navigator as any).standalone;

        if (isIOS && !isInStandaloneMode) {
            // iOS → No beforeinstallprompt, show "Add to Home Screen" instruction instead
            setShowInstall(true);
            return;
        }

        // For browsers that support beforeinstallprompt
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstall(true); // Show button only when event is available
        };

        window.addEventListener("beforeinstallprompt", handler);
        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const handleInstall = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(() => setDeferredPrompt(null));
        } else {
            // iOS case → show manual instruction
            alert("On iOS: Tap the Share icon → Add to Home Screen");
        }
    };

    return (
        // <div className="w-full sm:w-[100%] md:w-[94%] lg:w-[1200px] lg:mx-auto xl:w-full max-h-[400px] grid place-items-center px-0">

        <div
            id="test_one"
            className=" w-full h-screen login_image"
            style={{
                // backgroundImage: `url(${bgImage})`,
                // backgroundImage: `url(../../../public/two.jpeg)`,
                // backgroundSize: "cover",
                // backgroundPosition: "center",
            }}
        >
            {/* Use pseudo-element in CSS or an overlay div for opacity */}
            <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
            ></div>
            <div className="relative  z-10">
                <div className="flex flex-col justify-between items-center w-full h-screen overflow-hidden">
                    {/* For toaster */}
                    {/* <div><Toaster /></div> */}
                    <div>
                        {showInstall && (
                            <Button onClick={handleInstall}>
                                Install App
                            </Button>
                        )}
                    </div>

                    {/* Logo + tagline */}
                    <div className="text-center mb-4 w-full">
                        <div className="font-normal border-[#1F7BC9] border-b mb-4 py-2 flex flex-col sm:flex-row items-center justify-center w-full gap-2 sm:gap-4 text-center sm:text-left">
                            <div className="w-full sm:w-[480px] px-4 flex items-center gap-2 lg:px-0">
                                {/* Logo */}
                                <div className="shrink-0 pl-6 lg:pl-0">
                                    <a href="">
                                        <img
                                            src="click_logo.png"
                                            className="h-[50px] sm:h-[60px] w-[80px] sm:w-[100px] inline"
                                            alt="click logo"
                                        />
                                    </a>
                                </div>

                                {/* Vertical line */}
                                <div className="sm:block border-l border-gray-300 h-[40px] sm:h-[40px]"></div>

                                {/* Text */}
                                <div className="sm:block pt-4 lg:pt-0">
                                    <h3 className="text-sm sm:text-lg text-neutral-600 pt-2 sm:pt-8">
                                        Fast Accurate Information
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Main content (centered vertically) */}
                    <div className="flex-grow flex flex-col justify-start items-center px-1 sm:px-6 md:px-10 lg:px-0 w-full">

                        {/* Login title */}
                        <div className="text-start w-full sm:w-[480px] px-6 lg:px-0">
                            <h4 className="text-3xl sm:text-3xl font-medium mb-0 pb-1 text-[#1F7BC9]">
                                Login
                            </h4>
                            <div className='border-b border-gray-300'></div>
                        </div>

                        {/* Login form */}
                        <div className="flex items-center justify-center w-full sm:w-[480px] py-5 px-6 sm:px-0">

                            <form onSubmit={handleSubmit} className="space-y-3 w-full">
                                {/* Username */}
                                <div className="flex flex-col justify-center mb-3 sm:mb-4">
                                    <Label
                                        text="Username"
                                        htmlFor="username"
                                        className="text-left sm:text-right text-sm w-full sm:w-[70px]"
                                    />
                                    <SimpleInputBox
                                        value={username}
                                        onChange={(val) => setUsername(val)}
                                        type="text"
                                        placeholder="Please enter your username"
                                        placeholderClassName=""
                                        className="border border-gray-300 font-norma w-full text-sm sm:text-base"
                                        rounded={true}
                                    />
                                </div>

                                {/* Password */}
                                <div className="flex flex-col justify-center mb-3 sm:mb-4">
                                    <Label
                                        text="Password"
                                        htmlFor="password"
                                        className="text-left sm:text-right text-sm w-full sm:w-[70px]"
                                    />
                                    <SimpleInputBox
                                        value={password}
                                        onChange={(val) => setPassword(val)}
                                        type="password"
                                        showPasswordToggle
                                        className="border border-gray-300 font-normal w-full text-sm sm:text-base"
                                        placeholder="Enter your password"
                                        placeholderClassName=""
                                        rounded={true}
                                    />
                                </div>

                                {/* Buttons + Remember me */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-3 sm:gap-4 w-full">
                                    <Button
                                        size="sm"
                                        className="w-30 sm:w-30 font-normal"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <span className="flex items-center justify-center">
                                                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                                                LOG IN
                                            </span>
                                        ) : (
                                            "LOG IN"
                                        )}
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        <input
                                            id="remember-me"
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="text-blue-600 rounded border-neutral-300 focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor="remember-me"
                                            className="font-light text-sm"
                                        >
                                            Remember me?
                                        </label>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                    <footer className="w-full border-t border-[#1F7BC9] py-4 text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-8">
                            <div className="text-sm opacity-50">
                                Copyright © 2025 Click ERP. All Rights Reserved.
                            </div>
                            <div className="hidden sm:block text-sm">
                                <p className="font-light text-neutral-600 opacity-50">
                                    Email:{" "}
                                    <a href={`mailto:${BRAND.salesEmail}`} className="hover:underline text-blue-700">
                                        {BRAND.salesEmail}
                                    </a>
                                </p>
                                <p className="font-light text-neutral-600 opacity-50">
                                    Website:{" "}
                                    <a
                                        href={`https://${BRAND.website}`}
                                        className="hover:underline text-blue-700"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {BRAND.website}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>
        </div>

    );

};

export default Login;
