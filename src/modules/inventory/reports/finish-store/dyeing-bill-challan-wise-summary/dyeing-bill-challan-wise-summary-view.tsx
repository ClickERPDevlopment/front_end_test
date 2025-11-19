import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DyeingBillChallanWiseSummaryForm from "./dyeing-bill-challan-wise-summary-form";

export default function DyeingBillChallanWiseSummaryView() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="md:w-[450px] sm:w-full sm:mx-1">
        <CardHeader>
          <CardTitle>Dyeing Bill Challan Wise Summary</CardTitle>
          <CardDescription>
            Input necessary data and click on show button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DyeingBillChallanWiseSummaryForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          <CardDescription>
            On show button click report will open in new tab.
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
