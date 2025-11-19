import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactQueryKey } from "@/utils/react-query-key";
import useApiUrl from "@/hooks/use-ApiUrl";

export function GetFabricWorkOrderByBuyer(buyerId: number) {
  const api = useApiUrl();

  const getData = async (buyerId: number): Promise<FabricWorkOrder[]> => {
    if (buyerId > 0)
      return await axios
        .get(
          api.ProductionUrl +
          "/Production/FabricWo/GetAllFabricWorkOrderByBuyer?buyerId=" +
          buyerId
        )
        .then((x) => x.data)
        .catch((x) => console.log(x));
    else return [];
  };

  const query = useQuery({
    queryKey: [ReactQueryKey.fabricWorkOrder, buyerId],
    queryFn: () => getData(buyerId),
    staleTime: 1000 * 10,
  });

  return query;
}

type FabricWorkOrder = {
  Id: string;
  WorkOrderNo: string;
  CompanyId: string;
  BuyerId: string;
  PoId: string;
  PoNo: string;
  StyleId: string;
  SupplierId: string;
  IssueDate: string;
  PaymentTermsId: string;
  ApproveDate: string;
  ApprovedBy: string;
  IsApprove: string;
  Remarks: string;
  ReceiveStoreId: string;
  CreatedBy: string;
  CreatedDate: string;
  UpdatedBy: string;
  UpdatedDate: string;
  DeliveryDate: string;
  OrderType: string;
  WoSubject: string;
  Attention: string;
  TotalAmount: string;
  IsRelease: string;
  WoType: string;
  IsForLc: string;
  FactoryCode: string;
  Note: string;
  SupplierContactNo: string;
  StoreContactPerson: string;
  StoreContactNo: string;
  DollarToTakaExchangeValue: string;
  IsShowPriceInWoPrint: string;
  WoSerial: string;
  AmendmentNo: string;
  SpecialInstruction: string;
  Source: string;
  IsGeneralWo: string;
};
