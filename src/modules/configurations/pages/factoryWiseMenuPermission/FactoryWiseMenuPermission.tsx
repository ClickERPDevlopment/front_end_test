import { getRoutes, RouteLayout } from '@/app/constants';
import { AppDispatch, RootState } from '@/app/store';
import { FormField } from '@/components/form/FormField';
import SelectDropdown from '@/components/form/SelectDropdown';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '@/components/form/Button';
import { useDispatch, useSelector } from 'react-redux';
import { previousDay } from 'date-fns';
import { companyId } from '../../../../utils/local-storage-utils';
import { useTheme } from '@/hooks/useTheme';
import { Column, CustomDataTable } from '@/components/data-display/CustomDataTable';
import Checkbox from '@/components/form/Checkbox';
import { ICompany, ICompanyPermittedMenus, IImportedCompanies } from '../companySetup/company.interface';
import DropdownAutoSuggest from '@/components/form/DropdownAutoSuggest';
import { setDropdownData } from '@/app/dropdownSlice';
import { MenuItem } from '../../types/menu.interface';
import { useDashboardActions } from '@/layouts/DashboardLayout';
import { ActionButtons, ActionType } from '@/components/layout/ActionButtons';
import { fetchCompaniesByType, fetchCompanyTypes, fetchImportFromCompany, fetchPermittedMenusByFactories } from '../../reduxSlices/companySlice';
import { fetchModulesByCompany } from '../../reduxSlices/moduleSlice';
import { fetchMenusByModule, fetchMenusByModuleIdZero } from '../../reduxSlices/menuSlice';
import axiosInstance from '@/api/axiosInstance';
import { clearFactoryWiseMenuPermissionState, getCompanyById, saveFactoryWiseMenuPermission } from '../../reduxSlices/factoryWiseMenuPermission.Slice';
import { useHotToast } from '@/utils/hotToast.util';
import { useParams } from 'react-router-dom';


// factory type & factory
interface CompanyTypeAndCompanyFilter {
    companyTypeId: number;
    companyId: number;
}

// module & menu
interface ModuleAndMenuFilter {
    moduleId: number;
    moduleName: string;
    menuId: number;
    menuName: string;
}

// import menu from company
interface ImportMenuFromCompanyFilter {
    companyId: number;
    companyName: string;
}

// extends MenuItem with additional fields to track selection and permission.
interface ModulePermittedMenus extends MenuItem {
    isSelected: boolean;
    isPermitted: boolean;
    actions?: any;
}


