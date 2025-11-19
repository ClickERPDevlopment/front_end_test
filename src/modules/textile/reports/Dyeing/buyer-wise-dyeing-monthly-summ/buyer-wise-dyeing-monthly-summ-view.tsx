import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BuyerWiseDyeingMonthlySummaryReportForm from "./buyer-wise-dyeing-monthly-summ-form";

export default function BuyerWiseDyeingMonthlySummaryReportView() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="md:w-[450px] sm:w-full sm:mx-1 border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl">Buyer-wise dyeing monthly summary report </CardTitle>
          <CardDescription>
            Input necessary data and click on show button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BuyerWiseDyeingMonthlySummaryReportForm />
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
