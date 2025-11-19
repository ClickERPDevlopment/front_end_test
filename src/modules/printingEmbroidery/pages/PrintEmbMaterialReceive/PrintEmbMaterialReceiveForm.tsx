/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast, ToastContainer } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router";
import {
  Delete,
  Save,
  Update,
} from "@/actions/PrintingEmbroidery/print-emb-material-receive-action";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
// import useAxiosInstance from "@/hooks/axios-instance";;
import { cn } from "@/lib/utils";
// import { PageAction } from "@/utility/page-actions";
// import { ReactQueryKey } from "@/utility/react-query-key";
import { z } from "zod";
import { Trash2Icon } from "lucide-react";

// import AppPageContainer from "@/components/app-page-container";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useApiUrl from "@/hooks/use-ApiUrl";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { EmbMaterialReceiveDetailsPartsType, EmbMaterialReceiveDetailsType, EmbMaterialReceiveMasterType } from "@/actions/PrintingEmbroidery/print-emb-material-receive-action";
import useAxiosInstance from "@/hooks/axios-instance";
import { ReactQueryKey } from "@/utils/react-query-key";
import { PageAction } from "@/utils/page-actions";
import { AppDispatch, RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@/hooks/useTheme";
import { getSinglePrintEmbMaterialReceive } from "../../reduxSlices/printEmbMaterialReceive.slice";
// import { useDashboardActions } from "@/layouts/DashboardLayout";
import { ActionButtons, ActionType } from "@/components/layout/ActionButtons";
// import { useHotToast } from "@/utils/hotToast.util";

// const { setActions } = useDashboardActions();
// const [isEditMode, setIsEditMode] = useState(false);
// const { showHotError, showHotSuccess } = useHotToast();


const searchFormSchema = z.object({
  BUYER_ID: z.number().default(0),
  BUYER: z.string().optional(),
  STYLE_ID: z.number().optional(),
  STYLE: z.string().optional(),
  PO_ID: z.number().optional(),
  PO: z.string().optional(),
  COLOR_ID: z.number().optional(),
  COLOR: z.string().optional(),
  EMB_SEND_ID: z.number().optional(),
  EMB_SEND_NO: z.string().optional(),
});

const masterFormSchema = z.object({
  RECEIVE_DATE: z.string(),
  WORKORDER_TYPE_ID: z.number().min(1, "WO type is required"),
  WORKORDER_TYPE: z.string().min(1, "WO type is required"),
  FLOOR_ID: z.number().min(1, "Floor is required"),
  FLOOR: z.string().min(1, "Floor is required"),
  WORKORDER_ID: z.number(),
  WORKORDER_NO: z.string(),
  WORKORDER_RECEIVE_ID: z.number().min(1, "WO receive is required"),
  WORKORDER_RECEIVE_NO: z.string().min(1, "WO receive is required"),
  MATERIAL_RECEIVE_NO: z.string().min(1, "Receive no is required"),
  EMB_CATEGORY_ID: z.number().min(1, "Category is required"),
  EMB_CATEGORY: z.string().min(1, "Category is required"),
  SUPPLIER_ID: z.number().min(1, "Supplier is required"),
  SUPPLIER: z.string().min(1, "Supplier is required"),
});


const partsFormSchema = z.object({
  ID: z.number().default(0),
  MASTER_ID: z.number().default(0),
  PARTS_ID: z.number().default(0),
  PARTS: z.string().min(1, "Reason is required"),
});

interface IStyle {
  Id: string;
  Styleno: string;
};


interface IBuyer {
  Id: string;
  NAME: string;
  DISPLAY_NAME: string;
};

interface IPO {
  Id: string;
  Pono: string;
};


interface IType {
  ID: number;
  NAME: string;
};

interface IFloor {
  Id: number;
  Unitname: string;
};


interface IRcvWorkOrder {
  ID: number;
  WORK_ORDER_NO: string;
};

interface IWorkOrder {
  Id: number;
  EmbellishmentOrderno: string;
};

interface IParts {
  ID: number;
  NAME: string;
};

interface IColor {
  ID: number;
  COLORNAME: string;
};

interface IEmbSendNo {
  ID: number;
  SENDNO: string;
  WORKORDERNO: string;
};

interface ISearchData {
  BUYER_ID: number;
  BUYER: string;
  STYLE_ID: number;
  STYLE: string;
  PO_ID: number;
  PO: string;
  COLOR_ID: number;
  COLOR: string;
  EMB_SEND_ID: number;
  EMB_SEND_NO: string;
};


export default function PrintEmbMaterialReceiveForm({
  pageAction,
}: {
  data?: EmbMaterialReceiveMasterType | undefined | null;
  pageAction?: string;
}): React.JSX.Element {
  const location = useLocation();
  //const queryClient = useQueryClient();
  const navigator = useNavigate();
  const axios = useAxiosInstance();


  const dispatch: AppDispatch = useDispatch();
  const { rowsPerPage, layout, company } = useTheme();

  const { id } = useParams();

  const { masterInfo: data, materialReceiveLst, error, message, loading } = useSelector(
    (state: RootState) => state.printEmbMaterialReceive
  );

  useEffect(() => {

    dispatch(getSinglePrintEmbMaterialReceive(Number(id)));

    masterForm.reset();

  }, [dispatch]);

  useEffect(() => {
    if (data) {

      setdetailsData(data.EmbMaterialReceiveDetails || []);

      masterForm.reset({
        RECEIVE_DATE: data.RECEIVE_DATE
          ? new Date(data.RECEIVE_DATE).toLocaleDateString("en-CA")
          : new Date().toLocaleDateString("en-CA"),
        WORKORDER_TYPE_ID: data.WORKORDER_TYPE_ID ?? 0,
        WORKORDER_TYPE: data.WORKORDER_TYPE ?? "",
        FLOOR_ID: data.FLOOR_ID ?? 0,
        FLOOR: data.FLOOR ?? "",
        WORKORDER_ID: data.WORKORDER_ID ?? 0,
        WORKORDER_NO: data.WORKORDER_NO ?? "",
        WORKORDER_RECEIVE_ID: data.WORKORDER_RECEIVE_ID ?? 0,
        WORKORDER_RECEIVE_NO: data.WORKORDER_RECEIVE_NO ?? "",
        MATERIAL_RECEIVE_NO: data.MATERIAL_RECEIVE_NO ?? "",
        EMB_CATEGORY_ID: data.EMB_CATEGORY_ID ?? 0,
        EMB_CATEGORY: data.EMB_CATEGORY ?? "",
        SUPPLIER_ID: data.SUPPLIER_ID ?? 0,
        SUPPLIER: data.SUPPLIER ?? "",
      });
    }
  }, [data]);

  // const handleAction = useCallback(
  //   (action: ActionType) => {
  //     switch (action) {
  //       case "save":
  //         showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
  //         break;
  //       case "update":
  //         showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
  //         break;
  //       case "delete":
  //         showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
  //         break;
  //       case "clear":
  //         showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });

  //         break;
  //       case "preview":
  //         showHotError("Not Available", { bgColor: "#EF4444", textColor: "#ffffff", width: "300px" });
  //         break;
  //       case "approve":
  //       //dispatch(approvalPostInventorySale(Number(id)));
  //       case "unApprove":
  //         //dispatch(unApprovalPostInventorySale(Number(id)));

  //         break;
  //     }
  //   },
  //   [dispatch, data, company]
  // );
  // useEffect(() => {
  //   ////debugger
  //   setActions(<ActionButtons onAction={handleAction} isEditMode={isEditMode} show={{ approve: data.ID === 0, unApprove: data.ID === 1 }} />);
  //   return () => setActions(null);
  // }, [setActions, isEditMode, handleAction, data]);



  //const mutation = useMutation({
  // mutationFn: (tag: any) => {
  //   if (pageAction === PageAction.add) {
  //     return Save(tag, axios);
  //   } else if (pageAction === PageAction.edit) {
  //     return Update(tag, axios);
  //   } else if (pageAction === PageAction.delete) {
  //     return Delete(tag.ID, axios);
  //   } else {
  //     throw new Error("Page Action no found.");
  //   }
  // },
  // onSuccess: () => {

  //   toast.success("Action performed successfully!");

  //   queryClient.invalidateQueries({
  //     queryKey: [ReactQueryKey.SwtPlanningBoard, data?.ID],
  //   });

  //   const params = new URLSearchParams(location.search);
  //   const index = params.get("pageIndex");

  //   const basePath = location.pathname.includes("win/")
  //     ? "/win/printing-embroidery/print-emb-material-receive"
  //     : "/dashboard/printing-embroidery/print-emb-material-receive";

  //   setTimeout(() => {
  //     navigator(`${basePath}?pageIndex=${index || 0}`);
  //   }, 2000);

  // },
  // onError: (err: AxiosError) => {
  //   console.log(err.response?.data);
  // },
  // });

  const api = useApiUrl();

  const [buyerData, setBuyerData] = useState<IBuyer[]>([]);
  const getBuyerData = async (woId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllBuyerByEmbWorkOrderReceive?id=" + woId);
    setBuyerData(response?.data);
  }

  const [style, setStyle] = useState<IStyle[]>([]);
  const getStyleByBuyer = async (woId: number, buyerId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllStyleByEmbWorkOrderReceiveAndBuyer?woId=" + woId + "&buyerId=" + buyerId);
    setStyle(response?.data);

  }

  const [PO, setPO] = useState<IPO[]>([]);
  const getPOByStyle = async (woId: number, styleId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllPoByEmbWorkOrderReceiveAndStyle?woId=" + woId + "&styleId=" + styleId);
    setPO(response?.data);
  }


  const [color, setColor] = useState<IColor[]>([]);
  const GetColor = async (woId: number, poId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbWorkOrderReceive/GetAllColorByEmbWorkOrderReceiveAndStyle?woId=" + woId + "&styleId=" + searchData.STYLE_ID + "&poId=" + poId);
    setColor(response?.data);
  }

  const [workOrderType, setWorkOrderType] = useState<IType[]>([]);
  const getWorkOrderType = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/PrintEmbProductionType");
    setWorkOrderType(response?.data);
  }

  const [floor, setFloor] = useState<IFloor[]>([]);
  const getFloor = async (sectionId: number) => {
    const response = await axios.get(api.ProductionUrl + "/production/Unit/GetAllUnitBySection?sectionId=" + sectionId);
    setFloor(response?.data);

    if (response?.data.length == 1) {
      masterForm.setValue("FLOOR_ID", response?.data[0].Id);
      setMasterData(prev => ({ ...prev, FLOOR_ID: response?.data[0].Id, FLOOR: response?.data[0].Unitname }));
    }

  }

  const [workOrder, setWorkOrder] = useState<IWorkOrder[]>([]);


  const [workOrderRcv, setWorkOrderRcv] = useState<IRcvWorkOrder[]>([]);
  const getWorkOrderRcv = async (embTypeId: number, poId: number) => {
    try {
      const { BUYER_ID, STYLE_ID } = searchData;

      const response = await axios.get(`${api.ProductionUrl}/production/EmbWorkOrderReceive/GetEmbWorkOrderReceiveByBuyerStylePo`, {
        params: {
          buyerId: BUYER_ID,
          styleId: STYLE_ID,
          poId: poId,
          embTypeId: embTypeId
        }
      });

      const data = response?.data;

      if (Array.isArray(data) && data.length === 1) {
        const workOrder = data[0];

        setMasterData(prev => ({
          ...prev,
          WORKORDER_RECEIVE_ID: workOrder.ID,
          WORKORDER_RECEIVE_NO: workOrder.WORK_ORDER_NO
        }));

        masterForm.setValue("WORKORDER_RECEIVE_ID", workOrder.ID);
        masterForm.setValue("WORKORDER_RECEIVE_NO", workOrder.WORK_ORDER_NO);

        getWorkOrderRcvInfo(workOrder.ID, poId);
      }

      setWorkOrderRcv(data);
    } catch (error) {
    }
  };

  const [partsData, setPartsData] = useState<IParts[]>([]);
  const getParts = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/ConfigNumberingParts/PrintEmbNumberingParts");
    setPartsData(response?.data);
  }

  const getNextReceiveNumber = async () => {
    const response = await axios.get(api.ProductionUrl + "/production/EmbMaterialReceive/NextReceiveNumber");
    setMasterData(prev => ({ ...prev, MATERIAL_RECEIVE_NO: response?.data.ReceiveNo }));
    masterForm.setValue("MATERIAL_RECEIVE_NO", response?.data.ReceiveNo);
  }

  const getWorkOrderRcvInfo = async (woRcvId: number, poId: number) => {
    let response = await axios.get(api.ProductionUrl + "/production/EmbMaterialReceive/WorkOrderReceiveMasterData?woRcvId=" + woRcvId);

    setMasterData(prev => ({ ...prev, SUPPLIER_ID: response?.data.SUPPLIER_ID, SUPPLIER: response?.data.SUPPLIER, EMB_CATEGORY_ID: response?.data.EMB_CATEGORY_ID, EMB_CATEGORY: response?.data.EMB_CATEGORY, WORKORDER_ID: response?.data.WORKORDER_ID, WORKORDER_NO: response?.data.WORKORDER_NO }));

    const WoData: IWorkOrder = {
      Id: response?.data.WORKORDER_ID,
      EmbellishmentOrderno: response?.data.WORKORDER_NO
    };

    setWorkOrder([WoData]);

    masterForm.setValue("SUPPLIER", response?.data.SUPPLIER);
    masterForm.setValue("EMB_CATEGORY", response?.data.EMB_CATEGORY);

    masterForm.setValue("WORKORDER_ID", response?.data.WORKORDER_ID);
    masterForm.setValue("WORKORDER_NO", response?.data.WORKORDER_NO);


    getEmbSendNo(response?.data.WORKORDER_NO);

    response = await axios.get(api.ProductionUrl + `/production/EmbMaterialReceive/WorkOrderReceiveDetailsData?woRcvId=${woRcvId}&buyerId=${searchData.BUYER_ID}&styleId=${searchData.STYLE_ID}&poId=${poId}`);
    setdetailsData(response?.data);
  }

  const getWorkOrderRcvInfoWithSendQty = async (woRcvId: number, sendNo: string) => {
    let response = await axios.get(api.ProductionUrl + `/production/EmbMaterialReceive/WorkOrderReceiveDetailsDataWithEnbSendQty?woRcvId=${woRcvId}&embSendNo=${sendNo}&buyerId=${searchData.BUYER_ID}&styleId=${searchData.STYLE_ID}&poId=${searchData.PO_ID}`);
    setdetailsData(response?.data);
  }

  const [embSendNo, setEmbSendNo] = useState<IEmbSendNo[]>([]);
  const getEmbSendNo = async (woNo: string) => {
    const response = await axios.get(api.ProductionUrl + `/production/EmbMaterialReceive/EmbellishmentSendNo?woNo=${woNo || ""}&PO=${searchData.PO || ""}&buyerId=${searchData.BUYER_ID || 0}&styleId=${searchData.STYLE_ID || 0}`);
    setEmbSendNo(response?.data);
  }

  useEffect(() => {
    getWorkOrderType();
    getParts();
    getBuyerData(0);

    if (pageAction === PageAction.add) { getNextReceiveNumber() }

    if (data?.WORKORDER_TYPE_ID) {
      getFloor(data?.WORKORDER_TYPE_ID);
      //getWorkOrder(data?.WORKORDER_TYPE_ID);
      //getWorkOrderRcv(data?.WORKORDER_TYPE_ID, 0);

      const WoData: IWorkOrder = {
        Id: data.WORKORDER_ID,
        EmbellishmentOrderno: data.WORKORDER_NO
      };

      setWorkOrder([WoData]);

      const RcvWoData: IRcvWorkOrder = {
        ID: data.WORKORDER_RECEIVE_ID,
        WORK_ORDER_NO: data.WORKORDER_RECEIVE_NO
      };

      setWorkOrderRcv([RcvWoData]);
    }

  }, [])


  const masterForm = useForm({
    resolver: zodResolver(masterFormSchema),
    defaultValues: {
      RECEIVE_DATE: data?.RECEIVE_DATE
        ? new Date(data.RECEIVE_DATE).toLocaleDateString("en-CA")
        : new Date().toLocaleDateString("en-CA"),
      WORKORDER_TYPE_ID: data?.WORKORDER_TYPE_ID ?? 0,
      WORKORDER_TYPE: data?.WORKORDER_TYPE ?? "",
      FLOOR_ID: data?.FLOOR_ID ?? 0,
      FLOOR: data?.FLOOR ?? "",
      WORKORDER_ID: data?.WORKORDER_ID ?? 0,
      WORKORDER_NO: data?.WORKORDER_NO ?? "",
      WORKORDER_RECEIVE_ID: data?.WORKORDER_RECEIVE_ID ?? 0,
      WORKORDER_RECEIVE_NO: data?.WORKORDER_RECEIVE_NO ?? "",
      MATERIAL_RECEIVE_NO: data?.MATERIAL_RECEIVE_NO ?? "",
      EMB_CATEGORY_ID: data?.EMB_CATEGORY_ID ?? 0,
      EMB_CATEGORY: data?.EMB_CATEGORY ?? "",
      SUPPLIER_ID: data?.SUPPLIER_ID ?? 0,
      SUPPLIER: data?.SUPPLIER ?? "",
    },
  });





  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (pageAction === PageAction.delete) {
      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
      if (!confirmDelete) return;
    }

    const validationResult = masterFormSchema.safeParse(masterData);
    type MasterFormType = z.infer<typeof masterFormSchema>;

    if (!validationResult.success) {

      const errors = validationResult.error.flatten().fieldErrors;

      Object.entries(errors).forEach(([field, messages]) => {
        if (messages && messages.length > 0) {
          masterForm.setError(field as keyof MasterFormType, {
            type: "manual",
            message: messages[0],
          });
        }
      });

      return;
    }

    const data = masterData;

    data.EmbMaterialReceiveDetails = detailsData?.filter(item => item.RCV_QTY > 0) || [];

    // mutation.mutate(data, {
    //   onSuccess: (_response) => {
    //     console.log("Mutation successful:", _response);
    //   },
    //   onError: (error) => {
    //     console.error("Error during mutation:", error);
    //   },
    // });

  }

  let errorMessage: string = "";
  // if (mutation.isError) {
  //   errorMessage = mutation.error.message;
  // }

  const [detailsData, setdetailsData] = useState<
    EmbMaterialReceiveDetailsType[] | null | undefined
  >(data?.EmbMaterialReceiveDetails || []);

  const handleSearch = () => {
    const searchedData = detailsData?.filter((item) => {

      const buyerValue = item.BUYER?.trim() || item.OS_BUYER?.trim() || '';

      if (
        searchData.BUYER &&
        !buyerValue.toLowerCase().includes(searchData.BUYER.toLowerCase())
      ) {
        return false;
      }

      const styleValue = item.STYLE?.trim() || item.OS_STYLE?.trim() || '';

      if (
        searchData.STYLE &&
        !styleValue.toLowerCase().includes(searchData.STYLE.toLowerCase())
      ) {
        return false;
      }

      const poValue = item.PO?.trim() || item.OS_PO?.trim() || '';

      if (
        searchData.PO &&
        !poValue.toLowerCase().includes(searchData.PO.toLowerCase())
      ) {
        return false;
      }

      if (searchData.COLOR && !item.COLOR.toLowerCase().includes(searchData.COLOR.toLowerCase())) {
        return false;
      }

      return true;
    });
    setdetailsData(searchedData);
  };


  const handleRemove = (index: number) => {
    const items = detailsData?.filter((_d, i) => i !== index);
    setdetailsData([...(items || [])]);
  };

  const [masterData, setMasterData] = useState<EmbMaterialReceiveMasterType>({
    ID: data?.ID || 0,
    RECEIVE_DATE: data?.RECEIVE_DATE ? new Date(data.RECEIVE_DATE).toLocaleDateString('en-CA') : new Date().toLocaleDateString('en-CA'),
    WORKORDER_TYPE_ID: data?.WORKORDER_TYPE_ID || 0,
    WORKORDER_TYPE: data?.WORKORDER_TYPE || "",
    FLOOR_ID: data?.FLOOR_ID || 0,
    FLOOR: data?.FLOOR || "",
    WORKORDER_ID: data?.WORKORDER_ID || 0,
    WORKORDER_NO: data?.WORKORDER_NO || "",
    WORKORDER_RECEIVE_ID: data?.WORKORDER_RECEIVE_ID || 0,
    WORKORDER_RECEIVE_NO: data?.WORKORDER_RECEIVE_NO || "",
    MATERIAL_RECEIVE_NO: data?.MATERIAL_RECEIVE_NO || "",
    EMB_CATEGORY_ID: data?.EMB_CATEGORY_ID || 0,
    EMB_CATEGORY: data?.EMB_CATEGORY || "",
    SUPPLIER_ID: data?.SUPPLIER_ID || 0,
    SUPPLIER: data?.SUPPLIER || "",
    MATERIAL_RECEIVE_SERIAL: data?.MATERIAL_RECEIVE_SERIAL || 0,
    CREATED_BY: data?.CREATED_BY || null,
    CREATED_DATE: data?.CREATED_DATE || null,
    UPDATED_BY: data?.UPDATED_BY || null,
    UPDATED_DATE: data?.UPDATED_DATE || null,
    BUYER: data?.BUYER || "",
    STYLE: data?.STYLE || "",
    PO: data?.PO || "",
    OS_BUYER: data?.BUYER || "",
    OS_STYLE: data?.STYLE || "",
    OS_PO: data?.PO || "",
    EmbMaterialReceiveDetails: data?.EmbMaterialReceiveDetails || [],
  });


  const [mtlRcvDetailsPartsData, setMtlRcvDetailsPartsData] = useState<EmbMaterialReceiveDetailsPartsType>({
    ID: 0,
    MASTER_ID: 0,
    PARTS_ID: 0,
    PARTS: ""
  });

  const [searchData, setSearchData] = useState<ISearchData>({
    BUYER_ID: 0,
    BUYER: "",
    STYLE_ID: 0,
    STYLE: "",
    PO_ID: 0,
    PO: "",
    COLOR_ID: 0,
    COLOR: "",
    EMB_SEND_ID: 0,
    EMB_SEND_NO: ""
  })


  const handleMasterInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMasterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const searchForm = useForm({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      BUYER_ID: 0,
      BUYER: "",
      STYLE_ID: 0,
      STYLE: "",
      PO_ID: 0,
      PO: "",
      EMB_SEND_ID: 0,
      EMB_SEND_NO: ""
    },
  });



  const partsForm = useForm({
    resolver: zodResolver(partsFormSchema),
    defaultValues: {
      ID: 0,
      MASTER_ID: 0,
      PARTS_ID: 0,
      PARTS: "",
    },
  });



  const [openBuyer, setOpenBuyer] = useState(false);
  const [openStyle, setOpenStyle] = useState(false);
  const [openPO, setOpenPO] = useState(false);
  const [openColor, setOpenColor] = useState(false);



  const [openWorkOrderType, setOpenWorkOrderType] = useState(false);
  const [openFloor, setOpenFloor] = useState(false);
  const [openWorkOrderRcv, setOpenWorkOrderRcv] = useState(false);
  const [openEmbSendNo, setOpenEmbSendNo] = useState(false);


  const [openReasonDetailsModal, setOpenPartsModal] = useState(false);
  const [openWorkOrder, setOpenWorkOrder] = useState(false);
  const [openParts, setOpenParts] = useState(false);
  const [partsModalData, setPartsModalData] = useState<EmbMaterialReceiveDetailsPartsType[]>([]);
  const [selectedDetailsIndex] = useState<number>(-1);



  return (
    <>
      <div className="w-full p-1">
        {/* <Alert
          variant="destructive"
          className={mutation.isError ? "visible" : "hidden"}
        >
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert> */}

        {/* Master Data */}
        <div>
          <ToastContainer position="top-right" autoClose={2000} />
          <Form {...masterForm}>
            <form
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
              className=""
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">

                <FormField
                  control={masterForm.control}
                  name="RECEIVE_DATE"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel className="font-bold">Receive Date</FormLabel>
                      <FormControl>
                        <Input
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          type="date"
                          value={field.value ? new Date(field.value).toLocaleDateString("en-CA") : ''}
                          onChange={(e) => {
                            const newDate = e.target.value ? new Date(e.target.value) : null;
                            field.onChange(newDate);
                            setMasterData((prev) => ({
                              ...prev,
                              RECEIVE_DATE: new Date(e.target.value).toLocaleDateString('en-CA'),
                            }));
                          }}
                          className="form-control w-full h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={masterForm.control}
                  name="WORKORDER_TYPE_ID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel className="font-bold">Work Order Type</FormLabel>
                      <Popover open={openWorkOrderType} onOpenChange={setOpenWorkOrderType}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openWorkOrderType}
                              className={cn(
                                "w-full justify-between bg-emerald-100",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? workOrderType?.find(
                                  (type) =>
                                    Number(type.ID) === Number(field.value)
                                )?.NAME
                                : "Select a production type"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search work order type..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No work order type found.</CommandEmpty>
                              <CommandGroup>
                                {workOrderType?.map((typeData) => (
                                  <CommandItem
                                    value={typeData.NAME}
                                    key={typeData.ID}
                                    onSelect={() => {
                                      field.onChange(Number(typeData.ID));
                                      setMasterData((prev) => ({
                                        ...prev,
                                        WORKORDER_TYPE_ID: Number(typeData.ID),
                                        WORKORDER_TYPE: typeData.NAME,
                                      }));
                                      getFloor(typeData.ID);
                                      //getWorkOrder(typeData.ID);
                                      //getWorkOrderRcv(typeData.ID, 0);
                                      setOpenWorkOrderType(false);
                                    }}
                                  >
                                    {typeData.NAME}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        Number(typeData.ID) === Number(field.value)
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={masterForm.control}
                  name="FLOOR_ID"
                  render={({ field }) => (
                    <FormItem className="flex flex-col flex-1">
                      <FormLabel className="font-bold">Floor</FormLabel>
                      <Popover open={openFloor} onOpenChange={setOpenFloor}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openFloor}
                              className={cn(
                                "w-full justify-between bg-emerald-100",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? floor?.find(
                                  (floorData) =>
                                    Number(floorData.Id) === Number(field.value)
                                )?.Unitname
                                : "Select a floor"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search floor..." className="h-9" />
                            <CommandList>
                              <CommandEmpty>No operation shift found.</CommandEmpty>
                              <CommandGroup>
                                {floor?.map((floorData) => (
                                  <CommandItem
                                    value={floorData.Unitname}
                                    key={floorData.Id}
                                    onSelect={() => {
                                      field.onChange(Number(floorData.Id));
                                      setMasterData((prev) => ({
                                        ...prev,
                                        FLOOR_ID: Number(floorData.Id),
                                        FLOOR: floorData.Unitname,
                                      }));
                                      setOpenFloor(false);
                                    }}
                                  >
                                    {floorData.Unitname}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        Number(floorData.Id) === Number(field.value)
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <div className="flex justify-between items-end">
                    <FormField
                      control={masterForm.control}
                      name="WORKORDER_RECEIVE_ID"
                      render={({ field }) => (
                        <FormItem className="flex flex-col flex-1">
                          <FormLabel className="font-bold">Work Order Receive No</FormLabel>
                          <Popover open={openWorkOrderRcv} onOpenChange={setOpenWorkOrderRcv}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={openWorkOrder}
                                  className={cn(
                                    "w-full justify-between bg-emerald-100",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? workOrderRcv?.find(
                                      (workOrderData) =>
                                        Number(workOrderData.ID) === Number(field.value)
                                    )?.WORK_ORDER_NO
                                    : "Select a order"}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search production type..." className="h-9" />
                                <CommandList>
                                  <CommandEmpty>No order found.</CommandEmpty>
                                  <CommandGroup>
                                    {workOrderRcv?.map((workOrderData) => (
                                      <CommandItem
                                        value={workOrderData.WORK_ORDER_NO}
                                        key={workOrderData.ID}
                                        onSelect={() => {
                                          field.onChange(Number(workOrderData.ID));
                                          setMasterData((prev) => ({
                                            ...prev,
                                            WORKORDER_RECEIVE_ID: Number(workOrderData.ID),
                                            WORKORDER_RECEIVE_NO: workOrderData.WORK_ORDER_NO,
                                          }));
                                          setOpenWorkOrderRcv(false);
                                          getBuyerData(workOrderData.ID)
                                          getWorkOrderRcvInfo(workOrderData.ID, searchData.PO_ID)
                                        }}
                                      >
                                        {workOrderData.WORK_ORDER_NO}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            Number(workOrderData.ID) === Number(field.value)
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end">
                    <FormField
                      control={masterForm.control}
                      name="WORKORDER_ID"
                      render={({ field }) => (
                        <FormItem className="flex flex-col flex-1">
                          <FormLabel className="font-bold">Work Order</FormLabel>
                          <Popover open={openWorkOrder} onOpenChange={setOpenWorkOrder}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={openWorkOrder}
                                  className={cn(
                                    "w-full justify-between bg-emerald-100",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value
                                    ? workOrder?.find(
                                      (workOrderData) =>
                                        Number(workOrderData.Id) === Number(field.value)
                                    )?.EmbellishmentOrderno
                                    : "Select a order"}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                              <Command>
                                <CommandInput placeholder="Search production type..." className="h-9" />
                                <CommandList>
                                  <CommandEmpty>No order found.</CommandEmpty>
                                  <CommandGroup>
                                    {workOrder?.map((workOrderData) => (
                                      <CommandItem
                                        value={workOrderData.EmbellishmentOrderno}
                                        key={workOrderData.Id}
                                        onSelect={() => {
                                          field.onChange(Number(workOrderData.Id));
                                          setMasterData((prev) => ({
                                            ...prev,
                                            WORKORDER_ID: Number(workOrderData.Id),
                                            WORKORDER_NO: workOrderData.EmbellishmentOrderno,
                                          }));
                                          getEmbSendNo(workOrderData.EmbellishmentOrderno)
                                          setOpenWorkOrder(false);
                                        }}
                                      >
                                        {workOrderData.EmbellishmentOrderno}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            Number(workOrderData.Id) === Number(field.value)
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={masterForm.control}
                  name="MATERIAL_RECEIVE_NO"
                  render={({ field }) => (
                    <FormItem className="w-full h-10">
                      <FormLabel className="font-bold  mb-0">Material Receive No</FormLabel>
                      <FormControl className="m-0" onChange={handleMasterInputChange}>
                        <Input
                          disabled
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          {...field}
                          className="form-control h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={masterForm.control}
                  name="EMB_CATEGORY"
                  render={({ field }) => (
                    <FormItem className="w-full h-10">
                      <FormLabel className="font-bold  mb-0">EMB Category</FormLabel>
                      <FormControl className="m-0" onChange={handleMasterInputChange}>
                        <Input
                          disabled
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          {...field}
                          className="form-control h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={masterForm.control}
                  name="SUPPLIER"
                  render={({ field }) => (
                    <FormItem className="w-full h-10">
                      <FormLabel className="font-bold  mb-0">EMB Supplier</FormLabel>
                      <FormControl className="m-0" onChange={handleMasterInputChange}>
                        <Input
                          disabled
                          style={{ marginTop: "2px" }}
                          placeholder=""
                          {...field}
                          className="form-control h-9"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

        <div className="mt-5"></div>

        <div className="">
          {/* ===================================Details data===================================== */}
          {/* search form */}
          <div className="border p-1">
            <Form {...searchForm} >
              <form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
                className=""
              >
                <div className="flex flex-wrap gap-3">
                  <div className="flex justify-between gap-2 items-end">
                    <div>
                      <div className="flex justify-between items-end">
                        <FormField
                          control={searchForm.control}
                          name="BUYER_ID"
                          render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                              <FormLabel className="font-bold">Buyer</FormLabel>
                              <Popover open={openBuyer} onOpenChange={setOpenBuyer}>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openBuyer}
                                      className={cn(
                                        "w-full justify-between bg-emerald-100",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? buyerData?.find(
                                          (buyer) =>
                                            Number(buyer.Id) === field.value
                                        )?.NAME
                                        : "Select a buyer"}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Search supplier..." className="h-9" />
                                    <CommandList>
                                      <CommandEmpty>No buyer found.</CommandEmpty>
                                      <CommandGroup>
                                        {buyerData?.map((buyer) => (
                                          <CommandItem
                                            value={buyer?.NAME}
                                            key={Number(buyer?.Id)}
                                            onSelect={() => {
                                              field.onChange(Number(buyer?.Id));
                                              setSearchData((prev) => ({
                                                ...prev,
                                                BUYER_ID: Number(buyer?.Id),
                                                BUYER: buyer?.NAME,
                                              }));
                                              getStyleByBuyer(Number(0), Number(buyer?.Id));
                                              setOpenBuyer(false);
                                            }}
                                          >

                                            {buyer?.NAME}
                                            <CheckIcon
                                              className={cn(
                                                "ml-auto h-4 w-4",
                                                Number(buyer?.Id) === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* <Button
                          onClick={() => orderForm.resetField("BUYER_ID")}
                          variant={"outline"}
                          type="button"
                          className="m-0 ml-1 px-[12px]"
                        >
                          <MdOutlineClear className="rounded text-slate-600 m-0" />
                        </Button> */}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-end">
                        <FormField
                          control={searchForm.control}
                          name="STYLE_ID"
                          render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                              <FormLabel className="font-bold">Style</FormLabel>
                              <Popover open={openStyle} onOpenChange={setOpenStyle}>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openStyle}
                                      className={cn(
                                        "w-full justify-between bg-emerald-100",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? style?.find(
                                          (style) =>
                                            Number(style.Id) === field.value
                                        )?.Styleno
                                        : "Select a style"}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Search style..." className="h-9" />
                                    <CommandList>
                                      <CommandEmpty>No style found.</CommandEmpty>
                                      <CommandGroup>
                                        {style?.map((item) => (
                                          <CommandItem
                                            value={item.Styleno}
                                            key={item.Id}
                                            onSelect={() => {
                                              field.onChange(Number(item.Id));
                                              setSearchData((prev) => ({
                                                ...prev,
                                                STYLE_ID: Number(item.Id),
                                                STYLE: item.Styleno,
                                              }));
                                              setOpenStyle(false);
                                              getPOByStyle(Number(0), Number(item?.Id));
                                            }}
                                          >
                                            {item.Styleno}
                                            <CheckIcon
                                              className={cn(
                                                "ml-auto h-4 w-4",
                                                Number(item.Id) === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {/* <Button
                          onClick={() => orderForm.resetField("STYLE_ID")}
                          variant={"outline"}
                          type="button"
                          className="m-0 ml-1 px-[12px]"
                        >
                          <MdOutlineClear className="rounded text-slate-600 m-0" />
                        </Button> */}
                      </div>
                    </div>

                    <div>
                      <div>
                        <FormField
                          control={searchForm.control}
                          name="PO_ID"
                          render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                              <FormLabel className="font-bold">PO</FormLabel>
                              <Popover open={openPO} onOpenChange={setOpenPO}>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openPO}
                                      className={cn(
                                        "w-full justify-between bg-emerald-100",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? PO?.find(
                                          (po) =>
                                            Number(po.Id) === field.value
                                        )?.Pono
                                        : "Select a PO"}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Search PO..." className="h-9" />
                                    <CommandList>
                                      <CommandEmpty>No PO found.</CommandEmpty>
                                      <CommandGroup>
                                        {PO?.map((item) => (
                                          <CommandItem
                                            value={item.Pono}
                                            key={item.Id}
                                            onSelect={() => {
                                              field.onChange(Number(item.Id));
                                              setSearchData((prev) => ({
                                                ...prev,
                                                PO_ID: Number(item.Id),
                                                PO: item.Pono,
                                              }));
                                              GetColor(Number(0), Number(item?.Id));
                                              getWorkOrderRcv(masterData.WORKORDER_TYPE_ID, Number(item.Id));
                                              setOpenPO(false);
                                            }}
                                          >
                                            {item.Pono}
                                            <CheckIcon
                                              className={cn(
                                                "ml-auto h-4 w-4",
                                                Number(item.Id) === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="">
                      <div>
                        <FormField
                          control={searchForm.control}
                          name="COLOR_ID"
                          render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                              <FormLabel className="font-bold">Color</FormLabel>
                              <Popover open={openColor} onOpenChange={setOpenColor}>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openColor}
                                      className={cn(
                                        "w-full justify-between bg-emerald-100",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? color?.find(
                                          (colorData) =>
                                            Number(colorData.ID) === field.value
                                        )?.COLORNAME
                                        : "Select a color"}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Search PO..." className="h-9" />
                                    <CommandList>
                                      <CommandEmpty>No color found.</CommandEmpty>
                                      <CommandGroup>
                                        {color?.map((colorData) => (
                                          <CommandItem
                                            value={colorData.COLORNAME}
                                            key={colorData.ID}
                                            onSelect={() => {
                                              field.onChange(Number(colorData.ID));
                                              setSearchData((prev) => ({
                                                ...prev,
                                                COLOR_ID: Number(colorData.ID),
                                                COLOR: colorData.COLORNAME,
                                              }));
                                              setOpenColor(false);
                                            }}
                                          >
                                            {colorData.COLORNAME}
                                            <CheckIcon
                                              className={cn(
                                                "ml-auto h-4 w-4",
                                                Number(colorData.ID) === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    <div className="ms-20">
                      <div>
                        <FormField
                          control={searchForm.control}
                          name="EMB_SEND_ID"
                          render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                              <FormLabel className="font-bold">Embellishment Send No</FormLabel>
                              <Popover open={openEmbSendNo} onOpenChange={setOpenEmbSendNo}>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openEmbSendNo}
                                      className={cn(
                                        "w-full justify-between bg-emerald-100",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? embSendNo?.find(
                                          (d) =>
                                            Number(d.ID) === field.value
                                        )?.SENDNO
                                        : "Select a emb send no"}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Search embellishment send no..." className="h-9" />
                                    <CommandList>
                                      <CommandEmpty>No emb send found.</CommandEmpty>
                                      <CommandGroup>
                                        {embSendNo?.map((d) => (
                                          <CommandItem
                                            value={d.SENDNO}
                                            key={d.ID}
                                            onSelect={() => {
                                              field.onChange(Number(d.ID));
                                              setSearchData((prev) => ({
                                                ...prev,
                                                EMB_SEND_ID: Number(d.ID),
                                                EMB_SEND_NO: d.SENDNO,
                                              }));
                                              getWorkOrderRcvInfoWithSendQty(masterData.WORKORDER_RECEIVE_ID, d.SENDNO);
                                              setOpenEmbSendNo(false);
                                            }}
                                          >
                                            {d.SENDNO}
                                            <CheckIcon
                                              className={cn(
                                                "ml-auto h-4 w-4",
                                                Number(d.ID) === field.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() => handleSearch()}
                  className="mt-2  mb-2"
                >
                  Search
                </Button>

                <div className="max-h-[300px] overflow-y-auto border rounded-md">
                  <Table className="min-w-full rounded-md">
                    <TableHeader className="bg-green-100 rounded-md">
                      <TableRow className=" rounded-md">
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          S/L
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Buyer
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Style
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          PO
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Color
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Size
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Parts
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Work Order Qty({detailsData?.reduce((acc, item) => acc + (item.WO_QTY || 0), 0)})
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Received Qty({detailsData?.reduce((acc, item) => acc + (item.PREV_RCV_QTY || 0), 0)})
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Receive Qty({detailsData?.reduce((acc, item) => acc + (item.RCV_QTY || 0), 0)})
                        </TableHead>
                        <TableHead className="border border-gray-300 text-center px-4">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {detailsData?.map((item, index) => (
                        <TableRow className={`'odd:bg-white even:bg-gray-50'
                            }`}>
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4  text-center">
                            {!item.BUYER ? item.OS_BUYER : item.BUYER}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {!item.STYLE ? item.OS_STYLE : item.STYLE}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {!item.PO ? item.OS_PO : item.PO}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.COLOR}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.SIZE}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.PARTS}
                          </TableCell>

                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.WO_QTY}
                          </TableCell>

                          <TableCell className="border border-gray-300 px-4 text-center ">
                            {item.PREV_RCV_QTY}
                          </TableCell>

                          <TableCell className="border border-gray-300 px-4 text-center w-[60px]">
                            <input
                              type="number"
                              className="w-full text-center text-sm border border-gray-300 rounded p-1"
                              value={item.RCV_QTY}
                              onChange={(e) => {
                                const updatedData = [...detailsData];
                                updatedData[index] = {
                                  ...updatedData[index],
                                  RCV_QTY: Number(e.target.value),
                                };
                                setdetailsData(updatedData);
                              }}
                            />
                          </TableCell>
                          <TableCell className="border border-gray-300 p-0 m-0 hover:cursor-pointer">
                            <div className="w-full h-full p-0 m-0 flex justify-center">
                              <Trash2Icon
                                size={15}
                                className=" hover:text-red-500 ms-2"
                                onClick={() => handleRemove(index)}
                                style={{ color: "red" }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className={cn("flex justify-between mt-4")}>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      // disabled={mutation.isPending}
                      className={cn(
                        "w-24",
                        pageAction === PageAction.view ? "hidden" : " "
                      )}
                      variant={
                        pageAction === PageAction.delete ? "destructive" : "default"
                      }
                    >
                      {pageAction === PageAction.add
                        ? "Save"
                        : pageAction === PageAction.edit
                          ? "Update"
                          : "Delete"}
                    </Button>
                    {/* <Button
                        type="reset"
                        disabled={mutation.isPending}
                        onClick={() => {
                          form.reset();
                          form.clearErrors();
                        }}
                        variant={"destructive"}
                        className={cn(
                          "w-24",
                          pageAction === PageAction.view ? "hidden" : "",
                          pageAction === PageAction.delete ? "hidden" : ""
                        )}
                      >
                        Cancel
                      </Button> */}
                  </div>
                  <Button
                    type="reset"
                    // disabled={mutation.isPending}
                    onClick={() => {

                      const params = new URLSearchParams(location.search);
                      const index = params.get("pageIndex");

                      location.pathname.includes("win/")
                        ? navigator("/winapp/printing/print-emb-material-receive?pageIndex=" + index)
                        : navigator("/webapp/printing/print-emb-material-receive?pageIndex=" + index)
                    }
                    }
                    variant={"outline"}
                    className={cn("w-24")}
                  >
                    Back
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
        {/* <div className="p-2 mt-5">
            {
              pageAction != PageAction.add &&
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`/report/merchandising/compensation-claim-report?id=${masterData.ID}`}
                className="px-4 py-2 bg-blue font-semibold text-white rounded-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Show Report
              </a>
            }
          </div> */}
      </div>
      <div>

        {/*parts dialog */}
        <Dialog open={openReasonDetailsModal} onOpenChange={setOpenPartsModal}>
          <DialogTrigger asChild>

          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] bg-white">
            <DialogHeader>
              <DialogTitle>Parts</DialogTitle>
              <DialogDescription>

                <div>
                  <Form {...partsForm} >
                    <form
                      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
                      className=""
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={partsForm.control}
                          name="PARTS_ID"
                          render={({ field }) => (
                            <FormItem className="flex flex-col flex-1">
                              <FormLabel className="font-bold">Parts</FormLabel>
                              <Popover open={openParts} onOpenChange={setOpenParts}>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={openParts}
                                      className={cn(
                                        "w-full justify-between bg-emerald-100",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value
                                        ? partsData?.find(
                                          (item) =>
                                            Number(item.ID) === Number(field.value)
                                        )?.NAME
                                        : "Select a parts"}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                  <Command>
                                    <CommandInput placeholder="Search parts..." className="h-9" />
                                    <CommandList>
                                      <CommandEmpty>No parts found.</CommandEmpty>
                                      <CommandGroup>
                                        {partsData?.map((partsItem) => (
                                          <CommandItem
                                            value={partsItem.NAME}
                                            key={partsItem.ID}
                                            onSelect={() => {
                                              field.onChange(Number(partsItem.ID));
                                              setMtlRcvDetailsPartsData((prev) => ({
                                                ...prev,
                                                PARTS_ID: Number(partsItem.ID),
                                                PARTS: partsItem.NAME,
                                              }));
                                              setOpenParts(false);
                                            }}
                                          >
                                            {partsItem.NAME}
                                            <CheckIcon
                                              className={cn(
                                                "ml-auto h-4 w-4",
                                                Number(partsItem.ID) === Number(field.value)
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </form>
                  </Form>
                </div>

                <div className="mt-1">
                  <Button
                    onClick={() => {
                      const updatedData = [...partsModalData, mtlRcvDetailsPartsData];
                      setPartsModalData(updatedData);

                      setMtlRcvDetailsPartsData({ ID: 0, MASTER_ID: 0, PARTS_ID: 0, PARTS: "" });

                      if (selectedDetailsIndex !== null && detailsData) {
                        setdetailsData((prevData) => {
                          const newData = [...prevData || []];
                          const targetItem = { ...newData[selectedDetailsIndex] };

                          targetItem.EmbMaterialReceiveParts = updatedData;
                          newData[selectedDetailsIndex] = targetItem;
                          return newData;
                        });
                      }
                      partsForm.reset();
                    }}
                  >
                    Add
                  </Button>
                </div>

                <div className="mt-3">
                  <Table className="min-w-full rounded-md">
                    <TableHeader className="bg-green-100 rounded-md">
                      <TableRow className=" rounded-md">
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          S/L
                        </TableHead>
                        <TableHead className="w-[100px] border border-gray-300 text-center px-4 whitespace-nowrap ">
                          Reason
                        </TableHead>
                        <TableHead className="w-[60px] border border-gray-300 text-center px-4 whitespace-nowrap">
                          Action
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {
                        partsModalData?.map((parts, index) => <TableRow className="odd:bg-white even:bg-gray-50">
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {index + 1}
                          </TableCell>
                          <TableCell className="border border-gray-300 px-4  whitespace-nowrap text-center">
                            {parts?.PARTS}
                          </TableCell>
                          <TableCell className="border border-gray-300 p-0 m-0 hover:cursor-pointer">
                            <div className="w-full h-full p-0 m-0 flex justify-center">
                              <Trash2Icon
                                size={15}
                                className=" hover:text-red-500"
                                onClick={() => {
                                  const updated = partsModalData.filter((_, i) => i !== index);

                                  setPartsModalData(updated);
                                  if (selectedDetailsIndex !== null && detailsData) {
                                    setdetailsData((prevData) => {
                                      const newData = [...prevData || []];
                                      const targetItem = { ...newData[selectedDetailsIndex] };

                                      targetItem.EmbMaterialReceiveParts = updated;
                                      newData[selectedDetailsIndex] = targetItem;

                                      return newData;
                                    });
                                  }
                                }}
                                style={{ color: "red" }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>)
                      }
                    </TableBody>
                  </Table>
                </div>

              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            </div>
            <DialogFooter>
              <Button onClick={() => { setPartsModalData([]), setOpenPartsModal(false) }} >Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}



