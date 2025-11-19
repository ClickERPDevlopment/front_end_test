import { GeneralBlockFabricStatusForm } from "./general-block-f-status-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function GeneralBlockFabricStatusView() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="md:w-[450px] sm:w-full sm:mx-1">
        <CardHeader>
          <CardTitle>General(Block) fabric status </CardTitle>
          <CardDescription>
            Input necessary data and click on show button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GeneralBlockFabricStatusForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button> */}
          <CardDescription>
            On show button click report will open in new tab.
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
