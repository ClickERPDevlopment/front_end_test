import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../api/axiosInstance";
import { DEFAULT_PAGE, DEFAULT_PER_PAGE } from "../../../app/constants";
import { AxiosError } from "axios";
import { createInitialPaginationObject, FetchParams, PaginationObject, } from "../../../types/global";
import { ICompany, ICompanyState, IFactoryType, IImportedCompanies } from '../pages/companySetup/company.interface';
import { ICompanyType } from "@/actions/Configurations/company-action";
import { map } from 'zod';

const initialState: ICompanyState = {
    companies: [],
    companyTypes: [

    ],
    dummyCompanies: [
    ],
    importedCompanies: [
    ],
    uniqueImportedCompanies: [
    ],
    permittedCompanies: [
        {
            companyId: 1,
            companyName: "Factory 1",
            moduleId: 1,
            mainMenuId: 5,
            menuId: 1,
            isActive: true
        },
        {
            companyId: 1,
            companyName: "Factory 1",
            moduleId: 2,
            mainMenuId: 6,
            menuId: 2,
            isActive: true
        },
        {
            companyId: 2,
            companyName: "Factory 2",
            moduleId: 2,
            mainMenuId: 6,
            menuId: 2,
            isActive: true
        },
        {
            companyId: 2,
            companyName: "Factory 2",
            moduleId: 1,
            mainMenuId: 7,
            menuId: 3,
            isActive: true
        },
        {
            companyId: 2,
            companyName: "Factory 2",
            moduleId: 1,
            mainMenuId: 8,
            menuId: 4,
            isActive: true
        },
        {
            companyId: 2,
            companyName: "Factory 2",
            moduleId: 3,
            mainMenuId: 6,
            menuId: 5,
            isActive: true
        },
        {
            companyId: 2,
            companyName: "Factory 2",
            moduleId: 3,
            mainMenuId: 5,
            menuId: 6,
            isActive: true
        },
        {
            companyId: 2,
            companyName: "Factory 2",
            moduleId: 3,
            mainMenuId: 9,
            menuId: 7,
            isActive: true
        },
        {
            companyId: 3,
            companyName: "Factory 3",
            moduleId: 3,
            mainMenuId: 8,
            menuId: 8,
            isActive: true
        },
        {
            companyId: 3,
            companyName: "Factory 3",
            moduleId: 1,
            mainMenuId: 10,
            menuId: 9,
            isActive: true
        },
        {
            companyId: 3,
            companyName: "Factory 3",
            moduleId: 2,
            mainMenuId: 11,
            menuId: 10,
            isActive: true
        }
    ],
    filteredCompanies: [],
    company: {
        name: "",
        id: 1,
        companyId: 1,
        isDefault: false
    },
    paginationObject: createInitialPaginationObject<ICompany>(),
    loading: false,
    error: null,
    status: "idle",
    message: "",
    companyPermittedMenus: []
};


