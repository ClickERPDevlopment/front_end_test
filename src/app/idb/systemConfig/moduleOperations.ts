import { initDB } from "../dbConnection";
import {
  IDX_MODULE_STORE
} from "../../constants";
import { ModuleItem } from "../../../modules/configurations/types/module.interface";

const STORE_NAME = IDX_MODULE_STORE;

export const saveModuleData = async ( moduleData: ModuleItem[]) => {
  try {
    const db = await initDB();

    // 1. Clear the store first
    const clearTx = db.transaction(STORE_NAME, "readwrite");
    await clearTx.objectStore(STORE_NAME).clear();
    await clearTx.done;

    // 2. Add all menu items
    for (const item of moduleData) {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      await store.put(item);
      await tx.done;
    }

    // console.log("Menu data saved successfully to IndexedDB");
  } catch (error) {
    console.error("Error saving menu data:", error);
    throw error;
  }
};

// Optional: Function to get all menu items
export const getAllModules = async (): Promise<ModuleItem[]> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return store.getAll();
};


// Check if store exists and contains data
export const checkIfModuleStore = async () => {
    const db = await initDB();
    const storeNames = db.objectStoreNames;

    // Check if the store exists
    if (!storeNames.contains(STORE_NAME)) {
        return { exists: false, hasData: false };
    }

    const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
    const allItems: ModuleItem[] = await store.getAll();

    // Check if there is any data in the store
    const hasData = allItems.length > 0;

    return { exists: true, hasData };
};

export const clearModuleData = async () => {
    const db = await initDB();
    await db.clear(STORE_NAME);
};


