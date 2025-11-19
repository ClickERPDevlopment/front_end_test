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
import React from "react";

type comboBoxDataType = {
  label: string;
  value: string;
};

const FormSchema = z.object({
  buyerId: z
    .number({
      required_error: "Please select a buyer.",
    }).default(0).optional(),
  fromDate: z.date(),
  toDate: z.date(),
});
type FormValues = z.infer<typeof FormSchema>;

export default function BuyerWiseDyeingMonthlySummaryReportForm() {
  const [_selectedBuyer, setSelectedBuyer] = useState<number>(0);
  const [buyers, setBuyers] = useState<comboBoxDataType[]>();
  const [openFromDate, setOpenFromDate] = React.useState(false);
  const [openToDate, setOpenToDate] = React.useState(false);
  const [openBuyer, setOpenBuyer] = React.useState(false);

  const { data: buyersData } = GetAllBuyer();

  useEffect(() => {
    const _: comboBoxDataType[] = [];
    buyersData?.forEach((element) => {
      _.push({ label: element.NAME, value: element.Id });
    });

    setBuyers([..._]);
  }, [buyersData]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { buyerId: 0, fromDate: new Date(), toDate: new Date() },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    window.open(
      `/report/textile/dyeing/buyer-wise-dyeing-monthly-summ-rpt-index?fromDate=${moment(
        data.fromDate
      ).format("DD-MMM-YYYY")}&toDate=${moment(data.toDate).format(
        "DD-MMM-YYYY"
      )}&buyerId=${data.buyerId ?? 0}`,
      "_blank"
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
                <FormLabel>From Batch Date*</FormLabel>
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
                          !field.value && "text-muted-foreground",
                          "border-gray-200"
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
                  <PopoverContent className="w-[250px] rounded-2xl border border-gray-200 p-1" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(e) => {
                        field.onChange(e);
                        setOpenFromDate(false);
                      }}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                      className="w-auto"
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
            className="m-0 ml-1 px-[12px] border-gray-200"
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
                <FormLabel>To Batch Date*</FormLabel>
                <Popover open={openToDate} onOpenChange={setOpenToDate}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                          "border-gray-200"
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
                  <PopoverContent className="w-[250px] rounded-2xl border border-gray-200 p-1" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(e) => {
                        field.onChange(e);
                        setOpenToDate(false);
                      }}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                      className="w-auto"
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
            className="m-0 ml-1 px-[12px] border-gray-200"
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
                          !field.value && "text-muted-foreground",
                          "border-gray-200"
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
                  <PopoverContent className="w-[300px] p-0 border-gray-200" align="start">
                    <Command>
                      <CommandInput
                        placeholder="Search buyer..."
                        className="h-9 focus:outline-none focus:ring-0"
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
            className="m-0 ml-1 px-[12px] border-gray-200"
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
