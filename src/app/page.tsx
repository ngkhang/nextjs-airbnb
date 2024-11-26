import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FooterDefault from '@/components/layout/default/Footer';
import { defaultContent } from '@/lib/staticContent';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const { homeContent } = defaultContent;
const { Inspiration } = homeContent;
export default function Home() {
  return (
    <div className=''>
      {/* Header section */}
      <div>
        <p>Header</p>
      </div>

      {/* List properties */}
      <div>
        <p className='opacity-disabled'>Main List</p>
      </div>

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
