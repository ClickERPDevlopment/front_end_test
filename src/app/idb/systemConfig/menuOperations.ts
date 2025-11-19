import { initDB } from "../dbConnection";
import { IDX_MENU_STORE, IDX_MODULE_STORE } from "../../constants";
import { MenuItem } from "../../../modules/configurations/types/menu.interface";
import { ModuleItem } from "../../../modules/configurations/types/module.interface";

const STORE_NAME = IDX_MENU_STORE;
const STORE_NAME2 = IDX_MODULE_STORE;

export const saveMenuData = async (menuData: MenuItem[]) => {
    const db = await initDB();

    // 1. Clear the store first
    const clearTx = db.transaction(STORE_NAME, "readwrite");
    await clearTx.objectStore(STORE_NAME).clear();
    await clearTx.done;

    for (const item of menuData) {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        await store.put({ ...item });
        await tx.done;
    }
};

export const getModuleIdBySegment = async (segment: string): Promise<ModuleItem | null> => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME2, "readonly");
    const store = tx.objectStore(STORE_NAME2);
    const allModules = (await store.getAll()) as ModuleItem[];

    const matched = allModules.find(mod => mod.link.toLowerCase().includes(segment.toLowerCase()));
    return matched ? matched : null;
};


// Optional: Function to get all menu items
export const getAllMenuItems = async (segment: string): Promise<MenuItem[]> => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const allItems = (await store.getAll()) as MenuItem[];

    const tx2 = db.transaction(STORE_NAME2, "readonly");
    const store2 = tx2.objectStore(STORE_NAME2);
    const allModules = (await store2.getAll()) as ModuleItem[];

    // Step 1: Find the moduleId using the segment
    const matched = allModules.find(mod => mod.link.includes(segment));
    //console.log('moduleId', matched)
    const moduleId = matched ? matched.id : null;

    // Step 2: Filter all menu items belonging to this moduleId
    const moduleItems = allItems
        .filter(item => item.moduleId === moduleId)
        .map(item => ({
            ...item,
            link: matched?.link + item.link, // Prefix with module base link
        }));

    // Step 3: Map and initialize submenu
    const map = new Map<number, MenuItem>();
    moduleItems.forEach((item) => {
        map.set(item.id, { ...item, submenu: [] });
    });

    // Step 4: Build parent-child structure
    const rootMenus: MenuItem[] = [];

    map.forEach((item) => {
        if (item.parentMenuId === 0) {
            rootMenus.push(item);
        } else {
            const parent = map.get(item.parentMenuId);
            if (parent) {
                // parent.submenu?.push({
                //   title: item.name,
                //   link: item.link,
                // });
            }
        }
    });

    return rootMenus;
};

// Check if store exists and contains data
export const checkIfMenuStore = async () => {
    const db = await initDB();
    const storeNames = db.objectStoreNames;

    // Check if the store exists
    if (!storeNames.contains(STORE_NAME)) {
        return { exists: false, hasData: false };
    }

    const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
    const allItems: MenuItem[] = await store.getAll();

    // Check if there is any data in the store
    const hasData = allItems.length > 0;

    return { exists: true, hasData };
};

export const clearMenuData = async () => {
    const db = await initDB();
    await db.clear(STORE_NAME);
};
