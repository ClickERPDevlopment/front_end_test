/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ReportTable from "./report-table";
import moment from "moment";
import {
  PoWiseFabricAccessoriesStautsReportDto,
  PoWiseFabricAccessoriesStautsReportDto_Accessories,
  PoWiseFabricAccessoriesStautsReportDto_Fabric,
  SearchData,
} from "../po-wise-f-a-s-type";

function POwiseFabricAndAccessoriesStatusReportGenerate({
  data,
}: {
  data: PoWiseFabricAccessoriesStautsReportDto | undefined;
  searchData: SearchData;
}) {
  const uniqueKeys: Set<string> = new Set();

  function groupBy(
    data:
      | PoWiseFabricAccessoriesStautsReportDto_Fabric[]
      | PoWiseFabricAccessoriesStautsReportDto_Accessories[],
    keys: string[]
  ) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          BUYER: item.BUYER,
          STYLE: item.STYLE,
          PONO: item.PONO,
          items: [],
        };
      }
      result[key].items.push(item);

      return result;
    }, {});
  }

  interface GroupedFabric {
    [key: string]: {
      items: PoWiseFabricAccessoriesStautsReportDto_Fabric[];
    };
  }

  interface GroupedAccessories {
    [key: string]: {
      items: PoWiseFabricAccessoriesStautsReportDto_Accessories[];
    };
  }

  let groupedFabric: GroupedFabric = {};
  let groupedAccessories: GroupedAccessories = {};
  if (data) {
    groupedFabric = groupBy(data.lstFabric, ["BUYER", "STYLE", "PONO"]);
    groupedAccessories = groupBy(data.lstAccessories, [
      "BUYER",
      "STYLE",
      "PONO",
    ]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  return (
    <div className="container">
      <div className="border border-gray-300 p-2">
        <div className="">
          <p className="font-bold text-lg text-left w-[100%] text-sm">
            {moment().format("DD-MMM-YYYY")}
          </p>
          <h1 className="font-bold text-2xl text-center">
            {data?.masterData?.COMPANY_NAME}
          </h1>
          <h4 className="font-bold text-base text-center">
            {data?.masterData?.COMPANY_ADDRESS}
          </h4>
          <div className="flex justify-center">
            <h3 className="font-bold text-base text-center px-2 mt-2 bg-gray-200">
              Po Wise Fabric & Accessories Status
            </h3>
          </div>
        </div>
        {uniqueKeysArray?.map((key) => (
          <ReportTable
            key={key}
            lstFabric={groupedFabric[key]?.items}
            lstAccessories={groupedAccessories[key]?.items}
          ></ReportTable>
        ))}
      </div>
    </div>
  );
}

export default POwiseFabricAndAccessoriesStatusReportGenerate;
