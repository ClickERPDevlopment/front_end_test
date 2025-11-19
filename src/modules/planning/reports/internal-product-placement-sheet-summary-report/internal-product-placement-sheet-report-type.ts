export type InternalProductPlacementSheetReportType = {
  COMPANY_NAME?: string;
  COMPNAY_ADDRESS?: string;
  COMPANY_REMARKS?: string;

  FACTORYID: number;
  PRODUCTIONFACTORYPREFIX?: string;
  PRODUCTIONFACTORYNAME?: string;

  COMMERCIAL_COM_ID: number;
  COMMERCIALFACTORYPREFIX?: string;
  COMMERCIALFACTORYNAME?: string;

  BUYERID: number;
  BUYERNAME?: string;

  PONO?: string;
  STYLEID?: string;
  ITEMTYPE?: string;

  PORECEIVEDATE?: Date
  FRIDATE?: Date;
  PROPOSEDELIVERYDATE?: string;
  DELIVERYDATE?: string;

  ORDERPLACEMENTMONTH?: string;
  REVISEDNO?: string;
  NOCOLOR: number;
  ORDERQTY: number;
  PACKEDQTY: number;
};
