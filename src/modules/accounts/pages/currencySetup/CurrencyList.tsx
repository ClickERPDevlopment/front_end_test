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
import { clearCurrencyMessages, getPagedCurrencies, removeCurrency } from '../../reduxSlices/currencySlice';
import { ICurrency } from './currency.interface';

const CurrencyList = () => {
    const dispatch: AppDispatch = useDispatch();
    const { currencies, paginationObject, error, message, loading } = useSelector((state: RootState) => state.currency);
    const { rowsPerPage, layout } = useTheme();
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearCurrencyMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearCurrencyMessages());
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
        document.title = "Currency List";
        // dispatch(getPagedCurrencies({ perPage: Number(rowsPerPage) }));
        return () => {
            document.title = "";
        };
    }, [dispatch]);

    const handleDelete = async (id: number, closeDropdown: () => void) => {
        if (window.confirm("Are you sure you want to delete this department?")) {
            const resultAction = await dispatch(removeCurrency(id));
            if (removeCurrency.fulfilled.match(resultAction)) {
                // Delete success, now refetch
                dispatch(getPagedCurrencies({ perPage: Number(rowsPerPage) }));
                closeDropdown();
                setOpenDropdownId("");
            } else {
                // Optional: show error
                console.error("Failed to delete:", resultAction.payload);
            }
        }
    };

    const detailsColumns: Column<ICurrency>[] = useMemo(() => [
        {
            key: "actions",
            header: "Action",
            width: "w-[10px]",
            align: "center",
            render: (_item: ICurrency, index: number) => {
                const dropdownId = `dropdown-${_item.Id}`;
                return (
                    <DropdownMenu
                        trigger={<MoreVertical size={16} />}
                        onClose={() => setOpenDropdownId("")} // optional, if you're tracking open IDs
                    >
                        {({ closeDropdown }: { closeDropdown: () => void }) => (
                            <ul className="text-sm">
                                <li className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <Link
                                        to={`${webRoutes.CURRENCY_SAVE}/${_item.Id}`}
                                        className="block px-4 py-2 w-full"
                                        onClick={closeDropdown}
                                    >
                                        Edit
                                    </Link>
                                </li>
                                <li className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <button
                                        onClick={() => {
                                            handleDelete(_item.Id, closeDropdown);
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
            key: "Id",
            header: "Id",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "Currencyname",
            header: "Currencyname",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "Currencycode",
            header: "Currencycode",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "Symbol",
            header: "Symbol",
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
                    title="Currency List"
                    buttonLabel="New Currency"
                    buttonHref={webRoutes.CURRENCY_SAVE}
                />
            }
        >

            {/* Bottom Section: Full-width Table */}
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={currencies}
                        columnsButton
                        loading={loading}
                        perPageDropdown
                        onPageChange={(page) => dispatch(getPagedCurrencies({ page, perPage: Number(rowsPerPage) }))}
                        paginationObject={paginationObject}
                        onPerPageChange={(perPage) => dispatch(getPagedCurrencies({ page: 1, perPage }))}
                    />
                </div>
            </div>
        </Panel>
    );
};

export default CurrencyList;

