// Breadcrumbs.tsx
import { Link, useLocation } from "react-router-dom";

export default function BreadcrumbLocation() {

    const location = useLocation();
    const allSegments = location.pathname.split("/").filter(Boolean);

    // build hrefs from allSegments
    const breadcrumbs = allSegments.map((segment, index) => {
        const href = "/" + allSegments.slice(0, index + 1).join("/");                   // Example for index 1: slice(0, 1 + 1) = ["dashboard", "projects"]
        return {
            label: decodeURIComponent(segment)
                .replace(/-/g, " ")                                                     // converts hyphens to spaces.
                .replace(/\b\w/g, (c) => c.toUpperCase()),                              // capitalizes each word.
            href,
        };
    });

    // how it works (displays label in breadcrumb and navigates through href)
    // [
    //     { label: "Dashboard", href: "/dashboard" },
    //     { label: "Projects", href: "/dashboard/projects" },
    //     { label: "12", href: "/dashboard/projects/12" }
    // ]

    // when rendering, skip index you don’t want
    return (
        <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="breadcrumb-link">Home</Link>
            {breadcrumbs.map((bc, idx) => {

                if (idx === 0) return null;                                             // hides 'webapp' from http://localhost:5173/webapp/dashboard/.../.../... type of URLs

                return (
                    <span key={bc.href} className="flex items-center space-x-2">
                        <span className="breadcrumb-separator">/</span>
                        {idx === breadcrumbs.length - 1 ? (
                            <span className="breadcrumb-active">{bc.label}</span>
                        ) : (
                            <Link to={bc.href} className="breadcrumb-link">
                                {bc.label}
                            </Link>
                        )}
                    </span>
                );
            })}
        </nav>
    );

}
