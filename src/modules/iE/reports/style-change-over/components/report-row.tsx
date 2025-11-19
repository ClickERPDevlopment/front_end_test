import moment from "moment";
import { IStyleChangeOver } from "../style-change-over-type";

function Reportrow({ data, indexOffset }: { data: IStyleChangeOver[], indexOffset: number }) {

  const convertToMinutes = (timeStr: string): number => {
    if (!timeStr) return 0;
    if (/^\d+$/.test(timeStr.trim())) {
      return Number(timeStr);
    }

    const match = timeStr.match(/^\s*(?:(\d+)h)?\s*(?:(\d+)m)?\s*$/i);

    if (!match) return 0;

    const hours = match[1] ? parseInt(match[1], 10) : 0;
    const minutes = match[2] ? parseInt(match[2], 10) : 0;

    return hours * 60 + minutes;
  };

  return (
    <>
      {data?.map((item, index) => (
        <tr className="text-center text-sm">
          <td className="border border-gray-950 p-0.5">{index + indexOffset + 1}</td>
          {index == 0 && (
            <td
              className="border border-gray-950 p-0.5 text-nowrap"
              rowSpan={data.length}
            >
              {moment(item.ENTRY_DATE).format("DD-MMM-YYYY")}
            </td>
          )}
          <td className="border border-gray-950 p-0.5">{item.LINE_NAME}</td>
          <td className="border border-gray-950 p-0.5">{item.BUYER_NAME}</td>
          <td className="border border-gray-950 p-0.5">{item.STYLE_NO}</td>
          <td className="border border-gray-950 p-0.5">{item.ITEM_TYPE}</td>
          <td className="border border-gray-950 p-0.5">{item.SMV}</td>
          <td className="border border-gray-950 p-0.5">{item.REQ_OP}</td>
          <td className="border border-gray-950 p-0.5">{item.REQ_HP}</td>
          <td className="border border-gray-950 p-0.5">{Number(item.REQ_HP) + Number(item.REQ_OP)}</td>
          <td className="border border-gray-950 p-0.5">{item.OPERATOR}</td>
          <td className="border border-gray-950 p-0.5">{item.HP}</td>
          <td className="border border-gray-950 p-0.5">{Number(item.HP) + Number(item.OPERATOR)}</td>
          <td className="border border-gray-950 p-0.5">
            {Math.round(((Number(item.HP) + Number(item.OPERATOR)) * Number(item.SMV)))}
          </td>
          <td className="border border-gray-950 p-0.5 text-nowrap">
            {moment(item.LAYOUT_START_TIME).format("hh:mm A")}
          </td>
          <td className="border border-gray-950 p-0.5 text-nowrap">
            {moment(item.LAYOUT_END_TIME).format(" hh:mm A")}
          </td>
          <td className="border border-gray-950 p-0.5">
            {
              isNaN(Number(item?.TOTAL_TIME))
                ? convertToMinutes(item.TOTAL_TIME)
                : Number(item.TOTAL_TIME)
            }
          </td>

          <td className="border border-gray-950 p-0.5">
            {(() => {
              const totalTime = isNaN(Number(item?.TOTAL_TIME))
                ? convertToMinutes(item.TOTAL_TIME)
                : Number(item.TOTAL_TIME);

              const totalSmvTime = (Number(item.HP) + Number(item.OPERATOR)) * Number(item.SMV);
              const diff = totalTime - totalSmvTime;
              return `${diff >= 0 ? "+" : "-"}${Math.abs(Math.round(diff))}`;
            })()}
          </td>

          <td className="border border-gray-950 p-0.5">
            {(() => {
              const hp = Number(item.HP) || 0;
              const operator = Number(item.OPERATOR) || 0;
              const smv = Number(item.SMV) || 0;

              const totalTime = isNaN(Number(item.TOTAL_TIME))
                ? convertToMinutes(item.TOTAL_TIME)
                : Number(item.TOTAL_TIME);

              const totalSmvTime = (hp + operator) * smv;

              return Math.round((totalSmvTime * 100) / totalTime);
            })()}%
          </td>
          <td className="border border-gray-950 p-0.5">{item.REASON}</td>
          <td className="border border-gray-950 p-0.5">{item.REMARKS}</td>
        </tr>
      ))}
    </>
  );
}

export default Reportrow;
