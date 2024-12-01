'use client';

import Link from 'next/link';
import { CircleMinus, CirclePlus } from 'lucide-react';
import Image from 'next/image';
import Icon, { IconName } from '@/components/icon/Icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { DatePickerWithRange } from '@/components/custom/DatePickerWithRange';
import { defaultContent } from '@/lib/staticContent';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const { logo, search, sub } = defaultContent.commonContent.Header;
const { where, checkInOut, who } = search[0];

const HeaderDefault = () => (
  <section>
    <div className='grid h-[170px] grid-cols-7 gap-4 py-4'>
      {/* Logo */}
      <div className='col-start-1 col-end-3'>
        <Link href={logo.url} className='inline-block size-7'>
          <Icon name={logo.alt as IconName} />
        </Link>
      </div>

      {/* Search */}
      <div className='relative col-span-3 col-start-3 min-w-[340px]'>
        <div className='flex w-full flex-col items-center'>
          <div className='mb-4 flex items-center'>
            {search.map(({ key, title, active }) => (
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

          <div className='absolute bottom-5 grid w-[60vw] grid-flow-row grid-cols-6 rounded-full border bg-white shadow-xl'>
            {/* Where button */}
            {where && (
              <div className='col-span-2 col-start-1'>
                <Popover onOpenChange={() => {}}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className='px flex h-full w-full flex-col items-start rounded-full border-none px-7 py-3 text-sm text-[#6A6A6A] shadow-none hover:bg-[#EBEBEB] hover:text-inherit data-[state=open]:bg-[#EBEBEB]'
                    >
                      <span className='font-semibold'>{where.title}</span>
                      <Input
                        id='where'
                        type='text'
                        defaultValue={''}
                        className='h-fit border-none p-0 shadow-none hover:border-none focus-visible:ring-0'
                        placeholder={where.description}
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align='start' className='w-[400px] px-4 py-2 text-sm text-[#6A6A6A]'>
                    <div className='grid gap-3'>
                      {/* TODO: Render with data API */}
                      {/* Search by Location */}
                      <div className='mb-4'>
                        <div className='space-y-2'>
                          <h4 className='font-semibold leading-none'>{where.items.location.title}</h4>
                          <p className='mb-2 text-sm'>{where.items.location.description}</p>
                        </div>
                        <Select>
                          <SelectTrigger className='w-full rounded-xl'>
                            <SelectValue placeholder='Choose a location' />
                          </SelectTrigger>
                          <SelectContent>
                            {where.items.location.items.map((location) => (
                              <SelectItem key={location.id} value={`${location.id}`}>
                                {`${location.tenViTri} ${location.tinhThanh}, ${location.tinhThanh}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Search by Region */}
                      <div>
                        <div className='flex items-center space-x-2'>
                          <h4 className='font-semibold leading-none'>{where.items.region.title}</h4>
                          <Badge variant='outline'>coming soon</Badge>
                        </div>
                        <div className='grid grid-flow-row grid-cols-3 grid-rows-2 gap-2'>
                          {where.items.region.items.map((region) => (
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
              </div>
            )}

            {/* Check in button */}
            {checkInOut && (
              <div className='col-span-2 col-start-3'>
                <DatePickerWithRange data={checkInOut} />
              </div>
            )}

            {/* Who button */}
            {who && (
              <div className='relative col-span-2 col-start-5'>
                <Popover onOpenChange={() => {}}>
                  <PopoverTrigger asChild>
                    <Button
                      variant='outline'
                      className='flex size-full flex-col items-stretch overflow-hidden rounded-full border-none py-3 pl-7 pr-20 text-start text-sm text-[#6A6A6A] shadow-none hover:bg-[#EBEBEB] hover:text-inherit data-[state=open]:bg-[#EBEBEB]'
                    >
                      <span className='font-semibold'>{who.title}</span>
                      <span className='overflow-hidden text-ellipsis'>{who.description}</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align='end' className='w-80 px-7'>
                    <div className='grid gap-4'>
                      <div className='grid'>
                        {who.items.map((whoItem) => (
                          <div key={whoItem.key}>
                            {whoItem.key !== 0 && <Separator className='h-[1px]' />}
                            <div className='flex items-center justify-between py-6'>
                              <Label htmlFor='adults' className='flex flex-1 flex-col'>
                                <span className='text-base text-[#222222]'>{whoItem.title}</span>
                                <span className='text-sm text-[#6A6A6A]'>{whoItem.description}</span>
                              </Label>
                              <div className='flex flex-row items-center justify-between'>
                                {/* TODO: handle block if value < 1 */}
                                <Button variant='outline' className='size-6 rounded-full border-none p-0' type='button'>
                                  <CircleMinus className='size-full' />
                                </Button>
                                <Input id={whoItem.id} defaultValue={whoItem.defaultValue} className='hidden' />
                                <span className='mx-4 text-center'>{whoItem.defaultValue}</span>
                                <Button variant='outline' className='size-6 rounded-full border-none p-0' type='button'>
                                  <CirclePlus className='size-full' />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Search icon */}
                <Button className='absolute inset-y-1/2 right-3 size-8 -translate-y-1/2 rounded-full p-5 shadow-none'>
                  <Icon name='Search' />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Login */}
      <div className='col-start-6 col-end-8'>
        <div className='flex items-center justify-end'>
          <div className='flex items-center'>
            <Button
              className='rounded-full border-none px-5 py-3 text-sm font-semibold text-[#6A6A6A] shadow-none'
              variant='outline'
            >
              {sub.host.title}
            </Button>
            <Button className='size-9 rounded-full border-none p-2 shadow-none' variant='outline'>
              <Icon size={24} name={sub.lang.icon as IconName} />
            </Button>
          </div>
          <Popover onOpenChange={() => {}}>
            <PopoverTrigger asChild>
              <Button variant='outline' className='col-span-1 flex h-fit items-center rounded-full'>
                <Icon name='Bars' size={24} />
                <Avatar className='h-full w-auto'>
                  <AvatarImage className='size-6' src='./assets/images/avatar-blank.jpg' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent align='end' className='w-fit px-0'>
              <div className='grid'>
                {sub.profile.top.map((profile) => (
                  <div key={profile.key} className='flex items-center justify-between hover:bg-[#EBEBEB]'>
                    <Link className='py-2 pl-7 pr-14' href={profile.url}>
                      {profile.title}
                    </Link>
                  </div>
                ))}
                <Separator className='h-[1px]' />
                {sub.profile.subs.map((sub) => (
                  <div key={sub.key} className='flex items-center justify-between hover:bg-[#EBEBEB]'>
                    <Link className='py-2 pl-7 pr-14' href={sub.url}>
                      {sub.title}
                    </Link>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  </section>
);

export default HeaderDefault;
