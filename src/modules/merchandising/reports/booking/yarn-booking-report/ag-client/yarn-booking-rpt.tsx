import YarnBookingMasterInfo from "./component/yb-rpt-master-info";
import YarnBookingCuttingAdvise from "./component/yb-rpt-cutting-advise";
import YarnBookingReportContext from "./component/yb-rpt-context";
import KittingDyeingAdvice from "./component/kda/knitting-dyeing-advice";
import YarnBookingReportComments from "./component/yb-rpt-comments";
import {
  YarnBookingReportDto,
  YarnBookingReportDto_Color,
  YarnBookingReportDto_KnittingDyeingAdvice,
  YarnBookingReportDto_Size,
} from "./component/yb-rpt-type";
import moment from "moment";
type params = {
  data: YarnBookingReportDto;
};

function getAllSizes(lstSize: YarnBookingReportDto_Size[]) {
  const SizeNameList: string[] = [];
  lstSize.forEach((element) => {
    if (!SizeNameList.includes(element.SIZENAME)) {
      SizeNameList.push(element.SIZENAME);
    }
  });
  return SizeNameList;
}

function getAllColors(lstSize: YarnBookingReportDto_Color[]) {
  const SizeNameList: string[] = [];
  lstSize.forEach((element) => {
    if (!SizeNameList.includes(element.COLORNAME)) {
      SizeNameList.push(element.COLORNAME);
    }
  });
  return SizeNameList;
}

function getAllKnittingSizes(
  lstSize: YarnBookingReportDto_KnittingDyeingAdvice[]
) {
  const SizeNameList: string[] = [];
  lstSize.forEach((element) => {
    if (!SizeNameList.includes(element.SIZENAME)) {
      SizeNameList.push(element.SIZENAME);
    }
  });
  return SizeNameList;
}

export default function YarnBookingReport_AG({ data }: params) {
  if (data) {
    data.knittingSizeNameList = getAllKnittingSizes(
      data.lstKnittingDyeingAdvice
    );
    data.sizeNameList = getAllSizes(data.lstSize);
    data.colorNameList = getAllColors(data.lstColor);

    return (
      <YarnBookingReportContext.Provider value={data}>
        <div className="container print:max-w-none print:px-0">
          <div>
            <h1 className='text-right'>{moment(data.MaterData?.CONS_DATE).format('D-MMM-yy')}</h1>
            <h1 className="text-2xl font-bold text-center">
              {data.MaterData.COMPANY_NAME}
            </h1>
            <h3 className="text-lg font-bold text-center">
              YARN CONSUMPTION SHEET
            </h3>
          </div>
          <div>
            <YarnBookingMasterInfo
              masterData={data.MaterData}
              lstSpecialTreatment={data.lstSpecialTreatment}
            />
          </div>
          <div>
            <YarnBookingCuttingAdvise />
          </div>
          <div>
            <KittingDyeingAdvice />
          </div>
          <div>
            <YarnBookingReportComments />
          </div>
        </div>
      </YarnBookingReportContext.Provider>
    );
  }
  return <></>;
}
