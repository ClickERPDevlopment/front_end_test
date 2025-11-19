import { ICompany } from "@/modules/configurations/pages/companySetup/company.interface";
import { iconMap } from "@/utils/hotToast.util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastPosition } from "react-hot-toast";
import { DateFormatType, Direction, FontSize, HeaderStyle, MenuStyle, PaginationVariant, ScreenSize, Theme, ThemeName } from "../types/global";

interface ThemeContextType {
    theme: Theme;
    hash: string;
    layout: string;
    company: ICompany | null;
    direction: Direction;
    datePickerFormat: DateFormatType;
    fontSize: FontSize;
    menuStyle: MenuStyle;
    headerStyle: HeaderStyle;
    themeName: ThemeName;
    themeSidNavigation: string;
    themeText: string;
    screenSize: ScreenSize;
    hasInputControlColor: boolean;
    isCompanyByUser: boolean;
    paginationStyle: PaginationVariant;
    rowsPerPage: string,
    setLayout: (layout: string) => void;
    setCompany: (company: ICompany | null) => void;
    setIsCompanyByUser: (condition: boolean) => void;
    setTheme: (theme: Theme) => void;
    setHash: (hash: string) => void;
    setDirection: (direction: Direction) => void;
    setFontSize: (size: FontSize) => void;
    setMenuStyle: (style: MenuStyle) => void;
    setHeaderStyle: (style: MenuStyle) => void;
    setThemeName: (style: ThemeName) => void;
    setThemeSidNavigation: (style: string) => void;
    setThemeText: (style: string) => void;
    setHasInputControlColor: (condition: boolean) => void;
    setDatePickerFormat: (condition: DateFormatType) => void;
    setPaginationStyle: (variant: PaginationVariant) => void;
    setRowsPerPage: (variant: string) => void;


    // toaster
    toastBgColor: string;
    toastTextColor: string;
    toastIconColor: string;
    toastFontSize: string;
    toastIcon: React.ReactNode | null;
    setToastBgColor: (color: string) => void;
    setToastTextColor: (color: string) => void;
    setToastIconColor: (color: string) => void;
    setToastFontSize: (size: string) => void;
    setToastIcon: (icon: React.ReactNode | null) => void;
    toastPosition: ToastPosition;
    setToastPosition: (pos: ToastPosition) => void;


