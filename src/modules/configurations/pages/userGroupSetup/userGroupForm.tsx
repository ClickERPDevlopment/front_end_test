import { setDropdownData } from "@/app/dropdownSlice";
import { AppDispatch, RootState } from "@/app/store";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import ConfirmDialog, { IConfirmDialog } from "@/components/feedback-interaction/ConfirmDialog";
import Button from "@/components/form/Button";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import DropdownAutoSuggest from "@/components/form/DropdownAutoSuggest";
import { FormField } from "@/components/form/FormField";
import SelectDropdown from "@/components/form/SelectDropdown";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import TextareaBox from "@/components/form/TextareaBox";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
import { useTheme } from "@/hooks/useTheme";
import { useDashboardActions } from "@/layouts/DashboardLayout";
import { fetchAllBusinessUnits } from "@/modules/accounts/reduxSlices/businessUnitSlice";
import { getCostCenter } from "@/modules/accounts/reduxSlices/costCenterSlice";
import { getAllCurrencies } from "@/modules/accounts/reduxSlices/currencySlice";
import { getAllSupplier } from "@/modules/procurement/reduxSlices/supplierSlice";
import { useHotToast } from "@/utils/hotToast.util";
import { faChevronDown, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IUserGroupSetupDetail, IUserGroupSetupMaster } from "./userGroupSetup.interface";
import { GetAllUserGroupSetupDepartment } from "../../reduxSlices/department.Slice";
import { GetAllDesignation } from "../../reduxSlices/designation.Slice";
import { clearUserGroupState, createUserGroupSetup, getSingleUserGroup, getUserGroupsetupUserList, getUserGroupSingleUserInfo, getUserGroupUserInfo, removeUserGroupDetailRow, updateUserGroupField, updateUserGroupSetup } from "../../reduxSlices/userGroup.slice";

