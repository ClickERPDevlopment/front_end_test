import { PaginationObject } from "../../../../types/global";
import { ITnaTask } from "../tnaTaskSetup/tnaTaskType.interface";

export interface ITnaMaster {
    id: number;
    templateId: number;
    templateName: string;
    jobNumber: string;
    poQty: number;
    buyerId: number;
    buyerName: string;
    pono: string;
    styleNo: string;
    reqGreyFabric: string;
    itemType: string;
    embellishmentType: string;
    fabricSource: string;
    poRcvDate: string;
    poShipDate: string;
    sewingStart: string;
    sewingEnd: string;
    leadTime: number;
    uniqueNumber: number;
    companyNo: number;
    isDone: string;
    processSection: string;
    isStart: string;
    isEnd: string;
    isHold: string;
}

export interface IOptionDTo {
id: number;
    text: string;
}

export interface ITnaDetails extends ITnaTask {
    effectDate: string;
    masterId: number;
    taskId: number;
    sortBy: number;
    isDone: string;
    p_date_db_real: string | null;
    p_date_db_prev: string | null;
    p_date_db_prev_string: string;
    p_date_db: string;
    isEffectOther: string;
    isApplicable: string;
    isFabricsStart: string;
    durationdifferent: number;
    isFabricsEnd: string;
    presetDate: string | null;
    changingDate: string | null;
    changeBy: number;
    isDependentChangeBy: boolean;
}

export interface FillTemplateResult {
    tasks: ITnaDetails[];
    minSwStartDate?: string;
    maxSwEndDate?: string;
    shipDate: string;
}


export interface ITnaActualDateUpdate {
    id: number;
    tnaMasterId: number;
    tnaDetailsId: number;
    actualDate: string;                 // ISO date string (you can use Date if parsed)
    dateBy: string;
    remarks: string | null;
}

export interface ITnaComment {
    id: number;
    comment: string;
    date: string;                       // ISO date string; use `Date` if you parse it
    createdBy: string;
    tnaDtlId: number;
}

export interface ITnaHoldReason {
    id: string;
    tnaMasterId: string;
    holdDate: string;                   // ISO string, e.g., "2025-06-02T18:00:00.000Z"
    reason: string;
    updateDate: string;                 // ISO string
}

export interface ITnaPlanRevise {
    id: number;
    tnaDtlId: number;
    prevPlanDate: string;               // ISO string date
    askingDate: string;                 // ISO string date
    createDate: string;                 // ISO string date
    askingBy: number;
    isApproved: string;                 // "1" or "0" as string, consider boolean if possible
    approveBy: string | number;         // mixed number/string in original, you can unify
    approveDate: string;                // ISO string date
    approvingDate: string;              // ISO string date
    note: string;
    updatedDate: string | null;
    updateBy: string | null;
}

export interface IPOItem {
    pono?: string;
    id?: string | number;
    text?: string;
}

interface Buyer {
    id: number;
    text: string;
}

interface Style {
    id: number;
    text: string;
}

export interface IBuyerPOResponse {
    buyer: Buyer[];
    po: IPOItem[];
    style: Style[];
}

export interface IPOStyle {
    action: string;
    BuyerId: number;
    Pono: string;
    BuyerName: string;
    StyleNo: string | null;
    StyleId: number;
    SewingStart: string | null;
    SewingEnd: string | null;
    FactoryId: number;
    OrderPlacementMonth: string;            // ISO date string
    P_OrderPlacementMonth: string;          // Formatted date string
    DeliveryDate: string;
    P_DeliveryDate: string;
    PoReceiveDate: string;
    P_PoReceiveDate: string;
    PoQty: number;
    PoShipDate: string | null;
    Diff: number;
    IsActive: string; // "1" or "0"
    StyleNo2: string | null;
    ReqGreyFabric: number;
    IsMultiPoCombine: number;
    ItemType: string;
    ProcessDescription: string | null;
    FabricSource: string | null;
}

export interface IPendingJobsBuyerStyleTask {
  buyers: { buyer_name: string }[];
  styles: { style_no: string }[];
  tasks: { task_name: string }[];
}

export interface IPendingJob {
  masterId: number;
  poShipDate: string;       // ISO string
  id: number;
  taskName: string;
  durationDifferent: number;
  effectDate: string;       // ISO string
  jobNumber: string;
  templateId: number;
  buyerId: number;
  poNo: string;
  buyerName: string;
  delay: number;
  isAlert: number;
  prettyEffectDate: string;
  prettyPoShipDate: string;
  changeFrequency: number;
  prevPlanDate: string;
  askingDate: string;
  isApproved: number;
  prettyPrevPlanDate: string;
  prettyAskingDate: string;
  changeBy: number;
  isDone: number;
  teamId: number;
  commentCount: number;
  sessionNo: string;
  styleNos: string;
  teamName: string;
}

export interface IPendingRequest {
  jobNumber: string;
  count: number;
  buyerName: string;
  styleNos: string;
  aggregatedTasks: string;
}

export interface IMissingActualDate {
  poShipDate: string;
  jobNumber: string;
  pono: string;
  buyerId: number;
  taskName: string;
  prettyEffectDate: string;
  prettyPoShipDate: string;
  buyerName: string;
  tnaDetailsId: number;
  masterId: number;
  delayDate: number;
  styleNos: string;
}

export interface ITNAState {
    isTnaPendingJobSavedToIndexDB: boolean;
    isTnaPendingRequestSavedToIndexDB: boolean;
    isTnaMissingActualDateSavedToIndexDB: boolean;
    tna: ITnaMaster;
    missingActualDateTaskList: IMissingActualDate[];
    pendingRequests: IPendingRequest[];
    pendingJobs: IPendingJob[];
    criticalPendingJobs: IPendingJob[];
    pendingJobsBuyerStyleTask: IPendingJobsBuyerStyleTask;
    tnaJobList: IOptionDTo[];
    tnaBuyerList: IOptionDTo[];
    tnaTeamMemberList: IOptionDTo[];
    pendingPoStyleList: IPOStyle[];
    tnaTaskList: ITnaDetails[];
    buyerPOResponse: IBuyerPOResponse;
    poItemList: IPOItem[];
    tnaList: ITnaMaster[];
    filteredTna: ITnaMaster[];
    paginationObject: PaginationObject<ITnaMaster>;
    loading: boolean;
    
    missingActualDateTaskLoading: boolean;
    pendingRequestLoading: boolean;
    pendingJobLoading: boolean;
    tnaJobListLoading: boolean;
    tnaTaskListLoading: boolean;
    buyerPoLoading: boolean;
    poItemLoading: boolean;
    tnaListLoading: boolean;
    filterTnaLoading: boolean;

    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    message: string;
}