import { setDropdownData } from "@/app/dropdownSlice";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import Button from "@/components/form/Button";
import Checkbox from "@/components/form/Checkbox";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import DropdownAutoSuggest from "@/components/form/DropdownAutoSuggest";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import TextareaBox from "@/components/form/TextareaBox";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
import { useTheme } from "@/hooks/useTheme";
import { useDashboardActions } from "@/layouts/DashboardLayout";
import { IMaterial } from "@/modules/inventory/pages/materialInfo/materialinfo.interface";
import { IUom } from "@/modules/inventory/pages/uomSetup/uom.interface";
import { getPagedMaterialInfos } from "@/modules/inventory/reduxSlices/materialInfo.Slice";
import { getAllUoms } from "@/modules/inventory/reduxSlices/uom.Slice";
import { formatDate } from "@/utils/dateUtil";
import { useHotToast } from "@/utils/hotToast.util";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllDepartments, fetchAllSamplePOStyleList, fetchCarriedEmpNames, fetchGarmentsTypes, fetchSenderEmployeeNames } from "../../api/gatePassAPI";
import { addGatePass, addProgramDetail, clearGatePassMessages, clearGatePassState, clearGatePassValidationError, deleteProgramDetail, editGatePass, getGatePass, setGatePassValidationErrors, updateGatePassDetailField, updateGatePassField } from "../../reduxSlices/gatePassSlice";
import { getAllSupplier } from "../../reduxSlices/supplierSlice";
import { FactoryGatePassSamplePOStyleListDto, gatePassSchema, GatePassValidationErrors, IGatePass, IGatePassDetail, IGatePassMaster } from './gatePass.interface';


