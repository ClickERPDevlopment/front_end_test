import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import BuyerWiseGreyFabricReceiveViewForm from "./buyer-wise-grey-fabric-receive-form";

export default function BuyerWiseGreyFabricReceiveView() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="md:w-[450px] sm:w-full sm:mx-1">
        <CardHeader>
          <CardTitle>Buyer-wise Grey Fabric Receive </CardTitle>
          <CardDescription>
            Input necessary data and click on show button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <BuyerWiseGreyFabricReceiveViewForm />
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
