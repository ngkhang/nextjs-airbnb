'use client';

import Link from 'next/link';
import React from 'react';
import Icon from '@/components/icon/Icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { DatePickerWithRange } from '@/components/custom/DatePickerWithRange';

const HeaderDefault = () => (
  <section>
    <div className='grid grid-cols-7 gap-4 py-4'>
      {/* Logo */}
      <div className='col-start-1 col-end-3'>
        <Link href='/' className='inline-block size-7'>
          <Icon name='Airbnb' />
        </Link>
      </div>

      {/* Search */}
      <div className='col-span-3 col-start-3 min-w-[340px] max-w-full center'>
        <div className='flex w-full flex-col items-center'>
          <div className='mb-4 flex items-center'>
            <Button className='flex-1 rounded-lg bg-transparent px-5 py-3 text-base font-semibold text-[#222222] shadow-none hover:bg-[#DDDDDD]'>
              Chỗ ở
            </Button>
            <Button className='flex-1 rounded-lg bg-transparent px-5 py-3 text-base text-[#6A6A6A] shadow-none hover:bg-[#DDDDDD]'>
              Trải nghiệm
            </Button>
          </div>
          <div className='grid w-full grid-flow-row grid-cols-6 rounded-full border shadow-xl'>
            {/* Where button */}
            <div className='col-span-2 col-start-1'>
              <Popover onOpenChange={() => {}}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='px flex h-full w-full flex-col items-start rounded-full border-none px-7 py-3 text-sm text-[#6A6A6A] shadow-none data-[state=open]:bg-gray-300'
                  >
                    <span>Where</span>
                    <Input
                      id='where'
                      type='text'
                      defaultValue={''}
                      className='h-fit border-none p-0 shadow-none hover:border-none focus-visible:ring-0'
                      placeholder='Search destinations'
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align='start' className='px-4 py-2 text-sm text-[#6A6A6A]'>
                  <div className='grid gap-4'>
                    <div className='space-y-2'>
                      <h4 className='font-medium leading-none'>Search by region</h4>
                      <p className='text-sm text-muted-foreground'>Set the dimensions for the layer.</p>
                    </div>
                    <div className='grid gap-2'>
                      <div className='grid grid-cols-3 items-center gap-4'>
                        <Label htmlFor='width'>Width</Label>
                        <Input
                          id='width'
                          defaultValue='100%'
                          className='col-span-2 h-8'
                          onChange={(e) => console.log(e.target.value)}
                        />
                      </div>
                      <div className='grid grid-cols-3 items-center gap-4'>
                        <Label htmlFor='maxWidth'>Max. width</Label>
                        <Input id='maxWidth' defaultValue='300px' className='col-span-2 h-8' />
                      </div>
                      <div className='grid grid-cols-3 items-center gap-4'>
                        <Label htmlFor='height'>Height</Label>
                        <Input id='height' defaultValue='25px' className='col-span-2 h-8' />
                      </div>
                      <div className='grid grid-cols-3 items-center gap-4'>
                        <Label htmlFor='maxHeight'>Max. height</Label>
                        <Input id='maxHeight' defaultValue='none' className='col-span-2 h-8' />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Check in button */}
            <div className='col-span-2 col-start-3'>
              <DatePickerWithRange />
            </div>

            {/* Who button */}
            <div className='relative col-span-2 col-start-5'>
              <Popover onOpenChange={() => {}}>
                <PopoverTrigger asChild>
                  <Button
                    variant='outline'
                    className='flex h-full w-full flex-col items-start rounded-full border-none px-7 py-3 text-sm text-[#6A6A6A] shadow-none data-[state=open]:bg-gray-300'
                  >
                    <span>Who</span>
                    <Input
                      id='who'
                      type='text'
                      defaultValue={''}
                      placeholder='Add guests'
                      className='h-fit border-none p-0 px-1 shadow-none hover:border-none focus-visible:ring-0'
                    />
                    {/* TODO: Add clear button */}
                    {/* <div className='flex w-full max-w-sm items-center space-x-2 pr-10'>
                      <Input/>

                      <Button variant='outline' className='d-none size-5 rounded-full border-none p-3 shadow-none'>
                        <Icon name='Xmark' />
                      </Button>
                    </div> */}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align='end' className='w-80 px-7'>
                  <div className='grid gap-4'>
                    <div className='grid'>
                      <div className='flex items-center justify-between py-6'>
                        <Label htmlFor='adults' className='flex flex-1 flex-col'>
                          <span className='text-base text-[#222222]'>Adults</span>
                          <span className='text-sm text-[#6A6A6A]'>Ages 13 or above</span>
                        </Label>
                        <div className='flex flex-row items-center space-x-3'>
                          <Button variant='outline' className='size-full p-0' type='button'>
                            <Icon name='Minus' />
                          </Button>
                          <Input id='adults' defaultValue='2' className='hidden' />
                          <span className='text-center'>2</span>
                          <Button variant='outline' className='size-full p-0' type='button'>
                            <Icon name='Plus' />
                          </Button>
                        </div>
                      </div>
                      <Separator className='h-[1px]' />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Search icon */}
              <Button
                onClick={() => console.log('1')}
                className='absolute inset-y-1/2 right-3 size-8 -translate-y-1/2 rounded-full p-5 shadow-none'
              >
                <Icon name='Search' />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Login */}
      <div className='col-start-6 col-end-8 flex items-start justify-end'>
        <div className='flex items-center'>
          <Button
            className='rounded-full border-none px-5 py-3 text-sm font-semibold text-[#6A6A6A] shadow-none'
            variant='outline'
          >
            Cho thuê chỗ ở qua Airbnb
          </Button>
          <Button className='size-9 rounded-full border-none p-2 shadow-none' variant='outline'>
            <Icon name='Global' />
          </Button>
        </div>
        <Button variant='outline' className='col-span-1 flex items-center rounded-full'>
          <Icon name='Bars' />
          <Avatar className='h-full w-auto'>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </div>
  </section>
);

export default HeaderDefault;
