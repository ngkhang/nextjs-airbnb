import Image from 'next/image';
import Link from 'next/link';
import isUrl from 'is-url';
import { defaultContent } from '@/lib/staticContent';
import { cn, formatCurrency } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FooterDefault from '@/components/default/Footer';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import UserHeader from '@/components/layout/user/user-header/UserHeader';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import roomService from '@/services/room.service';
import locationService from '@/services/location.service';
import { keyLocation } from '@/utils/constants/common';
// FIXME: Icon component
import Icons from '@/components/icon/Icons';
import Icon from '@/components/icon/Icon';
import ROUTES from '@/utils/constants/routes';
const { inspiration, explore } = defaultContent.homeContent;
const { categories, infoRooms } = defaultContent.commonContent;

export default async function Home() {
  const rooms = await roomService.getAllRooms();

  const locations = await locationService.getAllLocation();

  const locationInfo = (id: number) => locations.content.filter((item) => item.id === id);

  return (
    <div className=''>
      {/* Header section */}
      <div className=''>
        <div className='container'>
          <UserHeader />
        </div>

        <Separator className='mb-3 hidden md:block' />

        <section className='grid grid-flow-col grid-cols-5 shadow-xl md:container xl:grid-cols-6'>
          <Carousel className='col-span-full md:col-span-2 lg:col-span-3 xl:col-span-4' opts={{ duration: 25 }}>
            <CarouselContent className='mx-2'>
              {categories.map((item) => (
                <CarouselItem
                  key={item.key}
                  data-state='active'
                  className={cn(
                    'flex basis-auto flex-col items-center border-b-2 border-transparent px-3 py-2 text-[#6A6A6A] opacity-60 hover:opacity-85',
                    item.key === 0 &&
                      'opacity-100 data-[state=active]:border-[#222222] data-[state=active]:text-[#222222]'
                  )}
                >
                  <span className='mb-2 size-6'>
                    <Image src={item.icon} alt={item.title} width={50} height={50} className='w-full' quality={75} />
                  </span>
                  <span className='text-xs font-semibold'>{item.title}</span>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className='ml-4 hidden fill-black shadow-none md:flex' />
            <CarouselNext className='mr-4 hidden fill-black shadow-none md:flex' />
          </Carousel>

          <div className='hidden justify-end space-x-4 py-2 text-sm font-medium md:col-span-3 md:flex lg:col-span-2'>
            <Link href='/' className='flex items-center space-x-2 rounded-2xl border px-4 py-0'>
              <Icon name='SlidersHorizontal' />
              <Icon name='SlidersHorizontal' />
              <span>Filter</span>
            </Link>

            <Link href='/' className='flex items-center space-x-2 rounded-2xl border px-4 py-0'>
              <Label htmlFor='airplane-mode' className=''>
                Display total before taxes
              </Label>
              <Switch className='h-6 data-[state=checked]:bg-[#6A6A6A]' />
            </Link>
          </div>
        </section>
      </div>

      {/* List properties */}
      <section className='container mb-8 mt-6'>
        <div className='grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4 xl:gap-8 3xl:grid-cols-5 4xl:grid-cols-6'>
          {rooms.content &&
            rooms.content.map((item) => (
              <Card key={item.id} className={cn('w-full rounded-none border-none p-0 shadow-none')}>
                {/* Card Header */}
                <Link href={ROUTES.ROOM.DETAIL(item.id)} className='block overflow-hidden rounded-2xl'>
                  <CardHeader
                    className='relative mb-3 size-56 w-full rounded-2xl bg-left-bottom bg-no-repeat p-0 duration-300 hover:scale-125 hover:opacity-80 lg:size-64 lg:w-full'
                    style={{ backgroundImage: `url(${item.hinhAnh})` }}
                  >
                    <Icon name='Heart' color='#fff' className='absolute right-3 top-3 fill-black/50 hover:scale-125' />
                  </CardHeader>
                </Link>

                {/* Card content */}
                <CardContent className='p-0'>
                  <div className='mb-2 flex items-center justify-between text-[#6A6A6A]'>
                    <Link
                      href={ROUTES.ROOM.DETAIL(item.id)}
                      className='mr-2 truncate font-semibold capitalize text-[#222222]'
                    >
                      {item.tenPhong}
                    </Link>
                    <div className='flex items-center'>
                      <Icon name='Star' size='20' fill='#000' className='mr-1' />
                      <span>4.7</span>
                    </div>
                  </div>

                  <div className='mb-1 flex items-stretch space-x-2 text-sm text-[#6A6A6A]'>
                    {keyLocation.map((location, index) => (
                      <div key={index} className='flex h-5 items-center space-x-2 text-sm'>
                        {locationInfo(item.maViTri)[0] && <span>{locationInfo(item.maViTri)[0][location]}</span>}
                        {keyLocation.length - 1 !== index && (
                          <Separator orientation='vertical' className='bg-[#6A6A6A]' />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className='mb-2 grid grid-cols-2 grid-rows-2 gap-1 text-sm text-[#6A6A6A]'>
                    {infoRooms.map((info) => (
                      <span key={info.key}>{`· ${item[info.id as keyof typeof item]} ${info.title}`}</span>
                    ))}
                  </div>
                  <p className='mb-2 hidden truncate text-sm'>{item.moTa}</p>

                  <div className='flex items-center text-sm'>
                    <Icons className='size-5' name='Vnd' />
                    {/* <Vnd /> */}
                    <span className='mr-1 text-lg font-semibold'>{formatCurrency(+item.giaTien)}</span>
                    <span>đêm</span>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </section>

      {/* Explore section */}
      <section className='container mb-8 mt-6'>
        <div className='mb-4'>
          <h3 className='mb-2 text-3xl font-bold text-[#222222]'>{explore.title}</h3>
          <p className='text-base text-[#6A6A6A]'>{explore.description}</p>
        </div>

        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5 xl:grid-cols-6'>
          {locations.content &&
            locations.content.map((item) => (
              <Link key={item.id} href={ROUTES.ROOM.LOCATION(item.id)}>
                <Card className='grid h-full w-full grid-cols-5 justify-items-start gap-2 border-none shadow-none'>
                  <CardHeader className='col-span-2 col-start-1 overflow-hidden rounded-2xl p-0'>
                    {isUrl(item.hinhAnh) ? (
                      <Image
                        loading='lazy'
                        width={50}
                        height={50}
                        src={item.hinhAnh}
                        alt={item.tenViTri}
                        className='aspect-square size-full rounded-2xl hover:scale-110'
                        quality={75}
                      />
                    ) : (
                      <div className='aspect-square size-full rounded-2xl bg-[#EEEEEE] center'>
                        <Icon name='ImageOff' size='30' />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className='col-span-3 col-start-3 p-0 center'>
                    <div className='text-sm'>
                      <p className='font-semibold'>{item.tenViTri}</p>
                      <p className='text-xs text-[#6A6A6A]'>{`${item.tinhThanh}, ${item.quocGia}`}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          {locations.content &&
            locations.content.map((item) => (
              <Link key={item.id} href={ROUTES.ROOM.LOCATION(item.id)}>
                <Card className='grid h-full w-full grid-cols-5 justify-items-start gap-2 border-none shadow-none'>
                  <CardHeader className='col-span-2 col-start-1 overflow-hidden rounded-2xl p-0'>
                    {isUrl(item.hinhAnh) ? (
                      <Image
                        loading='lazy'
                        width={50}
                        height={50}
                        src={item.hinhAnh}
                        alt={item.tenViTri}
                        className='aspect-square size-full rounded-2xl hover:scale-110'
                        quality={75}
                      />
                    ) : (
                      <div className='aspect-square size-full rounded-2xl bg-[#EEEEEE] center'>
                        <Icon name='ImageOff' size='30' />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className='col-span-3 col-start-3 p-0 center'>
                    <div className='text-sm'>
                      <p className='font-semibold'>{item.tenViTri}</p>
                      <p className='text-xs text-[#6A6A6A]'>{`${item.tinhThanh}, ${item.quocGia}`}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
        </div>
      </section>

      <div className='container grid-cols-6 gap-6 bg-[#F7F7F7] 4xl:grid'>
        <div className='col-span-4 col-start-2'>
          {/* Inspiration section */}
          <div className='py-10'>
            <h3 className='mb-2 text-3xl font-bold text-[#222222]'>{inspiration.title}</h3>
            <Tabs defaultValue={inspiration.items[0].title} className=''>
              <TabsList className='h-fit w-full rounded-none bg-inherit px-0'>
                <Carousel
                  className='w-full border-b-2 border-[#DDDDDD]'
                  opts={{
                    duration: 10,
                  }}
                >
                  <CarouselContent className='-ml-1'>
                    {inspiration.items.map((item) => (
                      <CarouselItem key={item.key} className='basis-auto pl-0'>
                        <TabsTrigger
                          key={item.key}
                          value={item.title}
                          className='rounded-none border-b-2 border-transparent px-4 py-2 text-[#6A6A6A] data-[state=active]:border-[#222222] data-[state=active]:bg-inherit data-[state=active]:text-[#222222] data-[state=active]:shadow-none'
                        >
                          {item.title}
                        </TabsTrigger>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {/* NOTE: Change arrow icon and hidden */}
                  <CarouselPrevious className='-left-6 rounded-none border-none bg-transparent shadow-none' />
                  <CarouselNext className='-right-6 rounded-none border-none bg-transparent shadow-none' />
                </Carousel>
              </TabsList>
              {inspiration.items.map((tab) => (
                <TabsContent key={tab.key} value={tab.title} className='mt-0 pt-8'>
                  <ul className='grid grid-cols-2 gap-2 gap-y-6 lg:grid-cols-3 xl:grid-cols-6'>
                    {tab.navLinks.map((item) => (
                      <li key={item.key} className='cursor-pointer text-sm'>
                        {/* TODO: Add "Show more" button */}
                        <p className='line-clamp-1 font-medium'>{item.title}</p>
                        <p className='line-clamp-1 text-[#6A6A6A]'>{item.description}</p>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <Separator className='h-[2px]' />

          {/* Footer component */}
          <FooterDefault />
        </div>
      </div>
    </div>
  );
}
