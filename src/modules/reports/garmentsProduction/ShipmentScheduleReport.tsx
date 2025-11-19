import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchTnaDetailsReport } from "../reduxSlices/tnaReportSlice";
import { RootState } from "@/app/store";

export default function ShipmentScheduleReport() {
  const dispatch = useDispatch<any>();
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const startDate = params.get("startDate") || "";
  const endDate = params.get("endDate") || "";
  const type = params.get("type") || "summary";

  const { data, loading, error } = useSelector(
    (state: RootState) => state.tnaReport
  );

  // fetch API when page loads
  useEffect(() => {
    if (startDate && endDate && type) {
      
    }
  }, [dispatch, startDate, endDate, type]);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Report Result</h1>

      <div className="border p-4 rounded">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </div>
  );
}
