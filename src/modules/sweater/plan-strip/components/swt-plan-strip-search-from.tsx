import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { AxiosError } from "axios";
import { format } from "date-fns";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { MdOutlineClear } from "react-icons/md";
import { GetAllBuyer } from "@/actions/Merchandising/get-buyer";
import { GetAllPoByStyled } from "@/actions/Merchandising/get-po";
import { GetAllStyleByBuyer } from "@/actions/Merchandising/get-style";
import { AppButton } from "@/components/app-buttom";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { useSwtPlanStripStore } from "./swt-plan-strip-store";
import React from "react";
import useAxiosInstance from "@/hooks/axios-instance";
import { toast } from "sonner";

type comboBoxDataType = {
  label: string;
  value: string;
};

const FormSchema = z.object({
  fromDate: z.date(),
  toDate: z.date(),
  buyerId: z.number(),
  styleId: z.number(),
  poId: z.number(),
  isStripDone: z.boolean(),
});

export type StripSerachType = z.infer<typeof FormSchema>;

export default function SwtPlanStripSearchForm() {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [openFromDate, setOpenFromDate] = React.useState(false);
  const [openToDate, setOpenToDate] = React.useState(false);
  const axios = useAxiosInstance();
  const store = useSwtPlanStripStore();

  //--
  const [selectedBuyer, setSelectedBuyer] = React.useState<number>();
  const [buyers, setBuyers] = React.useState<comboBoxDataType[]>();
  const [openBuyer, setOpenBuyer] = React.useState(false);
  //--
  const [selectedStyle, setSelectedStyle] = React.useState<number>();
  const [styles, setStyles] = React.useState<comboBoxDataType[]>();
  const [openStyle, setOpenStyle] = React.useState(false);
  //--
  const [, setSelectedPo] = React.useState<number>();
  const [pos, setPos] = React.useState<comboBoxDataType[]>();
  const [openPo, setOpenPo] = React.useState(false);
  //--

  const { data: lstBuyer } = GetAllBuyer();
  const { data: lstStyle } = GetAllStyleByBuyer(selectedBuyer?.valueOf() || 0);
  const { data: lstPo } = GetAllPoByStyled(selectedStyle?.valueOf() || 0);

  React.useEffect(() => {
    const _: comboBoxDataType[] = [];
    lstBuyer?.forEach((ele) => {
      _.push({ label: ele.NAME, value: ele.Id.toString() });
    });
    setBuyers([..._]);
  }, [lstBuyer]);

  React.useEffect(() => {
    const _: comboBoxDataType[] = [];
    lstStyle?.forEach((ele) => {
      _.push({ label: ele.Styleno, value: ele.Id.toString() });
    });
    setStyles([..._]);
  }, [lstStyle]);

  React.useEffect(() => {
    const _: comboBoxDataType[] = [];
    lstPo?.forEach((ele) => {
      _.push({ label: ele.Pono, value: ele.Id.toString() });
    });
    setPos([..._]);
  }, [lstPo]);

  const form = useForm<StripSerachType>({
    resolver: zodResolver(FormSchema),
    defaultValues: { fromDate: new Date(), toDate: new Date() },
  });

  async function onSubmit(formData: StripSerachType) {
    try {
      console.log("search-form-data:", formData);
      setIsPending(true);
      await store.getAllPlanStrips(formData, axios);
      setIsPending(false);
    } catch (error) {
      console.log(error);
      const err = error as AxiosError;
      toast("Some eror happened.");
      setIsPending(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-5 w-full flex flex-row flex-wrap gap-3 justify-start items-end"
        >
          {/* from-date==================================================================================== */}
          <div className="flex justify-between items-end">
            <FormField
              control={form.control}
              name="fromDate"
              render={({ field }) => (
                <FormItem className="flex flex-row flex-1 items-center gap-2">
                  <FormLabel className="mt-2">Delivery From</FormLabel>
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
                          disabled={isPending}
                        >
                          {field.value ? (
                            format(field.value, "PP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 " align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(e) => {
                          field.onChange(e);
                          setOpenFromDate(false);
                        }}
                        disabled={(date: Date) => date < new Date("1900-01-01")}
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
              disabled={isPending}
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
                <FormItem className="flex flex-row flex-1 items-center gap-2">
                  <FormLabel className="mt-2">Delivery To</FormLabel>
                  <Popover open={openToDate} onOpenChange={setOpenToDate}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isPending}
                        >
                          {field.value ? (
                            format(field.value, "PP")
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
              disabled={isPending}
            >
              <MdOutlineClear className="rounded text-slate-600 m-0" />
            </Button>
          </div>

          {/* buyer============================================================================ */}
          <div className="flex justify-between items-end">
            <FormField
              control={form.control}
              name="buyerId"
              render={({ field }) => (
                <FormItem className="flex flex-row flex-1 items-center gap-2 min-w-[200px]">
                  <FormLabel className="mt-2">Buyer</FormLabel>
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
                          disabled={isPending}
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
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search buyer..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No item found.</CommandEmpty>
                          <CommandGroup>
                            {buyers?.map((buyer) => (
                              <CommandItem
                                value={buyer.label}
                                key={buyer.value}
                                onSelect={() => {
                                  form.setValue("buyerId", Number(buyer.value));
                                  setOpenBuyer(false);
                                  setSelectedBuyer(Number(buyer.value));
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
              disabled={isPending}
            >
              <MdOutlineClear className="rounded text-slate-600 m-0" />
            </Button>
          </div>
          {/* end-buyer============== */}

          {/* style============================================================================ */}
          <div className="flex justify-between items-end">
            <FormField
              control={form.control}
              name="styleId"
              render={({ field }) => (
                <FormItem className="flex flex-row flex-1 items-center gap-2 min-w-[200px]">
                  <FormLabel className="mt-2">Style</FormLabel>
                  <Popover open={openStyle} onOpenChange={setOpenStyle}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openStyle}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isPending}
                        >
                          <span>
                            {field.value
                              ? styles?.find(
                                (buyer) => Number(buyer.value) === field.value
                              )?.label
                              : "Select a style"}
                          </span>
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search style..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No item found.</CommandEmpty>
                          <CommandGroup>
                            {styles?.map((buyer) => (
                              <CommandItem
                                value={buyer.label}
                                key={buyer.value}
                                onSelect={() => {
                                  form.setValue("styleId", Number(buyer.value));
                                  setOpenStyle(false);
                                  setSelectedStyle(Number(buyer.value));
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
              onClick={() => form.resetField("styleId")}
              variant={"outline"}
              type="button"
              className="m-0 ml-1 px-[12px]"
              disabled={isPending}
            >
              <MdOutlineClear className="rounded text-slate-600 m-0" />
            </Button>
          </div>
          {/* end-style============== */}

          {/* po============================================================================ */}
          <div className="flex justify-between items-end">
            <FormField
              control={form.control}
              name="poId"
              render={({ field }) => (
                <FormItem className="flex flex-row flex-1 items-center gap-2 min-w-[200px]">
                  <FormLabel className="mt-2">PO</FormLabel>
                  <Popover open={openPo} onOpenChange={setOpenPo}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openPo}
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isPending}
                        >
                          <span>
                            {field.value
                              ? pos?.find(
                                (buyer) => Number(buyer.value) === field.value
                              )?.label
                              : "Select a po"}
                          </span>
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search po..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No item found.</CommandEmpty>
                          <CommandGroup>
                            {pos?.map((buyer) => (
                              <CommandItem
                                value={buyer.label}
                                key={buyer.value}
                                onSelect={() => {
                                  form.setValue("poId", Number(buyer.value));
                                  setOpenPo(false);
                                  setSelectedPo(Number(buyer.value));
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
              onClick={() => form.resetField("poId")}
              variant={"outline"}
              type="button"
              className="m-0 ml-1 px-[12px]"
              disabled={isPending}
            >
              <MdOutlineClear className="rounded text-slate-600 m-0" />
            </Button>
          </div>
          {/* end-po============== */}

          {/* is-strip-done============================================================================ */}
          <div>
            <FormField
              control={form.control}
              name="isStripDone"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="rounded"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Is Strip Done?</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
          {/* end-is-strip-done============== */}

          <AppButton
            type="submit"
            className="w-20"
            variant={"search"}
            isPending={isPending}
          >
            Search
          </AppButton>
        </form>
      </Form>
    </div>
  );
}
