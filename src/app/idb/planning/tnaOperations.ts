import { initDB } from "../dbConnection";
import {
  IDX_TNA_TASK_GROUP_STORE,
  IDX_TNA_PENDING_JOB_STORE,
  IDX_TNA_PENDING_REQUEST_STORE,
  IDX_TNA_MISSING_ACTUAL_DATE_STORE,
  IDX_TNA_PENDING_CRITICAL_JOB_STORE,
} from "../../constants";
import { IMissingActualDate, IPendingJob, IPendingRequest, ITnaMaster } from "../../../modules/planning/pages/tnaSetup/tna.interface";

const STORE_NAME = IDX_TNA_TASK_GROUP_STORE;

export const saveTnaData = async (
  lineData: ITnaMaster[]
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

export const saveTnaPendingJob = async (
  tasks: IPendingJob[]
) => {
  
  const db = await initDB();

    // 1. Clear the store first
  const clearTx = db.transaction(IDX_TNA_PENDING_JOB_STORE, "readwrite");
  await clearTx.objectStore(IDX_TNA_PENDING_JOB_STORE).clear();
  await clearTx.done;

  const tx = db.transaction(IDX_TNA_PENDING_JOB_STORE, "readwrite");
  const store = tx.objectStore(IDX_TNA_PENDING_JOB_STORE);

  const tx2 = db.transaction(IDX_TNA_PENDING_CRITICAL_JOB_STORE, "readwrite");
  const store2 = tx2.objectStore(IDX_TNA_PENDING_CRITICAL_JOB_STORE);

  tasks.forEach((item, index) => {
    store.put(item);
    if (item.delay < 0) {
      store2.put(item);
    }
  });
  await tx.done;
  localStorage.setItem("isTnaPendingJobSavedToIndexDB", JSON.stringify(true));
};

export const saveTnaPendingRequest = async (
  tasks: IPendingRequest[]
) => {
  
  const db = await initDB();

    // 1. Clear the store first
  const clearTx = db.transaction(IDX_TNA_PENDING_REQUEST_STORE, "readwrite");
  await clearTx.objectStore(IDX_TNA_PENDING_REQUEST_STORE).clear();
  await clearTx.done;

  const tx = db.transaction(IDX_TNA_PENDING_REQUEST_STORE, "readwrite");
  const store = tx.objectStore(IDX_TNA_PENDING_REQUEST_STORE);
  tasks.forEach((item, index) => {
    store.put(item);
  });
  await tx.done;
  localStorage.setItem("isTnaPendingRequestSavedToIndexDB", JSON.stringify(true));
};

export const saveTnaMissingActualDateTask = async (
  tasks: IMissingActualDate[]
) => {
  
  const db = await initDB();

    // 1. Clear the store first
  const clearTx = db.transaction(IDX_TNA_MISSING_ACTUAL_DATE_STORE, "readwrite");
  await clearTx.objectStore(IDX_TNA_MISSING_ACTUAL_DATE_STORE).clear();
  await clearTx.done;

  const tx = db.transaction(IDX_TNA_MISSING_ACTUAL_DATE_STORE, "readwrite");
  const store = tx.objectStore(IDX_TNA_MISSING_ACTUAL_DATE_STORE);
  tasks.forEach((item, index) => {
    store.put(item);
  });
  await tx.done;
  localStorage.setItem("isTnaMissingActualDateSavedToIndexDB", JSON.stringify(true));
};

export const getAllTnaPendingJobList = async (): Promise<IPendingJob[]> => {
  const db = await initDB();
  const tx = db.transaction(IDX_TNA_PENDING_JOB_STORE, "readonly");
  const store = tx.objectStore(IDX_TNA_PENDING_JOB_STORE);
  return store.getAll();
};

export const getAllTnaCriticalPendingJobList = async (): Promise<IPendingJob[]> => {
  const db = await initDB();
  const tx = db.transaction(IDX_TNA_PENDING_CRITICAL_JOB_STORE, "readonly");
  const store = tx.objectStore(IDX_TNA_PENDING_CRITICAL_JOB_STORE);
  return store.getAll();
};

export const getAllTnaPendingRequestList = async (): Promise<IPendingRequest[]> => {
  const db = await initDB();
  const tx = db.transaction(IDX_TNA_PENDING_REQUEST_STORE, "readonly");
  const store = tx.objectStore(IDX_TNA_PENDING_REQUEST_STORE);
  return store.getAll();
};

export const getAllTnaMissingActualDateTaskList = async (): Promise<IMissingActualDate[]> => {
  const db = await initDB();
  const tx = db.transaction(IDX_TNA_MISSING_ACTUAL_DATE_STORE, "readonly");
  const store = tx.objectStore(IDX_TNA_MISSING_ACTUAL_DATE_STORE);
  return store.getAll();
};

export const getAllTna = async (): Promise<ITnaMaster[]> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return store.getAll();
};

// Check if store exists and contains data
export const checkIfTnaStore = async () => {
  const db = await initDB();
  const storeNames = db.objectStoreNames;

  // Check if the store exists
  if (!storeNames.contains(STORE_NAME)) {
    return { exists: false, hasData: false };
  }

  const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
  const allItems: ITnaMaster[] = await store.getAll();

  // Check if there is any data in the store
  const hasData = allItems.length > 0;

  return { exists: true, hasData };
};

export const clearTnaData = async () => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};
