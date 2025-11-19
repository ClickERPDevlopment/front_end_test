/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { MdOutlineClear } from "react-icons/md";
import { FloorType } from "@/actions/Configurations/floor-action";
import useAxiosInstance from "@/hooks/axios-instance";;
import { ICompanyType } from "@/actions/Configurations/company-action";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { LineType } from "@/actions/Configurations/line-action";
import React from "react";

type comboBoxDataType = {
  label: string;
  value: string;
};

const FormSchema = z.object({
  factoryId: z
    .number({
      required_error: "Please select a factory.",
    })
    .optional(),
  fromDate: z.date(),
  toDate: z.date(),
  floorId: z
    .number({
      required_error: "Please select a floor.",
    }),
  lineId: z
    .number({
      required_error: "Please select a line.",
    }),
});

export default function OnlineDisplayBoardForm() {
  const [selectedLine, setSelectedLine] = useState<number>(0);
  const [selectedFactory, setSelectedFactory] = useState<number>(0);
  const [, setSelectedFloor] = useState<number>(0);
  const [factory, setFactory] = useState<comboBoxDataType[]>();
  const [floor, setFloor] = useState<comboBoxDataType[]>();
  const [line, setLine] = useState<comboBoxDataType[]>();
  const [openFactory, setOpenFactory] = React.useState(false);
  const [openFloor, setOpenFloor] = React.useState(false);
  const [openLine, setOpenLine] = React.useState(false);

  useEffect(() => {
    loadAllCompany();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { fromDate: new Date(), toDate: new Date() },
  });

  const axios = useAxiosInstance();

  const loadAllCompany = async () => {
    try {
      const response = await axios.get(`/production/Company`);
      const factoryData = await response?.data;
      const _factory: comboBoxDataType[] = [];
      factoryData?.forEach((element: ICompanyType) => {
        _factory.push({
          label: element.NAME || "",
          value: element?.ID?.toString(),
        });
      });
      setFactory([..._factory]);
    } catch {
      setFactory([]);
    }
  };

  const loadUnitByFactory = async (factoryId: number) => {
    if (factoryId === 0) return;
    try {
      const response = await axios.get(`/production/Unit/GetAllUnitByFactory`, {
        params: { factoryId },
      });

      const unitData = await response?.data;
      const _unit: comboBoxDataType[] = [];
      unitData?.forEach((element: FloorType) => {
        _unit.push({ label: element.Unitname, value: element?.Id?.toString() });
      });
      setFloor([..._unit]);
    } catch {
      setFloor([]);
    }
  };

  const loadLineByUnit = async (unitId: number) => {
    if (unitId === 0) return;
    try {
      const response = await axios.get(`/production/Line/GetAllLineByUnit`, {
        params: { unitId },
      });

      const lineData = await response?.data;
      const _line: comboBoxDataType[] = [];
      lineData?.forEach((element: LineType) => {
        _line.push({ label: element.Linename, value: element?.Id?.toString() });
      });
      setLine([..._line]);
    } catch {
      setLine([]);
    }
  };

  function onSubmit(_data: z.infer<typeof FormSchema>) {
    window.open(
      `/report/production/sewing/online-display-board?factoryid=${selectedFactory}&lineid=${selectedLine}`
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Factory==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="factoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Factory</FormLabel>
                <Popover open={openFactory} onOpenChange={setOpenFactory}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openFactory}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? factory?.find(
                            (factory) => Number(factory.value) === field.value
                          )?.label
                          : "Select a factory"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search factory..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No factory found.</CommandEmpty>
                        <CommandGroup>
                          {factory?.map((factory) => (
                            <CommandItem
                              value={factory.label}
                              key={factory.value}
                              onSelect={() => {
                                loadUnitByFactory(Number(factory.value));
                                form.setValue(
                                  "factoryId",
                                  Number(factory.value)
                                );
                                setSelectedFactory(Number(factory.value));
                                setOpenFactory(false);
                              }}
                            >
                              {factory.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  Number(factory.value) === field.value
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
            onClick={() => form.resetField("factoryId")}
            variant={"outline"}
            type="button"
            className="m-0 ml-1 px-[12px]"
          >
            <MdOutlineClear className="rounded text-slate-600 m-0" />
          </Button>
        </div>

        {/* Floor==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="floorId"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Floor</FormLabel>
                <Popover open={openFloor} onOpenChange={setOpenFloor}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openFloor}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? floor?.find(
                            (floor) => Number(floor.value) === field.value
                          )?.label
                          : "Select a floor"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search floor..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No floor found.</CommandEmpty>
                        <CommandGroup>
                          {floor?.map((floor) => (
                            <CommandItem
                              value={floor.label}
                              key={floor.value}
                              onSelect={() => {
                                loadLineByUnit(Number(floor.value));
                                form.setValue("floorId", Number(floor.value));
                                setSelectedFloor(Number(floor.value));
                                setOpenFloor(false);
                              }}
                            >
                              {floor.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  Number(floor.value) === field.value
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
            onClick={() => form.resetField("floorId")}
            variant={"outline"}
            type="button"
            className="m-0 ml-1 px-[12px]"
          >
            <MdOutlineClear className="rounded text-slate-600 m-0" />
          </Button>
        </div>

        {/* Line==================================================================================== */}
        <div className="flex justify-between items-end">
          <FormField
            control={form.control}
            name="lineId"
            render={({ field }) => (
              <FormItem className="flex flex-col flex-1">
                <FormLabel>Line</FormLabel>
                <Popover open={openLine} onOpenChange={setOpenLine}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openLine}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? line?.find(
                            (line) => Number(line.value) === field.value
                          )?.label
                          : "Select a floor"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[400px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search floor..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No line found.</CommandEmpty>
                        <CommandGroup>
                          {line?.map((line) => (
                            <CommandItem
                              value={line.label}
                              key={line.value}
                              onSelect={() => {
                                form.setValue("lineId", Number(line.value));
                                setSelectedLine(Number(line.value));
                                setOpenLine(false);
                              }}
                            >
                              {line.label}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  Number(line.value) === field.value
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
            onClick={() => form.resetField("lineId")}
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
