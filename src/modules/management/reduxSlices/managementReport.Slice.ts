import { createInitialPaginationObject, FetchParams, PaginationObject } from "@/types/global";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { handleThunkError } from "@/utils/handleThunkError";
