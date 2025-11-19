import { getRoutes, RouteLayout } from '@/app/constants';
import { AppDispatch, RootState } from '@/app/store';
import { Column, CustomDataTable } from '@/components/data-display/CustomDataTable';
import { DropdownMenu } from '@/components/form/DropdownMenu';
import PageHeader from '@/components/layout/PageHeader';
import Panel from '@/components/layout/Panel';
import { useTheme } from '@/hooks/useTheme';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { MoreVertical } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Link, } from 'react-router-dom';
import { clearLineMessages, getPagedLines, removeLine } from '../../reduxSlices/lineSlice';
import { ILine } from './line.interface';


const LineList = () => {

    const dispatch: AppDispatch = useDispatch();
    const { lines, paginationObject, error, message, loading } = useSelector((state: RootState) => state.line);
    const { rowsPerPage, layout } = useTheme();
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearLineMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearLineMessages());
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
        document.title = "Line List";
        // dispatch(getPagedLines({ perPage: Number(rowsPerPage) }));
        return () => {
            document.title = "";
        };
    }, [dispatch]);

    const handleDelete = async (id: number, closeDropdown: () => void) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            const resultAction = await dispatch(removeLine(id));
            if (removeLine.fulfilled.match(resultAction)) {
                // Delete success, now refetch
                dispatch(getPagedLines({ perPage: Number(rowsPerPage) }));
                closeDropdown();
                setOpenDropdownId("");
            } else {
                // Optional: show error
                console.error("Failed to delete:", resultAction.payload);
            }
        }
    };

    const detailsColumns: Column<ILine>[] = useMemo(() => [
        {
            key: "actions",
            header: "Action",
            width: "w-[10px]",
            align: "center",
            render: (_item: ILine, index: number) => {
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
                                        to={`${webRoutes.LINE_SAVE}/${_item.id}`}
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
            key: "lineCode",
            header: "Line Code",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "lineName",
            header: "Line Name",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "chiefSupervisor",
            header: "Line Chief Supervisor",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "bestFor",
            header: "Best For",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "operatorQTY",
            header: "Operator QTY",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "helperQTY",
            header: "Helper QTY",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "remarks",
            header: "Remarks",
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
                    title="Line List"
                    buttonLabel="New Line"
                    buttonHref={webRoutes.LINE_SAVE}
                />
            }
        >
            {/* Bottom Section: Full-width Table */}
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={lines}
                        columnsButton
                        loading={loading}
                        perPageDropdown
                        onPageChange={(page) => dispatch(getPagedLines({ page, perPage: Number(rowsPerPage) }))}
                        paginationObject={paginationObject}
                        onPerPageChange={(perPage) => dispatch(getPagedLines({ page: 1, perPage }))}
                    />
                </div>
            </div>
        </Panel>
    );
};

export default LineList;
