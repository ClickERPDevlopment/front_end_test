import { initDB } from "../dbConnection";
import {
  IDX_TNA_TASK_STORE
} from "../../constants";
import { ITnaTask } from "../../../modules/planning/pages/tnaTaskSetup/tnaTaskType.interface";

const STORE_NAME = IDX_TNA_TASK_STORE;

export const saveTnaTaskTypeData = async (tasks: ITnaTask[], fromInitial = false) => {
  const db = await initDB();

  // Clear the store first
  const clearTx = db.transaction(STORE_NAME, "readwrite");
  await clearTx.objectStore(STORE_NAME).clear();
  await clearTx.done;

  // Single transaction for all inserts
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  tasks.forEach((item, index) => {
    const sortBy = index + 1

    store.put({
      ...item,
      sortBy,
    });
  });

  await tx.done;
  if (!fromInitial) {
     localStorage.setItem("isTnaTaskIndexDBStoreUpdated", JSON.stringify(true));
  }
 
};

export const saveTnaTaskType = async (
  task: ITnaTask
) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put({ ...task });
  await tx.done;
  localStorage.setItem("isTnaTaskIndexDBStoreUpdated", JSON.stringify(true));
};

export const removeTnaTaskTypeByID = async (id: number) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  await store.delete(Number(id));

  await tx.done;

  localStorage.setItem("isTnaTaskIndexDBStoreUpdated", JSON.stringify(true));
};

export const getAllTnaTaskType = async (): Promise<ITnaTask[]> => {
  
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const index = store.index("sortByTnaTask_idx");

  return index.getAll(); // ASC by default
};

// Check if store exists and contains data
export const checkIfTnaTaskTypeStore = async () => {
  const db = await initDB();
  const storeNames = db.objectStoreNames;

  // Check if the store exists
  if (!storeNames.contains(STORE_NAME)) {
    return { exists: false, hasData: false };
  }

  const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
  const allItems: ITnaTask[] = await store.getAll();

  // Check if there is any data in the store
  const hasData = allItems.length > 0;

  return { exists: true, hasData };
};

export const clearTnaTaskTypeData = async () => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};
