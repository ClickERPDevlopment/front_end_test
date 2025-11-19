/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { BudgetReportResponseType } from "../budget-report-type";
import useAppClient from "@/hooks/use-AppClient";
import useApiUrl from "@/hooks/use-ApiUrl";

interface ReportHeaderProps {
  data?: BudgetReportResponseType;
}

function ReportHeader({ data }: ReportHeaderProps) {
  const client = useAppClient();
  const report = data?.Report?.[0];
  const api = useApiUrl();

  const [companyLogo, setCompanyLogo] = useState<string | null>(null);

  useEffect(() => {
    if (data?.Report?.[0]?.FACTORY_ID) {
      fetchImage(data.Report[0].FACTORY_ID);
    }
    return () => {
      if (companyLogo) {
        URL.revokeObjectURL(companyLogo);
      }
    };
  }, [data?.Report?.[0]?.FACTORY_ID]);

  const fetchImage = async (id: number) => {
    try {
      const response = await fetch(
        `${api.ProductionUrl}/production/Company/GetCompanyLogo?companyId=${id}`
      );
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setCompanyLogo(url);
      } else {
        console.error("Failed to fetch image");
        setCompanyLogo(null);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      setCompanyLogo(null);
    }
  };

  if (!report) return null;

  const isEuroClient = client.currentClient === client.EURO;

  return (
    <div className="w-full relative flex items-center justify-between px-4 py-2">
      {/* Left: Company Logo */}
      <div className="flex-shrink-0">
        {companyLogo && (
          <img
            src={companyLogo}
            alt="Company Logo"
            className="h-10 w-auto object-contain"
          />
        )}
      </div>

      {/* Middle: Company Info (centered horizontally) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        {isEuroClient ? (
          <CompanyInfoBlock
            title={report.MAIN_COMPANY_NAME}
            subtitle={report.MAIN_COMPANY_ADDRESS}
            secondary={`(${report.COMPANY_NAME})`}
          />
        ) : (
          <CompanyInfoBlock
            title={report.COMPANY_NAME}
            subtitle={report.COMPANY_ADDRESS}
          />
        )}
      </div>

      {/* Right placeholder (optional) */}
      <div className="flex-shrink-0 w-20"></div>
    </div>
  );
}

function CompanyInfoBlock({
  title,
  subtitle,
  secondary,
}: {
  title?: string;
  subtitle?: string;
  secondary?: string;
}) {
  return (
    <div>
      {title && <h1 className="font-semibold text-2xl uppercase">{title}</h1>}
      {subtitle && <h4 className="font-bold text-sm mb-1">{subtitle}</h4>}
      {secondary && <h2 className="font-bold text-sm">{secondary}</h2>}
    </div>
  );
}

export default ReportHeader;
