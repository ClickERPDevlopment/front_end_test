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
import { faChevronDown, faPenToSquare, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useActionData, useParams, useSearchParams } from "react-router-dom";
import { GetAllUserGroupSetupDepartment } from "../../reduxSlices/department.Slice";
import { GetAllDesignation } from "../../reduxSlices/designation.Slice";
import { clearUserGroupState, createUserGroupSetup, getSingleUserGroup, getUserGroupList, getUserGroupsetupUserList, getUserGroupSingleUserInfo, getUserGroupUserInfo, removeUserGroupDetailRow, updateUserGroupField, updateUserGroupSetup } from "../../reduxSlices/userGroup.slice";
import { IUserWiseMenuPermissionMenusList, IUserWiseMenuPermissionUsersList } from "./userWiseMenuPermission.interface";
import { checkAllPermission, clearUserWiseMenuPermissionState, createUserWiseMenuPermission, getSavedUserWiseMenuPermissionMenusList, getUserWiseMenuPermissionMenuItems, getUserWiseMenuPermissionMenusList, getUserWiseMenuPermissionMenusListByUser, getUserWiseMenuPermissionModuleItems, getUserWiseMenuPermissionUsersList, handleMenuPermissionChange, handleUserCheckBox, removeMenuFromList } from "../../reduxSlices/userWiseMenuPermission.slice";
import { useQueries } from "@tanstack/react-query";

