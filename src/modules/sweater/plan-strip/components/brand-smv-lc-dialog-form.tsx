import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useSwtPlanStripStore } from "./swt-plan-strip-store";
import { SwtPlanStripDtlsType } from "@/actions/Sweater/swt-plan-strip-action";
import {
  GetSwtBrandGroup,
  GetSwtBrandGroupById,
} from "@/actions/Sweater/swt-mc-brand-group-action";
import React from "react";
import { GetAllLearningCurve } from "@/actions/Configurations/learning-curve-action";
import useAxiosInstance from "@/hooks/axios-instance";
import { ComboBoxOptionsType } from "@/utils/app-type";

const FormSchema = z.object({
  brandId: z.coerce.number().gte(1, "Please select a brand."),
  brandName: z.string().optional(),
  learningCurveId: z.coerce.number().gte(1, "Please select a learning curve."),
  learningCurve: z.string().optional(),
  smv: z.coerce.number().positive("Please enter a positive number."),
});

type FormType = z.infer<typeof FormSchema>;

export function BrandSmvLcDialogForm() {
  const axios = useAxiosInstance();
  const store = useSwtPlanStripStore();
  const [brandGroups, setBrandGroups] = React.useState<ComboBoxOptionsType[]>(
    []
  );
  const [openBrand, setOpenBrand] = React.useState(false);

  const [learningCurves, setLearningCurves] = React.useState<
    ComboBoxOptionsType[]
  >([]);
  const [openLearningCurve, setOpenLearningCurve] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => GetSwtBrandGroup(axios);
    getData().then((res) => {
      let tempData: ComboBoxOptionsType[] = [];
      tempData = res.map((_) => ({
        value: _.ID.toString(),
        label: _.GROUP_NAME,
      }));
      setBrandGroups([...tempData]);
    });
  }, [0]);

  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      brandId: 0,
      brandName: "",
      learningCurveId: 0,
      learningCurve: "",
      smv: 0,
    },
  });

  // const { data: lstBrand } = GetAllBrand();
  const { data: lstLearningCurve } = GetAllLearningCurve();
  // React.useEffect(() => {
  //   if (lstBrand) {
  //     const brandList = lstBrand.map((brand) => {
  //       return {
  //         label: brand.BRAND_NAME,
  //         value: brand.BRAND_ID?.toString(),
  //       };
  //     });
  //     setBrandGroups(brandList);
  //   }
  // }, [lstBrand]);

  React.useEffect(() => {
    if (lstLearningCurve) {
      const learningCurveList = lstLearningCurve.map((learningCurve) => {
        return {
          label: learningCurve.NAME,
          value: learningCurve.ID.toString(),
        };
      });
      setLearningCurves(learningCurveList);
    }
  }, [lstLearningCurve]);

  async function onSubmit(formData: FormType) {
    console.log(formData);
    const tempData: SwtPlanStripDtlsType[] = store.planStripsDialogData?.map(
      (d) => d
    );

    const brands = await GetSwtBrandGroupById(axios, formData.brandId);

    brands.lstBrands?.forEach((element) => {
      tempData.push({
        ID: 0,
        MASTER_ID: 0,
        MC_BRAND_ID: element.MC_BRAND_ID,
        LEARNING_CURVE_ID: formData.learningCurveId,
        SMV: formData.smv,
        MC_BRAND: element.MC_BRAND,
        LEARNING_CURVE: formData.learningCurve!,
      });
    });

    store.setPlanStripDialogData([...tempData]);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="brandId"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right col-span-1">Brand</FormLabel>
              <Popover open={openBrand} onOpenChange={setOpenBrand}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground",
                        "col-span-3"
                      )}
                    >
                      {field.value
                        ? brandGroups.find(
                          (language) =>
                            language.value === field?.value?.toString()
                        )?.label
                        : "Select brand"}
                      <ChevronsUpDown className="opacity-50" size={18} />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 z-50">
                  <Command>
                    <CommandInput
                      placeholder="Search framework..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No item found.</CommandEmpty>
                      <CommandGroup>
                        {brandGroups.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue("brandId", Number(language.value));
                              form.setValue("brandName", language.label);
                              setOpenBrand(false);
                            }}
                          >
                            {language.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                language.value === field?.value?.toString()
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brandName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4 hidden">
              <FormLabel className="text-right">Brand name</FormLabel>
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

        <FormField
          control={form.control}
          name="learningCurveId"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right col-span-1">
                Learning Curve
              </FormLabel>
              <Popover
                open={openLearningCurve}
                onOpenChange={setOpenLearningCurve}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground",
                        "col-span-3"
                      )}
                    >
                      {field.value
                        ? learningCurves.find(
                          (language) =>
                            language.value === field.value?.toString()
                        )?.label
                        : "Select learning-curve"}
                      <ChevronsUpDown className="opacity-50" size={18} />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 z-50">
                  <Command>
                    <CommandInput
                      placeholder="Search learning-curve..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No item found.</CommandEmpty>
                      <CommandGroup>
                        {learningCurves.map((language) => (
                          <CommandItem
                            value={language.label}
                            key={language.value}
                            onSelect={() => {
                              form.setValue(
                                "learningCurveId",
                                Number(language.value)
                              );
                              form.setValue("learningCurve", language.label);
                              setOpenLearningCurve(false);
                            }}
                          >
                            {language.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                language.value === field.value?.toString()
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="learningCurve"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4 hidden">
              <FormLabel className="text-right">Learning Curve</FormLabel>
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

        <FormField
          control={form.control}
          name="smv"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">SMV</FormLabel>
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
          <Button type="submit" className="align-middle w-16">
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
}
