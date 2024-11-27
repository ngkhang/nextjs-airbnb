import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FooterDefault from '@/components/layout/default/Footer';
import { defaultContent } from '@/lib/staticContent';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn, formatCurrency } from '@/lib/utils';
import fakeDataHome from '@/fakeData/fakeHome.json';
import Icon from '@/components/icon/Icons';

const { PropertiesData, ExploreData } = fakeDataHome;

const keysLocal = ['tenViTri', 'tinhThanh', 'quocGia'];

interface LocalKey {
  [key: string]: string;
}

const fakeLocal: LocalKey = {
  tenViTri: 'Quận 1',
  tinhThanh: 'Hồ Chí Minh',
  quocGia: 'Việt Nam',
  hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/vt1.jpg',
};

const infoHome = [
  {
    key: 'khach',
    title: 'khách',
  },
  {
    key: 'phongNgu',
    title: 'phòng ngủ',
  },
  {
    key: 'giuong',
    title: 'giường',
  },
  {
    key: 'phongTam',
    title: 'phòng tắm',
  },
];

const { homeContent } = defaultContent;
const { Inspiration, Explore } = homeContent;

export default function Home() {
  return (
    <div className=''>
      {/* Header section */}
      <div>
        <p>Header</p>
      </div>

      {/* List properties */}
      <section className='container mb-8 mt-6'>
        <div className='grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4 xl:gap-8 3xl:grid-cols-5 4xl:grid-cols-6'>
          {PropertiesData.map((item) => (
            <Card key={item.id} className={cn('w-full rounded-none border-none p-0 shadow-none')}>
              {/* Card Header */}
              <CardHeader
                className='relative mb-3 size-56 w-full rounded-2xl bg-left-bottom bg-no-repeat p-0 hover:opacity-80 lg:size-64 lg:w-full'
                style={{ backgroundImage: `url(${item.hinhAnh})` }}
              >
                <Icon
                  name='Heart'
                  className='absolute right-3 top-3 size-5 fill-black/50 stroke-white stroke-[1.5rem] hover:scale-125'
                />
              </CardHeader>

              {/* Card content */}
              <CardContent className='p-0'>
                <div className='mb-2 flex items-center justify-between text-[#6A6A6A]'>
                  <p className='mr-2 truncate font-semibold capitalize text-[#222222]'>{item.tenPhong}</p>
                  <div className='flex items-center'>
                    <Icon name='Star' className='mr-1' />
                    <span>4.7</span>
                  </div>
                </div>

                <div className='mb-1 flex items-stretch text-sm text-[#6A6A6A]'>
                  {keysLocal.map((key, index) => (
                    <div key={index} className='flex items-center'>
                      <span>{fakeLocal[key]}</span>
                      {keysLocal.length - 1 !== index && (
                        <Separator orientation='vertical' className='mx-1 bg-[#6A6A6A]' />
                      )}
                    </div>
                  ))}
                </div>

                <div className='mb-1 grid grid-cols-2 grid-rows-2 gap-1 text-sm text-[#6A6A6A]'>
                  {infoHome.map((info, index) => (
                    <span key={index}>{`· ${item[info.key as keyof typeof item]} ${info.title}`}</span>
                  ))}
                </div>
                <p className='mb-2 truncate text-sm'>{item.moTa}</p>

                <div className='flex items-center text-sm'>
                  <Icon name='Vnd' />
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
          <h3 className='mb-2 text-[22px] font-bold text-[#222222]'>{Explore.title}</h3>
          <p className='text-base text-[#6A6A6A]'>{Explore.description}</p>
        </div>

        <div className='grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-5'>
          {ExploreData.map((item) => (
            <Card
              key={item.id}
              className='grid h-full w-full grid-cols-5 justify-items-start gap-2 border-none shadow-none'
            >
              <CardHeader className='col-span-2 col-start-1 p-0'>
                <Image
                  width={100}
                  height={100}
                  alt={item.tenViTri}
                  className='aspect-square h-full w-full rounded-2xl'
                  quality={75}
                  src={item.hinhAnh}
                />
              </CardHeader>
              <CardContent className='col-span-3 col-start-3 p-0 center'>
                <div className='text-sm'>
                  <p className='font-semibold'>{item.tenViTri}</p>
                  <p className='text-xs text-[#6A6A6A]'>{`${item.tinhThanh}, ${item.quocGia}`}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Inspiration section */}
      <div className='container bg-[#F7F7F7] py-10'>
        <h3 className='mb-2 text-[22px] font-bold text-[#222222]'>{Inspiration.title}</h3>
        <Tabs defaultValue={Inspiration.items[0].title} className=''>
          <TabsList className='h-fit w-full rounded-none bg-inherit px-0'>
            <Carousel
              className='w-full border-b-2 border-[#DDDDDD]'
              opts={{
                duration: 10,
              }}
            >
              <CarouselContent className='-ml-1'>
                {Inspiration.items.map((item) => (
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
              {/* TODO: Change arro icon and hidden */}
              <CarouselPrevious className='-left-6 rounded-none border-none bg-transparent shadow-none' />
              <CarouselNext className='-right-6 rounded-none border-none bg-transparent shadow-none' />
            </Carousel>
          </TabsList>
          {Inspiration.items.map((tab) => (
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

      {/* Footer section */}
      <FooterDefault />
    </div>
  );
}
