'use client';

import { CircleMinus, CirclePlus } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import SearchButton from '@/components/layout/user/user-header/SearchButton';
import Icon from '@/components/icon/Icons';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { defaultContent } from '@/lib/staticContent';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';

const content = defaultContent.commonContent.Header.search;

const Search = () => {
  const [date, setDate] = useState<DateRange | undefined>();
  return (
    <div className='flex w-full flex-col items-center'>
      {/* Title Change Search */}
      <div className='mb-4 hidden items-center md:flex'>
        {content.map(({ key, title, active }) => (
          <Button
            key={key}
            className={cn(
              'flex-1 rounded-full bg-transparent px-5 py-3 text-base shadow-none hover:bg-inherit',
              active ? 'font-semibold text-[#222222]' : 'text-[#6A6A6A] hover:bg-[#EBEBEB] hover:text-[#222222]'
            )}
          >
            {title}
          </Button>
        ))}
      </div>

      {/* Search form */}
      <div className='flex items-center rounded-full border bg-white px-0 shadow-xl'>
        {/* Button search */}
        <div className='ml-4 mr-2 center md:order-2 md:ml-2 md:mr-4'>
          <Button className='size-8 rounded-full bg-transparent p-0 text-black shadow-none hover:bg-primary/70 hover:text-[#6A6A6A] md:size-10 md:bg-primary md:p-5 md:text-white md:hover:text-white'>
            <Icon name='Search' className='text-2xl' />
          </Button>
        </div>

        {/* Main search */}
        {content[0].items && (
          <div className='grid grid-cols-3 gap-2 md:gap-4'>
            {/* Where button */}
            <Popover onOpenChange={() => {}}>
              <PopoverTrigger asChild>
                <div>
                  <SearchButton
                    btn={{
                      id: content[0].items.where.id,
                      placeholder: content[0].items.where.placeholder,
                      label: content[0].items.where.label,
                      defaultValue: '',
                    }}
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent align='start' className='w-[90%] p-4 text-sm text-[#6A6A6A] md:w-[500px]'>
                <div className='grid gap-3'>
                  {/* Search by Location */}
                  <div className=''>
                    <div className='mb-3 space-y-2'>
                      <h4 className='font-semibold leading-none'>{content[0].items.where.location.title}</h4>
                      <p className='text-sm'>{content[0].items.where.location.description}</p>
                    </div>
                    <Select>
                      {/* TODO: Call API */}
                      <SelectTrigger className='w-full rounded-xl'>
                        <SelectValue placeholder='Choose a location' />
                      </SelectTrigger>
                      <SelectContent>
                        {content[0].items.where.location.items.map((location) => (
                          <SelectItem key={location.id} value={`${location.id}`}>
                            {`${location.tenViTri} ${location.tinhThanh}, ${location.tinhThanh}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Search by Region */}
                  <div>
                    <div className='flex items-center space-x-2 space-y-2'>
                      <h4 className='font-semibold leading-none'>{content[0].items.where.region.title}</h4>
                      <Badge variant='outline'>coming soon</Badge>
                    </div>
                    <div className='grid grid-flow-row grid-cols-3 grid-rows-2 gap-2'>
                      {content[0].items.where.region.items.map((region) => (
                        <Card key={region.key} className='border-none p-2 shadow-none'>
                          <CardHeader className='mb-2 p-0'>
                            <CardTitle>
                              <Image
                                className='h-auto w-full rounded-lg border-2'
                                quality={75}
                                width={50}
                                height={50}
                                alt={region.title}
                                src={region.image}
                              />
                            </CardTitle>
                          </CardHeader>
                          <CardContent className='p-0'>
                            <p>{region.title}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Check in/out button */}
            <Popover>
              <PopoverTrigger asChild>
                <div>
                  <SearchButton
                    btn={{
                      id: content[0].items.when.id,
                      placeholder: content[0].items.when.placeholder,
                      label: content[0].items.when.label,
                      defaultValue: date
                        ? `${date.from && format(date.from, 'LLL dd')}${date.to ? ' - ' + format(date.to, 'LLL dd') : ''}`
                        : '',
                      isDisabled: true,
                    }}
                  />
                </div>
              </PopoverTrigger>

              <PopoverContent className='w-full p-4 text-sm text-[#6A6A6A] md:w-[500px]' align='center'>
                <Calendar
                  initialFocus
                  disabled={{ before: new Date(Date.now()) }}
                  mode='range'
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  className='p-0'
                />
              </PopoverContent>
            </Popover>

            {/* Who button */}
            <Popover onOpenChange={() => {}}>
              <PopoverTrigger asChild>
                <div>
                  <SearchButton
                    btn={{
                      id: content[0].items.who.id,
                      placeholder: content[0].items.who.placeholder,
                      label: content[0].items.who.label,
                      defaultValue: '',
                      isDisabled: true,
                    }}
                  />
                </div>
              </PopoverTrigger>

              <PopoverContent align='end' className='w-full p-4 text-sm text-[#6A6A6A] md:w-[300px]'>
                <div className='grid gap-2'>
                  {content[0].items.who.options.map((opt) => (
                    <div key={opt.key}>
                      {opt.key !== 0 && <Separator className='h-[1px]' />}
                      <div className='flex items-center justify-between gap-3 py-3'>
                        <Label htmlFor={opt.id} className='flex flex-1 flex-col text-sm'>
                          <span className='mb-2 text-[#222222]'>{opt.title}</span>
                          <span className='font-normal'>{opt.description}</span>
                        </Label>

                        <div className='flex flex-row items-center justify-between'>
                          {/* TODO: Add function up/down and block if value < 1 */}
                          <Button variant='outline' className='size-6 rounded-full border-none p-0' type='button'>
                            <CircleMinus className='size-full' />
                          </Button>

                          <Input id={opt.id} defaultValue={opt.defaultValue} className='hidden' />

                          <span className='mx-4 text-center'>{opt.defaultValue}</span>

                          <Button variant='outline' className='size-6 rounded-full border-none p-0' type='button'>
                            <CirclePlus className='size-full' />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
