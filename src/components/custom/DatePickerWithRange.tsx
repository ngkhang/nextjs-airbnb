'use client';

import * as React from 'react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Props<T> {
  data: T[];
}

export function DatePickerWithRange({ data }: Props<{ key: number; title: string; description: string }>) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='grid grid-flow-row grid-cols-2 rounded-full data-[state=open]:bg-[#EBEBEB]'>
          {data.map((btn) => (
            <Button
              key={btn.key}
              variant='outline'
              className='col-span-1 flex h-full flex-col items-stretch overflow-hidden rounded-full border-none bg-inherit px-4 py-3 text-start text-sm text-[#6A6A6A] shadow-none hover:bg-inherit hover:text-inherit'
            >
              <span className='font-semibold'>{btn.title}</span>
              <span className='overflow-hidden text-ellipsis font-semibold'>
                {date?.from ? format(date.from, 'LLL dd') : btn.description}
              </span>
            </Button>
          ))}
        </div>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0' align='center'>
        {/* TODO: Block past day */}
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
