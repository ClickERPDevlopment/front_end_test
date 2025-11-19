import React from "react";
import Accordion from "./Accordion";


interface DropdownSidebarProps {
    sections: {
        label: string;
        content: React.ReactNode;
    }[];
    allowMultiple?: boolean;
}

const DropdownSidebar: React.FC<DropdownSidebarProps> = ({
    sections,
    allowMultiple = false,
}) => {
    // map sections to Accordion items
    const items = sections.map((s) => ({
        title: s.label,
        content: s.content,
    }));

    return (
        <div className="px-2">
            <Accordion
                items={items}
                width="w-full"
                maxHeight="max-h-[600px]" // adjust if needed
                multiple={allowMultiple}
            />
        </div>
    );
};

export default DropdownSidebar;
