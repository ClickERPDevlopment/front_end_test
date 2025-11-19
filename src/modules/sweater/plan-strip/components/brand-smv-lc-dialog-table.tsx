import { AppButton } from "@/components/app-buttom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useSwtPlanStripStore } from "./swt-plan-strip-store";

export function BrandSmvLcDialogTable() {
  const store = useSwtPlanStripStore();
  return (
    <div className="border border-gray-300 rounded-md mt-4 mb-4 bg-green-200 h-40 overflow-auto p-0">
      <Table className="m-0">
        <TableHeader className="sticky top-0 bg-green-200">
          <TableRow className="border-b border-gray-400">
            <TableHead className="text-center">Brand</TableHead>
            <TableHead className="text-center">Learning Curve</TableHead>
            <TableHead className="text-center">SMV</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {store.planStripsDialogData.map((d, index) => (
            <TableRow
              className="border-b border-gray-300"
              key={`${d.MC_BRAND_ID}_${d.LEARNING_CURVE_ID}_${d.SMV}`}
            >
              <TableCell className="text-center">{d.MC_BRAND}</TableCell>
              <TableCell className="text-center">{d.LEARNING_CURVE}</TableCell>
              <TableCell className="text-center">{d.SMV}</TableCell>
              <TableCell className="text-center">
                <AppButton
                  type="submit"
                  className="bg-green-200 border border-red-400 w-12 hover:bg-red-600 hover:text-white text-red-600"
                  onClick={() => {
                    store.setPlanStripDialogData(
                      store.planStripsDialogData.filter((_, i) => i !== index)
                    );
                  }}
                >
                  <Trash2 size={16} />
                </AppButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
