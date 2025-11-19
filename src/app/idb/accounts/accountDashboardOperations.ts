import { initDB } from "../dbConnection";
import { IDX_ACCOUNT_DASHBOARD_STORE } from "../../constants";
import { DashboardConfig } from "../../../types/global";

const STORE_NAME = IDX_ACCOUNT_DASHBOARD_STORE;

export const saveAccountDashboardData = async (data: DashboardConfig[]) => {
  const db = await initDB();

  // 1. Clear the store first
  const clearTx = db.transaction(STORE_NAME, "readwrite");
  await clearTx.objectStore(STORE_NAME).clear();
  await clearTx.done;

  for (const item of data) {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    await store.put({ ...item });
    await tx.done;
  }
};

export const getFirstAccountDashboardData = async (): Promise<DashboardConfig | undefined> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);

  const cursor = await store.openCursor();
  const firstItem = cursor?.value;

  await tx.done;
  return firstItem;
};


export const saveAccountDashboard = async (userDashboard: DashboardConfig) => {
  const db = await initDB();

  // 1. Clear the store first
  const clearTx = db.transaction(STORE_NAME, "readwrite");
  await clearTx.objectStore(STORE_NAME).clear();
  await clearTx.done;

  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put({ ...userDashboard });
  await tx.done;
};

export const removeAccountDashboardByID = async (id: number) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  await store.delete(Number(id));

  await tx.done;
};

export const getAllAccountDashboard = async (): Promise<DashboardConfig[]> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return store.getAll();
};

// Check if store exists and contains data
export const checkIfAccountDashboardStore = async () => {
  const db = await initDB();
  const storeNames = db.objectStoreNames;

  // Check if the store exists
  if (!storeNames.contains(STORE_NAME)) {
    return { exists: false, hasData: false };
  }

  const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
  const allItems: DashboardConfig[] = await store.getAll();

  // Check if there is any data in the store
  const hasData = allItems.length > 0;

  return { exists: true, hasData };
};

export const clearAccountDashboardData = async () => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};
