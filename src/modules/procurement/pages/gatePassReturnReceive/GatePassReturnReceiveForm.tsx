import { AppDispatch, RootState } from '@/app/store';
import { Column, CustomDataTable } from '@/components/data-display/CustomDataTable';
import { useTheme } from '@/hooks/useTheme';
import { showErrorToast, showSuccessToast } from '@/utils/toastUtils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { GATE_PASS_SAVE, getRoutes, RouteLayout } from '@/app/constants';
import { getRoutes, RouteLayout } from '@/app/constants';
import CustomDatePicker from '@/components/form/CustomDatePicker';
import { FormField } from '@/components/form/FormField';
import Label from '@/components/form/Label';
import SimpleInputBox from '@/components/form/SimpleInputBox';
import { clearGatePassMessages, getGatePass, getPagedGatePass, getPagedGatePassReturnReceive, updateGatePassReturnReceiveField, updateGatePassReturnReceiveItemField } from '../../reduxSlices/gatePassSlice';
import { IGatePassReturnReceive, IGatePassReturnReceiveItem } from '../gatePass/gatePass.interface';
import { useParams } from 'react-router-dom';
import { useDashboardActions } from '@/layouts/DashboardLayout';
import { ActionButtons, ActionType } from '@/components/layout/ActionButtons';
import { useHotToast } from '@/utils/hotToast.util';

