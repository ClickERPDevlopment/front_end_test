import { initDB } from "../dbConnection";
import { IDX_GMT_PO_DATA_STORE } from "../../constants";
import { IGmtPurchaseOrder, IOrderColor, IOrderSize, } from "../../../modules/garmentsProduction/types/poData.interface";

const STORE_NAME = IDX_GMT_PO_DATA_STORE;

export const saveGmtPurchaseOrderData = async (
    lineData: IGmtPurchaseOrder[]
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

export const getAllGmtPurchaseOrder = async (): Promise<IGmtPurchaseOrder[]> => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    return store.getAll();
};

export const getDistinctPOByStyleId = async (
    styleId: number
): Promise<IGmtPurchaseOrder[]> => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const index = tx.store.index("styleId");
    const results = await index.getAll(styleId);

    // Use Set to ensure uniqueness based on combined poNo + id
    const seen = new Set<string>();
    const distinct: IGmtPurchaseOrder[] = [];

    for (const { poNo, id } of results) {
        const key = `${poNo}_${id}`;
        if (!seen.has(key)) {
            seen.add(key);
            distinct.push({
                poNo: poNo,
                id: id,
                factoryId: 0,
                orderType: "",
                buyerId: 0,
                styleId: 0,
                styleNo: "",
                colorId: 0,
                colorName: "",
                sizeId: 0,
                sizeName: "",
                orderPlacementMonth: "",
                proposedDeliveryDate: "",
                deliveryDate: "",
                actualETD: "",
                isSideSeam: false,
                qty: 0,
                shipQty: 0,
                revisedNo: "",
                additionalBookingId: 0,
                sampleProgramId: 0,
                isMultiPoCombine: false,
            });
        }
    }

    return distinct;
};

export const getDistinctColorByPONo = async (
    poNo: string
): Promise<IOrderColor[]> => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const index = tx.store.index("poNo");
    const results = await index.getAll(poNo);

    // Use Set to ensure uniqueness based on combined poNo + id
    const seen = new Set<string>();
    const distinct: IOrderColor[] = [];

    for (const { colorId, colorName } of results) {
        const key = `${colorId}`;
        if (!seen.has(key)) {
            seen.add(key);
            distinct.push({
                colorName: colorName,
                colorId: colorId,
            });
        }
    }

    return distinct;
};

export const getDistinctOrderPlacementMonthsByPoNoColorId = async (
    poNo: string,
    colorId: number
): Promise<string[]> => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const index = tx.store.index("poNo");

    const results: IGmtPurchaseOrder[] = await index.getAll(poNo);

    const seen = new Set<string>();
    const distinctMonths: string[] = [];

    for (const item of results) {
        if (item.colorId === colorId && !seen.has(item.orderPlacementMonth)) {
            seen.add(item.orderPlacementMonth);
            distinctMonths.push(item.orderPlacementMonth);
        }
    }

    return distinctMonths;
};

export const getDistinctOrderDeliveryDateByPoNoColorIdPlacementMonth = async (
    poNo: string,
    colorId: number,
    orderPlacementMonth: string
): Promise<string[]> => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const index = tx.store.index("poNo");

    const results: IGmtPurchaseOrder[] = await index.getAll(poNo);

    const seen = new Set<string>();
    const distinctMonths: string[] = [];

    for (const item of results) {
        if (
            item.colorId === colorId &&
            item.orderPlacementMonth === orderPlacementMonth &&
            !seen.has(item.deliveryDate)
        ) {
            seen.add(item.deliveryDate);
            distinctMonths.push(item.deliveryDate);
        }
    }

    return distinctMonths;
};

export const getDistinctSizeByPoNoColorIdPlacementMonthDeliveryDate = async (
    poNo: string,
    colorId: number,
    orderPlacementMonth: string,
    deliveryDate: string
): Promise<IOrderSize[]> => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const index = tx.store.index("poNo");

    const results: IGmtPurchaseOrder[] = await index.getAll(poNo);

    const seen = new Set<string>();
    const distinct: IOrderSize[] = [];

    for (const item of results) {
        const key = `${item.sizeId}`;
        if (
            item.colorId === colorId &&
            item.orderPlacementMonth === orderPlacementMonth &&
            item.deliveryDate === deliveryDate &&
            !seen.has(key)
        ) {
            seen.add(key);
            distinct.push({
                sizeName: item.sizeName,
                sizeId: item.sizeId,
            });
        }
    }

    return distinct;
};

// Check if store exists and contains data
export const checkIfGmtPurchaseOrderStore = async () => {
    const db = await initDB();
    const storeNames = db.objectStoreNames;

    // Check if the store exists
    if (!storeNames.contains(STORE_NAME)) {
        return { exists: false, hasData: false };
    }

    const store = db.transaction(STORE_NAME).objectStore(STORE_NAME);
    const allItems: IGmtPurchaseOrder[] = await store.getAll();

    // Check if there is any data in the store
    const hasData = allItems.length > 0;

    return { exists: true, hasData };
};

export const clearGmtPurchaseOrderData = async () => {
    const db = await initDB();
    await db.clear(STORE_NAME);
};
