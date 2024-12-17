'use client';

import Link from 'next/link';
import Search from './Search';
import Icon, { IconName } from '@/components/icon/Icons';
import { defaultContent } from '@/lib/staticContent';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const { logo, sub } = defaultContent.commonContent.header;

interface Props {
  hasSearchForm?: boolean;
  isShowLogo?: boolean;
}

const UserHeader = ({ hasSearchForm = true, isShowLogo = false }: Props) => (
  <header>
    <div className={cn('grid-cols-7 gap-4 py-3 md:grid md:py-5', hasSearchForm ? 'grid-rows-3' : 'grid-rows-1')}>
      {/* Logo section */}
      <div className={cn('col-start-1 col-end-2 row-start-1 self-center', !isShowLogo && 'hidden md:block')}>
        <Link href={logo.url} className='inline-block size-8'>
          <Icon name={logo.alt as IconName} />
        </Link>
      </div>

      {/* Search section */}
      {hasSearchForm && (
        <div className='col-span-full row-span-2 row-start-2'>
          <Search />
        </div>
      )}

      {/* Sub section */}
      <div className='col-start-5 col-end-8 row-start-1 hidden items-center justify-end space-x-2 md:flex'>
        <div className='flex items-center'>
          <Button
            className='rounded-full border-none px-5 py-3 text-sm font-semibold text-[#6A6A6A] shadow-none hover:text-inherit'
            variant='outline'
          >
            {sub.host.title}
          </Button>
          <Button className='size-10 rounded-full border-none shadow-none hover:text-[#6A6A6A]' variant='outline'>
            <Icon size={24} name={sub.lang.icon as IconName} />
          </Button>
        </div>
        <Popover onOpenChange={() => {}}>
          <PopoverTrigger asChild>
            <Button variant='outline' className='flex h-fit items-center rounded-full px-4'>
              <Icon name='Bars' className='size-10' />
              <Avatar className='h-full w-auto'>
                <AvatarImage className='size-6' src='./assets/images/avatar-blank.jpg' />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </PopoverTrigger>
          <PopoverContent align='end' className='w-full px-0'>
            <div className='grid gap-2'>
              {sub.profile.top.map((profile) => (
                <div key={profile.key}>
                  <Link className='inline-block w-full py-2 pl-6 pr-16 hover:bg-[#EBEBEB]' href={profile.url}>
                    {profile.title}
                  </Link>
                </div>
              ))}
              <Separator className='h-[1px]' />
              {sub.profile.subs.map((sub) => (
                <div key={sub.key}>
                  <Link className='inline-block w-full py-2 pl-6 pr-16 hover:bg-[#EBEBEB]' href={sub.url}>
                    {sub.title}
                  </Link>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </header>
);

export default UserHeader;
