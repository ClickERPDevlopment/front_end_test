import type React from "react";
import { ChevronDown, ChevronRight, } from "react-feather";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuItem } from "@/modules/configurations/types/menu.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

interface MultiLabelMenuProps {
    items: MenuItem[];
    level?: number;
}

const MultiLabelMenuByPortal: React.FC<MultiLabelMenuProps> = ({ items, level = 0, }) => {
    const [openItem, setOpenItem] = useState<Record<string, boolean>>({});

    const toggleMenu = (name: string) => {
        setOpenItem((prev) => ({ ...prev, [name]: !prev[name] }))
    }


    return (
        <div className="overflow-hidden">
            <ul className={`text-black`}>
                {
                    items.map((item, index) => {
                        return (
                            <li className="px-3 " key={`item_l-${level}_i-${index}`}>

                                {
                                    item.link || "" !== "" ?
                                        <Link to={item.link || ""} >
                                            <div
                                                onClick={() => toggleMenu(item.name)}
                                                className="cursor-pointer flex justify-between items-center px-3 h-[35px] hover:text-white hover:bg-[#132440] ">
                                                <div className="flex gap-2">
                                                    {
                                                        level === 0 ?
                                                           <FontAwesomeIcon icon={faEllipsisV} className="iconSub" />
                                                            : (item.submenu && item.submenu.length > 0 ?
                                                                <FontAwesomeIcon icon={faEllipsisV} className="iconSub" />
                                                                : <FontAwesomeIcon icon={faEllipsisV} className="iconSub" />
                                                            )
                                                    }
                                                    <span>{item.name}</span>
                                                </div>
                                                {
                                                    item.submenu && item.submenu.length > 0 &&
                                                    (
                                                        openItem[item.name] ? <ChevronDown className="w-4" /> : <ChevronRight className="w-4" />
                                                    )

                                                }
                                            </div>
                                        </Link> :
                                        <div
                                            onClick={() => toggleMenu(item.name)}
                                            className="cursor-pointer flex justify-between items-center px-3 h-[35px] hover:text-white hover:bg-[#132440] ">
                                            <div className="flex gap-2">
                                                {
                                                    level === 0 ?
                                                       <FontAwesomeIcon icon={faEllipsisV} className="iconSub" />
                                                        : (item.submenu && item.submenu.length > 0 ?
                                                            <FontAwesomeIcon icon={faEllipsisV} className="iconSub" />
                                                            : <FontAwesomeIcon icon={faEllipsisV} className="iconSub" />
                                                        )
                                                }
                                                <span>{item.name}</span>
                                            </div>
                                            {
                                                item.submenu && item.submenu.length > 0 &&
                                                (
                                                    openItem[item.name] ? <ChevronDown className="w-4" /> : <ChevronRight className="w-4" />
                                                )

                                            }
                                        </div>
                                }


                                {
                                    item.submenu && (
                                        <div className={`grid transition-[grid-template-rows] duration-500 ease-in-out
                                            ${openItem[item.name] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                            <MultiLabelMenuByPortal items={item.submenu} level={level + 1} />
                                        </div>
                                    )
                                }
                            </li>
                        )
                    })
                }
            </ul>
        </div >
    )
}

export default MultiLabelMenuByPortal;