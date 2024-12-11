import { ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';
import { DropdownSettingsUser } from './dropdown-setting';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { defaultContent } from '@/lib/staticContent';
import Icon, { IconName } from '@/components/icon/Icon';

interface Props {
  params: { userId: string };
}
const { shortOverview, shareInfo, confirmed, accountSettings } = defaultContent.userContent;

export default function Page({ params }: Props) {
  return (
    <section className='mx-auto grid max-w-[380px] grid-rows-1 gap-6 lg:flex lg:max-w-[1162px] lg:gap-14'>
      {/* Left section */}
      <div className='lg:relative lg:w-[350px]'>
        <div className='lg:sticky lg:top-[120px] lg:grid lg:gap-6'>
          {/* Short card Info */}
          <Card className='grid grid-cols-5 gap-4 p-5 shadow-xl'>
            <CardHeader className='col-span-3 flex flex-col items-center p-0'>
              <div className='relative mb-5 px-4'>
                <Avatar className='size-fit'>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className='absolute bottom-2 right-6 rounded-full bg-primary p-1 lg:bottom-0 lg:p-2'>
                  <ShieldCheck size={21} className='text-white' />
                </div>
              </div>
              <CardTitle className='text-3xl font-semibold'>Khang</CardTitle>
              <CardDescription>{shortOverview.typeAccount}</CardDescription>
              <DropdownSettingsUser itemsSetting={accountSettings} />
            </CardHeader>
            <CardContent className='col-span-2 p-0'>
              {shortOverview.items.map((item) => (
                <div key={item.key} className='space-y-1'>
                  {item.key !== 0 && <Separator className='my-4' />}
                  <div className='flex items-center'>
                    <span className='text-2xl font-semibold'>{item.description}</span>
                    {item.icon && <Star className='ml-1 fill-black' size={20} />}
                  </div>
                  <p className='text-sm font-medium text-muted-foreground'>{item.title}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Confirmed card */}
          <Card className='hidden gap-4 p-5 lg:grid'>
            <CardHeader className='p-0'>
              <CardTitle className='text-2xl font-semibold'>{`Khang${confirmed.title}`}</CardTitle>
            </CardHeader>
            <CardContent className='p-0'>
              <ul className='grid gap-3'>
                {confirmed.items.map(({ key, title }) => (
                  <li key={key} className='flex items-center gap-3'>
                    <Icon name='Check' />
                    <span className='flex-1'>{title}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className='hidden items-center lg:flex'>
            <Icon name='Flag' size={20} className='mr-2 fill-black' />
            <Link className='font-medium underline' href=''>
              Report this profile
            </Link>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className='lg:flex-1'>
        <div className='grid gap-8'>
          {/* Title section */}
          <div className='hidden lg:block'>
            <h2 className='text-3xl font-semibold'>About Name</h2>
          </div>

          {/* Shared Info section */}
          <ul className='grid gap-4 xl:grid-cols-2'>
            {shareInfo.ask.map((ask) => (
              <li key={ask.key} className='flex items-center gap-3'>
                <Icon name={ask.icon as IconName} size={24} />
                <span className='flex-1 text-base'>{`${ask.title}: ${ask.description}`}</span>
              </li>
            ))}
          </ul>

          {/* About section */}
          <p className='whitespace-pre-line'>{shareInfo.about}</p>
        </div>

        <Separator className='my-10' />

        {/* Verify account */}
        <div>
          <h3 className='mb-5 text-xl font-semibold'>{`Khang's ${confirmed.title}`}</h3>

          <ul className='grid gap-3'>
            {confirmed.items.map(({ key, title }) => (
              <li key={key} className='flex items-center gap-3'>
                <Icon name='Check' />
                <span className='flex-1'>{title}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className='lg:hidden'>
          <Separator className='my-10' />
          <div className='flex items-center'>
            <Icon name='Flag' size={20} className='mr-2 fill-black' />
            <Link className='font-medium underline' href=''>
              Report this profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
