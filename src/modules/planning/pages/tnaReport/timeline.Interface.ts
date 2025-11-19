export interface TimelineTask {
  uid: string;
  po_id: number;
  is_applicable_insert: boolean;
  learning_curve_id: number;
  planning_board_id: number;
  production_line_id: number;
  operator: number;
  helper: number;
  manpower: number;
  buyer_id: number;
  style_id: number;
  unit_id: number;
  strip_qty: number;
  smv: number;
  item: ProductionItem;
  line_index: number;
  start_day: number;
  duration: number;
  start_hour: number;
  color: string;
  new_plan: boolean;
  breakdowns: DayOutput[]
}

export type DayOutput = {
  day: string;
  efficiency: number;
  output: number;
  cumulative: number;
  hour: number;
  day_index: number;
  dayHour: number;
};

export interface LearningCurveDayEfficeincy {
    id?: number;
    day_serial: number;
    efficiency: number;
}

export interface ProductionItem {
  id: string;
  style_no: string;
  po_no: string;
  po_id: number;
  delivery_date: string;
  buyer_name: string;
  buyer_id: number;
  unit_name: string;
  strip_qty: string;
  operator: number;
  helper: number;
  manpower: number;
  learning_curve_name: string;
  learning_curve_day_efficiencies: LearningCurveDayEfficeincy[];
  type: 'pant' | 'shirt' | 't-shirt';
  smv: number; // Standard Minute Value
  qty: number;
  color: string;
}
