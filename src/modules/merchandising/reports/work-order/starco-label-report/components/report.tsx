/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import ReportTable from "./report-table";
import ReportFooter from "./report-footer";
import ReportHeader from "./report-header";
import axios from "axios";
import { iaccWorkOrder } from "../../components/iaccWorkOrder";
import useApiUrl from "@/hooks/use-ApiUrl";

function Report({ data }: { data: iaccWorkOrder[] }) {
  const api = useApiUrl();

  // data.forEach(element => {
  //     if(element.GMT_SIZE_NAME==null||element.GMT_SIZE_NAME=="")
  //     {
  //         element.GMT_SIZE_NAME = "ALL SIZE";
  //     }
  // });

  const uniqueKeys: Set<string> = new Set();

  function groupBy(data: iaccWorkOrder[], keys: string[]) {
    return data.reduce((result: any, item: any) => {
      const key = keys.map((k) => item[k]).join("_");
      uniqueKeys.add(key);
      if (!result[key]) {
        result[key] = {
          items: [],
        };
      }
      result[key].items.push(item);

      return result;
    }, {});
  }

  interface GroupedByBuyer {
    [key: string]: {
      items: iaccWorkOrder[];
    };
  }

  let groupedByBuyer: GroupedByBuyer = {};

  if (data) {
    groupedByBuyer = groupBy(data, ["BUYER_NAME", "BRAND_NAME"]);
  }

  const uniqueKeysArray: string[] = Array.from(uniqueKeys);

  //set table header
  const firstHeader = [
    "ART. NO",
    "ORDER NO",
    "PRODUCT DEPT.",
    "ITEM",
    "MTL COLOR",
  ];
  const secondHeader = [
    "TTL",
    "UOM",
    "RATE",
    "AMOUNT",
    "ITEM DESCRIPTION",
    "QUALITY",
  ];

  const uniqueSizes: Set<string> = new Set();

  data.forEach((item) => {
    if (item.GMT_SIZE_NAME != null) uniqueSizes.add(item.GMT_SIZE_NAME);
  });

  const sizeHeader = Array.from(uniqueSizes);

  const [image, setImage] = useState<string | null>(data[0]?.IMAGE_NAME);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]; // Get the selected file
    if (file) {
      // Validate file type (must be an image)
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file.");
        return;
      }

      // Validate file size (e.g., max 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        setError("Image size should not exceed 2MB.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("files", file);
        const response = await axios.post(
          `${api.ProductionRootUrl}/files/ImageUpload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Image uploaded successfully:", response.data);
        setImage(response.data[0].storedFileName);

        await axios.put(
          `${api.ProductionUrl}/production/AccessoriesWo/UpdateAccWorkOrderImageName?id=${data[0]?.ID}&imageName=${response.data[0]?.storedFileName}`
        );
      } catch (err) {
        console.error("Error uploading image:", err);
        setError("Failed to upload image. Please try again.");
      }
    }
  };
  return (
    <div className="container">
      <div className="p-2">
        <ReportHeader masterData={data[0]} />

        {uniqueKeysArray?.map((key) => (
          <ReportTable
            key={key}
            data={groupedByBuyer[key].items}
            firstHeader={firstHeader}
            sizeHeader={sizeHeader}
            secondHeader={secondHeader}
          ></ReportTable>
        ))}

        <div>
          <p className="mt-2">
            <span className="font-bold">Rmarks: </span>
            {data[0]?.REMARKS}
          </p>
        </div>

        <div>
          <ReportFooter masterData={data[0]}></ReportFooter>
        </div>

        <div>
          <div className="print:hidden border border-green-500 p-2 text-center">
            <label className="font-bold text-xl">Upload Image</label>
            <br />
            <input
              className="mt-2"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          {image && (
            <div className="flex items-center justify-center mt-2 mb-2">
              <div style={{ width: "45%" }} className="relative text-right">
                <button
                  className="px-2 mb-1 bg-red-500 text-white rounded-full hover:bg-red-600 print:hidden"
                  onClick={() => setImage(null)}
                >
                  Remove ✕
                </button>
                <img
                  src={`${api.ProductionRootUrl}/images/${image}`}
                  alt="Preview"
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Report;
