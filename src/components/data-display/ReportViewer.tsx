import React, { useEffect, useState } from "react";

interface ReportViewerProps {
  url: string;
  title?: string;
  height?: string;
  reportHost?: string;
}

const ReportViewer: React.FC<ReportViewerProps> = ({
  url,
  title = "Report Viewer",
  height = "800px",
  reportHost = import.meta.env.VITE_CRYSTAL_REPORT_URL || ""
}) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = async () => {
      try {
        const response = await fetch(reportHost + url, { method: "GET" });
        if (!response.ok) throw new Error("Failed to fetch report");

        const blob = await response.blob();
        const fileUrl = URL.createObjectURL(blob);
        setPdfUrl(fileUrl);
      } catch (error) {
        console.error("Error loading report:", error);
        setPdfUrl(null);
      } finally {
        setLoading(false);
      }
    };

    loadReport();

    // Cleanup old blob URLs
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [url]);

  return (
    <div className="p-2 bg-white shadow w-full border border-gray-200">
      <h2 className="text-xl font-semibold mb-1">{title}</h2>

      {loading && (
        <div className="flex justify-center items-center h-[200px] text-gray-500">
          Loading report...
        </div>
      )}

      {!loading && pdfUrl && (
        <iframe
          src={pdfUrl}
          className="w-full border "
          style={{ height }}
          title={title}
        />
      )}

      {!loading && !pdfUrl && (
        <div className="text-red-500 text-center py-10">
          Failed to load report.
        </div>
      )}
    </div>
  );
};

export default ReportViewer;