export const fetchPermittedMenusByFactories = createAsyncThunk(
    "factoryWiseMenuPermission/fetchPermittedMenusByFactories",
    async ({ companyId, factoryIds }: { companyId: number; factoryIds: number[] }, { rejectWithValue }) => {
        try {
            const ids = factoryIds.join(",");
            const response = await axiosInstance.get(
                `/${companyId}/FactoryWiseMenuPermission/by-factories?factoryIds=${ids}`
            );
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);



export const fetchImportFromCompany = createAsyncThunk(
    "company/fetchImportFromCompany",
    async ({ companyId, menuId, moduleId }: { companyId: number, moduleId: number, menuId: number }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${companyId}/FactoryWiseMenuPermission?id=0&factoryId=${companyId}&moduleId=${moduleId}&mainMenuId=0&menuId=${menuId}`);
            const data: IImportedCompanies[] = response.data.map((obj: any) => ({
                companyId: obj.COMPANY_ID,
                companyName: obj.COMPANY,
                moduleId: obj.MODULE_ID,
                mainMenuId: obj.MAIN_MENU_ID,
                menuId: obj.MENU_ID,
                isActive: obj.IS_ACTIVE_STATUS
            }));
            return { menus: data, companyId: companyId };
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);


export const fetchCompanyTypes = createAsyncThunk(
    "company/fetchCompanyTypes",
    async (companyId: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/${companyId}/CompanyType`);
            const data: IFactoryType[] = response.data.map((type: any) => ({
                companyTypeId: type.ID,
                companyTypeName: type.TYPE_NAME,
            }));

            return data;

        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);




// export const fetchCompaniesByType = createAsyncThunk(
//     "company/fetchCompaniesByType",
//     async (companyTypeId: number, { rejectWithValue }) => {
//         try {
//             const response = await axiosInstance.get(
//                 `/Company/get-by-company-type?companyTypeId=${companyTypeId}`
//             );
//             // Assume API returns array of companies
//             return response.data as ICompany[];
//         } catch (err) {
//             const error = err as AxiosError<{ message: string }>;
//             const errorMessage =
//                 error.response?.data?.message || error.message || "Unknown error";
//             return rejectWithValue(errorMessage);
//         }
//     }
// );

export const fetchCompaniesByType = createAsyncThunk(
    "company/fetchCompaniesByType",
    async (companyTypeId: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                `/Company/get-by-company-type?companyTypeId=${companyTypeId}`
            );

            const data: ICompany[] = response.data.map((company: any) => {
                return {
                    id: company.ID,
                    companyId: company.ID,
                    name: company.NAME,
                }
            })

            return data;

        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);


// Async thunk for fetching buyers
export const fetchPaginatedCompanies = createAsyncThunk(
    "company/fetchPaginatedCompanies",
    async (
        { page = DEFAULT_PAGE, perPage = DEFAULT_PER_PAGE }: FetchParams,
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.get(
                `/line-list?page=${page}&perPage=${perPage}`
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;

            // Safely access error.response?.data?.message
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const fetchAllCompanies = createAsyncThunk(
    "company/fetchAllCompanies",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`User/GetAllCompanyByUser`);
            const converted: ICompany[] = response.data.map((item: any) => ({
                id: item.ID,
                companyId: item.COMPANYID,
                name: item.COMPANYNAME,
                isDefault: item.IS_DEFAULT_COMPANY,
            }));
            // debugger
            return converted;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);


export const GetAllSecCompany = createAsyncThunk(
    "company/getAllSecCompany",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`Company`);
            const converted: ICompany[] = response.data.map((item: any) => ({
                id: item.ID,
                companyId: item.ID,
                name: item.NAME,
            }));
            // debugger
            return converted;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);


export const fetchCompany = createAsyncThunk(
    "company/fetchCompany",
    async ({ id }: { id: string }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/company-show/${id}`);
            return response.data;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

export const createCompany = createAsyncThunk(
    "company/createCompany",
    async (formState: Omit<ICompany, "id">, { rejectWithValue }) => {
        try {
            const { name } = formState;

            const data = {
                name: name,
            };
            const response = await axiosInstance.post("/company-save", data);
            return response.data.message;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

// Async thunk for updating a session
export const updateCompany = createAsyncThunk(
    "company/updateCompany",
    async (formState: ICompany, { rejectWithValue }) => {
        try {
            const { name, id } = formState;
            const data = {
                id: id,
                name: name,
            };
            const response = await axiosInstance.put(`/company-update/${data.id}`, data);
            return response.data.message;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

// Async thunk for deleting a session
export const deleteCompany = createAsyncThunk(
    "company/deleteCompany",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/company-delete/${id}`);
            return response.data.message;
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const errorMessage =
                error.response?.data?.message || error.message || "Unknown error";
            return rejectWithValue(errorMessage);
        }
    }
);

const productionCompanySlice = createSlice({
    name: "company",
    initialState,
    reducers: {
        updateCompanyField<K extends keyof ICompany>(
            state: ICompanyState,
            action: PayloadAction<{ key: K; value: ICompany[K] }>
        ) {
            const { key, value } = action.payload;
            state.company[key] = value;
        },
        resetForm(state) {
            Object.assign(state, initialState);
        },
        resetMessage(state) {
            state.message = "";
        },
        resetError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaginatedCompanies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchPaginatedCompanies.fulfilled,
                (state, action: PayloadAction<PaginationObject<ICompany>>) => {
                    state.paginationObject = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchPaginatedCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(fetchAllCompanies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchAllCompanies.fulfilled,
                (state, action: PayloadAction<ICompany[]>) => {
                    state.companies = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchAllCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(GetAllSecCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                GetAllSecCompany.fulfilled,
                (state, action: PayloadAction<ICompany[]>) => {
                    state.companies = action.payload;
                    state.loading = false;
                }
            )
            .addCase(GetAllSecCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            .addCase(fetchCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchCompany.fulfilled,
                (state, action: PayloadAction<ICompany>) => {
                    state.company = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(createCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                createCompany.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(createCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(updateCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                updateCompany.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(updateCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(deleteCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                deleteCompany.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.message = action.payload;
                }
            )
            .addCase(deleteCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCompaniesByType.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompaniesByType.fulfilled, (state, action) => {
                state.loading = false;
                state.filteredCompanies = action.payload;
                state.error = null;
            })
            .addCase(fetchCompaniesByType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCompanyTypes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCompanyTypes.fulfilled, (state, action) => {
                state.companyTypes = action.payload; // Directly use payload
                state.status = "succeeded";
                state.loading = false;
            })
            .addCase(fetchCompanyTypes.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchImportFromCompany.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchImportFromCompany.fulfilled, (state, action) => {
                if (action.payload.companyId === 0) {
                    state.uniqueImportedCompanies = action.payload.menus;
                } else {
                    state.importedCompanies = action.payload.menus;
                }

                state.status = "succeeded";
                state.loading = false;
            })
            .addCase(fetchImportFromCompany.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPermittedMenusByFactories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPermittedMenusByFactories.fulfilled, (state, action) => {
                state.loading = false;
                state.permittedCompanies = action.payload;
            })
            .addCase(fetchPermittedMenusByFactories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

    },
});

export const {
    resetForm: resetCompanyForm,
    resetMessage,
    resetError,
    updateCompanyField,
} = productionCompanySlice.actions;

export default productionCompanySlice.reducer;
