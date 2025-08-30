"use client";

import { CalendarIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@workspace/ui/components/button";
import { MonthPicker } from "@workspace/ui/components/monthpicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";

type MonthSelectorProps = {
  year: number;
  month: number;
};

export function MonthSelector({ year, month }: MonthSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleMonthSelect = (date: Date) => {
    const selectedYear = date.getFullYear();
    const selectedMonth = date.getMonth() + 1;

    const searchParams = new URLSearchParams();
    searchParams.set("year", selectedYear.toString());
    searchParams.set("month", selectedMonth.toString());

    router.push(`${pathname}?${searchParams.toString()}`);
    setOpen(false);
  };

  const selectedDate = new Date(year, month - 1);
  const displayText = `${year}年${month}月`;

  return (
    <div className="mb-6">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[200px] justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayText}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <MonthPicker
            selectedMonth={selectedDate}
            onMonthSelect={handleMonthSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
