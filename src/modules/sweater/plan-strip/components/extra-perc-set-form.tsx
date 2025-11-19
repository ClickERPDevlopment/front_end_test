import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useSwtPlanStripStore } from "./swt-plan-strip-store";

const FormSchema = z.object({
  extra: z.coerce.number().gte(1, "Please enter a positive number."),
});

type FormType = z.infer<typeof FormSchema>;

export function ExtraPercentageSetForm() {
  const store = useSwtPlanStripStore();

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      extra: 0,
    },
  });

  function onSubmit(formData: FormType) {
    console.log(formData);
    alert("Under development. This options is not available yet.");
    store.setOpenExtraPercDialog(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="extra"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">Extra %</FormLabel>
              <FormControl>
                <Input
                  className="col-span-3"
                  placeholder="Enter m/c qty"
                  {...field}
                />
              </FormControl>
              <FormMessage className="col-span-full m-0" />
            </FormItem>
          )}
        />
        {/* </div> */}
        {/* end- mc-qty */}

        <div className="flex justify-end">
          <Button type="submit" className="align-middle w-auto">
            Apply For All Strips
          </Button>
        </div>
      </form>
    </Form>
  );
}
