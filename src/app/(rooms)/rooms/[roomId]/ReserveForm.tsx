/* eslint-disable no-undefined */
'use client';

import { useEffect, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { format, formatDate } from 'date-fns';
import useZodForm from '@/hooks/useZodForm';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Booking } from '@/types/booking.type';
import { ReserveSchema, ReserveType } from '@/schemas/booking.schema';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import SearchButton from '@/components/layout/user/user-header/SearchButton';
import { Calendar } from '@/components/ui/calendar';
import { defaultContent } from '@/lib/staticContent';
import { cn, formatBirthday } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import Icon from '@/components/icon/Icon';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ReserveFormProps {
  booking: Booking | null;
}
const content = defaultContent.commonContent.header.search[0].items;

export default function ReserveForm({ booking }: ReserveFormProps) {
  const [date, setDate] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState<{ [key: string]: number }>({
    adults: booking?.soLuongKhach || 2,
    children: 0,
    infants: 0,
    pets: 0,
  });
  const onClick = (adjustment: number, id: string) => {
    setGuests({
      ...guests,
      [id]: guests[id] + adjustment,
    });
  };
  const reserveForm = useZodForm(ReserveSchema, {
    defaultValues: {
      maPhong: booking?.maPhong,
      maNguoiDung: booking?.maNguoiDung,
      soLuongKhach: booking?.soLuongKhach,
      ngayDen: booking?.ngayDen,
      ngayDi: booking?.ngayDi,
    },
  });

  useEffect(() => {
    reserveForm.reset({
      ...booking,
      soLuongKhach: guests.adults,
    });
  }, [booking, guests]);

  function onSubmitAvatar(data: ReserveType) {
    console.log('🚀 ~ onSubmitAvatar ~ data:', data);
  }

  return (
    <Card className=''>
      {/* Card Header */}
      <CardHeader>
        <CardTitle>₫1,316,976 night</CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent>
        <Form {...reserveForm}>
          <form onSubmit={reserveForm.handleSubmit(onSubmitAvatar)} className='grid grid-cols-2'>
            <div className='col-span-1 rounded-tl-2xl border border-black border-b-transparent p-3'>
              <FormField
                control={reserveForm.control}
                name='ngayDen'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div className='flex cursor-pointer flex-col'>
                            <span className='mb-1 font-medium uppercase'>Check In</span>
                            <span className={cn('font-normal', !field.value && 'text-muted-foreground')}>
                              {field.value ? formatBirthday(field.value) : 'Pick a date'}
                            </span>
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='col-span-1 rounded-tr-2xl border border-black border-b-transparent border-l-transparent p-3'>
              <FormField
                control={reserveForm.control}
                name='ngayDi'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <div className='flex cursor-pointer flex-col'>
                            <span className='mb-1 font-medium uppercase'>Check out</span>
                            <span className={cn('font-normal', !field.value && 'text-muted-foreground')}>
                              {field.value ? formatBirthday(field.value) : 'Pick a date'}
                            </span>
                          </div>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='end'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date() || date <= reserveForm.watch('ngayDen')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-2 rounded-b-2xl border border-black p-3'>
              {content?.who && (
                <Popover>
                  <PopoverTrigger asChild>
                    <div className='flex cursor-pointer items-center justify-between'>
                      <div className='flex flex-col'>
                        <span className='mb-1 font-medium uppercase'>guests</span>
                        <span className={cn('font-normal', !guests.adults && 'text-muted-foreground')}>
                          {guests.adults || 'Choose guests'}
                        </span>
                      </div>
                      <Icon name='ChevronDown' />
                    </div>
                  </PopoverTrigger>

                  <PopoverContent align='end' className='w-full p-4 text-sm text-[#6A6A6A] md:w-[300px]'>
                    <div className='grid gap-2'>
                      {content.who.options.map((opt) => (
                        <div key={opt.key}>
                          {opt.key !== 0 && <Separator className='h-[1px]' />}
                          <div className='flex items-center justify-between gap-3 py-3'>
                            <Label htmlFor={opt.id} className='flex flex-1 flex-col text-sm'>
                              <span className='mb-2 text-[#222222]'>{opt.title}</span>
                              <span className='font-normal'>{opt.description}</span>
                            </Label>

                            <div className='flex flex-row items-center justify-between'>
                              <Button
                                variant='outline'
                                className='size-6 rounded-full p-0'
                                type='button'
                                onClick={() => onClick(-1, opt.id)}
                                disabled={(opt.id === 'adults' && guests['adults'] <= 2) || guests[opt.id] <= 0}
                              >
                                <Icon size='18' name='Minus' />
                              </Button>

                              <Input id={opt.id} defaultValue={guests[opt.id]} className='hidden' />

                              <span className='mx-4 text-center'>{guests[opt.id]}</span>

                              <Button
                                variant='outline'
                                className='size-6 rounded-full p-0'
                                type='button'
                                onClick={() => onClick(1, opt.id)}
                              >
                                <Icon size='18' name='Plus' />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            <FormField
              control={reserveForm.control}
              name='soLuongKhach'
              render={({ field }) => (
                <FormItem className='hidden'>
                  <FormLabel>Guests</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={reserveForm.control}
              name='maNguoiDung'
              render={({ field }) => (
                <FormItem className='hidden'>
                  <FormLabel>UserId</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={reserveForm.control}
              name='maPhong'
              render={({ field }) => (
                <FormItem className='hidden'>
                  <FormLabel>RoomId</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='col-span-full mt-7 py-6 text-base lg:text-xl'>
              Reverse
            </Button>
          </form>
        </Form>
      </CardContent>
      {/* Card Footer */}

      <CardFooter className='flex-col items-stretch'>
        <div className='flex items-center justify-between'>
          <p>₫1,316,976 x 3 nights</p>
          <p>₫1,316,976</p>
        </div>
        <Separator className='my-4' />
        <div className='flex items-center justify-between font-medium'>
          <p>Total before taxes</p>
          <p>00000</p>
        </div>
      </CardFooter>
    </Card>
  );
}
