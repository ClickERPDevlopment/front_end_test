import { Column, CustomDataTable } from "@/components/data-display/CustomDataTable";
import Button from "@/components/form/Button";
import CustomDatePicker from "@/components/form/CustomDatePicker";
import { FormField } from "@/components/form/FormField";
import SimpleInputBox from "@/components/form/SimpleInputBox";
import React, { useEffect, useState } from "react";

import {
  fetchMaterialInfo,
  fetchPurchaseHistory,
} from "@/modules/procurement/api/poReleaseAPI";
import { IHistoryLeft, IHistoryRight } from "./poRelease.interface";

interface IPurchaseHistoryProps {
  itemId: number;
}

const PurchaseHistory: React.FC<IPurchaseHistoryProps> = ({ itemId }) => {
  const [poNo, setPoNo] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [leftData, setLeftData] = useState<IHistoryLeft[]>([]);
  const [rightData, setRightData] = useState<IHistoryRight[]>([]);
  const [loadingLeft, setLoadingLeft] = useState(false);
  const [loadingRight, setLoadingRight] = useState(false);

  useEffect(() => {
    if (!itemId) return;
    setLoadingLeft(true);
    fetchMaterialInfo(itemId)
      .then((data) => setLeftData(data))
      .catch(console.error)
      .finally(() => setLoadingLeft(false));
  }, [itemId]);

  const handleSearch = async () => {
    if (!fromDate || !toDate) return;
    setLoadingRight(true);
    try {
      const from = fromDate.toISOString().split("T")[0];
      const to = toDate.toISOString().split("T")[0];
      const data = await fetchPurchaseHistory(itemId, from, to, poNo);
      setRightData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRight(false);
    }
  };

  const leftColumns: Column<IHistoryLeft>[] = [
    { key: "materialName", header: "Material Name" },
    { key: "uom", header: "UOM" },  
    { key: "brandName", header: "Brand" },
    { key: "originName", header: "Origin" },
    { key: "model", header: "Model" },
    { key: "stockQty", header: "Stock" },
  ];

  const rightColumns: Column<IHistoryRight>[] = [
    {
      key: "poDate",
      header: "Purchase Date",
      render: (row) =>
        new Date(row.poDate).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    { key: "purchaseOrderNo", header: "PO No." },
    { key: "workOrderQty", header: "Purchase Quantity" },
    { key: "supplierName", header: "Supplier" },
    {
      key: "uomPrice",
      header: "Unit Price",
      render: (row) => `${row.uomPrice}`,
    },
    { key: "originName", header: "Origin" },
    { key: "modelName", header: "Model" },
    { key: "brandName", header: "Brand" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end mb-4">
        <FormField label="PO No" id="poNo" variant="inline" labelFontSize="text-sm">
          <SimpleInputBox value={poNo} onChange={setPoNo} placeholder="Enter PO No" />
        </FormField>

        <FormField label="From Date" id="fromDate" variant="inline" labelFontSize="text-sm">
          <CustomDatePicker selected={fromDate} onChange={setFromDate} className="w-40" />
        </FormField>

        <FormField label="To Date" id="toDate" variant="inline" labelFontSize="text-sm">
          <CustomDatePicker selected={toDate} onChange={setToDate} className="w-40" />
        </FormField>

        <div className="flex justify-end">
          <Button variant="outlined" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 m-2">
        <div>
          <h3>Material Info</h3>
          <CustomDataTable columns={leftColumns} data={leftData} loading={loadingLeft} />
        </div>
        <div>
          <h3 >Purchase History</h3>
          <CustomDataTable columns={rightColumns} data={rightData} loading={loadingRight} />
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
