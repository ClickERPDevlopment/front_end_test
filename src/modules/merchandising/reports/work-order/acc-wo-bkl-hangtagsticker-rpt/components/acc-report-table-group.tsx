import AccReportTable from "./acc-report-table";
import { iaccWorkOrder } from "../../components/iaccWorkOrder";

export default function AccReportTableGroup({
  data,
}: {
  data: iaccWorkOrder[];
}) {
  const mtls: string[] = [];

  data?.forEach((element) => {
    if (!mtls.includes(element.MTL_NAME)) {
      mtls.push(element.MTL_NAME);
    }
  });

  console.log("mtls: ", mtls);

  return (
    <>
      {mtls.map((mtl) => (
        <AccReportTable
          data={data.filter((d) => d.MTL_NAME === mtl)}
          key={Math.random()}
        />
      ))}
    </>
  );
}
