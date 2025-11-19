import { AppDispatch, RootState } from '@/app/store';
import { Column, CustomDataTable } from '@/components/data-display/CustomDataTable';
import { useTheme } from '@/hooks/useTheme';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRoutes, RouteLayout } from '@/app/constants';
import Button from '@/components/form/Button';
import { FormField } from '@/components/form/FormField';
import SelectDropdown from '@/components/form/SelectDropdown';
import SimpleInputBox from '@/components/form/SimpleInputBox';
import { clearGatePassMessages, getGatePass, getPagedGatePass, getPagedGatePassReturnReceive } from '../../reduxSlices/gatePassSlice';
import { IGatePass, IGatePassReturnReceive } from '../gatePass/gatePass.interface';
import { navigate } from '@/utils/navigate';
import { Link } from 'react-router-dom';
import { useHotToast } from '@/utils/hotToast.util';

const GatePassReturnReceiveList = () => {
    const dispatch: AppDispatch = useDispatch();
    const { gatePass, gatePassList, gatePassReturnReceiveList, paginationObject, error, message, loading } = useSelector((state: RootState) => state.gatePass);
    const { company, companies } = useSelector((state: RootState) => state.company);
    const { rowsPerPage, layout } = useTheme();
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    const [gatePassNO, setGatePassNO] = useState<string>("");
    const [companyId, setCompany] = useState<string>("");
    const [proposedBy, setProposedBy] = useState<string>("");
    const webRoutes = getRoutes(layout as RouteLayout);
    const { showHotError, showHotSuccess } = useHotToast();

    useEffect(() => {
        dispatch(
            getPagedGatePassReturnReceive({
                page: 1,
                perPage: Number(rowsPerPage),
                searchCriteria: {
                    FactoryId: companyId ? Number(companyId) : undefined,
                    gatePassNo: gatePassNO || undefined,
                }
            })
        );
    }, [dispatch, rowsPerPage, gatePassNO, companyId]);

    const onPageChange = useCallback((page: number) => {
        dispatch(getPagedGatePassReturnReceive({
            page,
            perPage: Number(rowsPerPage),
            searchCriteria: {
                FactoryId: companyId ? Number(companyId) : undefined,
                gatePassNo: gatePassNO || undefined,
            }
        }));

    }, [dispatch, gatePassNO, rowsPerPage]);

    useEffect(() => {
        dispatch(getPagedGatePass({
            page: 1,
            perPage: Number(rowsPerPage),
            searchCriteria: {
                FactoryId: companyId ? Number(companyId) : undefined,
                refNo: gatePassNO || undefined,
            },
        }));
    }, [dispatch, rowsPerPage, gatePassNO, companyId]);

    useEffect(() => {
        if (error) {
            showHotError("Failed to load data", { bgColor: "#FF0000", textColor: "#ffffff", width: "250px", icon: "⚠️", position: "bottom-right" });
            dispatch(clearGatePassMessages());
        }
    }, [error]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearGatePassMessages());
        }
    }, [message]);

    const onPerPageChange = useCallback((perPage: number) => {
        dispatch(getPagedGatePass({ page: 1, perPage }));
    }, [dispatch]);

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
        document.title = "GatePass List";
        return () => {
            document.title = "";
        };
    }, [dispatch]);

    const detailsColumns: Column<IGatePassReturnReceive>[] = useMemo(
        () => [
            {
                key: "refNo",
                header: "Gate Pass No",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "receiverDepartment",
                header: "Department",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "proposedBy",
                header: "Proposed By",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "gatePassType",
                header: "Gate Pass Type",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "supplierName",
                header: "Org/Supplier Name",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "createdCompany",
                header: "Created Company",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "actions",
                header: "Action",
                align: "left",
                render: (_item: IGatePassReturnReceive, index: number) => {
                    return (
                        <Link to={`${webRoutes.GATE_PASS_RETURN_RECEIVE_SAVE}/${_item.id}`}>
                            <Button
                                size='sm'
                                className=''
                                variant='filled'
                            >
                                Receive
                            </Button>
                        </Link>
                    );
                },
            },
        ],
        []
    );

    useEffect(() => {
        console.log("detailsColumns changed");
    }, [detailsColumns]);


    function setSelectedDate(date: Date | null): void {
        throw new Error('Function not implemented.');
    }

    return (
        <div className='p-2 bg-white rounded-md shadow-md'>
            {/* Full-width Table */}
            < div className="px-1 grid grid-cols-1" >
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-2'>
                    <FormField
                        label="Factory"
                        id="company"
                        variant="inline"
                    >
                        <SelectDropdown
                            options={companies}
                            isSameKeyValue={false}
                            value={companyId?.toString() || ""}
                            onChange={(val) => setCompany(val.toString())}
                            labelKey='name'
                            valueKey='companyId'
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="GP No"
                        id="gatePassNo"
                        variant="inline"
                    >
                        <SimpleInputBox
                            value={gatePassNO}
                            onChange={setGatePassNO}
                            placeholder="Enter Gate Pass No"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Proposed By"
                        id="proposedBy"
                        variant="inline"
                    >
                        <SimpleInputBox
                            value={proposedBy}
                            onChange={setProposedBy}
                            id="proposedBy"
                            type="text"
                            placeholder="Proposed By"
                            className="w-full"
                        />
                    </FormField>
                </div>
                <div className="grid grid-cols-1 space-y-4 col-span-1 mt-2">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={gatePassReturnReceiveList}
                        loading={loading}
                        perPageDropdown
                        onPageChange={onPageChange}
                        paginationObject={paginationObject}
                    />
                </div>
            </div >
        </div >
    );
};

export default GatePassReturnReceiveList;
