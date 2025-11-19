import { getRoutes, RouteLayout } from '@/app/constants';
import { AppDispatch, RootState } from '@/app/store';
import { Column, CustomDataTable } from '@/components/data-display/CustomDataTable';
import { DropdownButton } from '@/components/form/DropdownButton';
import PageHeader from '@/components/layout/PageHeader';
import Panel from '@/components/layout/Panel';
import { useTheme } from '@/hooks/useTheme';
import { useCallback, useEffect } from 'react';
import { MoreVertical } from 'react-feather';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPaginatedChartOfAccounts } from '../../reduxSlices/chartOfAccountSlice';
import { IChartOfAccount } from './chartOfAccount.interface';

const ChartOfAccountsList = () => {

    const dispatch: AppDispatch = useDispatch();
    const { rowsPerPage,layout } = useTheme();
    const { chartOfAccounts, paginationObject } = useSelector((state: RootState) => state.chartOfAccount);
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        document.title = "Chart of Account List";
        dispatch(fetchPaginatedChartOfAccounts({ perPage: Number(rowsPerPage) }));
        return () => {
            document.title = "";
        };
    }, [dispatch]);

    const onPageChange = useCallback((page: number) => {
        dispatch(fetchPaginatedChartOfAccounts({ page, perPage: Number(rowsPerPage) }));
    }, [dispatch, rowsPerPage]);

    const onPerPageChange = useCallback((perPage: number) => {
        dispatch(fetchPaginatedChartOfAccounts({ page: 1, perPage }));
    }, [dispatch]);

    const detailsColumns: Column<IChartOfAccount>[] = [
        {
            key: "actions",
            header: "Action",
            width: "w-12",
            align: "center",
            render: (_item, index) => (
                <DropdownButton
                    icon={<MoreVertical size={16} />}
                    size="sm"
                    className="bg-transparent border-none"
                    label=""
                >
                    <ul className="text-sm">
                        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <Link
                                to={`${webRoutes.PRINT_PRODUCTION_ENTRY}/${_item.accNo}`}
                                className="block px-4 py-2 w-full"
                            >
                                Edit
                            </Link>
                        </li>
                        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                            <Link
                                to={`/delete/${index}`}
                                className="block px-4 py-2 w-full"
                            >
                                Delete
                            </Link>
                        </li>
                    </ul>
                </DropdownButton>
            ),
        },
        { key: 'accName', header: 'Ledger Name', align: 'left', width: "w-[300px]" },
        { key: 'parentAccName', header: 'Parent Ledger', align: 'left' },
    ];

    return (
        <Panel
            header={
                <PageHeader
                    title="Chart of Account List"
                    buttonLabel="New Chart of Account"
                    buttonHref={webRoutes.PRINT_PRODUCTION_ENTRY}
                />
            }
        >
            {/* Bottom Section: Full-width Table */}
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={chartOfAccounts}
                        columnsButton
                        perPageDropdown
                        onPageChange={onPageChange}
                        paginationObject={paginationObject}
                        onPerPageChange={onPerPageChange}
                    />
                </div>
            </div>
        </Panel>
    );
};

export default ChartOfAccountsList;
