import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import { DropdownMenu } from "@/components/form/DropdownMenu";
import PageHeader from "@/components/layout/PageHeader";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, MoreVertical } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { clearColorMessages, getPagedColors, removeColor } from "../../reduxSlices/color.Slice";
import { IColor } from "./colorSetup.interface";



const ColorList = () => {

    const dispatch: AppDispatch = useDispatch();
    const { colors, color, paginationObject, error, message, loading } = useSelector((state: RootState) => state.color);
    const { rowsPerPage, layout } = useTheme();
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearColorMessages());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearColorMessages());
        }

    }, [message]);

    const handleToggle = useCallback((id: string) => {
        console.log("handleToggle called with:", id, "current openDropdownId:", openDropdownId);
        setOpenDropdownId(prev => {
            const newId = prev === id ? "" : id;
            console.log("Setting new openDropdownId:", newId);
            return newId;
        });
    }, []);

    useEffect(() => {
        console.log("Dropdown changed to:", openDropdownId);
    }, [openDropdownId]);

    useEffect(() => {
        document.title = "Color List";
        // dispatch(getPagedCurrencies({ perPage: Number(rowsPerPage) }));
        // dispatch(getAllColorsFromJson());
        return () => {
            document.title = "";
        };
    }, [dispatch]);

    const handleDelete = async (id: number, closeDropdown: () => void) => {
        if (window.confirm("Are you sure you want to delete this color?")) {
            const resultAction = await dispatch(removeColor(id));
            if (removeColor.fulfilled.match(resultAction)) {
                // Delete success, now refetch
                dispatch(getPagedColors({ perPage: Number(rowsPerPage) }));
                closeDropdown();
                setOpenDropdownId("");
            } else {
                // Optional: show error
                console.error("Failed to delete:", resultAction.payload);
            }
        }
    };

    // had to change to Column<any>[] instead of  Column<IColor>[]
    // now fixed the prob
    const detailsColumns: Column<IColor>[] = useMemo(() => [
        {
            key: "actions",
            header: "Action",
            width: "w-[10px]",
            align: "center",
            render: (_item: IColor, index: number) => {
                const dropdownId = `dropdown-${_item.id}`;
                return (
                    <DropdownMenu
                        trigger={<MoreVertical size={16} />}
                        onClose={() => setOpenDropdownId("")} // optional, if you're tracking open IDs
                    >
                        {({ closeDropdown }: { closeDropdown: () => void }) => (
                            <ul className="text-sm">
                                <li className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <Link
                                        to={`${webRoutes.COLOR_SAVE}/${_item.id}`}
                                        className="block px-4 py-2 w-full"
                                        onClick={closeDropdown}
                                    >
                                        Edit
                                    </Link>
                                </li>
                                <li className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <button
                                        onClick={() => {
                                            handleDelete(_item.id, closeDropdown);
                                        }}
                                        className="block px-4 py-2 w-full cursor-pointer text-center"
                                    >
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        )}
                    </DropdownMenu>
                );
            },
        },
        {
            key: "id",
            header: "id",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "buyerId",
            header: "buyerId",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "buyerName",
            header: "buyerName",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "colorType",
            header: "colorType",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "colorName",
            header: "colorName",
            align: "left",
            width: "w-[300px]",
        },
    ], [openDropdownId, handleToggle]);

    useEffect(() => {
        console.log("detailsColumns changed");
    }, [detailsColumns]);


    return (
        <Panel
            header={
                <PageHeader
                    title="Color List"
                    buttonLabel="New Color"
                    buttonHref={webRoutes.COLOR_SAVE}
                />

            }

        >
            <div className="space-y-4 col-span-1">
                <CustomDataTable
                    columns={detailsColumns}
                    data={colors}
                    columnsButton
                    loading={loading}
                    perPageDropdown
                    onPageChange={(page) => dispatch(getPagedColors({ page, perPage: Number(rowsPerPage) }))}
                    paginationObject={paginationObject}
                    onPerPageChange={(perPage) => dispatch(getPagedColors({ page: 1, perPage }))}
                />
            </div>
        </Panel>
    );
};

export default ColorList;
