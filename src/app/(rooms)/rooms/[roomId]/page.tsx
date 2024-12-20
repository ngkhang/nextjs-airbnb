'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import ReserveForm from './ReserveForm';
import Icon, { IconName } from '@/components/icon/Icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { defaultContent } from '@/lib/staticContent';
import { Separator } from '@/components/ui/separator';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const { locationPage } = defaultContent.roomContent;

export default function RoomDetailPage() {
  const searchParams = useSearchParams();
  console.log('🚀 ~ RoomDetailPage ~ searchParams:', searchParams);

  const booking = {
    maPhong: Number(searchParams),
    ngayDen: new Date(),
    ngayDi: new Date(),
    maNguoiDung: 332,
    soLuongKhach: 2,
  };

  return (
    <div className=''>
      {/* Title - Banner */}
      <div className='mb-5'>
        <div className='flex flex-col'>
          <div className='relative mb-3 md:container md:order-1'>
            <Image
              alt='banner'
              src={'https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg'}
              width={600}
              height={80}
              quality={100}
              className='h-full w-full'
            />

            <div className='absolute left-0 top-3 flex w-full items-center justify-between px-2 md:hidden'>
              <Button type='button' variant='outline' className='size-7 rounded-full border-none shadow-none'>
                <Icon name='ChevronLeft' size='14' className='font-semibold' />
              </Button>
              <div className='grid grid-flow-col gap-2'>
                <div
                  className={cn(buttonVariants({ variant: 'outline' }), 'size-7 rounded-full border-none shadow-none')}
                >
                  <Icon name='CloudUpload' size='14' className='font-semibold' />
                </div>
                <div
                  className={cn(buttonVariants({ variant: 'outline' }), 'size-7 rounded-full border-none shadow-none')}
                >
                  <Icon name='Heart' size='14' className='font-semibold' />
                </div>
              </div>
            </div>
          </div>

          <div className='container flex'>
            <h2 className='mb-3 flex-1 text-2xl font-semibold md:py-5 md:text-3xl'>
              ★Le Robinet private room. 3 min to Hue Citadel★
            </h2>
            <div className='hidden grid-flow-col gap-2 md:grid'>
              <div className='flex items-center gap-2 font-medium'>
                <div
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'font-medium, size-17 rounded-full border-none p-2 shadow-none'
                  )}
                >
                  <Icon name='CloudUpload' size='14' className='font-semibold' />
                </div>
                <span className='underline'>Share</span>
              </div>
              <div className='flex items-center gap-2 font-medium'>
                <div
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'font-medium, size-17 rounded-full border-none p-2 shadow-none'
                  )}
                >
                  <Icon name='Heart' size='14' className='font-semibold' />
                </div>
                <span className='underline'>Save</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className='container grid-cols-5 md:grid md:gap-8 lg:grid-cols-6 xl:gap-14'>
        {/* Left section */}
        <div className='md:col-span-3 lg:col-span-4'>
          {/* Title Room */}
          <div className=''>
            <p>Entire loft in George Town, Malaysia</p>
            <p>12 guests2 bedrooms5 beds2 baths</p>
            <div className='flex items-center gap-2 text-base font-medium'>
              <div className='flex items-center gap-2'>
                <Icon name='Star' size='18' className='fill-black' />
                <span>4.89</span>
              </div>
              <span> · </span>

              <span className='font-medium underline'>361 reviews</span>
            </div>
          </div>

          <Separator className='my-6 hidden md:block' />

          {/* Host */}
          <div className='hidden items-center gap-4 md:flex'>
            <Avatar className='size-14'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className='flex-1'>
              <p className='font-medium'>Hosted by Comfy Homestay</p>
              <p className='text-sm font-medium text-[#6A6A6A]'>Superhost · 7 years hosting</p>
            </div>
          </div>

          <Separator className='my-6' />
          {/* About this place */}
          <div className='w-full'>
            <p className='line-clamp-5 text-ellipsis whitespace-pre-line'>
              Looking for an affordable place to stay while exploring, studying or working in Sydney? Got an event
              nearby and need somewhere comfortable to stay the night? If so, then our quaint design guesthouse is
              perfect for you!
            </p>
          </div>

          <Separator className='my-6' />

          {/* Where you'll sleep */}
          <div>
            <h3 className='mb-4 text-2xl font-medium lg:mb-7 lg:text-4xl'>{locationPage.whereSleep.title}</h3>

            <ScrollArea className='w-full whitespace-nowrap rounded-md'>
              <div className='flex w-max space-x-4'>
                {locationPage.whereSleep.items.map((item) => (
                  <Card key={item.key} className='min-w-60 max-w-80 border-none shadow-none'>
                    <CardHeader className='mb-2 rounded-2xl p-2'>
                      <CardTitle>
                        <Image
                          src={item.image}
                          alt='bed room'
                          quality={75}
                          height={60}
                          width={100}
                          className='size-full rounded-2xl'
                        />
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='p-2'>
                      <p className='font-semibold'>{item.title}</p>
                      <p className='text-sm'>{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation='horizontal' />
            </ScrollArea>
          </div>

          <Separator className='my-6' />

          {/* What this place offers */}
          <div>
            <h3 className='mb-4 text-2xl font-medium lg:mb-7 lg:text-4xl'>{locationPage.whatOffers.title}</h3>

            <div className='grid gap-2'>
              {locationPage.whatOffers.items.map((item) => (
                <Card key={item.key} className='border-none shadow-none'>
                  <CardContent className='flex items-center gap-3 p-2'>
                    <Icon name={item.icon as IconName} />
                    <p className='text-sm'>{item.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator className='my-6 lg:hidden' />
        </div>

        {/* Right section */}
        <div className='col-span-2 hidden md:relative md:block lg:col-span-2'>
          <div className='md:sticky md:top-[250px] lg:top-[280px]'>
            <ReserveForm booking={booking} />
          </div>
        </div>
      </div>

      <div className='container'>
        <Separator className='my-6 hidden lg:block' />

        {/* Ratings */}
        <div className='mb-3 flex items-center gap-2 text-base font-medium md:text-2xl lg:text-4xl'>
          <div className='flex items-center gap-2'>
            <Icon name='Star' size='18' className='fill-black' />
            <span>4.89</span>
          </div>
          <span> · </span>
          <span className='font-medium underline lg:no-underline'>361 reviews</span>
        </div>

        {/* Comments */}
        <div>
          <ScrollArea className='w-full whitespace-nowrap rounded-md md:hidden'>
            <div className='flex w-max space-x-4'>
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className='min-w-60 max-w-80 text-sm font-medium'>
                  <CardContent className='w-full p-3'>
                    <div className='mb-2 flex items-center gap-2'>
                      <Icon name='Star' size={18} className='fill-black' />
                      <span> · </span>
                      <span>3 weeks ago</span>
                    </div>
                    <p className='mb-3 line-clamp-3 whitespace-pre-line text-base font-normal'>
                      The view is as posted in picture, stunning. House was clean and tidy, what I appreciated the most
                      is extremely clear instructions for stress-free
                    </p>
                    <div className='flex items-center gap-3'>
                      <Avatar className='size-8'>
                        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div>
                        <p className='font-semibold'>Nazrin</p>
                        <p className='text-[#6A6A6A]'>1 month on Airbnb</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>

          <div className='hidden gap-4 md:grid lg:grid-cols-2 2xl:grid-cols-3'>
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className='border-none shadow-none'>
                <CardHeader className='mb-2 rounded-2xl p-2'>
                  <CardTitle className='flex items-center gap-2'>
                    <Avatar className='size-8'>
                      <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div>
                      <p className='font-semibold'>Nazrin</p>
                      <p className='text-[#6A6A6A]'>1 month on Airbnb</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className='p-2'>
                  <div className='mb-2 flex items-center gap-2'>
                    <Icon name='Star' size={18} className='fill-black' />
                    <span> · </span>
                    <span>3 weeks ago</span>
                  </div>
                  <p className='mb-3 line-clamp-3 whitespace-pre-line text-base font-normal'>
                    The view is as posted in picture, stunning. House was clean and tidy, what I appreciated the most is
                    extremely clear instructions for stress-free
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className='my-6' />

        {/* Where you’ll be */}
        <div>
          <h3 className='mb-4 text-2xl font-medium lg:mb-7 lg:text-4xl'>{locationPage.where.title}</h3>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.573304912468!2d106.7122688!3d10.8003328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1734592326619!5m2!1sen!2s'
            width='80'
            height='100'
            className='size-full h-[180px] border-none md:h-[400px]'
            allowFullScreen={false}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>

        {/* Meet your Host */}
        <div className='mb-10 md:hidden'>
          <Separator className='my-6' />

          <h3 className='mb-4 text-2xl font-medium lg:mb-7 lg:text-4xl'>{locationPage.meetHost.title}</h3>

          <div className='flex items-center gap-4'>
            <Avatar className='size-14'>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className='flex-1'>
              <p className='font-medium'>Hosted by Comfy Homestay</p>
              <p className='text-sm font-medium text-[#6A6A6A]'>Superhost · 7 years hosting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
