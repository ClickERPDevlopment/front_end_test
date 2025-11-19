import { initDB } from "../dbConnection";
import {
    IDX_IE_MACHINES_STORE
} from "../../constants";
import { IMachines } from "@/modules/iE/pages/machinesSetup/machine.interface";


const STORE_NAME = IDX_IE_MACHINES_STORE;

export const saveMachineData = async (
    lineData: IMachines[]
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

export const getAllMachines = async (): Promise<IMachines[]> => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    return store.getAll();
};

// Check if store exists and contains data
export const checkIfMachinesStore = async () => {
    const db = await initDB();
    const storeNames = db.objectStoreNames;

    // Check if the store exists
    if (!storeNames.contains(STORE_NAME)) {
        return { exists: false, hasData: false };
    }

    const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
    const allItems: IMachines[] = await store.getAll();

    // Check if there is any data in the store
    const hasData = allItems.length > 0;

    return { exists: true, hasData };
};

export const clearMachineData = async () => {
    const db = await initDB();
    await db.clear(STORE_NAME);
};
