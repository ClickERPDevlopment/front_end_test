export interface IProductionStatusDto {
     DATE_STR: string;
    TOTAL_FOB: number;
    TOTAL_CM: number;
    CUTTING_TARGET_QTY: number;
    CUTTING_TGT_PRODUCE_MIN: number;
    CUTTING_TGT_AVAIL_MIN: number;
    CUTTING_ACHI_QTY: number;
    CUTTING_PRODUCE_MIN: number;
    CUTTING_AVAIL_MIN: number;
    CUTTING_ACTUAL_HOUR: number;
    SEWING_INPUT_QTY: number;
    SEWING_TARGET_QTY: number;
    SEWING_TGT_PRODUCE_MIN: number;
    SEWING_TGT_AVAIL_MIN: number;
    SEWING_ACHI_QTY: number;
    SEWING_PRODUCE_MIN: number;
    SEWING_ACTUAL_HOUR: number;
    SEWING_MP: number;
    FINISHING_TARGET_QTY: number;
    FINISHING_TGT_PRODUCE_MIN: number;
    FINISHING_TGT_AVAIL_MIN: number;
    FINISHING_ACHI_QTY: number;
    FINISHING_PRODUCE_MIN: number;
    FINISHING_ACTUAL_HOUR: number;
    FINISHING_MP: number;
    CARTOON_QTY: number;
    WASH_RECEIVE_QTY: number;
    WASH_SEND_QTY: number;
}


// Optional: For the full report
export interface IProductionStatusReport {
  company: string; // e.g., "Fame Apparels Ltd."
  reportFrom: string; // e.g., "15/10/2025"
  reportTo: string;   // e.g., "16/10/2025"
  rows: IProductionStatusDto[];
  total?: IProductionStatusDto; // optional summary row
}


