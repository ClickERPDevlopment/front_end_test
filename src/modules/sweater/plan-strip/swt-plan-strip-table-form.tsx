/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Control,
  Controller,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { GetAllSwtGauge } from "@/actions/Sweater/swt-gauge-action";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { z } from "zod";
import { useSwtPlanStripStore } from "./components/swt-plan-strip-store";
import { cn } from "@/lib/utils";
import { AppButton } from "@/components/app-buttom";
import {
  Delete,
  Save,
  SwtPlanStripType,
} from "@/actions/Sweater/swt-plan-strip-action";
import { PlanStripOptions } from "./components/plan-strip-options-drop-down";
import moment from "moment";
import { Trash2Icon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import useAxiosInstance from "@/hooks/axios-instance";
import { useAppStore } from "./app-store";

const formSchema = z.object({
  cart: z.array(
    z.object({
      ID: z.coerce.number().gte(0, "Must be 1 and above"),
      BUYER: z.string(),
      BUYER_ID: z.coerce.number().gte(1, "Must be 1 and above"),
      DELIVERY_DATE: z.string(),
      ORDER_PLACEMENT_MONTH: z.string(),
      EXTRA_PERCENTAGE: z.coerce.number().gte(0, "Must be 0 and above"),
      MC_GAUGE: z.string(),
      MC_GAUGE_ID: z.coerce.number().gte(0, "Must be 1 and above"),
      MERCHANDISER: z.string().min(3, "Name is required"),
      ORDER_QTY: z.coerce.number().gte(0, "Must be 1 and above"),
      PO: z.string().min(3, "Name is required"),
      PO_ID: z.coerce.number().gte(0, "Must be 1 and above"),
      STYLE: z.string().min(3, "Name is required"),
      // STYLENAME: z.string().min(3, "Name is required"),
      STYLE_ID: z.coerce.number().gte(0, "Must be 1 and above"),
      TOTAL_ORDER_QTY: z.coerce.number().gte(0, "Must be 1 and above"),
      REQUIRED_DAY_FOR_FINISHING: z.coerce.number(),
      lstSwtPlanStripDetails: z.array(
        z.object({
          ID: z.coerce.number().gte(0, "Must be 1 and above"),
          MASTER_ID: z.coerce.number().gte(0, "Must be 1 and above"),
          MC_BRAND_ID: z.coerce.number().gte(1, "Must be 1 and above"),
          LEARNING_CURVE_ID: z.coerce.number().gte(1, "Must be 1 and above"),
          SMV: z.coerce.number().gte(1, "Must be 1 and above"),
          MC_BRAND: z.string(),
          LEARNING_CURVE: z.string(),
        })
      ),
    })
  ),
});

type formType = z.infer<typeof formSchema>;

const Total = ({ control }: { control: Control<formType> }) => {
  const formValues = useWatch({
    name: "cart",
    control,
  });
  const orderQty = formValues.reduce(
    (acc, current) => acc + current.ORDER_QTY,
    0
  );
  const totalOrderQty = formValues.reduce(
    (acc, current) => acc + current.TOTAL_ORDER_QTY,
    0
  );
  return (
    <div className="flex gap-4 font-bold p-2">
      <p>Order Qty: {orderQty}</p>
      <p>Total Order Qty: {totalOrderQty}</p>
    </div>
  );
};

export default function SwtPlanStripForm() {
  const store = useSwtPlanStripStore();
  const appStore = useAppStore();
  const { data: lstGauges } = GetAllSwtGauge();
  const [gauges, setGauges] = React.useState<
    { label: string; value: number }[]
  >([]);
  const axios = useAxiosInstance();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cart: store.planStrips,
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control,
  });

  React.useEffect(() => {
    if (lstGauges) {
      const gaugeOptions = lstGauges.map((gauge) => ({
        label: gauge.GAUGE,
        value: gauge.ID,
      }));
      setGauges(gaugeOptions);
    }
  }, [lstGauges]);

  React.useEffect(() => {
    remove();
    // append(store.planStrips);
  }, [append, remove, store.planStrips]);

  const watchFieldArray = watch("cart");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  React.useEffect(() => {
    if (store.selectedIndex >= 0 && store.isLstDetailsChanged) {
      setValue(
        `cart.${store.selectedIndex}.lstSwtPlanStripDetails`,
        store.planStripsDialogData
      );
    }
    store.setIsLstDetailsChanged(false);
  }, [store.isLstDetailsChanged]);

  const onSubmit = async (data: formType) => {
    try {
      store.setIsPending(true);
      const formData: SwtPlanStripType[] = data.cart.map((item) => ({
        ...item,
        BUYER: item.BUYER,
        STYLENAME: "",
        MC_GAUGE: "",
        COMPANY_ID: Number(localStorage.getItem("companyId")),
        COLOR_ID: 0,
        CREATED_BY: undefined,
        CREATED_DATE: undefined,
        UPDATED_BY: undefined,
        UPDATED_DATE: undefined,
        IS_ACTIVE: true,
        COMPANY: undefined,
        COLOR: undefined,
        CREATED_BY_NAME: undefined,
        UPDATED_BY_NAME: undefined,
        DELIVERY_DATE: moment(item.DELIVERY_DATE).format("YYYY-MM-DD"),
        ORDER_PLACEMENT_MONTH: moment(item.ORDER_PLACEMENT_MONTH).format(
          "YYYY-MM-DD"
        ),
      }));
      console.log("submit: ", formData);

      await Save(formData, axios);
      store.setPlanStripData([]);
      store.setIsPending(false);
      toast(

        ' Action performed successfully.'

      )
        ;
    } catch (error) {
      store.setIsPending(false);
      toast("Some eror happened.");
    }
  };

  const removeRow = async (index: number, currentRow: SwtPlanStripType) => {
    if (currentRow.ID === 0) {
      remove(index);
      toast("Action performed successfully.");
    } else {
      try {
        store.setIsPending(true);

        await Delete(currentRow.ID, axios);
        remove(index);
        store.setIsPending(false);
        toast("Action performed successfully.");
      } catch (error) {
        store.setIsPending(false);
        toast("Some eror happened.");
      }
    }
    store.setIsPending(false);
  };

  const handleRemove = async (index: number, currentRow: SwtPlanStripType) => {
    appStore.setOpenConfirmationDialog(() => removeRow(index, currentRow));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-end gap-3">
        <PlanStripOptions />
        <AppButton
          type="submit"
          isPending={store.isPending}
          variant={"save"}
          className="mb-2"
        >
          Save
        </AppButton>
      </div>
      <div className="border rounded-md min-h-64">
        <Table>
          <TableHeader className="">
            <TableRow className="">
              <TableHead className="hidden">Id</TableHead>
              <TableHead className="hidden">BUYER_ID</TableHead>
              <TableHead className="text-center w-40">Buyer</TableHead>
              <TableHead className="hidden">STYLE_ID</TableHead>
              <TableHead className="text-center w-40">Style</TableHead>
              <TableHead className="hidden">PO_ID</TableHead>
              <TableHead className="text-center">Po</TableHead>
              <TableHead className="text-center">Delivery Date</TableHead>
              <TableHead className="text-center">Order Plac. Date</TableHead>
              <TableHead className="hidden">GAUGE_ID</TableHead>
              <TableHead className="text-center">Gauge</TableHead>
              <TableHead className="text-center">Order Qty</TableHead>
              <TableHead className="text-center">
                Req. Day For Lining & Finishing
              </TableHead>
              <TableHead className="text-center">Extra %</TableHead>
              <TableHead className="text-center">Total Qty</TableHead>
              <TableHead className="text-center">Other Details</TableHead>
              <TableHead className="text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {controlledFields.map((field, index) => {
              return (
                <TableRow className={"section"} key={field.id}>
                  <TableCell className="hidden">
                    <Input
                      placeholder="name"
                      {...register(`cart.${index}.ID` as const, {
                        required: true,
                      })}
                      className={errors?.cart?.[index]?.ID ? "error" : ""}
                    />
                    {errors.cart?.[index]?.ID && (
                      <p className="text-destructive">
                        {" "}
                        {errors?.cart[index]?.ID?.message}
                      </p>
                    )}
                  </TableCell>
                  {/* Buyer========================================== */}
                  <TableCell className="hidden">
                    <Input
                      placeholder="BUYER_ID"
                      type="number"
                      {...register(`cart.${index}.BUYER_ID` as const, {
                        valueAsNumber: true,
                        required: true,
                      })}
                      className={errors?.cart?.[index]?.BUYER_ID ? "error" : ""}
                    />
                    {errors.cart?.[index]?.BUYER_ID && (
                      <p className="text-destructive">
                        {" "}
                        {errors?.cart[index]?.BUYER_ID?.message}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Buyer"
                      {...register(`cart.${index}.BUYER` as const)}
                      className={cn(
                        errors?.cart?.[index]?.BUYER ? "error" : "",
                        "border-none ring-0 outline-0"
                      )}
                    />
                    {errors.cart?.[index]?.BUYER && (
                      <p className="text-destructive">
                        {errors?.cart[index]?.BUYER?.message}
                      </p>
                    )}
                  </TableCell>
                  {/* end-Buyer========================================== */}

                  {/* Style========================================== */}
                  <TableCell className="hidden">
                    <Input
                      placeholder="STYLE_ID"
                      type="number"
                      {...register(`cart.${index}.STYLE_ID` as const, {
                        valueAsNumber: true,
                        required: true,
                      })}
                      className={errors?.cart?.[index]?.STYLE_ID ? "error" : ""}
                    />
                    {errors.cart?.[index]?.STYLE_ID && (
                      <p className="text-destructive">
                        {" "}
                        {errors?.cart[index]?.STYLE_ID?.message}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Style"
                      {...register(`cart.${index}.STYLE` as const)}
                      className={cn(
                        errors?.cart?.[index]?.STYLE ? "error" : "",
                        "border-none ring-0 outline-0"
                      )}
                    />
                    {errors.cart?.[index]?.STYLE && (
                      <p className="text-destructive">
                        {errors?.cart[index]?.STYLE?.message}
                      </p>
                    )}
                  </TableCell>
                  {/* end-Style========================================== */}

                  {/* Po========================================== */}
                  <TableCell className="hidden">
                    <Input
                      placeholder="PO_ID"
                      type="number"
                      {...register(`cart.${index}.PO_ID` as const, {
                        valueAsNumber: true,
                        required: true,
                      })}
                      className={errors?.cart?.[index]?.PO_ID ? "error" : ""}
                    />
                    {errors.cart?.[index]?.PO_ID && (
                      <p className="text-destructive">
                        {" "}
                        {errors?.cart[index]?.PO_ID?.message}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Po"
                      {...register(`cart.${index}.PO` as const)}
                      className={cn(
                        errors?.cart?.[index]?.PO ? "error" : "",
                        "border-none ring-0 outline-0"
                      )}
                    />
                    {errors.cart?.[index]?.PO && (
                      <p className="text-destructive">
                        {errors?.cart[index]?.PO?.message}
                      </p>
                    )}
                  </TableCell>
                  {/* end-Po========================================== */}

                  <TableCell>
                    <Input
                      placeholder="Delivery Date"
                      {...register(`cart.${index}.DELIVERY_DATE` as const)}
                      className={cn(
                        errors?.cart?.[index]?.DELIVERY_DATE ? "error" : "",
                        "border-none ring-0 outline-0"
                      )}
                    />
                    {errors.cart?.[index]?.DELIVERY_DATE && (
                      <p className="text-destructive">
                        {errors?.cart[index]?.DELIVERY_DATE?.message}
                      </p>
                    )}
                  </TableCell>

                  <TableCell>
                    <Input
                      placeholder="Order plac. month"
                      {...register(
                        `cart.${index}.ORDER_PLACEMENT_MONTH` as const
                      )}
                      className={cn(
                        errors?.cart?.[index]?.ORDER_PLACEMENT_MONTH
                          ? "error"
                          : "",
                        "border-none ring-0 outline-0"
                      )}
                    />
                    {errors.cart?.[index]?.ORDER_PLACEMENT_MONTH && (
                      <p className="text-destructive">
                        {errors?.cart[index]?.ORDER_PLACEMENT_MONTH?.message}
                      </p>
                    )}
                  </TableCell>

                  <TableCell>
                    <Controller
                      name={`cart.${index}.MC_GAUGE_ID`}
                      control={control}
                      render={({ field }) => (
                        <FormItem>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={String(field.value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a gauge" />
                            </SelectTrigger>
                            <SelectContent>
                              {gauges.map((option) => (
                                <SelectItem
                                  value={option.value.toString()}
                                  key={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    {errors.cart?.[index]?.MC_GAUGE_ID && (
                      <p className="text-destructive">
                        {errors?.cart[index]?.MC_GAUGE_ID?.message}
                      </p>
                    )}
                  </TableCell>

                  <TableCell>
                    <Input
                      placeholder="Order plac. month"
                      {...register(`cart.${index}.ORDER_QTY` as const)}
                      className={cn(
                        errors?.cart?.[index]?.ORDER_QTY ? "error" : "",
                        "border-none ring-0 outline-0 text-center"
                      )}
                      readOnly
                    />
                    {errors.cart?.[index]?.ORDER_QTY && (
                      <p className="text-destructive">
                        {errors?.cart[index]?.ORDER_QTY?.message}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Req. Day For Finishing"
                      {...register(
                        `cart.${index}.REQUIRED_DAY_FOR_FINISHING` as const
                      )}
                      className={cn(
                        errors?.cart?.[index]?.REQUIRED_DAY_FOR_FINISHING
                          ? "error"
                          : "",
                        "border-none ring-0 outline-0 bg-yellow-100 text-center"
                      )}
                      onChange={(e) => {
                        e.preventDefault();
                        const value = Number(e.target.value);
                        setValue(
                          `cart.${index}.REQUIRED_DAY_FOR_FINISHING`,
                          value
                        );
                      }}
                    />
                    {errors.cart?.[index]?.REQUIRED_DAY_FOR_FINISHING && (
                      <p className="text-destructive">
                        {
                          errors?.cart[index]?.REQUIRED_DAY_FOR_FINISHING
                            ?.message
                        }
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Extra Percentage"
                      {...register(`cart.${index}.EXTRA_PERCENTAGE` as const)}
                      className={cn(
                        errors?.cart?.[index]?.EXTRA_PERCENTAGE ? "error" : "",
                        "border-none ring-0 outline-0 bg-yellow-100 text-center"
                      )}
                      onChange={(e) => {
                        e.preventDefault();
                        const cvalue = getValues(`cart.${index}.ORDER_QTY`);
                        const percen = Number(e.target.value);
                        const total = cvalue + (cvalue * percen) / 100;
                        setValue(`cart.${index}.TOTAL_ORDER_QTY`, total);
                      }}
                    />
                    {errors.cart?.[index]?.EXTRA_PERCENTAGE && (
                      <p className="text-destructive">
                        {errors?.cart[index]?.EXTRA_PERCENTAGE?.message}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Total Order Qty"
                      {...register(`cart.${index}.TOTAL_ORDER_QTY` as const)}
                      className={cn(
                        errors?.cart?.[index]?.TOTAL_ORDER_QTY ? "error" : "",
                        "border-none ring-0 outline-0 text-center"
                      )}
                      readOnly
                    />
                    {errors.cart?.[index]?.TOTAL_ORDER_QTY && (
                      <p className="text-destructive">
                        {errors?.cart[index]?.TOTAL_ORDER_QTY?.message}
                      </p>
                    )}
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => {
                        const dtlsData = getValues(
                          `cart.${index}.lstSwtPlanStripDetails`
                        );

                        store.setPlanStripDialogData(dtlsData);
                        store.setSelectedIndex(index);
                        store.setOpenDialog(true);
                      }}
                      variant="outline"
                      className={cn(
                        "w-full",
                        getValues(`cart.${index}.lstSwtPlanStripDetails`)
                          ?.length > 0
                          ? "bg-green-200"
                          : "bg-slate-200"
                      )}
                      type="button"
                    >
                      Brand || SMV || LC
                    </Button>
                  </TableCell>
                  <TableCell>
                    <AppButton
                      type="button"
                      variant={"delete"}
                      onClick={() =>
                        handleRemove(
                          index,
                          getValues(`cart.${index}`) as SwtPlanStripType
                        )
                      }
                    >
                      <Trash2Icon size={15} />
                    </AppButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Total control={control} />
    </form>
  );
}
