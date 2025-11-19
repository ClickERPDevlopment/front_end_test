import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineClear } from "react-icons/md";
import { GetAllBuyer } from "@/actions/Merchandising/get-buyer";
import { GetAllPoByStyled } from "@/actions/Merchandising/get-po";
import { GetAllStyleByBuyer } from "@/actions/Merchandising/get-style";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { z } from "zod";

type comboBoxDataType = {
  label: string;
  value: string;
};

const FormSchema = z.object({
  buyerId: z
    .number({
      required_error: "Please select a buyer.",
    })
    .gt(0),
  styleId: z.number().gt(0),
  poId: z.number().gt(0),
});

export default function DyeingBillChallanWiseSummaryForm() {
  const [selectedBuyer, setSelectedBuyer] = useState<number>(0);
  const [selectedStyle, setSelectedStyle] = useState<number>(0);
  const [buyers, setBuyers] = useState<comboBoxDataType[]>();
  const [styles, setStyles] = useState<comboBoxDataType[]>();
  const [pos, setPos] = useState<comboBoxDataType[]>();

  const [openBuyer, setOpenBuyer] = React.useState(false);
  const [openStyle, setOpenStyle] = React.useState(false);
  const [openItem, setOpenItem] = React.useState(false);

  const { data: buyersData } = GetAllBuyer();
  const { data: stylesData } = GetAllStyleByBuyer(selectedBuyer);
  const { data: posData } = GetAllPoByStyled(selectedStyle);

  useEffect(() => {
    const _: comboBoxDataType[] = [];
    buyersData?.forEach((element) => {
      _.push({ label: element.NAME, value: element.Id });
    });

    setBuyers([..._]);
  }, [buyersData]);

  useEffect(() => {
    const _: comboBoxDataType[] = [];
    stylesData?.forEach((element) => {
      _.push({
        label: element.Styleno,
        value: element.Id,
      });
    });

    setStyles([..._]);
  }, [stylesData]);

  useEffect(() => {
    const _: comboBoxDataType[] = [];
    posData?.forEach((element) => {
      _.push({
        label: element.Pono,
        value: element.Id,
      });
    });

    setPos([..._]);
  }, [posData]);

  // console.log("buyer-data: ", buyers);
  // console.log("styles-by-buyer: ", stylesData);
  // console.log("FabricWorkOrder: ", FabricWorkOrderData);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    window.open(
      `/report/store/finish-fabric-store/dyeing-bill-challan-wise-summary-index?poId=${data.poId}&styleId=${data.styleId}`,
      "blank"
    );
  }

  console.log(pos);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Buyer==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="buyerId"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Buyer</FormLabel>
                <Popover open={openBuyer} onOpenChange={setOpenBuyer}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openBuyer}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? buyers?.find(
                            (buyer) => Number(buyer.value) === field.value
                          )?.label
                          : "Select a buyer"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search buyer..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No buyer found.</CommandEmpty>
                        <CommandGroup>
                          {buyers?.map((buyer) => (
                            <CommandItem
                              value={buyer.label}
                              key={buyer.value}
                              onSelect={() => {
                                form.setValue("buyerId", Number(buyer.value));
                                setSelectedBuyer(Number(buyer.value));
                                setOpenBuyer(false);
                                form.resetField("styleId");
                              }}
                            >
                              {buyer.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  Number(buyer.value) === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {/* <FormDescription>
                This is the buyer that will be used in the report.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            onClick={() => form.resetField("buyerId")}
            variant={"outline"}
            type="button"
            className="m-0 ml-1 px-[12px]"
          >
            <MdOutlineClear className="rounded text-slate-600 m-0" />
          </Button>
        </div>

        {/* Style==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="styleId"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Style</FormLabel>
                <Popover open={openStyle} onOpenChange={setOpenStyle}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? styles?.find(
                            (buyer) =>
                              Number(buyer.value) === Number(field.value)
                          )?.label
                          : "Select a style"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search style..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No buyer found.</CommandEmpty>
                        <CommandGroup>
                          {styles?.map((style) => (
                            <CommandItem
                              value={style.label}
                              key={style.value}
                              onSelect={() => {
                                form.setValue("styleId", Number(style.value));
                                setOpenStyle(false);
                                setSelectedStyle(Number(style.value));
                                form.resetField("poId");
                              }}
                            >
                              {style.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  Number(style.value) === Number(field.value)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {/* <FormDescription>
                This is the buyer that will be used in the report.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            onClick={() => form.resetField("styleId")}
            variant={"outline"}
            type="button"
            className="m-0 ml-1 px-[12px]"
          >
            <MdOutlineClear className="rounded text-slate-600 m-0" />
          </Button>
        </div>

        {/* Po==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="poId"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>PO</FormLabel>
                <Popover open={openItem} onOpenChange={setOpenItem}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? pos?.find(
                            (buyer) =>
                              Number(buyer.value) === Number(field.value)
                          )?.label
                          : "Select an po"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search po..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No buyer found.</CommandEmpty>
                        <CommandGroup>
                          {pos?.map((buyer) => (
                            <CommandItem
                              value={buyer.label}
                              key={buyer.value}
                              onSelect={() => {
                                form.setValue("poId", Number(buyer.value));
                                setOpenItem(false);
                              }}
                            >
                              {buyer.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  Number(buyer.value) === Number(field.value)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {/* <FormDescription>
                This is the buyer that will be used in the report.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            onClick={() => form.resetField("poId")}
            variant={"outline"}
            type="button"
            className="m-0 ml-1 px-[12px]"
          >
            <MdOutlineClear className="rounded text-slate-600 m-0" />
          </Button>
        </div>

        <Button type="submit" className="w-full">
          Show
        </Button>
      </form>
    </Form>
  );
}
