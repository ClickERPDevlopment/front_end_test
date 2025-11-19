import { getRoutes, RouteLayout } from "@/app/constants";
import { AppDispatch, RootState } from "@/app/store";
import Button from "@/components/form/Button";
import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import FeatherIcon from "@/components/FeatherIcon";
import Panel from "@/components/layout/Panel";
import { useTheme } from "@/hooks/useTheme";
import { faPenToSquare, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PlusSquare } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { getUserGroupList } from "../../reduxSlices/userGroup.slice";
import { GetAllSecUserWithModifiedName } from "../../reduxSlices/secUser.Slice";
import { IUserWiseMenuPermission, IUserWiseMenuPermissionList } from "./userWiseMenuPermission.interface";
import { getPagedUserWiseMenuPermission, getUserWiseMenuPermissionList } from "../../reduxSlices/userWiseMenuPermission.slice";

export default function UserWiseMenuPermissionList() {

    const dispatch: AppDispatch = useDispatch();
    const { rowsPerPage, layout, company } = useTheme();

    const { list, paginationObject, error, message, loading } = useSelector(
        (state: RootState) => state.userWiseMenuPermission
    );

    const { users } = useSelector(
        (state: RootState) => state.secUser
    );

    const [openDropdownId, setOpenDropdownId] = useState<string>("");

    useEffect(() => {
        dispatch(GetAllSecUserWithModifiedName());
        // dispatch(getUserWiseMenuPermissionList({ userId: 0 }));
    }, [dispatch]);


    useEffect(() => {
        dispatch(getPagedUserWiseMenuPermission({ page: 1, perPage: Number(rowsPerPage), searchCriteria: { factoryId: company?.companyId || 0 } }));
    }, [dispatch]);


    const onPageChange = useCallback((page: number) => {
        debugger
        dispatch(getPagedUserWiseMenuPermission({ page, perPage: Number(rowsPerPage) }));
    }, [dispatch, rowsPerPage]);

    const onPerPageChange = useCallback((perPage: number) => {
        dispatch(getPagedUserWiseMenuPermission({ page: 1, perPage }));
    }, [dispatch]);


    const webRoutes = getRoutes(layout as RouteLayout);


    // const onPageChange = useCallback((page: number) => {
    //     debugger
    //     dispatch(getPagedInventorySales({ page, perPage: Number(rowsPerPage) }));
    // }, [dispatch, rowsPerPage]);

    // const onPerPageChange = useCallback((perPage: number) => {
    //     dispatch(getPagedInventorySales({ page: 1, perPage }));
    // }, [dispatch]);


    // --------- DELETE BUTTON CODES START ---------
    const handleDelete = async (id: number, closeDropdown: () => void) => {
        // if (window.confirm("Are you sure you want to delete this department?")) {
        //     const resultAction = await dispatch(removeMaterialGroup(id));
        //     if (removeMaterialGroup.fulfilled.match(resultAction)) {
        //         // Delete success, now refetch
        //         dispatch(getPagedMaterialGroups({ perPage: Number(rowsPerPage) }));
        //         closeDropdown();
        //         setOpenDropdownId("");
        //     } else {
        //         // Optional: show error
        //         console.error("Failed to delete:", resultAction.payload);
        //     }
        // }
    };
    // --------- DELETE BUTTON CODES END ------------

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


    const userWiseMenuPermissionListColumns: Column<IUserWiseMenuPermissionList>[] = useMemo(
        () => [
            {
                key: "EmpCode",
                header: "Emp Code",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "UserName",
                header: "User Name",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "Designation",
                header: "Designation",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "NoOfModules",
                header: "No Of Modules",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "NoOfMenus",
                header: "No Of Menus",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "actions",
                header: "Action",
                align: "center",
                width: "w-[80px]",
                render: (_item: IUserWiseMenuPermissionList, index: number) => {
                    const id = _item.UserId ?? index;
                    return (
                        <Button
                            href={`${webRoutes.USER_WISE_MENU_PERMISSION_ENTRY}/${id}`}
                            variant="flat"
                            size="sm"
                            className="p-1 bg-amber-300"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                    );
                },
            },
        ],
        []
    );


    return (
        <Panel
            rounded={false}
        >
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={userWiseMenuPermissionListColumns}
                        data={list}
                        columnsButton
                        loading={loading}
                        perPageDropdown
                        haveBreadcrumb
                        onPageChange={onPageChange}
                        paginationObject={paginationObject}
                        onPerPageChange={onPerPageChange}
                        buttons={
                            <>
                                <Button to={`${webRoutes.USER_WISE_MENU_PERMISSION_ENTRY}`} size="sm" ><FeatherIcon icon={PlusSquare} />Create New</Button>
                                <Button className="bg-red-700" to={`${webRoutes.USER_WISE_MENU_PERMISSION_DELETE_BY_USER_GROUP}`} size="sm" ><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete By User Group</Button>
                            </>
                        }
                    />
                </div>
            </div>
        </Panel>
    );
}
