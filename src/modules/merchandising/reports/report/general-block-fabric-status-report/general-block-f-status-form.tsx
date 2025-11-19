import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
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
import { GetAllBuyer } from "@/actions/Merchandising/get-buyer";
import { GetAllStyleByBuyer } from "@/actions/Merchandising/get-style";
import { GetAllFabric } from "@/actions/get-material";
import { MdOutlineClear } from "react-icons/md";
import { GetFabricWorkOrderByBuyer } from "@/actions/get-fabric-work-order";
import React from "react";

type comboBoxDataType = {
  label: string;
  value: string;
};

const FormSchema = z.object({
  buyerId: z
    .number({
      required_error: "Please select a buyer.",
    }),
  styleId: z.number(),
  itemId: z.number(),
  workOrderId: z.number(),
  onlyBalanceQtyItemwillshow: z.boolean(),
});

export function GeneralBlockFabricStatusForm() {
  const [selectedBuyer, setSelectedBuyer] = useState<number>(0);
  const [buyers, setBuyers] = useState<comboBoxDataType[]>();
  const [styles, setStyles] = useState<comboBoxDataType[]>();
  const [fabrics, setFabrics] = useState<comboBoxDataType[]>();
  const [fabricWorkOrders, setFabricWorkOrders] =
    useState<comboBoxDataType[]>();

  const [openBuyer, setOpenBuyer] = React.useState(false);
  const [openStyle, setOpenStyle] = React.useState(false);
  const [openItem, setOpenItem] = React.useState(false);
  const [openWo, setOpenWo] = React.useState(false);

  const { data: buyersData } = GetAllBuyer();
  const { data: stylesData } = GetAllStyleByBuyer(selectedBuyer);
  const { data: fabricsData } = GetAllFabric();
  const { data: FabricWorkOrderData } =
    GetFabricWorkOrderByBuyer(selectedBuyer);

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
    fabricsData?.forEach((element) => {
      _.push({
        label: element.NAME,
        value: element.ID.toString(),
      });
    });

    setFabrics([..._]);
  }, [fabricsData]);

  useEffect(() => {
    const _: comboBoxDataType[] = [];
    FabricWorkOrderData?.forEach((element) => {
      _.push({
        label: element.WorkOrderNo,
        value: element.Id.toString(),
      });
    });

    setFabricWorkOrders([..._]);
  }, [FabricWorkOrderData]);

  // console.log("buyer-data: ", buyers);
  // console.log("styles-by-buyer: ", stylesData);
  // console.log("FabricWorkOrder: ", FabricWorkOrderData);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { onlyBalanceQtyItemwillshow: true },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    window.open(
      `/report/merchandising/general-block-fabric-status-report?buyerId=${data.buyerId}&styleId=${data.styleId}&fabricId=${data.itemId}&woId=${data.workOrderId}&onlyBalanceQtyItemwillshow=${data.onlyBalanceQtyItemwillshow}`,
      "blank"
    );
  }

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
                                form.resetField("workOrderId");
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

        {/* Item==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="itemId"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Item</FormLabel>
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
                          ? fabrics?.find(
                            (buyer) =>
                              Number(buyer.value) === Number(field.value)
                          )?.label
                          : "Select an item"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No buyer found.</CommandEmpty>
                        <CommandGroup>
                          {fabrics?.map((buyer) => (
                            <CommandItem
                              value={buyer.label}
                              key={buyer.value}
                              onSelect={() => {
                                form.setValue("itemId", Number(buyer.value));
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
            onClick={() => form.resetField("itemId")}
            variant={"outline"}
            type="button"
            className="m-0 ml-1 px-[12px]"
          >
            <MdOutlineClear className="rounded text-slate-600 m-0" />
          </Button>
        </div>

        {/* work order==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="workOrderId"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Work order</FormLabel>
                <Popover open={openWo} onOpenChange={setOpenWo}>
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
                          ? fabricWorkOrders?.find(
                            (buyer) =>
                              Number(buyer.value) === Number(field.value)
                          )?.label
                          : "Select a work order"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No work order found.</CommandEmpty>
                        <CommandGroup>
                          {fabricWorkOrders?.map((buyer) => (
                            <CommandItem
                              value={buyer.label}
                              key={buyer.value}
                              onSelect={() => {
                                form.setValue(
                                  "workOrderId",
                                  Number(buyer.value)
                                );
                                setOpenWo(false);
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
            onClick={() => form.resetField("workOrderId")}
            variant={"outline"}
            type="button"
            className="m-0 ml-1 px-[12px]"
          >
            <MdOutlineClear className="rounded text-slate-600 m-0" />
          </Button>
        </div>

        {/* is show balance========================================================================== */}
        <FormField
          control={form.control}
          name="onlyBalanceQtyItemwillshow"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Only balance qty item will show?</FormLabel>
                <FormDescription>
                  If checked then only balance qty will show. Other-wise all
                  data will show.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Show
        </Button>
      </form>
    </Form>
  );
}