export default function FactoryWiseMenuPermissions() {

    const dispatch: AppDispatch = useDispatch();


    const { factoryWiseMenuPermission, factoryWiseMenuPermissions, paginationObject, error, message, loading } = useSelector((state: RootState) => state.factoryWiseMenuPermission);
    const { companyTypes, dummyCompanies, companyPermittedMenus, permittedCompanies, filteredCompanies: filterByTypeCompanies, uniqueImportedCompanies, importedCompanies } = useSelector((state: RootState) => state.company);
    const { filteredModule } = useSelector((state: RootState) => state.module);
    const { filteredMenus } = useSelector((state: RootState) => state.menu);
    const { rowsPerPage, layout } = useTheme();
    const [openDropdownId, setOpenDropdownId] = useState<string>("");
    const webRoutes = getRoutes(layout as RouteLayout);
    const [companyTypeAndCompanyFilter, setCompanyTypeAndCompanyFilter] = useState<CompanyTypeAndCompanyFilter>({ companyId: 0, companyTypeId: 0 })
    const [moduleAndMenuFilter, setModuleAndMenuFilter] = useState<ModuleAndMenuFilter>({ moduleId: 0, moduleName: "", menuId: 0, menuName: "" })
    const [importMenuFromCompanyfilter, setImportMenuFromCompanyFilter] = useState<ImportMenuFromCompanyFilter>({ companyId: 0, companyName: "" })
    const [addedCompanies, setAddedCompanies] = useState<ICompany[]>([]);
    const [moduleByFilterMenus, setModuleByFilterMenus] = useState<MenuItem[]>([]);
    const [addedMenus, setAddedMenus] = useState<ModulePermittedMenus[]>([]);
    const [combinedData, setCombinedSelected] = useState<ICompanyPermittedMenus[]>([])
    const isRightColumnDisabled = addedCompanies.length === 0;                                      // disables right panel if no company is selected.
    const [checkAllFactories, setCheckAllFactories] = useState(false);                              // for "Check All" checkboxes for factories.
    const [checkAll, setCheckAll] = useState(false);
    const { setActions } = useDashboardActions();
    const [isEditMode, setIsEditMode] = useState(false);
    const { company } = useTheme()
    const { showHotCustom } = useHotToast();
    const { id } = useParams();
    const [selectedCompanyInfo, setSelectedCompanyInfo] = useState<ICompany | null>(null);
    const [formLoaded, setFormLoaded] = useState(false);

    // --- Action Button Handlers --- 
    const handleAction = useCallback(
        //debugger
        (action: ActionType) => {
            switch (action) {
                case "save":
                    console.log("Saving data:");
                    if (!company?.companyId) {
                        showHotCustom("No company selected!", { bgColor: "#f87171", textColor: "#fff", icon: "⚠️", position: "bottom-right", width: "250px" });
                        return;
                    }
                    if (!combinedData || (Array.isArray(combinedData) && combinedData.length === 0)) {
                        showHotCustom("No Permission to give!", { bgColor: "#ff0000", textColor: "#fff", icon: "⚠️", position: "bottom-right", width: "250px" });
                        return;
                    }
                    dispatch(saveFactoryWiseMenuPermission({ companyId: company.companyId, combinedData, }));
                    showHotCustom("Permission Granted!", { bgColor: "#36a72a", textColor: "#fff", icon: "✅", position: "bottom-right", width: "250px", });
                    break;
            }
        },
        [dispatch, factoryWiseMenuPermission, combinedData]
    );

    // --- Clear On Render --- 
    useEffect(() => {
        ////
        return () => {
            dispatch(clearFactoryWiseMenuPermissionState())
        }
    }, [])

    useEffect(() => {
        if (id) {
            dispatch(getCompanyById(Number(id)));
        }
    }, [id, dispatch]);


    useEffect(() => {
        const fetchCompanyInfo = async () => {
            if (id) {
                try {
                    const response = await axiosInstance.get(`/Company/${id}`);
                    setSelectedCompanyInfo(response.data); // Save data
                    setAddedCompanies([{
                        id: response.data.ID,
                        companyId: response.data.ID,
                        name: response.data.NAME,
                        companyTypeName: response.data.TYPE_NAME,
                        companyTypeId: response.data.COMPANY_UNIT_TYPE_ID,
                        isFactoryChecked: true
                    }]);
                } catch (error) {
                    console.error("Error fetching company info:", error);
                }
            }
        };
        fetchCompanyInfo();
    }, [id]);



    useEffect(() => {
        dispatch(fetchImportFromCompany({ companyId: 0, menuId: 0, moduleId: 0 }));
    }, [])


    useEffect(() => {
        if (company) {
            dispatch(fetchCompanyTypes(company.companyId));
            dispatch(fetchModulesByCompany(company.companyId));
        }
    }, [company, dispatch]);



    // useEffect for Filtering Companies & Menus
    // Company Type: filters dummy companies by selected type
    useEffect(() => {
        setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} show={{ save: !isEditMode, preview: !isEditMode }} />);
        return () => setActions(null);
    }, [setActions, isEditMode, handleAction]);

    useEffect(() => {
        if (companyTypeAndCompanyFilter.companyTypeId > 0) {
            dispatch(fetchCompaniesByType(companyTypeAndCompanyFilter.companyTypeId))
            // setFilterByTypeCompanies(dummyCompanies.filter(f => f.companyTypeId === companyTypeAndCompanyFilter.companyTypeId));
        }
    }, [companyTypeAndCompanyFilter])

    useEffect(() => {
        if (moduleAndMenuFilter.moduleId > 0 && company) {
            // setModuleByFilterMenus(filteredMenus
            //     .filter(f => f.moduleId === moduleAndMenuFilter.moduleId));
            dispatch(fetchMenusByModule({ companyId: company.companyId, moduleId: moduleAndMenuFilter.moduleId }));
        }
        if (moduleAndMenuFilter.moduleId === 0 && company) {
            dispatch(fetchMenusByModuleIdZero({ companyId: company.companyId, moduleId: moduleAndMenuFilter.moduleId }));
        }
    }, [moduleAndMenuFilter])

    // Builds a Cartesian product of selected companies × selected menus.
    // Only includes menus either in permittedCompanies or selectedMenuIds.
    // Updates combinedData → used to display active permissions.
    useEffect(() => {
        const companyMenuIds = permittedCompanies.map(c => 'c-' + c.companyId + '-m-' + c.menuId);
        const selectedCompanies = addedCompanies.filter(c => c.isFactoryChecked);
        const selectedMenus = addedMenus.filter(m => m.isSelected || m.isPermitted);
        const selectedMenuIds = addedMenus.map(m => m.id);
        console.log({ selectedMenus, companyMenuIds })
        // Create combinations (Cartesian product)
        const combinations: ICompanyPermittedMenus[] = selectedCompanies.flatMap(company =>
            selectedMenus
                .filter(menu => companyMenuIds.includes('c-' + company.companyId + '-m-' + menu.id) || selectedMenuIds.includes(menu.id))
                .map(menu => ({
                    companyId: company.companyId,
                    moduleId: menu.moduleId,
                    mainMenuId: menu.parentMenuId,
                    menuId: menu.id,
                    isActive: menu.isSelected
                }))
        );
        setCombinedSelected(combinations);
        if (id && !formLoaded && addedCompanies.length > 0) {
            console.log('formLoaded', !formLoaded, addedCompanies)
            setFormLoaded(true);
            handleLoadPermittedMenus();
        }
    }, [addedCompanies, addedMenus]);

    // Updates Redux dropdown slice with module & menu data. This is used by DropdownAutoSuggest components later.
    // moduleList → all filtered modules
    useEffect(() => {
        dispatch(setDropdownData({
            data: filteredModule,
            name: "moduleList",
            labelKey: "name",
            valueKey: "id",
        }));
    }, [filteredModule, dispatch]);

    // menuList → menus filtered by selected module
    useEffect(() => {
        dispatch(setDropdownData({
            data: filteredMenus,
            name: "menuList",
            labelKey: "name",
            valueKey: "id",
        }));
    }, [filteredMenus]);

    // useEffect: Update "Check All" states. Keeps "Check All" checkboxes in sync:
    // checkAll → for menus
    // checkAllFactories → for companies
    // Automatically checks/unchecks when items are selected/deselected.
    useEffect(() => {
        if (addedMenus.length > 0) {
            const allChecked = addedMenus.every(m => m.isSelected);
            setCheckAll(allChecked);
        } else {
            setCheckAll(false);
        }
    }, [addedMenus]);

    useEffect(() => {
        if (addedCompanies.length > 0) {
            const allChecked = addedCompanies.every(c => c.isFactoryChecked);
            setCheckAllFactories(allChecked);
        } else {
            setCheckAllFactories(false);
        }
    }, [addedCompanies]);


    // Adds single selected company to addedCompanies
    // Avoids duplicates.
    // Resets checkAll for right column menus.
    const handleAddCompany = () => {
        if (companyTypeAndCompanyFilter.companyId > 0) {
            const company = filterByTypeCompanies.find(f => f.companyId === companyTypeAndCompanyFilter.companyId);
            if (company) {
                const alreadyExists = addedCompanies.some(c => c.companyId === company.companyId);
                const companyType = companyTypes.find(c => c.companyTypeId === companyTypeAndCompanyFilter.companyTypeId);
                setAddedCompanies(prev => {
                    if (alreadyExists) {
                        return prev; // already added don’t add again
                    }
                    return [...prev, {
                        ...company,
                        companyTypeName: companyType?.companyTypeName,
                        companyTypeId: companyType?.companyTypeId,
                        isFactoryChecked: true
                    }];
                });
                // only company add right column clear 
                if (!alreadyExists) {
                    // setAddedMenus([]); // clear right column data table
                    setCheckAll(false);

                    showHotCustom("Factory Added!", { bgColor: "#36a72a", textColor: "#fff", icon: "✅", position: "bottom-right", width: "250px", });
                }
                else {
                    showHotCustom("Factory already added!", { bgColor: "#ff0000", textColor: "#fff", icon: "⚠️", position: "bottom-right", width: "250px", });
                }
            }

        }
    };

    // Adds all companies of selected type at once.
    // Avoids duplicates using filter
    const handleAddAllCompaniesByType = async () => {

        if (!companyTypeAndCompanyFilter.companyTypeId) return; // nothing selected nothing happens
        // selected type wise company filter form (dummyCompanies)
        const response = await axiosInstance.get(`/Company/get-by-company-type?companyTypeId=${companyTypeAndCompanyFilter.companyTypeId}`);

        const companyType = companyTypes.find(c => c.companyTypeId === companyTypeAndCompanyFilter.companyTypeId);

        const selectedTypeCompanies: ICompany[] = response.data.map((item: any) => {
            return {
                id: item.ID,
                companyId: item.ID,
                name: item.NAME,
                companyTypeName: companyType?.companyTypeName,
                companyTypeId: item.TYPE_ID,
                isFactoryChecked: true
            }
        });

        if (selectedTypeCompanies.length === 0)
            return;
        // remove duplicate
        const newCompaniesToAdd = selectedTypeCompanies.filter(
            company => !addedCompanies.some(a => a.companyId === company.companyId)
        );
        if (newCompaniesToAdd.length === 0) return;
        // set fields
        const formattedCompanies = newCompaniesToAdd.map(company => ({
            ...company,
            isFactoryChecked: true,
        }));
        // add
        setAddedCompanies(prev => [...prev, ...formattedCompanies]);

        // show toaster on success
        showHotCustom("Factories of selected type added!", { bgColor: "#007bff", textColor: "#fff", icon: "✅", position: "bottom-right", width: "250px", })
    };








    // Adds selected module/menu to right-side table.
    // Keeps previous selections intact.
    // Avoids duplicate menus.
    const handleAddMenus = async () => {
        let filtered = filteredMenus;

        if (moduleAndMenuFilter.moduleId == 0) {
            try {
                if (company) {
                    const response = await dispatch(fetchMenusByModule({ companyId: company.companyId, moduleId: 0 }));

                    if (fetchMenusByModule.fulfilled.match(response)) {
                        filtered = response.payload;
                    }
                }

            } catch (error) {

            }
        }
        // Module filter
        if (moduleAndMenuFilter.moduleId > 0) {
            filtered = filtered.filter(f => f.moduleId === moduleAndMenuFilter.moduleId);
        }
        // Menu filter
        if (moduleAndMenuFilter.menuId > 0) {
            filtered = filtered.filter(f => f.id === moduleAndMenuFilter.menuId);
        }
        // Convert to ModulePermittedMenus, preserve old selection state if any
        const newMenus: ModulePermittedMenus[] = filtered.map(item => {
            const existing = addedMenus.find(m => m.id === item.id);
            return {
                ...item,
                isSelected: existing ? existing.isSelected : false,
                isPermitted: false
            };
        });
        // Merge: keep previous menus, add new ones (avoid duplicates)
        const mergedMenus = [
            ...addedMenus, // keep everything that was already there
            ...newMenus.filter(nm => !addedMenus.some(am => am.id === nm.id)) // add only new
        ];

        setAddedMenus(mergedMenus);
    };


    const handleLoadPermittedMenus = async () => {
        const checkedCompanies = addedCompanies.filter(c => c.isFactoryChecked);
        if (checkedCompanies.length === 0 || !company) return;

        try {
            // factoryIds as CSV
            const factoryIds = checkedCompanies.map(c => c.companyId).join(',');

            // API call
            const response = await axiosInstance.get(
                `${company.companyId}/FactoryWiseMenuPermission/by-factories?factoryIds=${factoryIds}`
            );

            const apiMenus: any[] = response.data;
            if (!apiMenus || apiMenus.length === 0) return;

            let finalMenus: any[] = [];

            if (checkedCompanies.length === 1) {
                // Single factory: load all menus
                finalMenus = apiMenus;
            } else {
                // Multiple factories: find common menus
                const menusByFactory = checkedCompanies.map(factory =>
                    apiMenus.filter(menu => menu.COMPANY_ID === factory.companyId)
                );

                finalMenus = menusByFactory.reduce((common, current) => {
                    if (!common) return current;
                    return common.filter(cMenu =>
                        current.some(curr => curr.MENU_ID === cMenu.MENU_ID && curr.MODULE_ID === cMenu.MODULE_ID)
                    );
                }, null as typeof apiMenus | null) || [];
            }

            const loadedMenus: ModulePermittedMenus[] = finalMenus.map(item => ({
                id: item.MENU_ID,
                moduleId: item.MODULE_ID,
                moduleName: item.MODULE,
                parentMenuId: item.MAIN_MENU_ID,
                parentMenuName: item.MAIN_MENU,
                name: item.MENU,
                isSelected: item.IS_ACTIVE_STATUS,
                isPermitted: true,
                link: "",
                isAccess: false,
                isDelete: false,
                isInsert: false,
                isUpdate: false,
            }));

            setAddedMenus(loadedMenus);
            setImportMenuFromCompanyFilter({ companyId: 0, companyName: "" });

        } catch (error) {
            console.error("Failed to load permitted menus:", error);
        }
    };

    // useEffect(() => {
    //     if (selectedCompanyInfo && selectedCompanyInfo.companyId) {
    //         debugger
    //         handleLoadPermittedMenus();
    //     }
    // }, [selectedCompanyInfo]);


    // Imports menus from a single company selected in importMenuFromCompanyfilter.
    // isPermitted is false because this is just imported, not yet granted.
    const handleLoadImportedMenusFromRedux = async () => {
        if (!importMenuFromCompanyfilter.companyId || !company) return;
        // Filter Redux importedCompanies by selected companyId
        const companyId = importMenuFromCompanyfilter.companyId;
        const moduleId = moduleAndMenuFilter.moduleId;

        const response = await axiosInstance.get(`${companyId}/FactoryWiseMenuPermission?id=0&factoryId=${companyId}&moduleId=${moduleId}&mainMenuId=0&menuId=${0}`);

        // Map it to ModulePermittedMenus format
        const importedMenus: ModulePermittedMenus[] = response.data.map((item: any) => ({
            id: item.MENU_ID,
            moduleId: item.MODULE_ID,
            moduleName: item.MODULE,
            parentMenuId: item.MAIN_MENU_ID,
            parentMenuName: item.MAIN_MENU,
            name: item.MENU,
            isSelected: item.IS_ACTIVE_STATUS,
            isPermitted: false,
            link: "",          // default empty string
            isAccess: false,   // default false
            isDelete: false,   // default false
            isInsert: false,   // default false
            isUpdate: false,   // default false
        }));
        // Set the table data
        setAddedMenus(importedMenus);
    };


    // Get unique imported companies by name
    const uniqueImportedCompaniesLoaded = useMemo(() => {
        const map = new Map<number, typeof uniqueImportedCompanies[0]>();
        uniqueImportedCompanies.forEach(company => {
            if (!map.has(company.companyId)) {
                map.set(company.companyId, company);
            }
        });
        return Array.from(map.values());
    }, [uniqueImportedCompanies]);



    // Menu and factory checkboxes controlled by state.
    // Right-side table resets when selecting/unselecting factories.
    // Supports Check All functionality.
    const handleChangeMenuSelectedState = (checked: boolean, index: number) => {
        setAddedMenus(prev => {
            const updated = [...prev]; // clone array
            updated[index] = { ...updated[index], isSelected: checked }; // clone and modify item
            return updated;
        });
    }

    const handleChangeFactorySelectedState = (checked: boolean, index: number) => {
        setAddedCompanies(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], isFactoryChecked: checked };
            return updated;
        });
        // Right column-er menu refresh: shob unchecked
        // setAddedMenus(prev => prev.map(menu => ({ ...menu, isSelected: false })));
        if (checked) {
            setAddedMenus([]);
            setAddedMenus(prev => prev.map(menu => ({ ...menu, isSelected: false })));
            setCheckAll(false);
        }
        else {
            setCheckAll(false);
        }
    };

    const handleCheckAllMenus = (checked: boolean) => {
        setCheckAll(checked);
        setAddedMenus(prev => prev.map(menu => ({ ...menu, isSelected: checked })));
    };

    const handleCheckAllFactories = (checked: boolean) => {
        setCheckAllFactories(checked);
        setAddedCompanies(prev =>
            prev.map(company => ({ ...company, isFactoryChecked: checked }))
        );
    };


    // Defines columns for the tables: left → factories, right → menus.
    // actions column renders checkboxes.
    // useMemo avoids unnecessary re - renders.
    const FactoryUnitsTable: Column<ICompany>[] = useMemo(
        () => [
            {
                key: "name",
                header: "Factory Name",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "companyTypeName",
                header: "Company Unit Type",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "actions",
                header: "Active",
                width: "w-[10px]",
                align: "center",
                render: (item: ICompany, index) => (
                    <Checkbox
                        checked={item.isFactoryChecked || false}  // controlled from state
                        onChange={(checked) => { handleChangeFactorySelectedState(checked, index) }}
                        shape="square"
                        size="small"
                    />
                ),
            },
        ],
        [dispatch, addedCompanies]
    );

    const ModuleMenusTable: Column<ModulePermittedMenus>[] = useMemo(
        () => [
            {
                key: "actions",
                header: "Active",
                width: "w-[10px]",
                align: "center",
                render: (_item: ModulePermittedMenus, index) => {
                    return (
                        <Checkbox
                            checked={_item.isSelected}
                            onChange={(checked) => { handleChangeMenuSelectedState(checked, index) }}
                            shape="square"
                            size="small"
                        />
                    );
                },
            },
            {
                key: "moduleName",
                header: "Module Name",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "parentMenuName",
                header: "Main Menu",
                align: "left",
                width: "w-[300px]",
            },
            {
                key: "name",
                header: "Submenu",
                align: "left",
                width: "w-[300px]",
            },
        ],
        [dispatch, addedMenus]
    );

    return (
        <div className='p-2'>
            {/* Full-width Table */}
            < div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-5 gap-5" >
                {/* Left Column */}
                <div className='flex flex-col gap-2'>
                    {/* <div className='grid grid-cols-[40%_58%] gap-2'> */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                        <div className='flex flex-col'>
                            <div className=''>
                                <FormField
                                    label="Factory Type"
                                    id=""
                                    variant="inline"
                                >
                                    <SelectDropdown
                                        options={companyTypes}
                                        value={companyTypeAndCompanyFilter.companyTypeId.toString()}
                                        isSameKeyValue={false}
                                        labelKey="companyTypeName"
                                        valueKey="companyTypeId"
                                        onChange={(value) => setCompanyTypeAndCompanyFilter(prev => ({ ...prev, companyTypeId: Number(value) }))}
                                        className="text-sm w-full"
                                    />
                                </FormField>
                                <div className='flex justify-end mt-2'>
                                    <Button
                                        variant='filled'
                                        size='sm'
                                        onClick={handleAddAllCompaniesByType}
                                    // disabled={!companyTypeAndCompanyFilter.companyTypeId}
                                    >
                                        <FontAwesomeIcon icon={faAdd} /> Add all
                                    </Button>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <FormField
                                    label="Factory Name"
                                    id="companyName"
                                    variant="inline"
                                >
                                    <SelectDropdown
                                        options={filterByTypeCompanies}
                                        value={companyTypeAndCompanyFilter.companyId.toString()}
                                        isSameKeyValue={false}
                                        labelKey="name"
                                        valueKey="companyId"
                                        onChange={(value) => setCompanyTypeAndCompanyFilter(prev => ({ ...prev, companyId: Number(value) }))}
                                        className="text-sm w-full"
                                    />
                                </FormField>
                                <div className='flex justify-end mt-2'>
                                    <Button
                                        variant='filled'
                                        size='sm'
                                        onClick={handleAddCompany}
                                    >
                                        <FontAwesomeIcon icon={faAdd} /> Add
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-0 lg:mt-4'>
                        <div className="flex justify-end mb-2">
                            <Checkbox
                                checked={checkAllFactories}
                                onChange={(checked) => handleCheckAllFactories(checked)}
                                label="Check All Factories"
                                shape="square"
                                size="small"
                                disabled={addedCompanies.length === 0}
                            />
                        </div>
                        <CustomDataTable
                            columns={FactoryUnitsTable}
                            data={addedCompanies}
                            loading={loading}
                        />
                    </div>
                    <div>
                        {/* <ul>
                            {
                                combinedData.map((item, index) => {
                                    return <li key={`li-${index}`}>{JSON.stringify(item)}</li>
                                })
                            }
                        </ul> */}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4 col-span-1">
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
                        <div className='flex flex-col'>
                            <FormField
                                label="Module"
                                id="moduleName"
                                variant="inline"
                            >
                                <div className=''>
                                    <DropdownAutoSuggest
                                        name="moduleList"
                                        value={moduleAndMenuFilter.moduleName}
                                        //onSelect={(val, dis, item) => setModuleAndMenuFilter(prev => ({ ...prev, moduleId: Number(val), moduleName: dis }))}
                                        onSelect={(val, dis, item) => {
                                            if (!val) {
                                                // If module is cleared, also clear the menu
                                                setModuleAndMenuFilter(prev => ({
                                                    ...prev,
                                                    moduleId: 0,
                                                    moduleName: "",
                                                    menuId: 0,
                                                    menuName: "",
                                                }));
                                                if (moduleAndMenuFilter.moduleId === 0 && company) {
                                                    dispatch(fetchMenusByModuleIdZero({ companyId: company.companyId, moduleId: moduleAndMenuFilter.moduleId }));
                                                }
                                            } else {
                                                setModuleAndMenuFilter(prev => ({
                                                    ...prev,
                                                    moduleId: Number(val),
                                                    moduleName: dis,
                                                }));
                                            }
                                        }}
                                        disabled={isRightColumnDisabled}
                                        className=''
                                    />
                                </div>
                            </FormField>
                            <FormField
                                label="Menu Name"
                                id="moduleName"
                                variant="inline"
                            >
                                <div className='flex gap-2'>
                                    <DropdownAutoSuggest
                                        name="menuList"
                                        value={moduleAndMenuFilter.menuName}
                                        onSelect={(val, dis, item) => setModuleAndMenuFilter(prev => ({ ...prev, menuId: Number(val), menuName: dis }))}
                                        disabled={isRightColumnDisabled}
                                        className=''
                                    />
                                </div>
                            </FormField>
                            <div className='flex justify-end mt-2'>
                                <Button
                                    variant='filled'
                                    size='sm'
                                    onClick={handleAddMenus}
                                    disabled={isRightColumnDisabled}
                                >
                                    <FontAwesomeIcon icon={faAdd} /> Add
                                </Button>
                            </div>
                            <div>
                                <Button
                                    variant='filled'
                                    size='sm'
                                    onClick={handleLoadPermittedMenus}  // updated handler
                                    disabled={isRightColumnDisabled}
                                >
                                    <FontAwesomeIcon icon={faAdd} /> Load Permitted Menu
                                </Button>
                            </div>
                        </div>
                        <div>
                            <FormField
                                label="Import Menu from"
                                id="companyName"
                                variant="inline"
                            >
                                <SelectDropdown
                                    options={uniqueImportedCompaniesLoaded}
                                    value={importMenuFromCompanyfilter.companyId.toString()}
                                    isSameKeyValue={false}
                                    labelKey="companyName"
                                    valueKey="companyId"
                                    onChange={(value) =>
                                        setImportMenuFromCompanyFilter(prev => ({ ...prev, companyId: Number(value) }))
                                    }
                                    className="text-sm w-full"
                                    disabled={isRightColumnDisabled}
                                />
                            </FormField>
                            <div className='flex justify-end mt-2'>
                                <Button
                                    variant='filled'
                                    size='sm'
                                    onClick={handleLoadImportedMenusFromRedux}
                                >
                                    <FontAwesomeIcon icon={faAdd} /> Import
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <Checkbox
                            checked={checkAll}
                            onChange={(checked) => handleCheckAllMenus(checked)}
                            label="Check All"
                            shape="square"
                            size="small"
                            disabled={isRightColumnDisabled}
                        />
                    </div>
                    <div className=''>
                        <CustomDataTable
                            columns={ModuleMenusTable}
                            data={addedMenus}
                            loading={loading}
                            fixedHeight="h-[calc(100vh-290px)]"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
