import { initDB } from "../dbConnection";
import { IDX_FLOOR_STORE } from "../../constants";
import { IFloor } from "@/modules/configurations/pages/floorSetup/floor.interface";

const STORE_NAME = IDX_FLOOR_STORE;

export const saveFloorData = async (
    lineData: IFloor[]
) => {
    const db = await initDB();

    // 1. Clear the store first
    const clearTx = db.transaction(STORE_NAME, "readwrite");
    await clearTx.objectStore(STORE_NAME).clear();
    await clearTx.done;

    for (const item of lineData) {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        await store.put({ ...item });
        await tx.done;
    }
};

export const getAllProductionFloor = async (): Promise<IFloor[]> => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    return store.getAll();
};

// Check if store exists and contains data
export const checkIfFloorStore = async () => {
    const db = await initDB();
    const storeNames = db.objectStoreNames;

    // Check if the store exists
    if (!storeNames.contains(STORE_NAME)) {
        return { exists: false, hasData: false };
    }

    const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
    const allItems: IFloor[] = await store.getAll();

    // Check if there is any data in the store
    const hasData = allItems.length > 0;

    return { exists: true, hasData };
};

export const clearFloorData = async () => {
    const db = await initDB();
    await db.clear(STORE_NAME);
};
