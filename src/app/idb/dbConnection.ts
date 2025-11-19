import { openDB, IDBPDatabase, deleteDB } from "idb";
import * as stores from "./../constants";

const DB_NAME = stores.IDX_DB;
const TARGET_VERSION = 8;
const STORE_LIST = stores.IDX_STORE_LIST;

let dbInstance: IDBPDatabase | null = null;

export const initDB = async (): Promise<IDBPDatabase> => {
  // Try to open existing DB without version (gets current version)
  let db: IDBPDatabase;
  try {
    db = await openDB(DB_NAME);
  } catch {
    // DB doesn't exist, create new one
    db = await openDB(DB_NAME, TARGET_VERSION, {
      upgrade(db) {
        createObjectStores(db);
      },
    });
    dbInstance = db;
    return db;
  }
  //console.log(db.version, TARGET_VERSION);
  // Upgrade DB if current version < TARGET_VERSION
  if (db.version < TARGET_VERSION) {
    db.close();
    db = await openDB(DB_NAME, TARGET_VERSION, {
      upgrade(db) {
        createObjectStores(db);
      },
    });
  }

  dbInstance = db;
  return db;
};

// This function works ONLY with native IDBDatabase inside upgrade
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createObjectStores(db: IDBPDatabase<any>) {
  for (const storeName of stores.IDX_STORE_LIST) {
    if (!db.objectStoreNames.contains(storeName)) {
      // Decide keyPath
      let keyPath: string;

      if (storeName === stores.IDX_CHART_OF_ACCOUNT_STORE) {
        keyPath = "accNo";
      } else if (storeName === stores.IDX_COST_CENTER_STORE) {
        keyPath = "costNo";
      } else if (storeName === stores.IDX_BUSINESS_UNIT_STORE) {
        keyPath = "baNo";
      } else if (storeName === stores.IDX_VOUCHER_TYPE_STORE) {
        keyPath = "vtypeNo";
      } else if (storeName === stores.IDX_TNA_PENDING_JOB_STORE) {
        keyPath = "masterId";
      }  else if (storeName === stores.IDX_TNA_PENDING_REQUEST_STORE) {
        keyPath = "jobNumber";
      } else if (storeName === stores.IDX_TNA_MISSING_ACTUAL_DATE_STORE) {
        keyPath = "jobNumber";
      }  else if (storeName === stores.IDX_TNA_PENDING_CRITICAL_JOB_STORE) {
        keyPath = "masterId";
      } else {
        keyPath = "id";  // default fallback
      }
    
      const store = db.createObjectStore(storeName, { keyPath });

      if (storeName === stores.IDX_STYLE_STORE) {
        store.createIndex("buyerId", "buyerId");
        store.createIndex("itemType", "itemType");
        store.createIndex("itemUom", "itemUom");
      }

      if (storeName === stores.IDX_TNA_TASK_STORE) {
        store.createIndex("sortByTnaTask_idx", "sortBy");
      }
      if (storeName === stores.IDX_TNA_TEMPLATE_STORE) {
        store.createIndex("sortByTnaTemplateTask_idx", "sortBy");
      }

      if (storeName === stores.IDX_CHART_OF_ACCOUNT_STORE) {
        store.createIndex("isBank", ["tranFlag", "isBank"]);
        store.createIndex("isCash", ["tranFlag", "isCash"]);
        store.createIndex("isAll", ["tranFlag", "isAll"]);
      }
      // console.info('version ---->', TARGET_VERSION)

      if (storeName === stores.IDX_UOM_STORE) {
        store.createIndex("applyName", "applyName");
      }

      if (storeName === stores.IDX_GMT_PO_DATA_STORE) {
        store.createIndex("buyerId", "buyerId");
        store.createIndex("styleId", "styleId");
        store.createIndex("factoryId", "factoryId");
        store.createIndex("poNo", "poNo");
        store.createIndex("orderType", "orderType");
        store.createIndex("isMultiPoCombine", "isMultiPoCombine");
        store.createIndex("style_buyer_index", ["styleId", "buyerId"]);
      }
    }
  }
}

