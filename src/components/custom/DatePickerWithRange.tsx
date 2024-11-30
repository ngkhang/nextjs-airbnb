'use client';

import * as React from 'react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DatePickerWithRange() {
  const [date, setDate] = React.useState<DateRange | undefined>();

  console.log(date);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='grid grid-flow-row grid-cols-2 rounded-full data-[state=open]:bg-gray-300'>
          <Button
            variant='outline'
            className='col-span-1 flex h-full flex-col items-stretch rounded-full border-none bg-inherit px-4 py-3 text-start text-sm text-[#6A6A6A] shadow-none'
          >
            <span>Check in</span>
            <span className='overflow-hidden text-ellipsis font-semibold'>
              {date?.from ? format(date.from, 'LLL dd') : `Add dates`}
            </span>
          </Button>
          <Button
            variant='outline'
            className='col-span-1 flex h-full flex-col items-stretch overflow-hidden rounded-full border-none bg-inherit px-4 py-3 text-start text-sm text-[#6A6A6A] shadow-none'
          >
            <span>Check out</span>
            <span className='overflow-hidden text-ellipsis font-semibold'>
              {date?.to ? format(date.to, 'LLL dd') : `Add dates`}
            </span>
          </Button>
          <div></div>
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0' align='center'>
        <Calendar
          initialFocus
          disabled={{ before: new Date() }}
          mode='range'
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
