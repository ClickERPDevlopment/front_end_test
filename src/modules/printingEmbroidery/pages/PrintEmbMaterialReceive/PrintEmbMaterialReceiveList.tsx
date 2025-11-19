import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/form/Button";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import FeatherIcon from "@/components/FeatherIcon";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PlusSquare } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { getPagedPrintEmbMaterialReceive } from "../../reduxSlices/printEmbMaterialReceive.slice";
import { EmbMaterialReceiveMasterType } from "./printEmbMaterialReceive.interface";

export default function PrintEmbMaterialReceiveList() {

    const dispatch: AppDispatch = useDispatch();
    const { rowsPerPage, layout, company } = useTheme();

    const { paginationObject, materialReceiveLst, error, message, loading } = useSelector(
        (state: RootState) => state.printEmbMaterialReceive
    );

    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    useEffect(() => {
        dispatch(getPagedPrintEmbMaterialReceive({ page: 1, perPage: Number(rowsPerPage), searchCriteria: { factoryId: company?.companyId || 0 } }));
    }, [dispatch]);


    const webRoutes = getRoutes(layout as RouteLayout);


    const onPageChange = useCallback((page: number) => {
        debugger
        dispatch(getPagedPrintEmbMaterialReceive({ page, perPage: Number(rowsPerPage) }));
    }, [dispatch, rowsPerPage]);

    const onPerPageChange = useCallback((perPage: number) => {
        dispatch(getPagedPrintEmbMaterialReceive({ page: 1, perPage }));
    }, [dispatch]);


    const handleToggle = useCallback((id: string) => {
        console.log(
            "handleToggle called with:",
            id,
            "current openDropdownId:",
            openDropdownId
        );
        setOpenDropdownId((prev) => {
            const newId = prev === id ? "" : id;
            console.log("Setting new openDropdownId:", newId);
            return newId;
        });
    }, []);

    const detailsColumns: Column<EmbMaterialReceiveMasterType>[] = useMemo(
        () => [
            {
                key: "RECEIVE_DATE",
                header: "Receive Date",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "MATERIAL_RECEIVE_NO",
                header: "Receive No",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "BUYER",
                header: "Buyer",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "actions",
                header: "Action",
                width: "w-[10px]",
                align: "center",
                render: (_item: EmbMaterialReceiveMasterType, index: number) => {
                    const dropdownId = `dropdown-${_item.ID || index}`;
                    return (
                        <>
                            <Button
                                href={`${webRoutes.PRINT_EMB_MATERIAL_RECEIVE_ENTRY}/${_item.ID}`}
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

        [openDropdownId, handleToggle]
    );

    return (
        <Panel
            rounded={false}
        >
            {/* Bottom MaterialGroup: Full-width Table */}
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={materialReceiveLst}
                        columnsButton
                        loading={loading}
                        perPageDropdown
                        haveBreadcrumb
                        onPageChange={onPageChange}
                        paginationObject={paginationObject}
                        onPerPageChange={onPerPageChange}
                        buttons={<><Button to={webRoutes.PRINT_EMB_MATERIAL_RECEIVE_ENTRY || "#"} size="sm" ><FeatherIcon icon={PlusSquare} /> New Receive</Button></>}
                    />
                </div>
            </div>
        </Panel>
    );
}