export default function UserWiseMenuPermissionForm() {

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

    const [searchParams] = useSearchParams();
    const deleteByUserGroup = searchParams.get("action") === "delete_by_user_group";

    const { list, usersLIst, menusList, error, message } = useSelector((state: RootState) => state.userWiseMenuPermission);

    const [modalConfiramtion, setModalConfiramtion] = useState<IConfirmDialog>({ open: false, title: "Confirm", message: "This is dialog message" });
    const [pendingStore, setPendingStore] = useState<{ value: number; displayVal?: string } | null>(null);


    // --- Action Button Handlers --- 
    const handleAction = useCallback(
        (action: ActionType) => {
            switch (action) {
                case "save":
                    if (usersLIst.length > 0 && usersLIst.some(user => user.IsChecked)) {
                        dispatch(createUserWiseMenuPermission({ users: usersLIst, menus: menusList }));
                    }
                    else {
                        showHotError("Need to check at least one user", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
                    }
                    break;

                case "update":
                    if (usersLIst.length > 0 && usersLIst.some(user => user.IsChecked)) {
                        dispatch(createUserWiseMenuPermission({ users: usersLIst, menus: menusList }));
                    }
                    else {
                        showHotError("Need to check at least one user", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
                    }
                    break;

                case "delete":
                    if (usersLIst.length === 0 || !usersLIst.some(user => user.IsChecked)) {
                        showHotError("Need to check at least one user", {
                            bgColor: "#EF4444",
                            textColor: "#ffffff",
                            width: "300px"
                        });
                        return;
                    }

                    setModalConfiramtion({
                        open: true,
                        message: "Are you sure to delete ?",
                        // onConfirm: () => {
                        //     dispatch(createUserWiseMenuPermission({ users: usersLIst, menus: menusList }));
                        // }
                    });
                    break;

                case "clear": isEditMode ? dispatch(getSingleUserGroup(Number(id))) :
                    dispatch(clearUserWiseMenuPermissionState());

                    break;
                case "preview":
                    showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
                    break;
            }
        },
        [dispatch, usersLIst, menusList, company]
    );

    useEffect(() => {
        ////
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);


    useEffect(() => {
        return () => {
            dispatch(clearUserWiseMenuPermissionState())
        }
    }, [])


    useEffect(() => {
        ////
        if (id) {
            setIsEditMode(true);
            dispatch(getSavedUserWiseMenuPermissionMenusList({ id: 0, userId: Number(id), menuId: 0, moduleId: 0 }));
            dispatch(getUserWiseMenuPermissionUsersList({ userId: Number(id) }));
        }
        else if (deleteByUserGroup) {
            setIsEditMode(true);
        }

    }, [id])

    // --- Handling Messages ---
    useEffect(() => {
        if (message) {
            showHotSuccess(message);
            if (!isEditMode) {
                //dispatch(clearInventorySaleMessages());
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

    const userTableColumns: Column<IUserWiseMenuPermissionUsersList>[] = [
        {
            key: "UserName",
            header: "User Name",
        },
        {
            key: "Designation",
            header: "Designation",
        },
        {
            key: "CompanyName",
            header: "Company Name",
        },
        {
            key: "IsChecked",
            header: "Select",
            render: (row: IUserWiseMenuPermissionUsersList, rowIndex: number) => (
                <input
                    type="checkbox"
                    checked={row.IsChecked}
                    onChange={(e) => dispatch(handleUserCheckBox({ index: rowIndex, checked: e.target.checked }))}
                    className="h-4 w-4 accent-green-600 cursor-pointer"
                />
            ),
        },
    ];


    const selectAllRow: IUserWiseMenuPermissionMenusList = {
        Id: 0,
        ModuleName: "",
        MainMenu: "",
        MenuName: "",
        IsAccess: menusList.every((m) => m.IsAccess),
        IsInsert: menusList.every((m) => m.IsInsert),
        IsUpdate: menusList.every((m) => m.IsUpdate),
        IsDelete: menusList.every((m) => m.IsDelete),
        ModuleId: 0,
        MenuId: 0,
    };



    const menusTableColumns: Column<IUserWiseMenuPermissionMenusList>[] = [
        {
            key: "ModuleName",
            header: "Module",
        },
        {
            key: "MainMenu",
            header: "Main Menu",
        },
        {
            key: "MenuName",
            header: "Menu Name",
        },
        {
            key: "IsAccess",
            header: "Access",
            render: (row, rowIndex) => {
                if (row.Id === 0) {
                    return (
                        <div className="flex items-center">
                            <input
                                disabled={deleteByUserGroup}
                                type="checkbox"
                                checked={row.IsAccess}
                                onChange={(e) =>
                                    dispatch(checkAllPermission({ field: "IsAccess", value: e.target.checked }))
                                }
                                className="h-4 w-4 accent-blue-600 cursor-pointer"
                            /><span className="font-bold ms-1"> Check All</span>
                        </div>
                    );
                }

                return (
                    <input
                        type="checkbox"
                        checked={row.IsAccess}
                        disabled={deleteByUserGroup}
                        onChange={(e) =>
                            dispatch(
                                handleMenuPermissionChange({
                                    index: rowIndex - 1,
                                    field: "IsAccess",
                                    checked: e.target.checked,
                                })
                            )
                        }
                        className="h-4 w-4 accent-blue-600 cursor-pointer"
                    />
                );
            },
        },
        {
            key: "IsInsert",
            header: "Insert",
            render: (row, rowIndex) => {
                if (row.Id === 0) {
                    return (
                        <div className="flex items-center">
                            <input
                                disabled={deleteByUserGroup}
                                type="checkbox"
                                checked={row.IsInsert}
                                onChange={(e) =>
                                    dispatch(checkAllPermission({ field: "IsInsert", value: e.target.checked }))
                                }
                                className="h-4 w-4 accent-green-600 cursor-pointer"
                            /><span className="font-bold ms-1"> Check All</span>
                        </div>
                    );
                }

                return (
                    <input
                        type="checkbox"
                        checked={row.IsInsert}
                        disabled={deleteByUserGroup}
                        onChange={(e) =>
                            dispatch(
                                handleMenuPermissionChange({
                                    index: rowIndex - 1,
                                    field: "IsInsert",
                                    checked: e.target.checked,
                                })
                            )
                        }
                        className="h-4 w-4 accent-green-600 cursor-pointer"
                    />
                );
            },
        },
        {
            key: "IsUpdate",
            header: "Update",
            render: (row, rowIndex) => {
                if (row.Id === 0) {
                    return (
                        <div className="flex items-center">
                            <input
                                disabled={deleteByUserGroup}
                                type="checkbox"
                                checked={row.IsUpdate}
                                onChange={(e) =>
                                    dispatch(checkAllPermission({ field: "IsUpdate", value: e.target.checked }))
                                }
                                className="h-4 w-4 accent-yellow-500 cursor-pointer"
                            /><span className="font-bold ms-1"> Check All</span>
                        </div>
                    );
                }

                return (
                    <input
                        type="checkbox"
                        checked={row.IsUpdate}
                        disabled={deleteByUserGroup}
                        onChange={(e) =>
                            dispatch(
                                handleMenuPermissionChange({
                                    index: rowIndex - 1,
                                    field: "IsUpdate",
                                    checked: e.target.checked,
                                })
                            )
                        }
                        className="h-4 w-4 accent-yellow-500 cursor-pointer"
                    />
                );
            },
        },
        {
            key: "IsDelete",
            header: "Delete",
            render: (row, rowIndex) => {
                if (row.Id === 0) {
                    return (
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={row.IsDelete}
                                disabled={deleteByUserGroup}
                                onChange={(e) =>
                                    dispatch(checkAllPermission({ field: "IsDelete", value: e.target.checked }))
                                }
                                className="h-4 w-4 accent-red-600 cursor-pointer"
                            /><span className="font-bold ms-1"> Check All</span>
                        </div>
                    );
                }

                return (
                    <input
                        type="checkbox"
                        checked={row.IsDelete}
                        disabled={deleteByUserGroup}
                        onChange={(e) =>
                            dispatch(
                                handleMenuPermissionChange({
                                    index: rowIndex - 1,
                                    field: "IsDelete",
                                    checked: e.target.checked,
                                })
                            )
                        }
                        className="h-4 w-4 accent-red-600 cursor-pointer"
                    />
                );
            },
        },
        {
            key: "actions",
            header: "Action",
            render: (row) =>
                row.Id === 0 ? null : (
                    <Button
                        size="sm"
                        onClick={() =>
                            dispatch(
                                removeMenuFromList({
                                    moduleId: row.ModuleId,
                                    menuId: row.MenuId,
                                })
                            )
                        }
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold text-base px-3 py-1 rounded-md"
                    >
                        <FontAwesomeIcon icon={faTrash} /> Remove
                    </Button>
                ),
        },
    ];

    const { userList } = useSelector((state: RootState) => state.userGroup);
    const { userGroupList } = useSelector((state: RootState) => state.userGroup);
    const { moduleItems } = useSelector((state: RootState) => state.userWiseMenuPermission);
    const { menuItems } = useSelector((state: RootState) => state.userWiseMenuPermission);

    useEffect(() => {
        dispatch(getUserGroupList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUserGroupsetupUserList());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUserWiseMenuPermissionModuleItems());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getUserWiseMenuPermissionMenuItems());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setDropdownData({
            data: userGroupList,
            name: "userGroupList",
            labelKey: "GroupName",
            valueKey: "Id",
        }));
    }, [userGroupList]);


    useEffect(() => {
        dispatch(setDropdownData({
            data: userList,
            name: "userList",
            labelKey: "UserName",
            valueKey: "UserId",
        }));
    }, [userList]);


    useEffect(() => {
        dispatch(setDropdownData({
            data: moduleItems,
            name: "moduleItems",
            labelKey: "Modulename",
            valueKey: "Id",
        }));
    }, [moduleItems]);


    useEffect(() => {
        dispatch(setDropdownData({
            data: menuItems,
            name: "menuItems",
            labelKey: "MENUNAME",
            valueKey: "ID",
        }));
    }, [menuItems]);




    interface IUserSearch {
        UserId: number;
        UserName: string;
        UserGroupId: number;
        UserGroupName: string;
    }

    const [userSearchData, setUserSearchData] = useState<IUserSearch>(
        {
            UserId: 0,
            UserName: "",
            UserGroupId: 0,
            UserGroupName: ""
        }
    );
    interface IMenuSearch {
        ModuleId: number;
        ModuleName: string;
        MenuId: number;
        MenuName: string;
    }

    const [menuSearchData, setMenuSearchData] = useState<IMenuSearch>(
        {
            ModuleId: 0,
            ModuleName: "",
            MenuId: 0,
            MenuName: ""
        }
    );

    const handleChangeUserSearchInfo = (
        key: keyof IUserSearch,
        value: string,
        displayKey: keyof IUserSearch,
        displayValue: string,
    ) => {
        setUserSearchData((prev) => ({
            ...prev,
            [key]: value ?? prev[key],
            [displayKey]: displayValue ?? prev[displayKey]
        }));
    };


    const handleChangeMenuSearchInfo = (
        key: keyof IMenuSearch,
        value: string,
        displayKey: keyof IMenuSearch,
        displayValue: string,
    ) => {


        console.log(value)


        setMenuSearchData((prev) => ({
            ...prev,
            [key]: value ?? prev[key],
            [displayKey]: displayValue ?? prev[displayKey]
        }));
    };

    const handleAddUser = () => {

        if (userSearchData.UserGroupId === 0 && userSearchData.UserId === 0) {
            showHotError(
                "Please select a user group or a user.",
                { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" }
            );
            return;
        }

        const userGroupId = userSearchData.UserId == 0 ? userSearchData.UserGroupId : 0;

        dispatch(getUserWiseMenuPermissionUsersList({ userId: userSearchData.UserId, userGroupId: userGroupId }))
    }

    const handleAddMenu = () => {

        if (menuSearchData.ModuleId === 0 && menuSearchData.MenuId === 0) {
            showHotError(
                "Please select module or a menu.",
                { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" }
            );
            return;
        }

        const moduleId = menuSearchData.MenuId == 0 ? menuSearchData.ModuleId : 0;

        dispatch(getUserWiseMenuPermissionMenusList(
            {
                moduleId: moduleId,
                menuId: menuSearchData.MenuId,
                defaultCheck: !deleteByUserGroup
            }))
    }

    console.log(menuSearchData)

    return (
        <div className="p-2">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                <div className="lg:border-r lg:pr-5">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                        <div>
                            <FormField
                                label="User Group"
                                id="userGroup"
                                variant="inline"
                                labelFontSize="text-sm"
                            >
                                <DropdownAutoSuggest
                                    name="userGroupList"
                                    inputWidth={200}
                                    value={userSearchData.UserGroupName.toString()}
                                    onSelect={(val, displayVal) => handleChangeUserSearchInfo("UserGroupId", val || 0, "UserGroupName", displayVal)}
                                    className=""
                                />
                            </FormField>


                            <FormField
                                label="User"
                                id="user"
                                variant="inline"
                                labelFontSize="text-sm"

                            >
                                <DropdownAutoSuggest
                                    disabled={deleteByUserGroup}
                                    name="userList"
                                    inputWidth={200}
                                    value={userSearchData.UserName.toString()}
                                    onSelect={(val, displayVal) => handleChangeUserSearchInfo("UserId", val || 0, "UserName", displayVal)}
                                    className=""
                                />
                            </FormField>


                            <div className="mt-3">
                                <Button
                                    disabled={!!id}
                                    size="sm"
                                    className="flex ms-auto"
                                    onClick={() => handleAddUser()}
                                >
                                    <FontAwesomeIcon icon={faChevronDown} />
                                    Add User
                                </Button>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div className="mt-5"></div>

                    <div >
                        <CustomDataTable
                            data={usersLIst}
                            columns={userTableColumns}
                        />
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                        <div>
                            <FormField
                                label="Module"
                                id="module"
                                variant="inline"
                                labelFontSize="text-sm"
                            >
                                <DropdownAutoSuggest
                                    name="moduleItems"
                                    inputWidth={200}
                                    value={menuSearchData.ModuleName.toString()}
                                    onSelect={(val, displayVal) => handleChangeMenuSearchInfo("ModuleId", val || 0, "ModuleName", displayVal)}
                                    className=""
                                />
                            </FormField>


                            <FormField
                                label="Menu"
                                id="menu"
                                variant="inline"
                                labelFontSize="text-sm"
                            >
                                <DropdownAutoSuggest
                                    name="menuItems"
                                    inputWidth={200}
                                    value={menuSearchData.MenuName.toString()}
                                    onSelect={(val, displayVal) => handleChangeMenuSearchInfo("MenuId", val || 0, "MenuName", displayVal)}
                                    className=""
                                />
                            </FormField>


                            <div className="mt-3">
                                <Button
                                    size="sm"
                                    className="flex ms-auto"
                                    onClick={() => handleAddMenu()}
                                >
                                    <FontAwesomeIcon icon={faChevronDown} />
                                    Add Menu
                                </Button>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <div className="mt-5"></div>

                    <div className="table-wrapper w-full max-h-[500px] overflow-auto relative">
                        <div className="min-w-max">
                            <CustomDataTable
                                fixedWidth="w-full"
                                data={[selectAllRow, ...menusList]}
                                columns={menusTableColumns}
                            />
                        </div>
                    </div>
                </div>
            </div>

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


