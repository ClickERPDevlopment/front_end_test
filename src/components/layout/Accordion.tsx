import React, { useState, } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

type AccordionItem = {
    title: string;
    content: React.ReactNode;
};

type ModernAccordionProps = {
    items: AccordionItem[];
    width?: string; // e.g. w-full, w-[500px]
    maxHeight?: string; // e.g. max-h-[400px]
    multiple?: boolean;
};

const Accordion: React.FC<ModernAccordionProps> = ({
    items,
    width = 'w-full',
    maxHeight = 'max-h-[400px]',
    multiple = false,
}) => {
    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggle = (index: number) => {
        if (multiple) {
            setOpenIndexes((prev) =>
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
            );
        } else {
            setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
        }
    };

    return (
        <div className={`mx-auto ${width} ${maxHeight} overflow-auto`}>
            {items.map((item, index) => {
                const isOpen = openIndexes.includes(index);
                return (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-xl shadow-sm mb-3 transition-all duration-300"
                    >
                        <button
                            onClick={() => toggle(index)}
                            className="flex justify-between items-center w-full px-5 py-4 text-left font-semibold text-gray-800 cursor-pointer"
                        >
                            <span>{item.title}</span>
                            <FontAwesomeIcon icon={faChevronDown} className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div
                            className={`px-5 pt-0 overflow-auto transition-all duration-300 ${isOpen ? 'max-h-[400px] pb-4' : 'max-h-0'
                                }`}
                        >
                            <div className="text-gray-600">{item.content}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Accordion;
