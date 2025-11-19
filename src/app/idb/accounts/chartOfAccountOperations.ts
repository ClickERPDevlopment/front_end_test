import { initDB } from "../dbConnection";
import {
  IDX_CHART_OF_ACCOUNT_STORE
} from "../../constants";
import { IChartOfAccount } from "../../../modules/accounts/pages/chartOfAccounts/chartOfAccount.interface";

const STORE_NAME = IDX_CHART_OF_ACCOUNT_STORE;

export const saveChartOfAccountData = async (
  lineData: IChartOfAccount[]
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

export const getCashCOA = async (
): Promise<IChartOfAccount[]> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const index = tx.store.index("isCash"); // your compound index name

  const results: IChartOfAccount[] = await index.getAll([1, "1"]);

  return results;
};

export const getLedgerWithoutCashBankCOA = async (
): Promise<IChartOfAccount[]> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const index = tx.store.index("isCash");

  const results: IChartOfAccount[] = await index.getAll([1, "1"]);

  const index2 = tx.store.index("isBank");
  const results2: IChartOfAccount[] = await index2.getAll([1, "1"]);

  const index3 = tx.store.index("isAll");
  const results3: IChartOfAccount[] = await index3.getAll([1, "0"]);

  // Make a Set of accNo from results + results2
  const cashBankAccNos = new Set([
    ...results.map(item => item.accNo),
    ...results2.map(item => item.accNo)
  ]);

  // Filter results3: keep only those whose accNo not in cashBankAccNos
  const filteredResults3 = results3.filter(
    item => !cashBankAccNos.has(item.accNo)
  );

  return filteredResults3;
};

export const getBankCOA = async (
): Promise<IChartOfAccount[]> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const index = tx.store.index("isBank"); // your compound index name

  const results: IChartOfAccount[] = await index.getAll([1, "1"]);

  return results;
};

export const getAllCOA = async (
): Promise<IChartOfAccount[]> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const index = tx.store.index("isAll"); // your compound index name

  const results: IChartOfAccount[] = await index.getAll([1, "1"]);

  return results;
};


export const getAllChartOfAccount = async (): Promise<IChartOfAccount[]> => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return store.getAll();
};

// Check if store exists and contains data
export const checkIfChartOfAccountStore = async () => {
  const db = await initDB();
  const storeNames = db.objectStoreNames;

  // Check if the store exists
  if (!storeNames.contains(STORE_NAME)) {
    return { exists: false, hasData: false };
  }

  const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
  const allItems: IChartOfAccount[] = await store.getAll();

  // Check if there is any data in the store
  const hasData = allItems.length > 0;

  return { exists: true, hasData };
};

export const clearChartOfAccountData = async () => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};
