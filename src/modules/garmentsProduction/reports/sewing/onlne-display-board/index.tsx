import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import "./index.css";
import useApiUrl from "@/hooks/use-ApiUrl";
import axios from "axios";
import moment from "moment";
import { IOnlineDisplayBoard } from "./online-display-board-type";

function OnlineDisplayBoard() {
  const [data, setData] = useState<IOnlineDisplayBoard[]>([]);

  const [searchParams] = useSearchParams();

  let factoryid = 0;
  let lineid = 0;

  if (searchParams.get("factoryid")) {
    factoryid = Number(searchParams.get("factoryid"));
  }
  if (searchParams.get("lineid")) {
    lineid = Number(searchParams.get("lineid"));
  }

  const api = useApiUrl();

  useEffect(() => {
    document.title = "Report";
  }, []);

  const fetchData = async () => {
    try {
      await axios
        .get(
          //`${api.ProductionUrl}/production/FinishFabricStore/FabricRequisitionAndReceiveReport`
          `${api.ProductionUrl}/production/GmtSewingReport/OnlineDisplayBoardReport?factoryid=${factoryid}&lineid=${lineid}`
        )
        .then((res) => {
          //console.log(res);
          if (res.data) {
            setData(res.data);
          } else {
            //console.log(res);
          }
        })
        .catch((m) => console.log(m));
    } catch {
      console.log();
    }
  };

  useEffect(() => {
    const getDataInterval = setInterval(fetchData, 3000);

    return () => {
      clearInterval(getDataInterval);
    };
  }, []);

  return (
    <>
      <div className="w-full h-full">
        <center className="online_display">
          <table className="display_table">
            <tr>
              <td colSpan={2} className="first_row">
                Date:{moment().format("DD-MMM-YYYY")}
              </td>
              <td className="line_name">{data[0]?.LINENAME}</td>
              <td colSpan={4} className="first_row">
                Time: {moment().format("hh:mm A")}
              </td>
            </tr>

            <tr>
              <td className="effiency">Hourly Achieved Efficiency</td>
              <td colSpan={3} className="line_name">
                Hourly Production
              </td>
              <td colSpan={3} className="buyer_style">
                Buyer/ Style
              </td>
            </tr>

            <tr>
              <td rowSpan={4} className="efficieny_percent">
                {data[0]?.EFFICIENCY.toFixed(1)}
                <span>%</span>
              </td>
              {data[0]?.SEWINGOUTPUT >= data[0]?.TARGET ? (
                <td
                  colSpan={3}
                  rowSpan={6}
                  className="efficieny_per"
                  style={{ backgroundColor: "green" }}
                >
                  {data[0]?.SEWINGOUTPUT}
                </td>
              ) : (
                <td
                  colSpan={3}
                  rowSpan={6}
                  className="efficieny_per"
                  style={{ backgroundColor: "red" }}
                >
                  {data[0]?.SEWINGOUTPUT}
                </td>
              )}
              <td colSpan={3} className="buyer">
                {data[0]?.BUYERNAME}
              </td>
            </tr>

            <tr>
              <td colSpan={3} className="buyer">
                {data[0]?.STYLENO}
              </td>
            </tr>

            <tr>
              <td className="total_targettext">Day Target</td>
              <td className="total_targettext">Required Efficiency</td>
              <td className="total_targettext">SMV</td>
            </tr>

            <tr>
              <td rowSpan={4} className="total_target">
                {data[0]?.DAY_TARGET}
              </td>
              <td rowSpan={4} className="total_target">
                {(
                  (data[0]?.TARGET * data[0]?.SMVSEWING * 100) /
                  data[0]?.AVAILABLEMIN
                ).toFixed(0)}
                %
              </td>
              <td rowSpan={4} className="total_target">
                {data[0]?.SMVSEWING}
              </td>
            </tr>

            <tr>
              <td className="line_name">Hourly DHU</td>
            </tr>

            <tr>
              <td rowSpan={2} className="line_name">
                {data[0]?.DHU}%
              </td>
            </tr>

            <tr>
              <td colSpan={3}>&nbsp;</td>
            </tr>

            <tr>
              <td className="achiment_text">Cumulative Achieved Target</td>
              {data[0]?.SEWINGOUTPUT >= data[0]?.TARGET ? (
                <td
                  colSpan={3}
                  rowSpan={2}
                  className="production_target"
                  style={{ backgroundColor: "green" }}
                >
                  {data[0]?.TARGET}
                </td>
              ) : (
                <td
                  colSpan={3}
                  rowSpan={2}
                  className="production_target"
                  style={{ backgroundColor: "red" }}
                >
                  {data[0]?.TARGET}
                </td>
              )}
              <td colSpan={3} className="achiment_text2">
                Cumulative Production
              </td>
            </tr>
            <tr>
              <td className="target_achive">
                {(data[0]?.SEWINGOUTPUT == 0
                  ? 0
                  : (data[0]?.TOTAL_SEWINGOUTPUT * 100) / data[0]?.DAY_TARGET
                ).toFixed(1)}
                %
              </td>
              <td colSpan={3} className="total_production">
                {data[0]?.TOTAL_SEWINGOUTPUT}
              </td>
            </tr>
          </table>
        </center>
      </div>
    </>
  );
}

export default OnlineDisplayBoard;
