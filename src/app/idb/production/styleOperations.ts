import { initDB } from "../dbConnection";
import { IDX_STYLE_STORE } from "../../constants";
import { IStyle } from "@/modules/garmentsProduction/types/style.interface";

const STORE_NAME = IDX_STYLE_STORE;

export const saveStyleData = async (lineData: IStyle[]) => {
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

export const getAllStyle = async (): Promise<IStyle[]> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return store.getAll();
};

export const getStylesByBuyerId = async (buyerId: number): Promise<IStyle[]> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const index = tx.store.index("buyerId");
  const results = await index.getAll(buyerId);
  
  return results;
};

// Check if store exists and contains data
export const checkIfStyleStore = async () => {
  const db = await initDB();
  const storeNames = db.objectStoreNames;

  // Check if the store exists
  if (!storeNames.contains(STORE_NAME)) {
    return { exists: false, hasData: false };
  }

  const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
  const allItems: IStyle[] = await store.getAll();

  // Check if there is any data in the store
  const hasData = allItems.length > 0;

  return { exists: true, hasData };
};

export const clearStyleData = async () => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};