export default function UserGroupForm() {

    // --- ACTION BUTTON IN TOP NAVBAR  ---
    const { setActions } = useDashboardActions();
    const [isEditMode, setIsEditMode] = useState(false);
    // -------------------------------------
    const { id } = useParams();
    const { showHotError, showHotSuccess } = useHotToast();
    const dispatch: AppDispatch = useDispatch();
    const { rowsPerPage, company } = useTheme();
    const [page, setPage] = useState(1);
    const dropdowns = useSelector((state: RootState) => state.dropdown);

    const { userGroupList, masterInfo, detailsInfo, error, message } = useSelector((state: RootState) => state.userGroup);

    const { suppliers, } = useSelector((state: RootState) => state.supplier);

    const { stores } = useSelector((state: RootState) => state.store)
    const { costCenters } = useSelector((state: RootState) => state.costCenter)
    const { businessUnits } = useSelector((state: RootState) => state.businessUnit)
    const { currencies } = useSelector((state: RootState) => state.currency);
    //
    const searchCriteria = dropdowns["materialList"]?.searchCriteria ?? "";
    const { materials, material } = useSelector((state: RootState) => state.material);
    const [modalConfiramtion, setModalConfiramtion] = useState<IConfirmDialog>({ open: false, title: "Confirm", message: "This is dialog message" });
    const [pendingStore, setPendingStore] = useState<{ value: number; displayVal?: string } | null>(null);


    // --- Action Button Handlers --- 
    const handleAction = useCallback(
        ////
        (action: ActionType) => {
            switch (action) {
                case "save":
                    // const data = { ...masterInfo, detailsInfo: masterInfo.Details, id: 0, factoryID: company?.companyId || 0, };
                    if (masterInfo.GroupName != "") {
                        dispatch(createUserGroupSetup(masterInfo));
                    }
                    showHotSuccess("User group created successfully.");
                    break;
                case "update":
                    debugger
                    // const updateData = { ...saleInfo, saleDate: saleInfo.saleDateString, id: Number(id), };
                    if (masterInfo.GroupName != "") {
                        dispatch(updateUserGroupSetup(masterInfo));
                    }
                    showHotSuccess("User group updated successfully.");
                    break;
                case "delete":
                    setModalConfiramtion(prev => ({
                        open: true,
                        message: "Are you sure to delete ?"
                    }));
                    // showHotError(" Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
                    break;
                case "clear": isEditMode ? dispatch(getSingleUserGroup(Number(id))) :
                    dispatch(clearUserGroupState());

                //break;
                case "preview":
                    showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
                    break;
            }
        },
        [dispatch, masterInfo, company]
    );

    useEffect(() => {
        ////
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);


    useEffect(() => {
        return () => {
            dispatch(clearUserGroupState())
        }
    }, [])


    // --- Handling Errors ---
    // const formValidatoin = (data: IInventorySale) => {
    //     const schema = isEditMode ? inventorySaleUpdateSchema : inventorySaleInsertSchema;

    //     const parseResult = schema.safeParse(data);

    //     if (!parseResult.success) {
    //         const errors: InventorySaleValidationErrors = {};
    //         for (const issue of parseResult.error.issues) {
    //             const key = issue.path[0] as keyof IInventorySale;
    //             errors[key] = issue.message;
    //         }

    //         dispatch(setInventorySaleValidationErrors(errors));
    //         return false;
    //     }

    //     return true;
    // }


    useEffect(() => {
        ////
        if (id) {
            setIsEditMode(true);
            dispatch(getSingleUserGroup(Number(id)));
        }

    }, [id])

    // --- Handling Messages ---
    useEffect(() => {
        ////
        if (message) {
            showHotSuccess(message);
            if (!isEditMode) {
                // dispatch(clearInventorySaleMessages());
                dispatch(clearUserGroupState())
            }

        }

    }, [message])

    useEffect(() => {
        ////
        if (error) {
            showHotError(error, { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });

        }

    }, [error])

    // // --- Get Material For Paginatino ---
    // useEffect(() => {
    //     dispatch(
    //         getPagedMaterialInfos({
    //             page,
    //             perPage: Number(rowsPerPage),
    //             searchCriteria: { name: searchCriteria },
    //         })
    //     );
    // }, [page, searchCriteria, dispatch]);

    // --- Get data ---
    useEffect(() => {
        // dispatch(getAllSupplier());
        // dispatch(getAllStores(company?.companyId || 0));
        // dispatch(getCostCenter());
        // dispatch(fetchAllBusinessUnits());
        // dispatch(getAllCurrencies());

    }, [dispatch]);

    const handleCancel = () => {
        //const storeName = detailsInfo.storeName || "";

        // Revert back (same as your earlier logic)
        // dispatch(
        //     updateSaleDetailsField({
        //         key: "storeId",
        //         value: detailsInfo.storeId,
        //         displayVal: "--",
        //     })
        // );

        // setTimeout(() => {
        //     dispatch(
        //         updateSaleDetailsField({
        //             key: "storeId",
        //             value: detailsInfo.storeId,
        //             displayVal: storeName,
        //         })
        //     );
        // }, 0);

        setPendingStore(null);
        setModalConfiramtion(prev => (prev && { ...prev, open: false }) || null);
    };


    const handleConfirm = () => {
        if (!pendingStore) return;

        // dispatch(clearSaleDetails());
        // dispatch(
        //     updateSaleDetailsField({
        //         key: "storeId",
        //         value: pendingStore.value,
        //         displayVal: pendingStore.displayVal,
        //     })
        // );

        showHotSuccess("Store changed — cleared sale items table.");
        setPendingStore(null);
        setModalConfiramtion(prev => (prev && { ...prev, open: false }) || null);
    };

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

    // link suppliers dropdown list
    useEffect(() => {
        dispatch(setDropdownData({
            data: stores,
            name: "storeList",
            labelKey: "name",
            valueKey: "id",
        }));
    }, [stores]);

    // link materials dropdown list
    useEffect(() => {
        dispatch(setDropdownData({
            data: materials,
            name: "materialList",
            labelKey: "name",
            valueKey: "id",
            isLoading: false,
            append: true
        }));
    }, [materials]);

    // link Costcenter dropdown list
    useEffect(() => {
        dispatch(setDropdownData({
            data: costCenters,
            name: "costCenterList",
            labelKey: "costName",
            valueKey: "costNo",
        }));
    }, [costCenters]);

    // --- Table Columns ---
    const columns: Column<IUserGroupSetupDetail>[] = [
        {
            key: "UserName",
            header: "User Name",
        },
        {
            key: "DepartmentName",
            header: "Departmen tName",
        },
        {
            key: "Designation",
            "header": "Designation"
        },

        // add this to the end of `columns`:
        {
            key: "actions",
            header: "Actions",
            render: (row: IUserGroupSetupDetail, rowIndex: number) => (
                <div className="flex gap-1">
                    <Button size="sm" variant="flat" className="bg-red-500 text-white hover:bg-red-600" onClick={() => handleDeleteRow(rowIndex)}> <FontAwesomeIcon icon={faTrash} /></Button>
                </div>
            ),
        }
    ]

    // Delete a row
    const handleDeleteRow = (index: number) => {
        dispatch(removeUserGroupDetailRow(index));
        showHotSuccess("Row deleted successfully.");
    };

    const { departments } = useSelector((state: RootState) => state.department);
    const { designations } = useSelector((state: RootState) => state.designation);
    const { userList } = useSelector((state: RootState) => state.userGroup);

    useEffect(() => {
        dispatch(GetAllUserGroupSetupDepartment());
    }, [dispatch]);

    useEffect(() => {
        dispatch(GetAllDesignation());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUserGroupsetupUserList());
    }, [dispatch]);


    useEffect(() => {
        dispatch(setDropdownData({
            data: departments,
            name: "departmentsList",
            labelKey: "DepartmentName",
            valueKey: "DepartmentId",
        }));
    }, [departments]);


    useEffect(() => {
        dispatch(setDropdownData({
            data: designations,
            name: "designationList",
            labelKey: "DesignationName",
            valueKey: "DesignationId",
        }));
    }, [designations]);


    useEffect(() => {
        dispatch(setDropdownData({
            data: userList,
            name: "userList",
            labelKey: "UserName",
            valueKey: "UserId",
        }));
    }, [userList]);


    const [searchData, setSearchData] = useState<IUserGroupSetupDetail>(
        {
            Id: 0,
            MasterId: 0,
            UserId: 0,
            UserName: "",
            Designation: "",
            EmpCode: "",
            DepartmentName: "",
            actions: "",
        }
    );

    const handleChangeMasterInfo = (key: keyof IUserGroupSetupMaster, value: string, displayVal?: string) => {
        dispatch(updateUserGroupField({
            key,
            value,
            displayVal
        }))
    }

    const handleChangeSearchInfo = (
        key: keyof IUserGroupSetupDetail,
        value: string,
        displayVal?: string
    ) => {
        setSearchData((prev) => ({
            ...prev,
            [key]: value ?? prev[key]
        }));
    };


    const multiUserAdd = () => {
        dispatch(
            getUserGroupUserInfo({
                userId: 0,
                department: searchData.DepartmentName || undefined,
                designation: searchData.Designation || undefined,
            })
        );
    };

    const singelUserAdd = () => {
        dispatch(
            getUserGroupSingleUserInfo({
                userId: searchData.UserId || undefined,
                department: undefined,
                designation: undefined,
            })
        );
    };


    return (
        <div >
            {/* --- Sale Info Master Section --- */}
            <div className=" px-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">
                <div className="flex flex-col">
                    <FormField
                        label="Group Name"
                        id="GroupName"
                        variant="inline"
                        required
                        labelFontSize="text-sm"
                    >
                        <SimpleInputBox
                            value={masterInfo.GroupName || ""}
                            onChange={(val) => handleChangeMasterInfo("GroupName", val)}
                            type="text"
                        />
                    </FormField>
                </div>
            </div>


            {/* --- Sale Info Details Section --- */}
            <div className=" px-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2">
                <div className="flex flex-col gap-0">
                    <FormField
                        label="Department"
                        id="department"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <DropdownAutoSuggest
                            name="departmentsList"
                            inputWidth={200}
                            value={detailsInfo.DepartmentName}
                            onSelect={(val, displayVal) => handleChangeSearchInfo("DepartmentName", displayVal, displayVal)} />
                    </FormField>

                    <FormField
                        label="Designation"
                        id="designation"
                        variant="inline"
                        labelFontSize="text-sm"
                    >
                        <DropdownAutoSuggest
                            name="designationList"
                            inputWidth={200}
                            value={detailsInfo.Designation}
                            onSelect={(val, displayVal) => handleChangeSearchInfo("Designation", displayVal, displayVal)} />
                    </FormField>

                    <div className="mt-2 text-end">
                        <Button
                            size="sm"
                            className="flex ms-auto"
                            onClick={() => multiUserAdd()}
                        >
                            <FontAwesomeIcon icon={faChevronDown} />
                            Add All
                        </Button>
                    </div>

                    <div className="mt-3">
                        <FormField
                            label="User"
                            id="user"
                            variant="inline"
                            labelFontSize="text-sm"
                        >
                            <DropdownAutoSuggest
                                name="userList"
                                inputWidth={200}
                                value={detailsInfo.UserName}
                                onSelect={(val, displayVal) => handleChangeSearchInfo("UserId", val, displayVal)} />
                        </FormField>

                        <div className="mt-3">
                            <Button
                                size="sm"
                                className="flex ms-auto"
                                onClick={() => singelUserAdd()}
                            >
                                <FontAwesomeIcon icon={faChevronDown} />
                                Add Single User
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5"></div>

            {/* --- Sale Items Table Section --- */}
            <div className="px-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">

                {/* <FormField id="table_error" error={validationErrors?.details} >
                    <div></div>
                </FormField> */}

                <CustomDataTable
                    data={masterInfo.Details || []}
                    columns={columns}

                />

            </div>

            {/* The animated confirmation modal */}
            <ConfirmDialog
                open={modalConfiramtion?.open || false}
                title={modalConfiramtion?.title || "Confirm"}
                message={modalConfiramtion?.message || "This is dialog message"}
                confirmText="Yes, Clear"
                cancelText="Cancel"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div >

    );

}