export const clearAllIndexedDBStores = async (): Promise<void> => {
  // Step 1: Open DB normally to check for missing stores
  if (!dbInstance) {
    dbInstance = await openDB(DB_NAME, undefined); // Open latest version
  }

  const existingStores = Array.from(dbInstance.objectStoreNames);
  const missingStores = STORE_LIST.filter(
    (store) => !existingStores.includes(store)
  );

  if (missingStores.length > 0) {
    // console.warn("Missing stores found. Upgrading DB to add them...");

    const currentVersion = dbInstance.version;
    dbInstance.close();

    dbInstance = await openDB(DB_NAME, currentVersion + 1, {
      upgrade(db) {
        for (const storeName of missingStores) {
          if (!db.objectStoreNames.contains(storeName)) {
            // Decide keyPath
            let keyPath: string;

            if (storeName === stores.IDX_CHART_OF_ACCOUNT_STORE) {
              keyPath = "accNo";
            } else if (storeName === stores.IDX_COST_CENTER_STORE) {
              keyPath = "costNo";
            } else if (storeName === stores.IDX_BUSINESS_UNIT_STORE) {
              keyPath = "baNo";
            } else if (storeName === stores.IDX_VOUCHER_TYPE_STORE) {
              keyPath = "vtypeNo";
            } else {
              keyPath = "id";  // default fallback
            }


            const store = db.createObjectStore(storeName, { keyPath });

            if (storeName === stores.IDX_TNA_TASK_STORE) {
              store.createIndex("sortByTnaTask_idx", "sortBy");
            }
            if (storeName === stores.IDX_TNA_TEMPLATE_STORE) {
              store.createIndex("sortByTnaTemplateTask_idx", "sortBy");
            }

            // Add indexes if required
            if (storeName === stores.IDX_STYLE_STORE) {
              store.createIndex("buyerId", "buyerId");
              store.createIndex("itemType", "itemType");
              store.createIndex("itemUom", "itemUom");
            }

            if (storeName === stores.IDX_CHART_OF_ACCOUNT_STORE) {
              store.createIndex("isBank", ["tranFlag", "isBank"]);
              store.createIndex("isCash", ["tranFlag", "isCash"]);
              store.createIndex("isAll", ["tranFlag", "isAll"]);
            }

            if (storeName === stores.IDX_UOM_STORE) {
              store.createIndex("applyName", "applyName");
            }

            if (storeName === stores.IDX_GMT_PO_DATA_STORE) {
              store.createIndex("buyerId", "buyerId");
              store.createIndex("styleId", "styleId");
              store.createIndex("factoryId", "factoryId");
              store.createIndex("poNo", "poNo");
              store.createIndex("orderType", "orderType");
              store.createIndex("isMultiPoCombine", "isMultiPoCombine");
              store.createIndex("style_buyer_index", ["styleId", "buyerId"]);
            }
          }
        }
      },
    });

    //console.log("DB upgraded and missing stores added.");
  }

  // Step 2: Clear all stores
  const tx = dbInstance.transaction(STORE_LIST, "readwrite");

  try {
    await Promise.all(STORE_LIST.map((name) => tx.objectStore(name).clear()));
    await tx.done;
    //console.log("All stores cleared.");
  } catch (error) {
    // console.error("Failed to clear stores:", error);
  }
};

export const deleteDatabase = async (): Promise<void> => {
  if (dbInstance) {
    dbInstance.close();
  }

  await deleteDB(DB_NAME, {
    blocked() {
      // console.warn(
      //   "Cannot delete DB: It is still in use (possibly in another tab)."
      // );
    },
  });

  dbInstance = null;
  //console.log(`🗑️ IndexedDB "${DB_NAME}" deleted.`);
};
