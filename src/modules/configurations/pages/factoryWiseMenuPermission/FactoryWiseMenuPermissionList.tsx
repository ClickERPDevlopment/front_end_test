import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MoreVertical, PlusSquare } from 'react-feather';
import { Link, useNavigate, } from 'react-router-dom';
import { AppDispatch, RootState } from '@/app/store';
import { useTheme } from '@/hooks/useTheme';
import { Column, CustomDataTable } from '@/components/data-display/CustomDataTable';
import Panel from '@/components/layout/Panel';
import PageHeader from '@/components/layout/PageHeader';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';
import { removeCurrency } from '../../../accounts/reduxSlices/currencySlice';
import { getRoutes, RouteLayout } from '@/app/constants';
import { DropdownMenu } from '@/components/form/DropdownMenu';
import { clearFactoryWiseMenuPermissionMessages, getFactoryWiseMenuPermissionSummary, getPagedFactoryWiseMenuPermissions } from '../../reduxSlices/factoryWiseMenuPermission.Slice';
import { IFactoryWiseMenuPermission } from './factoryWiseMenuPermission.interface';
import { FormField } from '@/components/form/FormField';
import SelectDropdown from '@/components/form/SelectDropdown';
import Button from '@/components/form/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSave } from '@fortawesome/free-solid-svg-icons';
import FeatherIcon from '@/components/FeatherIcon';
import { companyId } from '../../../../utils/local-storage-utils';


const FactoryWiseMenuPermissionList = () => {

    const dispatch: AppDispatch = useDispatch();
    const { factoryWiseMenuPermission, factoryWiseMenuPermissions, paginationObject, error, message, loading } = useSelector((state: RootState) => state.factoryWiseMenuPermission);
    const { company, companies } = useSelector((state: RootState) => state.company);
    const { rowsPerPage, layout } = useTheme();
    const navigate = useNavigate();
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    const webRoutes = getRoutes(layout as RouteLayout);

    useEffect(() => {
        if (error) {
            showErrorToast(error);
            dispatch(clearFactoryWiseMenuPermissionMessages());
        }

    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearFactoryWiseMenuPermissionMessages());
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
        document.title = "FactoryWiseMenuPermission List";
        // dispatch(getPagedCurrencies({ perPage: Number(rowsPerPage) }));
        // dispatch(getAllFactoryWiseMenuPermissionsFromJson());
        return () => {
            document.title = "";
        };
    }, [dispatch]);

    const handleChange = (key: keyof IFactoryWiseMenuPermission, value: string) => {
        if (key === "companyId") {
            const selectedId = Number(value);
            dispatch(getFactoryWiseMenuPermissionSummary(selectedId));
        }
    };


    const handleNavigate = () => {
        navigate(webRoutes.FACTORY_WISE_MENU_PERMISSION_SAVE);
    };


    const handleFactorySelection = useCallback((item: IFactoryWiseMenuPermission) => {
        const id = item.companyId
        debugger
        navigate(`${webRoutes.FACTORY_WISE_MENU_PERMISSION_SAVE}/${id}`);
    }, [navigate, webRoutes.FACTORY_WISE_MENU_PERMISSION_SAVE]);



    useEffect(() => {
        if (company && company.companyId) {
            dispatch(getFactoryWiseMenuPermissionSummary(company.companyId));
        }
    }, [dispatch, company]);



    const detailsColumns: Column<any>[] = useMemo(
        () => [
            {
                key: "companyName",
                header: "Factory Name",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "noOfModule",
                header: "No of Module",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "noOfMenu",
                header: "No of Menu",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "createdBy",
                header: "Created By",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "updatedBy",
                header: "Updated By",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "actions",
                header: "Action",
                width: "w-[10px]",
                align: "center",
                render: (item: IFactoryWiseMenuPermission) => {
                    return (
                        <>
                            <Button
                                onClick={() => handleFactorySelection(item)}
                                variant="flat"
                                size="sm"
                                className="p-1 bg-amber-300"
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                            </Button>
                        </>
                    );
                },
            },
        ],
        [handleFactorySelection, webRoutes.FACTORY_WISE_MENU_PERMISSION_SAVE]
    );

    useEffect(() => {
        console.log("detailsColumns changed");
    }, [detailsColumns]);


    return (
        <div>
            {/* Bottom Section: Full-width Table */}
            <div className="grid grid-cols-1 mt-2">
                <div className="space-y-4 col-span-1">
                    {/* <div className='flex justify-end'>
                        <Button
                            onClick={handleNavigate}
                            size="sm"
                            className='mt-1'
                        >
                            Create New
                        </Button>

                    </div> */}

                    <CustomDataTable
                        columns={detailsColumns}
                        data={factoryWiseMenuPermissions}
                        // columnsButton
                        loading={loading}
                        // perPageDropdown
                        // onPageChange={(page) => dispatch(getPagedFactoryWiseMenuPermissions({ page, perPage: Number(rowsPerPage) }))}
                        // paginationObject={paginationObject}
                        // onPerPageChange={(perPage) => dispatch(getPagedFactoryWiseMenuPermissions({ page: 1, perPage }))}
                        buttons={<><Button to={webRoutes.FACTORY_WISE_MENU_PERMISSION_SAVE || "#"} size="sm" ><FeatherIcon icon={PlusSquare} /> Create New</Button></>}
                    />
                </div>
            </div >
        </div >
    );
};

export default FactoryWiseMenuPermissionList;
