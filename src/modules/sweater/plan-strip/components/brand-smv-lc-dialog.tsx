import { Button } from "@/components/ui/button";

import { BrandSmvLcDialogForm } from "./brand-smv-lc-dialog-form";
import { BrandSmvLcDialogTable } from "./brand-smv-lc-dialog-table";
import { useSwtPlanStripStore } from "./swt-plan-strip-store";
import { AppButton } from "@/components/app-buttom";

export function BrandSmvLcDialog() {
  const store = useSwtPlanStripStore();

  function handleSubmit() {
    store.setIsLstDetailsChanged(true);
    store.setOpenDialog(false);
  }

  return (
    <>
      <BrandSmvLcDialogForm />
      <BrandSmvLcDialogTable />
      <div className="flex justify-between">
        <Button
          type="submit"
          className="align-middle w-20"
          variant={"destructive"}
          onClick={() => store.setOpenDialog(false)}
        >
          Cancel
        </Button>
        <AppButton
          type="submit"
          className="align-middle w-20"
          onClick={handleSubmit}
          variant={"save"}
        >
          Apply
        </AppButton>
      </div>
    </>
  );
}
