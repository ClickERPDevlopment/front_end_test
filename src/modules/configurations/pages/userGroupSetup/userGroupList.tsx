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
import { getUserGroupList } from "../../reduxSlices/userGroup.slice";
import { IUserGroupSetupMaster } from "./userGroupSetup.interface";

export default function UserGroupList() {

    const dispatch: AppDispatch = useDispatch();
    const { rowsPerPage, layout, company } = useTheme();

    // const { sales, paginationObject, error, message, loading } = useSelector(
    //     (state: RootState) => state.inventorySale
    // );


    const { userGroupList, paginationObject, error, message, loading } = useSelector(
        (state: RootState) => state.userGroup
    );

    const [openDropdownId, setOpenDropdownId] = useState<string>("");

    // useEffect(() => {
    //     dispatch(getPagedInventorySales({ page: 1, perPage: Number(rowsPerPage), searchCriteria: { factoryId: company?.companyId || 0 } }));
    // }, [dispatch]);


    useEffect(() => {
        dispatch(getUserGroupList());
    }, [dispatch]);


    console.log(userGroupList)


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


    // const detailsColumns: Column<IInventorySale>[] = useMemo(
    //     () => [
    //         {
    //             key: "saleNo",
    //             header: "Sale No",
    //             align: "left",
    //             width: "w-[300px]",
    //         },
    //         {
    //             key: "saleDate",
    //             header: "Sale Date",
    //             align: "left",
    //             width: "w-[300px]",
    //         },
    //         {
    //             key: "customerName",
    //             header: "Customer",
    //             align: "left",
    //             width: "w-[300px]",
    //         },
    //         {
    //             key: "actions",
    //             header: "Action",
    //             width: "w-[10px]",
    //             align: "center",
    //             render: (_item: IInventorySale, index: number) => {
    //                 const dropdownId = `dropdown-${_item.id || index}`;
    //                 return (
    //                     <>
    //                         <Button
    //                             href={`${webRoutes.INVENTORY_SALE_CREATE}/${_item.id}`}
    //                             variant="flat"
    //                             size="sm"
    //                             className="p-1 bg-amber-300"
    //                         >
    //                             <FontAwesomeIcon icon={faPenToSquare} />
    //                         </Button>
    //                     </>
    //                 );
    //             },
    //         },
    //     ],

    //     [openDropdownId, handleToggle]
    // );


    const userGroupListColumns: Column<IUserGroupSetupMaster>[] = useMemo(
        () => [
            {
                key: "GroupName", // match the interface key
                header: "Group Name",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "actions",
                header: "Action",
                align: "center",
                width: "w-[80px]",
                render: (_item: IUserGroupSetupMaster, index: number) => {
                    const id = _item.Id ?? index; // fallback to index if id is undefined
                    return (
                        <Button
                            href={`${webRoutes.USER_GROUP_ENTRY}/${id}`}
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
        [] // only run once since no dependencies are needed here
    );


    return (
        <Panel
            rounded={false}
        >
            {/* Bottom MaterialGroup: Full-width Table */}
            <div className="grid grid-cols-1 ">
                <div className="space-y-4 col-span-1">
                    <CustomDataTable
                        columns={userGroupListColumns}
                        data={userGroupList}
                        columnsButton
                        loading={loading}
                        perPageDropdown
                        haveBreadcrumb
                        // onPageChange={onPageChange}
                        // paginationObject={paginationObject}
                        // onPerPageChange={onPerPageChange}
                        buttons={<><Button to={`${webRoutes.USER_GROUP_ENTRY}`} size="sm" ><FeatherIcon icon={PlusSquare} />New User Group</Button></>}
                    />
                </div>
            </div>
        </Panel>
    );
}