const GatePassForm = () => {

    // --- ACTION BUTTON IN TOP NAVBAR  ---
    const { setActions } = useDashboardActions();
    const [isEditMode, setIsEditMode] = useState(false);
    // -------------------------------------
    const { id } = useParams();
    const { showHotError, showHotSuccess } = useHotToast();
    const dispatch: AppDispatch = useDispatch();
    const { gatePass, error, message, validationErrors } = useSelector((state: RootState) => state.gatePass);

    // const [rows, setRows] = useState<IGatePassDetail[]>([]);

    const [gmtTypes, setGmtTypes] = useState<{ name: string }[]>([]);
    const [senderEmpNames, setSenderEmpNames] = useState<{ name: string }[]>([]);
    const [carriedEmpNames, setcarriedEmpNames] = useState<{ name: string }[]>([]);
    const [departments, setDepartments] = useState<{ name: string }[]>([]);
    const { suppliers, } = useSelector((state: RootState) => state.supplier);
    const { materials } = useSelector((state: RootState) => state.material);
    const { uoms } = useSelector((state: RootState) => state.uom)
    const dropdowns = useSelector((state: RootState) => state.dropdown);

    const { rowsPerPage, company } = useTheme();
    const [materislSearchCriteria, setMaterislSearchCriteria] = useState("")

    const [page, setPage] = useState(1);

    type BuyerInfo = FactoryGatePassSamplePOStyleListDto["BuyerList"][number];
    type PoInfo = FactoryGatePassSamplePOStyleListDto["PoList"][number];
    type StyleInfo = FactoryGatePassSamplePOStyleListDto["StyleList"][number];
    type ColorInfo = FactoryGatePassSamplePOStyleListDto["ColorList"][number];
    type SizeInfo = FactoryGatePassSamplePOStyleListDto["SizeList"][number];

    const [poList, setPoList] = useState<PoInfo[]>([]);
    const [buyerList, setBuyerList] = useState<BuyerInfo[]>([]);
    const [styleList, setStyleList] = useState<StyleInfo[]>([]);
    const [colorList, setColorList] = useState<ColorInfo[]>([]);
    const [sizeList, setSizeList] = useState<SizeInfo[]>([]);

    const [filters, setFilters] = useState({
        buyerId: "" as string,
        pono: "" as string,
        styleId: "" as string,
        colorId: "" as string,
        sizeId: "" as string,
        placementMonthFrom: formatDate(
            new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString(),
            "db_format"
        ),
        placementMonthTo: formatDate(
            new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString(),
            "db_format"
        )
    });

    // itemTypeOptions options
    const itemTypeOptions = [
        { id: '1', name: 'Garments' },
        { id: '2', name: 'Material - General' },
        { id: '3', name: 'Material - Direct' },
    ];

    // gatePassTypeOptions type options
    const gatePassTypeOptions = [
        { id: '1', name: 'Returnable' },
        { id: '2', name: 'Not Returnable' },
    ];

    // --- Action Button Handlers --- 
    const handleAction = useCallback(
        (action: ActionType) => {
            switch (action) {
                case "save":
                    if (gatePass && formValidatoin(gatePass)) {
                        dispatch(addGatePass(gatePass));
                    }
                    break;
                case "update":
                    if (gatePass && formValidatoin(gatePass)) {
                        dispatch(editGatePass({ id: gatePass.master.id, payload: gatePass }));
                    }
                    break;
                case "delete":
                    break;
                case "clear":
                    break;
                case "preview":
                    break;
            }
        },
        [dispatch, gatePass]
    );

    useEffect(() => {
        //debugger
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    // Fetch garments types for dropdown
    useEffect(() => {
        const loadGarmentsTypes = async () => {
            try {
                const data = await fetchGarmentsTypes();
                setGmtTypes(data);
            } catch (error) {
                console.error('Error fetching garments types:', error);
            }
        };

        loadGarmentsTypes();
    }, []);

    useEffect(() => {
        dispatch(setDropdownData({
            data: gmtTypes,
            name: "gmtTypeList",
            labelKey: "name",
            valueKey: "id",
        }));
    }, [gmtTypes]);

    // Fetch SenderEmployeeNames for dropdown
    useEffect(() => {
        const loadSenderEmployeeNames = async () => {
            try {
                const data = await fetchSenderEmployeeNames();
                setSenderEmpNames(data);
            } catch (error) {
                console.error('Error fetching SenderEmployeeNames:', error);
            }
        };
        loadSenderEmployeeNames();
    }, []);
    useEffect(() => {
        dispatch(setDropdownData({
            data: senderEmpNames,
            name: "senderEmpNameList",
            labelKey: "name",
            valueKey: "name",
        }));
    }, [senderEmpNames]);

    // Fetch CarriedEmpNames for dropdown
    useEffect(() => {
        const loadCarriedEmpNames = async () => {
            try {
                const data = await fetchCarriedEmpNames();
                setcarriedEmpNames(data);
            } catch (error) {
                console.error('Error fetching CarriedEmpNames:', error);
            }
        };
        loadCarriedEmpNames();
    }, []);
    useEffect(() => {
        dispatch(setDropdownData({
            data: carriedEmpNames,
            name: "carriedEmpNameList",
            labelKey: "name",
            valueKey: "name",
        }));
    }, [carriedEmpNames]);

    // Fetch AllDepartments for dropdown
    useEffect(() => {
        const loadAllDepartments = async () => {
            try {
                const data = await fetchAllDepartments();
                setDepartments(data);
            } catch (error) {
                console.error('Error fetching AllDepartments:', error);
            }
        };
        loadAllDepartments();
    }, []);
    useEffect(() => {
        dispatch(setDropdownData({
            data: departments,
            name: "departmentList",
            labelKey: "name",
            valueKey: "id",
        }));
    }, [carriedEmpNames]);

    // Fetch all supplier
    useEffect(() => {
        dispatch(getAllSupplier());
    }, [dispatch]);
    useEffect(() => {
        dispatch(setDropdownData({
            data: suppliers,
            name: "supplierList",
            labelKey: "Name",
            valueKey: "Id",
            hasMoreData: suppliers.length !== 0,
        }));
    }, [suppliers]);

    // --- Get Material For Paginatino ---
    useEffect(() => {
        dispatch(
            getPagedMaterialInfos({
                page,
                perPage: Number(rowsPerPage),
                searchCriteria: { name: materislSearchCriteria },
            })
        );
        console.log(materials)
    }, [page, materislSearchCriteria, dispatch]);

    useEffect(() => {
        dispatch(setDropdownData({
            data: materials,
            name: "MaterialListDropdown",
            labelKey: "name",
            valueKey: "id",
            isLoading: false,
            append: true
        }));
    }, [materials]);

    // Fetch all uoms
    useEffect(() => {
        dispatch(getAllUoms());
    }, [dispatch]);
    useEffect(() => {
        dispatch(setDropdownData({
            data: uoms,
            name: "UomListDropdown",
            labelKey: "Name",
            valueKey: "Id",
        }));
    }, [suppliers]);

    const loadDropdownData = async (params: Partial<typeof filters>) => {
        const { placementMonthFrom, placementMonthTo } = params;
        if (!placementMonthFrom || !placementMonthTo) return;

        // setBuyerList([]);
        // setPoList([]);
        // setStyleList([]);
        // setColorList( []);
        // setSizeList([]);

        try {

            const data = await fetchAllSamplePOStyleList(params);

            setBuyerList(data.BuyerList || []);
            setPoList(data.PoList || []);
            setStyleList(data.StyleList || []);
            setColorList(data.ColorList || []);
            setSizeList(data.SizeList || []);

            console.log("Dropdown data loaded:", data);
        } catch (error) {
            console.error("Failed to fetch dropdown data:", error);
        }
    };

    useEffect(() => {
        loadDropdownData(filters);
    }, [
        filters.placementMonthFrom,
        filters.placementMonthTo,
        filters.buyerId,
        filters.pono,
        filters.styleId,
        filters.colorId,
        filters.sizeId,
    ]);

    useEffect(() => {
        debugger
        dispatch(setDropdownData({
            data: poList,
            name: "PoListDropdown",
            labelKey: "poNo",
            valueKey: "poId",
        }));
    }, [poList]);

    useEffect(() => {
        dispatch(setDropdownData({
            data: buyerList,
            name: "BuyerListDropdown",
            labelKey: "buyerName",
            valueKey: "buyerId",
        }));
    }, [buyerList]);

    useEffect(() => {
        dispatch(setDropdownData({
            data: styleList,
            name: "StyleListDropdown",
            labelKey: "styleNo",
            valueKey: "styleId",
        }));
    }, [styleList]);

    useEffect(() => {
        dispatch(setDropdownData({
            data: colorList,
            name: "ColorListDropdown",
            labelKey: "colorName",
            valueKey: "colorId",
        }));
    }, [colorList]);

    useEffect(() => {
        dispatch(setDropdownData({
            data: sizeList,
            name: "SizeListDropdown",
            labelKey: "sizeName",
            valueKey: "sizeId",
        }));
    }, [sizeList]);

    //  SHOW error and success messages
    useEffect(() => {
        if (error) {
            showHotError("Failed to load data", { bgColor: "#FF0000", textColor: "#ffffff", width: "250px", icon: "⚠️", position: "bottom-right" });
            dispatch(clearGatePassMessages());
        }
    }, [error]);

    //  SHOW success message
    useEffect(() => {
        if (message) {
            showHotSuccess("Data loaded", { bgColor: "#00FF00", textColor: "#ffffff", width: "250px", icon: "✅", position: "bottom-right" });
            dispatch(clearGatePassMessages());
        }
    }, [message]);

    // Set document title and clear state on unmount
    useEffect(() => {
        document.title = "Gate Pass Enrty";
        return () => {
            document.title = "";
            dispatch(clearGatePassState());

        };
    }, [dispatch]);


    // Handlers for form fields
    // const handleChange = (key: keyof IGatePassMaster, value: string, displayValue?: string) => {
    //     dispatch(
    //         updateGatePassField({
    //             key: key,
    //             value: value,
    //         })
    //     );
    // };

    const handleChange = <K1 extends keyof IGatePassMaster, K2 extends keyof IGatePassMaster>(
        key1: K1,
        value1: IGatePassMaster[K1],
        key2?: K2,
        value2?: IGatePassMaster[K2]
    ) => {
        dispatch(updateGatePassField({ key1, value1, key2, value2 }));

        dispatch(clearGatePassValidationError(key1));
        if (key2) dispatch(clearGatePassValidationError(key2));
    };

    const handleChangeOnProgram = <K extends keyof IGatePassDetail>(
        index: number,
        key1: K,
        value1: IGatePassDetail[K],
        key2: K,
        value2: IGatePassDetail[K]
    ) => {
        dispatch(updateGatePassDetailField({ index, key1, value1, key2, value2 }))

        // if (item) {
        //     if (field === "buyerName") dispatch(updateGatePassDetailField({ id, key: "buyerId", value: item.buyerId }));
        //     if (field === "styleNo") dispatch(updateGatePassDetailField({ id, key: "styleId", value: item.styleId }));
        //     if (field === "colorName") dispatch(updateGatePassDetailField({ id, key: "colorId", value: item.colorId }));
        //     if (field === "sizeName") dispatch(updateGatePassDetailField({ id, key: "sizeId", value: item.sizeId }));
        //     if (field === "poNo") dispatch(updateGatePassDetailField({ id, key: "poId", value: item.poId }));
        //     if (field === "itemName") dispatch(updateGatePassDetailField({ id, key: "itemId", value: item.materialId }));
        //     if (field === "uomName") dispatch(updateGatePassDetailField({ id, key: "uomId", value: item.uomId }));
        // }

        setFilters(prev => {
            const newFilters = { ...prev };

            if (key1 === "buyerName") newFilters.buyerId = String(value2);
            if (key1 === "poNo") newFilters.pono = String(value1 ?? "");
            if (key1 === "styleNo") newFilters.styleId = String(value2);
            if (key1 === "colorName") newFilters.colorId = String(value2);
            if (key1 === "sizeName") newFilters.sizeId = String(value2);

            return newFilters;
        });

    };

    const handleCheckboxChange = (key: keyof IGatePassMaster, value: boolean) => {
        dispatch(
            updateGatePassField({
                key1: key,
                value1: value
            })
        );
    };

    function setSelectedDate(date: Date | null): void {
        handleChange("passDate", date ? date.toISOString() : "");
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const parseResult = gatePassSchema.safeParse(gatePass);

        if (!parseResult.success) {
            const errors: GatePassValidationErrors = {};

            for (const issue of parseResult.error.issues) {
                const key = issue.path[0];
                dispatch(setGatePassValidationErrors(errors));
                return;
            }
            dispatch(setGatePassValidationErrors(null));

        };
    }

    const handleAddRow = () => {
        const newId = gatePass?.details.length
            ? Math.max(...gatePass.details.map(d => d.id)) + 1
            : 1;

        dispatch(addProgramDetail({
            id: newId,
            poId: 0,
            poNo: "",
            itemName: "",
            itemId: 0,
            buyerId: 0,
            buyerName: "",
            styleId: 0,
            styleNo: "",
            colorId: 0,
            colorName: "",
            sizeId: 0,
            sizeName: "",
            uomId: 0,
            uomName: "",
            qty: 0,
            noOfPkt: 0,
            remarks: "",
            masterId: 0
        }));
    };

    const deleteRow = (id: number) => {
        dispatch(deleteProgramDetail(id));
    };

    const handleChangeOnTable = <K extends keyof IGatePassDetail>(
        index: number,
        key1: K,
        value1: IGatePassDetail[K]
    ) => {
        dispatch(updateGatePassDetailField({ index, key1, value1 }));
    };


    // when focusing on different row in the table, need to reset the buyer po style color size list for that row if nothing is selected
    const handleOnFocusDropdownAutosuggestion = async (row: IGatePassDetail) => {
        const hasData = row.itemId || row.buyerId || row.styleId || row.colorId || row.sizeId;

        if (!hasData) {
            setFilters(prev => ({ ...prev, buyerId: "", pono: "", styleId: "", colorId: "", sizeId: "" }));

            await loadDropdownData({
                placementMonthFrom: filters.placementMonthFrom,
                placementMonthTo: filters.placementMonthTo
            });
        }
    };

    // table columns    
    const columns: Column<IGatePassDetail>[] = [
        {
            key: "poNo",
            header: "Program No",
            paddingNone: true,
            render: (row, index) => (
                <DropdownAutoSuggest<PoInfo>
                    name="PoListDropdown"
                    value={row.poNo}
                    onFocus={() => {
                        handleOnFocusDropdownAutosuggestion(row)
                    }}
                    onSelect={(val, disp, item) => handleChangeOnProgram(index, "poNo", item?.poNo, "poId", item?.poId)}
                    variant="flat"
                />

            ),
        },
        {
            key: "itemName",
            header: "Item Name",
            paddingNone: true,
            render: (row, index) => (
                <DropdownAutoSuggest<IMaterial>
                    name="MaterialListDropdown"
                    value={row.itemName}
                    onSearch={(val) => {
                        setMaterislSearchCriteria(val)
                        setPage(1);
                    }}
                    onScrollEnd={() => setPage((prev) => prev + 1)}
                    // onSelect={(val, disp, item) => handleChangeOnProgram(row.id, "itemName", disp, item as IMaterial)}
                    onSelect={(val, disp, item) => handleChangeOnProgram(index, "itemName", item?.name, "itemId", item?.id)}
                    variant="flat"
                />
            ),
        },
        {
            key: "buyerName",
            header: "Buyer",
            paddingNone: true,
            render: (row, index) => (
                <DropdownAutoSuggest<BuyerInfo>
                    name="BuyerListDropdown"
                    value={row.buyerName}
                    variant="flat"
                    onFocus={() => {
                        handleOnFocusDropdownAutosuggestion(row)
                    }}
                    // onSelect={(val, disp, item) => handleChangeOnProgram(row.id, "buyerName", item?.buyerName || "", item as BuyerInfo)}
                    onSelect={(val, disp, item) => handleChangeOnProgram(index, "buyerName", item?.buyerName, "buyerId", item?.buyerId)}
                />

            ),
        },
        {
            key: "styleNo",
            header: "Style",
            paddingNone: true,
            render: (row, index) => (
                <DropdownAutoSuggest<StyleInfo>
                    name="StyleListDropdown"
                    value={row.styleNo}
                    variant="flat"
                    onFocus={() => {
                        handleOnFocusDropdownAutosuggestion(row)
                    }}
                    // onSelect={(val, disp, item) => handleChangeOnProgram(row.id, "styleNo", item?.styleNo || "", item as StyleInfo)}
                    onSelect={(val, disp, item) => handleChangeOnProgram(index, "styleNo", item?.styleNo, "styleId", item?.styleId )}
                />
            ),
        },
        {
            key: "colorName",
            header: "Color",
            paddingNone: true,
            render: (row, index) => (
                <DropdownAutoSuggest<ColorInfo>
                    name="ColorListDropdown"
                    value={row.colorName}
                    variant="flat"
                    onFocus={() => {
                        handleOnFocusDropdownAutosuggestion(row)
                    }}
                    // onSelect={(val, disp, item) => handleChangeOnProgram(row.id, "colorName", item?.colorName || "", item as ColorInfo)}
                    onSelect={(val, disp, item) => handleChangeOnProgram(index, "colorName", item?.colorName, "colorId", item?.colorId)}
                />
            ),
        },
        {
            key: "sizeName",
            header: "Size",
            paddingNone: true,
            render: (row, index) => (
                <DropdownAutoSuggest<SizeInfo>
                    name="SizeListDropdown"
                    value={row.sizeName}
                    variant="flat"
                    onFocus={() => {
                        handleOnFocusDropdownAutosuggestion(row)
                    }}
                    // onSelect={(val, disp, item) => handleChangeOnProgram(row.id, "sizeName", item?.sizeName || "", item as SizeInfo)}
                    onSelect={(val, disp, item) => handleChangeOnProgram(index, "sizeName", item?.sizeName, "sizeId", item?.sizeId)}
                />
            ),
        },
        {
            key: "qty",
            header: "Qty",
            paddingNone: true,
            render: (row, index) => (
                <SimpleInputBox
                    value={row.qty ?? 0}
                    onChange={(val) =>
                        handleChangeOnTable(index, "qty", val as any)
                    }
                    id="qty"
                    type="number"
                    variant="flat"
                    placeholder="Type Quantity"
                    className="w-full rounded-none"
                />
            ),
        },
        {
            key: "uomName",
            header: "UOM",
            paddingNone: true,
            render: (row, index) => (
                <DropdownAutoSuggest<IUom>
                    name="UomListDropdown"
                    variant="flat"
                    value={row.uomName}
                    // onSelect={(val, disp, item) => handleChangeOnProgram(row.id, "uomName", item?.uomName || "", item as IUom)}
                    onSelect={(val, disp, item) => handleChangeOnProgram(index, "uomName", item?.Name, "uomId", item?.Id)}
                />
            ),
        },
        {
            key: "noOfPkt",
            header: "PKT",
            paddingNone: true,
            render: (row, index) => (
                <SimpleInputBox
                    value={row.noOfPkt ?? 0}
                    variant="flat"
                    onChange={(val) =>
                        handleChangeOnTable(index, "noOfPkt", val as any)
                    }
                    id="pkt"
                    type="text"
                    placeholder="Type Packet"
                    className="w-full rounded-none"
                />
            ),
        },
        {
            key: "remarks",
            header: "Remarks",
            paddingNone: true,
            render: (row, index) => (
                <SimpleInputBox
                    value={row.remarks ?? ""}
                    onChange={(val) =>
                        handleChangeOnTable(index, "remarks", val)
                    }
                    id="remarks"
                    type="text"
                    variant="flat"
                    placeholder="Type Remarks"
                    className="w-full rounded-none"
                />
            ),
        },
        {
            key: "actions",
            header: "Action",
            paddingNone: true,
            render: (row) => (
                <Button
                    size="sm"
                    variant="flat"
                    className="bg-red-500 text-white"
                    onClick={() => deleteRow(row.id)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    // const formValidatoin = (data: IGatePass) => {
    //     const parseResult = gatePassSchema.safeParse(data);

    //     if (!parseResult.success) {
    //         const errors: GatePassValidationErrors = {};

    //         for (const issue of parseResult.error.issues) {
    //             if (issue.path.length === 2 && issue.path[0] === "master") {
    //                 // master field
    //                 const key = issue.path[1] as keyof IGatePassMaster;
    //                 errors[key] = issue.message;
    //             } else if (issue.path.length === 2 && issue.path[0] === "details") {
    //                 // details field
    //                 const key = issue.path[1] as keyof IGatePassDetail;
    //                 errors[key] = issue.message;
    //             } else {
    //                 // top-level or unknown
    //                 const key = issue.path[0] as keyof GatePassValidationErrors;
    //                 errors[key] = issue.message;
    //             }
    //         }

    //         dispatch(setGatePassValidationErrors(errors));
    //         return false;
    //     }

    //     dispatch(setGatePassValidationErrors(null)); // clear previous errors
    //     return true;
    // };
    
    const formValidatoin = (data: IGatePass) => {
  const parseResult = gatePassSchema.safeParse(data);

  if (!parseResult.success) {
    const errors: GatePassValidationErrors = {};

    for (const issue of parseResult.error.issues) {
      if (issue.path.length === 2 && issue.path[0] === "master") {
        const key = issue.path[1] as keyof IGatePassMaster;
        errors[key] = issue.message;
      } else if (issue.path.length === 2 && issue.path[0] === "details") {
        const key = issue.path[1] as keyof IGatePassDetail;
        errors[key] = issue.message;
      } else if (issue.path[0] === "details") {
        // Handle "At least one detail is required"
       (errors as any)["details"] = issue.message;
      } else {
        const key = issue.path[0] as keyof GatePassValidationErrors;
        errors[key] = issue.message;
      }
    }

    dispatch(setGatePassValidationErrors(errors));
    return false;
  }

  dispatch(setGatePassValidationErrors(null));
  return true;
};



    // const formValidatoin = (data: IGatePass) => {
    //     const schema = isEditMode ? gatePassSchema : gatePassSchema;
    //     const parseResult = schema.safeParse(data);
    //     if (!parseResult.success) {
    //         const errors: GatePassValidationErrors = {};
    //         for (const issue of parseResult.error.issues) {
    //             const key = issue.path[0] as keyof GatePassValidationErrors;
    //             errors[key] = issue.message;
    //         }
    //         dispatch(setGatePassValidationErrors(errors));
    //         return false;
    //     }
    //     return true;
    // }

    // If ID is present, we are in update mode
    useEffect(() => {
        if (id) {
            document.title = "Gate Pass Edit";
            setIsEditMode(true);
            dispatch(getGatePass(Number(id)))
        }
    }, [id]);


    return (
        <div className="p-2 bg-white rounded-md shadow-md">

            {/* Top Info Section */}
            <div className="px-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-2 mt-1">

                {/* General Info */}
                <div className="flex flex-col rounded-md p-1">
                    <div className="w-full p-1 mb-2 bg-gray-300">
                        <h1 className="font-bold text-sm sm:text-base">General Info</h1>
                    </div>
                    <FormField
                        label="Date"
                        id="passDateFormID"
                        variant="inline"
                        error={validationErrors?.passDate}>
                        <CustomDatePicker
                            
                            selected={gatePass?.master.passDate ? new Date(gatePass.master.passDate) : null}
                            onChange={(date) => setSelectedDate(date)}
                        // dateFormat="MM/dd/yyyy"
                        />
                    </FormField>

                    <FormField
                        label="Item Type"
                        id="itemTypeFormID"
                        variant="inline"
                        error={validationErrors?.itemType
                        }>
                        <SelectDropdown
                            options={itemTypeOptions}
                            value={gatePass?.master?.itemType ?? ""}
                            isSameKeyValue={false}
                            valueKey="id"
                            labelKey="name"
                            variant="default"
                            className="w-full"
                            onChange={(val) => handleChange("itemType", val)}
                        />
                    </FormField>

                    <FormField
                        label="GMT Type"
                        id="garmentsTypeFormID"
                        variant="inline"
                        error={validationErrors?.garmentsType}>
                        <DropdownAutoSuggest
                            name="gmtTypeList"
                            value={gatePass?.master.garmentsType}
                            onSelect={(value, display) => handleChange("garmentsType", display, "garmentsType", value)}
                            className="w-full"
                        />
                    </FormField>

                    <FormField
                        label="Gate Pass Type"
                        id="gatePassTypeFormID"
                        variant="inline"
                        error={validationErrors?.gatePassType}>
                        <SelectDropdown
                            options={gatePassTypeOptions}
                            value={gatePass?.master?.gatePassType ?? ""}
                            isSameKeyValue={false}
                            valueKey="id"
                            labelKey="name"
                            variant="default"
                            className="w-full"
                            onChange={(val) => handleChange("gatePassType", val)}
                        />
                    </FormField>
                </div>

                {/* Sender Info */}
                <div className="flex flex-col  rounded-md p-1">
                    <div className="w-full p-1 mb-2 bg-gray-300">
                        <h1 className="font-bold text-sm sm:text-base">Sender Info</h1>
                    </div>
                    <FormField
                        label="Sender Name"
                        id="senderEmpNameFormID"
                        variant="inline"
                        error={validationErrors?.senderEmpName}>
                        <DropdownAutoSuggest
                            name="senderEmpNameList"
                            value={gatePass?.master?.senderEmpName}
                            onSelect={(val) => handleChange("senderEmpName", val)}
                        />
                    </FormField>

                    <FormField
                        label="Sender Phone"
                        id="senderPhoneNoFormID"
                        variant="inline"
                        error={validationErrors?.senderPhoneNo}>
                        <SimpleInputBox
                            value={gatePass?.master?.senderPhoneNo ?? ""}
                            id="senderPhoneNoInputID"
                            type="number"
                            placeholder="Type Sender Phone"
                            className="w-full"
                            onChange={(val) => handleChange("senderPhoneNo", val)}
                        />
                    </FormField>
                </div>

                {/* Carried Info */}
                <div className="flex flex-col  rounded-md p-1">
                    <div className="w-full p-1 mb-2 bg-gray-300">
                        <h1 className="font-bold text-sm sm:text-base">Carried Info</h1>
                    </div>

                    <FormField
                        label="Name"
                        id="carriedByFormID"
                        variant="inline"
                        error={validationErrors?.carriedBy}>
                        <DropdownAutoSuggest
                            name="carriedEmpNameList"
                            value={gatePass?.master.carriedBy}
                            onSelect={(val) => handleChange("carriedBy", val)}
                        />
                    </FormField>

                    <FormField
                        label="Department"
                        id="receiverDepartmentFormID"
                        variant="inline"
                        error={validationErrors?.receiverDepartment}>
                        <DropdownAutoSuggest
                            name="departmentList"
                            value={gatePass?.master.receiverDepartment}
                            onSelect={(val) => handleChange("receiverDepartment", val)}
                        />
                    </FormField>

                    <FormField
                        label="Designation"
                        id="receiverDesignationFormID"
                        variant="inline"
                        error={validationErrors?.receiverDesignation}>
                        <SimpleInputBox
                            value={gatePass?.master?.receiverDesignation ?? ""}
                            onChange={(val) => handleChange("receiverDesignation", val)}
                            id="receiverDesignation"
                            type="text"
                            placeholder="Designation"
                            className="w-full"
                        />
                    </FormField>

                    <FormField
                        label="Phone No"
                        id="receiverPhoneNoFormID"
                        variant="inline"
                        error={validationErrors?.receiverPhoneNo}>
                        <SimpleInputBox
                            value={gatePass?.master?.receiverPhoneNo ?? ""}
                            onChange={(val) => handleChange("receiverPhoneNo", val)}
                            id="receiverPhoneNo"
                            type="text"
                            placeholder="Type Phone"
                            className="w-full"
                        />
                    </FormField>

                    <FormField
                        label="Carried By"
                        id="carriedBy"
                        variant="inline"
                        error={validationErrors?.carriedBy}>
                        <SimpleInputBox
                            value={gatePass?.master?.carriedBy ?? ""}
                            onChange={(val) => handleChange("carriedBy", val)}
                            id="carriedBy"
                            type="text"
                            placeholder="Type Carried By"
                            className="w-full"
                        />
                    </FormField>

                </div>

                {/* Receiver Info */}
                <div className="flex flex-col  rounded-md p-1">
                    <div className="w-full p-1 mb-2 bg-gray-300">
                        <h1 className="font-bold text-sm sm:text-base">Receiver Info</h1>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <Checkbox
                            label=""
                            size="small"
                            checked={gatePass?.master.isChecked}
                            onChange={(val) => handleCheckboxChange("isChecked", val)}
                            color="primary"
                            shape="square"
                        />

                        <FormField
                            label="Org/Supplier"
                            id="supplier"
                            variant="inline"
                            error={validationErrors?.supplierId}>
                            <DropdownAutoSuggest
                                name="supplierList"
                                value={gatePass?.master.supplierName}
                                onSelect={(value, display) => handleChange("supplierName", display, "supplierId", value)}
                                className=""
                            />
                        </FormField>
                    </div>

                    <FormField
                        label="Receiver"
                        id="receiverNameFormID"
                        variant="inline"
                        error={validationErrors?.receiverName}>
                        <SimpleInputBox
                            value={gatePass?.master?.receiverName ?? ""}
                            onChange={() => { }}
                            id="receiverName"
                            type="text"
                            placeholder="Receiver"
                            className="w-full"
                        />
                    </FormField>
                </div>
            </div>

            {/* dates */}
            <div className="px-1 grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                <FormField
                    label="Sample Program From"
                    id="date"
                    variant="block">
                    <CustomDatePicker
                        selected={filters?.placementMonthFrom ? new Date(filters.placementMonthFrom) : null}
                        onChange={() => { }}
                        dateFormat="MM/yyyy"
                    />
                </FormField>
                <FormField
                    label="To"
                    id="date"
                    variant="block">
                    <CustomDatePicker
                        selected={filters?.placementMonthTo ? new Date(filters.placementMonthTo) : null}
                        onChange={() => { }}
                        dateFormat="MM/yyyy"
                    />
                </FormField>
                <div className="flex items-end">
                    <Button
                        variant="filled"
                        size="sm"
                        onClick={() => handleAddRow()}
                        className="w-full sm:w-auto">
                        <FontAwesomeIcon icon={faAdd} /> Add Row
                    </Button>
                </div>
            </div>

            {/* Table + Note Section */}
            <div className="px-1 grid grid-cols-1 mt-2 gap-2">


                        
            <FormField id="table_error" error={validationErrors?.details}>
            <div></div>
            </FormField>
        

                <div className="w-full">
                    <CustomDataTable data={gatePass?.details ?? []} columns={columns} />
                </div>
                <TextareaBox
                    value={gatePass?.master?.remarks ?? ""}
                    onChange={(val) => handleChange("remarks", val)}
                    id="note"
                    placeholder="Note"
                    className="w-full"
                />
            </div>
        </div>
    );

};

export default GatePassForm;
