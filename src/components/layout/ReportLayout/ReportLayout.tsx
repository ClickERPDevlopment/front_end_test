import React from "react";

interface ReportLayoutProps {
  header: React.ReactNode;
  body: React.ReactNode;
  className?: string;
  height?: string; // for scrollable body
}

const ReportLayout: React.FC<ReportLayoutProps> = ({ header, body, className, height = "h-[400px]" }) => {

  const handlePrint = () => {
    const printContent = document.getElementById("report-content");
    if (!printContent) return;

    const newWindow = window.open("", "_blank", "width=900,height=600");
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>Print Report</title>
            <style>
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
              th { background-color: #f3f3f3; }
              body { font-family: Arial, sans-serif; margin: 20px; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      newWindow.document.close();
      newWindow.focus();
      newWindow.print();
      newWindow.close();
    }
  };

  return (
    <div className={`border overflow-hidden bg-white ${className}`}>
      <table>
        <tbody>
          {body}
        </tbody>
      </table>
    </div>
  );
};

export default ReportLayout;