const GatePassReturnReceiveForm = () => {
    const dispatch: AppDispatch = useDispatch();
    const { gatePass, gatePassList, gatePassReturnReceiveList, gatePassReturnReceive, gatePassReturnReceiveItem, gatePassReturnReceiveItemList, error, message, loading } = useSelector((state: RootState) => state.gatePass);
    const { rowsPerPage, layout } = useTheme();
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    const { id } = useParams();
    const webRoutes = getRoutes(layout as RouteLayout);
    const { setActions } = useDashboardActions();
    const [isEditMode, setIsEditMode] = useState(false);
    const currentGatePass = gatePassReturnReceiveList.find((g) => g.id === Number(id));
    const [rows, setRows] = useState<IGatePassReturnReceiveItem[]>([]);
    const items = currentGatePass?.items || [];
    const { showHotError, showHotSuccess } = useHotToast();

    // --- Action Button Handlers --- 
    const handleAction = useCallback(
        (action: ActionType) => {
            // switch (action) {
            //     case "save":
            //         break;
            //     case "update":
            //         break;
            //     case "delete":
            //         break;
            //     case "clear":
            //         break;
            //     case "preview":
            //         break;
            // }
        },
        [dispatch, gatePass]
    );

    useEffect(() => {
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);


    useEffect(() => {
        if (id) {
            dispatch(getGatePass(Number(id)));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (error) {
            showHotError("Failed to load data", { bgColor: "#FF0000", textColor: "#ffffff", width: "250px", icon: "⚠️", position: "bottom-right" });
            dispatch(clearGatePassMessages());
        }
    }, [error]);

    useEffect(() => {
        if (items.length) {
            setRows(items);
        }
    }, [items]);

    useEffect(() => {
        if (message) {
            showSuccessToast(message);
            dispatch(clearGatePassMessages());
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

    const handleChange = (key: keyof IGatePassReturnReceive, value: string, displayValue?: string) => {
        dispatch(
            updateGatePassReturnReceiveField({
                key: key,
                value: value,
            })
        );
    };


    const handleChangeOnTable = (
        id: number,
        field: keyof IGatePassReturnReceiveItem,
        value: string | number
    ) => {
        setRows((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, [field]: value } : row
            )
        );
    };



    useEffect(() => {
        console.log("Dropdown changed to:", openDropdownId);
    }, [openDropdownId]);

    useEffect(() => {
        document.title = "GatePass List";
        // dispatch(getPagedGatePass({ perPage: Number(rowsPerPage) }));
        return () => {
            document.title = "";
        };
    }, [dispatch]);


    const detailsColumns: Column<IGatePassReturnReceiveItem>[] = useMemo(() => [
        {
            key: "itemType",
            header: "Item",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "gpQty",
            header: "GP QTY",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "receiveQty",
            header: "RCV QTY",
            align: "left",
            width: "w-[300px]",
            paddingNone: true,
            render: (row) => (
                <SimpleInputBox
                    value={row.receiveQty}
                    onChange={(val) =>
                        handleChangeOnTable(row.id, "receiveQty", val)
                    }
                    id="receiveQty"
                    type="number"
                    placeholder="Type Receive Quantity"
                    className="w-full rounded-none"
                />
            ),
        },
        {
            key: "allReceive",
            header: "ALL RCV",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "uom",
            header: "Uom",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "receiveRemarks",
            header: "Receive Remarks",
            align: "left",
            width: "w-[300px]",
            paddingNone: true,
            render: (row) => (
                <SimpleInputBox
                    value={row.receiveRemarks}
                    onChange={(val) =>
                        handleChangeOnTable(row.id, "receiveRemarks", val)
                    }
                    id="receiveRemarks"
                    type="text"
                    placeholder=""
                    className="w-full rounded-none"
                />
            ),
        },
        {
            key: "buyer",
            header: "Buyer",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "style",
            header: "Style",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "color",
            header: "Color",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "size",
            header: "Size",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "remarks",
            header: "Remarks",
            align: "left",
            width: "w-[300px]",
        },
        {
            key: "noOfPackets",
            header: "NO. OF PKT",
            align: "left",
            width: "w-[300px]",
        },
    ], [openDropdownId, handleToggle]);

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
                <div className='border border-black grid grid-cols-1 lg:grid-cols-4 p-2 mt-0'>
                    {/* General Info */}
                    <div>
                        <Label className='text-12-8' text="Date" htmlFor="" weight='bold' />
                        <div className="flex gap-3"><Label text="Date:" htmlFor="" weight='normal' /><span>{currentGatePass?.date}</span></div>
                        <div className="flex gap-3"><Label text="Gate Pass No:" htmlFor="" weight='normal' /><span>{currentGatePass?.refNo}</span></div>
                        <div className="flex gap-3"><Label text="Gate Pass Type:" htmlFor="" weight='normal' /><span>{currentGatePass?.gatePassType}</span></div>
                        <div className="flex gap-3"><Label text="Item Type:" htmlFor="" weight='normal' /><span>{currentGatePass?.itemType}</span></div>
                        <div className="flex gap-3"><Label text="GMT Type:" htmlFor="" weight='normal' /><span>{currentGatePass?.gmtType}</span></div>
                    </div>
                    {/* Sender Info */}
                    <div>
                        <div className="flex gap-3"><Label className='text-12-8' text="Sender Info" htmlFor="" weight='bold' /></div>
                        <div className="flex gap-3"><Label text="Name:" htmlFor="" weight='normal' /><span>{currentGatePass?.senderName}</span></div>
                        <div className="flex gap-3"><Label text="Ph No:" htmlFor="" weight='normal' /><span>{currentGatePass?.senderPhone}</span></div>
                    </div>
                    {/* Carried By Info */}
                    <div>
                        <div className="flex gap-3"><Label className='text-12-8' text="Carried by Info" htmlFor="" weight='bold' /></div>
                        <div className="flex gap-3"><Label text="Name:" htmlFor="" weight='normal' /><span>{currentGatePass?.carriedName}</span></div>
                        <div className="flex gap-3"><Label text="Department:" htmlFor="" weight='normal' /><span>{currentGatePass?.carriedDepartment}</span></div>
                        <div className="flex gap-3"><Label text="Designation:" htmlFor="" weight='normal' /><span>{currentGatePass?.carriedDesignation}</span></div>
                        <div className="flex gap-3"><Label text="Ph No:" htmlFor="" weight='normal' /><span>{currentGatePass?.senderPhone}</span></div>
                        <div className="flex gap-3"><Label text="Carried By:" htmlFor="" weight='normal' /></div>

                    </div>
                    {/* Receiver Info */}
                    <div>
                        <div className="flex gap-3"><Label className='text-12-8' text="Receiver Info" htmlFor="" weight='bold' /></div>
                        <div className="flex gap-3"><Label text="Name:" htmlFor="" weight='normal' /><span>{currentGatePass?.supplier}</span></div>
                        <div className="flex gap-3"><Label text="Person:" htmlFor="" weight='normal' /><span>{currentGatePass?.receiver}</span></div>
                        <div className="flex gap-3"><Label text="Address:" htmlFor="" weight='normal' /><span>{currentGatePass?.receiverAddress}</span></div>
                    </div>
                </div>
                <div className='border border-black grid grid-cols-1 lg:grid-cols-4 gap-2 p-2 mt-2'>
                    <FormField
                        label="Receive Date"
                        id="receiveDate"
                        variant="inline"
                    >
                        <CustomDatePicker
                            selected={gatePassReturnReceive?.receiveDate ? new Date(gatePassReturnReceive.receiveDate) : null}
                            onChange={(date) => handleChange('receiveDate', date?.toLocaleString() || "")}
                        // dateFormat="MM/dd/yyyy"
                        />
                    </FormField>
                    <FormField
                        label="Gate Entry No"
                        id="gateEntryNo"
                        variant="inline"
                    >
                        <SimpleInputBox
                            value={gatePassReturnReceive.gateEntryNo}
                            onChange={(val) => handleChange("gateEntryNo", val)}
                            id="gateEntryNo"
                            type="text"
                            placeholder="Gate Entry No"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Return Carried By"
                        id="returnCarriedBy"
                        variant="inline"
                    >
                        <SimpleInputBox
                            value={gatePassReturnReceive.returnCarriedBy}
                            onChange={(val) => handleChange("returnCarriedBy", val)}
                            id="returnCarriedBy"
                            type="text"
                            placeholder="Return Carried By"
                            className="w-full"
                        />
                    </FormField>
                    <FormField
                        label="Received By"
                        id="receiveBy"
                        variant="inline"
                    >
                        <SimpleInputBox
                            value={gatePassReturnReceive.receiveBy}
                            onChange={(val) => handleChange("receiveBy", val)}
                            id="receiveBy"
                            type="text"
                            placeholder="Received By"
                            className="w-full"
                        />
                    </FormField>
                </div>
                {/* Data Table */}
                <div className="space-y-4 col-span-1 mt-2">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={rows}
                        // columnsButton
                        loading={loading}
                        // perPageDropdown
                        onPageChange={(page) => dispatch(getPagedGatePass({ page, perPage: Number(rowsPerPage) }))}
                        onPerPageChange={(perPage) => dispatch(getPagedGatePass({ page: 1, perPage }))}
                    />
                </div>
            </div >
        </div >
    );
};

export default GatePassReturnReceiveForm;
