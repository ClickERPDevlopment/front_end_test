import { getRoutes, RouteLayout } from "@/app/constants";
import { setDropdownData } from "@/app/dropdownSlice";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import Button from "@/components/form/Button";
import DropdownAutoSuggest from "@/components/form/DropdownAutoSuggest";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import { useTheme } from "@/hooks/useTheme";
import { formatDate } from "@/utils/dateUtil";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPagedUnreleasedPO } from "../../reduxSlices/poRelease.slice";
import { IPoRelease } from "./poRelease.interface";

import { useAuth } from "@/hooks/useAuth";
import { getAllSupplier } from "@/modules/procurement/reduxSlices/supplierSlice";
export default function PoReleaseApprovalList() {

    const dispatch: AppDispatch = useDispatch();
    const { rowsPerPage, layout, company } = useTheme();
    const { poList, paginationObject, error, message, loading } = useSelector(
        (state: RootState) => state.poRelease
    );
    const { suppliers, } = useSelector((state: RootState) => state.supplier);
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    const [status, setStatus] = useState<string>("unreleased");
    const [poNoSearch, setPoNoSearch] = useState<string>("");
    const [supplierIDSearch, setSupplierIDSearch] = useState<Number>(0);
    const [supplierNameSearch, setSupplierNameSearch] = useState<string>("");
    const { setToken, setRefreshToken } = useAuth();
    const [purchaseType, setPurchaseType] = useState<"Service" | "General" | "All">("All");
    useEffect(() => {
        console.log("loaded")
        const handleMessage = (event: MessageEvent) => {
            const data = event.data;
            if (data && data.type === "click_api_token") {
                // console.log("Event", event.data)
                localStorage.setItem("click_api_token", data.token)
            }

            if (data && data.type === "click_api_refresh_token") {
                // console.log("Event", event.data)
                localStorage.setItem("click_api_refresh_token", data.refreshToken)
            }

            if (data && data.type === "companyId") {
                // console.log("Event", event.data)
                localStorage.setItem("companyId", data.companyId)
                localStorage.setItem("company", JSON.stringify({
                    companyId: data.companyId,
                    id: 0,
                    name: "",
                }))
            }

        };

        window.addEventListener("message", handleMessage);

        // Cleanup on unmount
        return () => window.removeEventListener("message", handleMessage);
    }, []);


    useEffect(() => {
        dispatch(
            getPagedUnreleasedPO({
                page: 1,
                perPage: Number(rowsPerPage),
                searchCriteria: {
                    factoryId: company?.companyId || 0,
                    SupplierId: supplierIDSearch ? Number(supplierIDSearch) : undefined,
                    PoNo: poNoSearch || undefined,
                    status: status || null,
                    purchaseType: purchaseType || null
                }
            })
        );
    }, [dispatch, company, status, supplierIDSearch, poNoSearch, purchaseType, rowsPerPage]);

    // link suppliers dropdown list
    useEffect(() => {
        dispatch(setDropdownData({
            data: suppliers,
            name: "supplierList",
            labelKey: "Name",
            valueKey: "Id",
            hasMoreData: suppliers.length !== 0,
        }));
    }, [suppliers]);

    useEffect(() => {
        dispatch(getAllSupplier());
    }, [dispatch]);

    const onPageChange = useCallback((page: number) => {
        debugger
        dispatch(getPagedUnreleasedPO({
            page,
            perPage: Number(rowsPerPage),
            searchCriteria: {
                factoryId: company?.companyId || 0,
                SupplierId: supplierIDSearch ? Number(supplierIDSearch) : undefined,
                PoNo: poNoSearch || undefined,
                status: status || null,
                purchaseType: purchaseType || null
            }
        }));

    }, [dispatch, company, status, supplierIDSearch, poNoSearch, purchaseType, rowsPerPage]);

    const webRoutes = useMemo(() => {
        if (layout && layout.trim() !== "") {
            return getRoutes(layout as RouteLayout);
        }
        return null;
    }, [layout]);


    // here need to work

    // const onPerPageChange = useCallback((perPage: number) => {
    //     dispatch(getPagedUnreleasedPO({
    //         page: 1,
    //         perPage,
    //         searchCriteria: {
    //             factoryId: company?.companyId || 0,
    //             SupplierId: supplierIDSearch ? Number(supplierIDSearch) : undefined,
    //             PoNo: poNoSearch || undefined,
    //             status: status || null,
    //             purchaseType: purchaseType || null
    //         }
    //     }));
    // }, [company, supplierIDSearch, poNoSearch, status, purchaseType, dispatch]);


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

    const detailsColumns: Column<IPoRelease>[] = useMemo(
        () => [
            {
                key: "purchaseOrderNo",
                header: "PO No",
                align: "left",
            },
            {
                key: "poDate",
                header: "PO Date",
                align: "left",
                render: (row) => formatDate(row.poDate, "dd-MMM-yyyy").toString(),
            },
            {
                key: "supplierName",
                header: "Supplier",
                align: "left",
            },
            {
                key: "prefix",
                header: "Factory",
                align: "left",
            },
            {
                key: "proposeBy",
                header: "Proposed By",
                align: "left",
            },
            {
                key: "departmentName",
                header: "Department",
                align: "left",
            },
            {
                key: "approvedName",
                header: "Approved By",
                align: "left",
            },
            {
                key: "orderType",
                header: "Purchase Type",
                align: "left",
            },
            {
                key: "actions",
                header: "Action",
                width: "w-[10px]",
                align: "center",
                render: (_item: IPoRelease) => {
                    const href =
                        webRoutes?.PROCUREMENT_UNRELEASED_LIST && _item.id
                            ? `${webRoutes.PROCUREMENT_UNRELEASED_LIST_APPROVE}/${_item.id}`
                            : "#";

                    return (
                        <Button
                            href={href}
                            variant="flat"
                            size="sm"
                            className={`p-1 transition-colors duration-200 rounded-md ${_item.isReleased === 1
                                ? "bg-green-100 text-green-700 hover:bg-green-200 cursor-default"
                                : _item.myReleaseStatus === 1
                                    ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                    : "bg-green-100 text-green-700 hover:bg-green-200 cursor-default"
                                }`}
                        >
                            <FontAwesomeIcon
                                icon={faCheckCircle}
                                className={`${_item.isReleased === 1
                                    ? "text-green-600"
                                    : _item.myReleaseStatus === 1
                                        ? "text-amber-600"
                                        : "text-green-600"
                                    }`}
                            />
                        </Button>



                    );
                },
            },
        ],
        [openDropdownId, handleToggle]
    );

    const statusOptions = [
        { id: 'released', name: 'Released' },
        { id: 'unreleased', name: 'Unreleased' },
        { id: 'all', name: 'All' },
    ];

    const purchaseTypeOptions = [
        { id: 'Service', name: 'Service' },
        { id: 'General', name: 'General' },
        { id: 'All', name: 'All' },
    ];

    return (

        <>

            <div className="w-full md:w-full lg:w-full  flex flex-wrap">
                {/* PO No */}
                <div className="w-full md:w-1/2 lg:w-1/5 px-1">
                    <FormField
                        label="PO No"
                        id="poNo"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <SimpleInputBox
                            value={poNoSearch.toString()}
                            onChange={(val) => setPoNoSearch(val)}
                            placeholder="Search PO No"
                            className="text-sm w-full"
                        />
                    </FormField>
                </div>


                {/* Status */}
                <div className="w-full md:w-1/2 lg:w-1/5 px-1">
                    <FormField
                        label="Status"
                        id="release"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <SelectDropdown
                            options={statusOptions}
                            value={status.toString() || ""}
                            isSameKeyValue={false}
                            labelKey="name"
                            valueKey="id"
                            onChange={(val) => setStatus(val.toString())}
                            className="text-sm w-full"
                        />
                    </FormField>
                </div>


                {/* Supplier */}
                <div className="w-full md:w-1/2 lg:w-2/5 px-1">
                    <FormField
                        label="Supplier"
                        id="supplier"
                        variant="inline"
                        required
                        labelFontSize="text-sm"
                    >
                        <DropdownAutoSuggest
                            name="supplierList"
                            value={supplierNameSearch}
                            onSelect={(val: any, item: any) => {
                                setSupplierIDSearch(Number(val));
                                setSupplierNameSearch(item ? item.Name : "");
                            }}
                        />
                    </FormField>
                </div>


                {/* Purchase Type */}
                <div className="w-full md:w-1/2 lg:w-1/5 px-1">
                    <FormField
                        label="Purchase Type"
                        id="purchaseType"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <SelectDropdown
                            options={purchaseTypeOptions}
                            value={purchaseType.toString() || ""}
                            isSameKeyValue={false}
                            labelKey="name"
                            valueKey="id"
                            onChange={(val) => setPurchaseType(val.toString() as ("Service" | "General" | "All"))}
                            className="text-sm w-full"
                        />
                    </FormField>
                </div>
            </div>

            {/* Bottom MaterialGroup: Full-width Table */}
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={detailsColumns}
                        data={poList}
                        columnsButton
                        loading={loading}
                        perPageDropdown
                        haveBreadcrumb
                        onPageChange={onPageChange}
                        paginationObject={paginationObject}
                    // onPerPageChange={onPerPageChange}
                    />
                </div>
            </div>

        </>

    );
}
