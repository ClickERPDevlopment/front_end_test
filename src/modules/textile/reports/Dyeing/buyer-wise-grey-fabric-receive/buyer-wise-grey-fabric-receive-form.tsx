/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetAllBuyer } from "@/actions/Merchandising/get-buyer";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { MdOutlineClear } from "react-icons/md";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import { GetSupplier } from "@/actions/get-supplier";
import React from "react";

type comboBoxDataType = {
  label: string;
  value: string;
};

const FormSchema = z.object({
  buyerId: z.number(),
  supplierId: z.number(),
  fromDate: z.date(),
  toDate: z.date(),
});

export default function BuyerWiseGreyFabricReceiveViewForm() {
  const [_selectedBuyer, setSelectedBuyer] = useState<number>(0);
  const [buyers, setBuyers] = useState<comboBoxDataType[]>();
  const [openFromDate, setOpenFromDate] = React.useState(false);
  const [openToDate, setOpenToDate] = React.useState(false);
  const [openBuyer, setOpenBuyer] = React.useState(false);

  const [suppliers, setSuppliers] = useState<comboBoxDataType[]>();
  const [openSupplier, setOpenSupplier] = React.useState(false);

  const { data: buyersData } = GetAllBuyer();
  const { data: suppliersData } = GetSupplier();

  useEffect(() => {
    const _: comboBoxDataType[] = [];
    buyersData?.forEach((element) => {
      _.push({ label: element.NAME, value: element.Id });
    });

    setBuyers([..._]);
  }, [buyersData]);

  useEffect(() => {
    const _: comboBoxDataType[] = [];
    suppliersData?.forEach((element) => {
      _.push({ label: element.Name, value: element.Id });
    });

    setSuppliers([..._]);
  }, [suppliersData]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { fromDate: new Date(), toDate: new Date() },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    window.open(
      `/report/textile/dyeing/buyer-wise-grey-fabric-receive?fromDate=${moment(
        data.fromDate
      ).format("DD-MMM-YYYY")}&toDate=${moment(data.toDate).format(
        "DD-MMM-YYYY"
      )}&buyerId=${data.buyerId}&supplierId=${data.supplierId}`,
      "blank"
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* from-date==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="fromDate"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>From Date*</FormLabel>
                <Popover
                  open={openFromDate}
                  onOpenChange={(x) => {
                    console.log(x);
                    setOpenFromDate(x);
                  }}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        aria-expanded={openFromDate}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(e) => {
                        field.onChange(e);
                        setOpenFromDate(false);
                      }}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            onClick={() => form.resetField("fromDate")}
            variant={"outline"}
            type="button"
            className="m-0 ml-1 px-[12px]"
          >
            <MdOutlineClear className="rounded text-slate-600 m-0" />
          </Button>
        </div>

        {/* to-date==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="toDate"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>To Date*</FormLabel>
                <Popover open={openToDate} onOpenChange={setOpenToDate}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(e) => {
                        field.onChange(e);
                        setOpenToDate(false);
                      }}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            onClick={() => form.resetField("toDate")}
            variant={"outline"}
            type="button"
            className="m-0 ml-1 px-[12px]"
          >
            <MdOutlineClear className="rounded text-slate-600 m-0" />
          </Button>
        </div>

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

        {/* Supplier==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="supplierId"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Supplier</FormLabel>
                <Popover open={openSupplier} onOpenChange={setOpenSupplier}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openSupplier}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? suppliers?.find(
                            (supplier) =>
                              Number(supplier.value) === Number(field.value)
                          )?.label
                          : "Select a supplier"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search supplier..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No supplier found.</CommandEmpty>
                        <CommandGroup>
                          {suppliers?.map((supplier) => (
                            <CommandItem
                              value={supplier.label}
                              key={supplier.value}
                              onSelect={() => {
                                form.setValue(
                                  "supplierId",
                                  Number(supplier.value)
                                );
                                setOpenSupplier(false);
                              }}
                            >
                              {supplier.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  Number(supplier.value) === field.value
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
                This is the supplier that will be used in the report.
              </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            onClick={() => form.resetField("supplierId")}
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
