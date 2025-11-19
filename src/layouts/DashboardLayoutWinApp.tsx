import BreadcrumbLocation from "@/components/layout/BreadcrumbLocation";
import { useTheme } from "@/hooks/useTheme";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";


interface DashboardLayoutProps {
  actions?: ReactNode;
}

const DashboardLayoutWinApp = ({ actions: initialActions }: DashboardLayoutProps) => {
  const [actions, setActions] = useState<ReactNode>(initialActions ?? null);
  const rightSideBarRef = useRef<HTMLDivElement | null>(null);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const { themeName, screenSize, layout, setLayout, setCompany } = useTheme();

  useEffect(() => {
    setLayout('winapp')
    const companyId = Number(localStorage.getItem("companyId") || "0");
    setCompany({
      companyId,
      id: 0,
      name: "",
      isDefault: true
    })
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        rightSideBarRef.current &&
        !rightSideBarRef.current.contains(event.target as Node)
      ) {
        toggleRightSidebar(false);
      }
    };

    if (isRightSidebarOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isRightSidebarOpen]);

  const toggleRightSidebar = (condition: boolean) => {
    setIsRightSidebarOpen(condition); // Close the sidebar
  };

  return (
    <main className={` ${themeName}  p-5`}>
      <div className="flex items-center justify-between">
        <BreadcrumbLocation />
        <div className="flex gap-3">{actions}</div>
      </div>

      <Outlet context={{ setActions }} />
    </main>
  );
};

export default DashboardLayoutWinApp;

