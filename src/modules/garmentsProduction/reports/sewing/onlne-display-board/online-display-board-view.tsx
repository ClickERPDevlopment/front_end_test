import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import OnlineDisplayBoardForm from "./online-display-board-form";

export default function OnlineDisplayBoardView() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="md:w-[450px] sm:w-full sm:mx-1">
        <CardHeader>
          <CardTitle>Online Display Board</CardTitle>
          <CardDescription>
            Input necessary data and click on show button.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnlineDisplayBoardForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button> */}
          <CardDescription>
            On show button click board will open in new tab.
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