    toastIconName: string;
    setToastIconName: (name: string) => void;



}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasInputControlColor, setHasInputControlColor] = useState<boolean>(() => {
        return localStorage.getItem("hasInputControlColor") === "true";
    });
    const [datePickerFormat, setDatePickerFormat] = useState<DateFormatType>(() => (localStorage.getItem("datePickerFormat") as DateFormatType) || "yyyy-MM-dd");
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem("theme") as Theme) || "light");
    const [hash, setHash] = useState<string>("");
    const [company, setCompany] = useState<ICompany | null>(() => {
        const stored = localStorage.getItem("company");
        return stored ? (JSON.parse(stored) as ICompany) : null;
    });
    const [direction, setDirection] = useState<Direction>(() => (localStorage.getItem("direction") as Direction) || "ltr");
    const [fontSize, setFontSize] = useState<FontSize>(() => (localStorage.getItem("fontSize") as FontSize) || "16px");
    const [menuStyle, setMenuStyle] = useState<MenuStyle>(() => (localStorage.getItem("menuStyle") as MenuStyle) || "default");
    const [headerStyle, setHeaderStyle] = useState<HeaderStyle>(() => (localStorage.getItem("headerStyle") as HeaderStyle) || "default");
    const [themeName, setThemeName] = useState<ThemeName>(() => (localStorage.getItem("themeName") as ThemeName) || "default");
    const [paginationStyle, setPaginationStyle] = useState<PaginationVariant>(() => (localStorage.getItem("paginationStyle") as PaginationVariant) || "simple");
    const [rowsPerPage, setRowsPerPage] = useState<string>(() => (localStorage.getItem("rowsPerPage") as string) || "10");
    const [layout, setLayout] = useState<string>(() => (localStorage.getItem("layout") as string) || "webapp");

    const [screenSize, setScreenSize] = useState<ScreenSize>(() => {
        const width = window.innerWidth;
        if (width < 640) return "mobile";
        if (width < 1024) return "tablet";
        return "desktop";
    });
    const [themeSidNavigation, setThemeSidNavigation] = useState<string>("default");
    const [themeText, setThemeText] = useState<string>("default");
    const [isCompanyByUser, setIsCompanyByUser] = useState<boolean>(localStorage.getItem("isCompanyByUser") ? true : false);


    // toaster
    const [toastBgColor, setToastBgColor] = useState<string>(() => localStorage.getItem("toastBgColor") || "#333");
    const [toastTextColor, setToastTextColor] = useState<string>(() => localStorage.getItem("toastTextColor") || "#fff");
    const [toastIconColor, setToastIconColor] = useState<string>(() => localStorage.getItem("toastIconColor") || "#4caf50");
    const [toastFontSize, setToastFontSize] = useState<string>(() => localStorage.getItem("toastFontSize") || "12px");
    const [toastPosition, setToastPosition] = useState<ToastPosition>(
        () => (localStorage.getItem("toastPosition") as ToastPosition) || "top-center"
    );
    const [toastIcon, setToastIcon] = useState<React.ReactNode | null>(null);




    useEffect(() => { localStorage.setItem("toastBgColor", toastBgColor) }, [toastBgColor]);
    useEffect(() => { localStorage.setItem("toastTextColor", toastTextColor) }, [toastTextColor]);
    useEffect(() => { localStorage.setItem("toastIconColor", toastIconColor) }, [toastIconColor]);
    useEffect(() => { localStorage.setItem("toastFontSize", toastFontSize) }, [toastFontSize]);
    useEffect(() => {
        localStorage.setItem("toastPosition", toastPosition);
    }, [toastPosition]);


    const [toastIconName, setToastIconName] = useState<string>(() => localStorage.getItem("toastIconName") || "");
    useEffect(() => {
        localStorage.setItem("toastIconName", toastIconName);
    }, [toastIconName]);


    // Whenever toastIconName changes, update toastIcon ReactNode
    useEffect(() => {
        if (
            toastIconName &&
            (Object.keys(iconMap) as Array<keyof typeof iconMap>).includes(toastIconName as keyof typeof iconMap)
        ) {
            setToastIcon(<FontAwesomeIcon icon={iconMap[toastIconName as keyof typeof iconMap]} />);
        } else {
            setToastIcon(null);
        }
    }, [toastIconName]);


    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                //console.log("mobile")
                setScreenSize("mobile");
            } else if (width < 1024) {
                //console.log("tablet")
                setScreenSize("tablet");
            } else {
                //console.log("desktop")
                setScreenSize("desktop");
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        localStorage.setItem("company", JSON.stringify(company));
    }, [company]);

    useEffect(() => {
        localStorage.setItem("paginationStyle", paginationStyle);
    }, [paginationStyle]);

    useEffect(() => {
        localStorage.setItem("rowsPerPage", rowsPerPage);
    }, [rowsPerPage]);

    useEffect(() => {
        localStorage.setItem("datePickerFormat", datePickerFormat);
    }, [datePickerFormat]);

    useEffect(() => {
        localStorage.setItem("themeSidNavigation", themeSidNavigation);
    }, [themeSidNavigation]);

    useEffect(() => {
        localStorage.setItem("themeText", themeText);
    }, [themeText]);

    useEffect(() => {
        localStorage.setItem("layout", layout);
    }, [layout]);

    useEffect(() => {
        localStorage.setItem("hasInputControlColor", String(hasInputControlColor));
        //console.log('hasInputControlColor', hasInputControlColor)
    }, [hasInputControlColor]);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("isCompanyByUser", "true");
    }, [isCompanyByUser]);

    useEffect(() => {
        document.documentElement.setAttribute("dir", direction);
        localStorage.setItem("direction", direction);
    }, [direction]);


    useEffect(() => {
        localStorage.setItem("fontSize", fontSize);
        document.documentElement.style.fontSize = fontSize;
    }, [fontSize]);

    useEffect(() => {
        localStorage.setItem("menuStyle", menuStyle);
    }, [menuStyle]);

    useEffect(() => {
        localStorage.setItem("headerStyle", headerStyle);
    }, [headerStyle]);


    useEffect(() => {
        localStorage.setItem("themeName", themeName);
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{
            company,
            theme,
            hash,
            direction,
            fontSize,
            menuStyle,
            headerStyle,
            themeName,
            screenSize,
            themeSidNavigation,
            themeText,
            hasInputControlColor,
            datePickerFormat,
            paginationStyle,
            rowsPerPage,
            layout,
            // toaster
            toastBgColor,
            toastTextColor,
            toastIconColor,
            toastFontSize,
            toastIcon,
            toastPosition,
            isCompanyByUser,

            setIsCompanyByUser,
            setLayout,
            setCompany,
            setTheme,
            setHash,
            setDirection,
            setFontSize,
            setMenuStyle,
            setHeaderStyle,
            setThemeName,
            setThemeSidNavigation,
            setThemeText,
            setHasInputControlColor,
            setDatePickerFormat,
            setPaginationStyle,
            setRowsPerPage,

            // toaster
            setToastBgColor,
            setToastTextColor,
            setToastIconColor,
            setToastFontSize,
            setToastIcon,
            setToastPosition,

            toastIconName,
            setToastIconName,



        }}>
            <div className={`${theme} ${direction}`} >
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
