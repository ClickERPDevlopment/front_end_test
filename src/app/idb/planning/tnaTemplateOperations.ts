import { ITnaTemplateTask } from "@/modules/planning/pages/tnaTemplateSetup/tnaTemplate.interface";
import {
  IDX_TNA_TEMPLATE_STORE
} from "../../constants";
import { initDB } from "../dbConnection";

const STORE_NAME = IDX_TNA_TEMPLATE_STORE;

export const saveTnaTempateTaskData = async (tasks: ITnaTemplateTask[], fromInitial = false) => {
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
     localStorage.setItem("isTnaTemplateTaskIndexDBStoreUpdated", JSON.stringify(true));
  }
 
};

export const saveTnaTemplateDetail = async (
  task: ITnaTemplateTask
) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.put({ ...task });
  await tx.done;
};

export const removeTnaTemplateDetailByID = async (id: number) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  await store.delete(Number(id));

  await tx.done;
};

export const getAllTnaTemplateTask = async (): Promise<ITnaTemplateTask[]> => {
  // debugger
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  const index = store.index("sortByTnaTemplateTask_idx");

  return index.getAll(); // ASC by default
};

// Check if store exists and contains data
export const checkIfTnaTemplateDetailStore = async () => {
  const db = await initDB();
  const storeNames = db.objectStoreNames;

  // Check if the store exists
  if (!storeNames.contains(STORE_NAME)) {
    return { exists: false, hasData: false };
  }

  const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
  const allItems: ITnaTemplateTask[] = await store.getAll();

  // Check if there is any data in the store
  const hasData = allItems.length > 0;

  return { exists: true, hasData };
};

export const clearTnaTemplateDetailData = async () => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};
