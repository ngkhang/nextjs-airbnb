'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Search from './Search';
import Icons, { IconName } from '@/components/icon/Icons';
import { defaultContent } from '@/lib/staticContent';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/AuthProvider';
import { User } from '@/types/user.type';
import authService from '@/services/auth.service';
import Icon from '@/components/icon/Icon';
import ROUTES from '@/utils/constants/routes';

const { logo, sub } = defaultContent.commonContent.header;

interface Props {
  hasSearchForm?: boolean;
  isShowLogo?: boolean;
}

export default function UserHeader({ hasSearchForm = true, isShowLogo = false }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const { isLoading, session } = useAuth();
  const handleLogout = async () => {
    await authService.logout();
    router.push(ROUTES.HOME.ROOT);
  };

  useEffect(() => {
    if (!isLoading) {
      if (session) setUser(session.user);
    }
  }, [isLoading, session]);

  return (
    <header>
      <div className={cn('grid-cols-7 gap-4 py-3 md:grid md:py-5', hasSearchForm ? 'grid-rows-3' : 'grid-rows-1')}>
        {/* Logo section */}
        <div className={cn('col-start-1 col-end-2 row-start-1 self-center', !isShowLogo && 'hidden md:block')}>
          <Link href={logo.url} className='inline-block size-8'>
            <Icons name={logo.alt as IconName} />
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
              <Icon size={24} name='Globe' />
            </Button>
          </div>
          <Popover onOpenChange={() => {}}>
            <PopoverTrigger asChild>
              <Button variant='outline' className='flex h-fit items-center rounded-full px-4'>
                <Icon name='Menu' />
                <Avatar className='h-full w-auto'>
                  {user && user.avatar ? (
                    <>
                      <AvatarImage className='size-6' src={user.avatar} />
                      <AvatarFallback>CN</AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage className='size-6' src={'./assets/images/avatar-blank.jpg'} />
                      <AvatarFallback>
                        <Icon name='CircleUserRound' size='18' />
                      </AvatarFallback>
                    </>
                  )}
                </Avatar>
              </Button>
            </PopoverTrigger>
            <PopoverContent align='end' className='w-full px-0'>
              <div className='grid gap-2'>
                {user ? (
                  <>
                    {sub.profile.logged.top.map((profile) => (
                      <div key={profile.key}>
                        <Link
                          className='inline-block w-full py-2 pl-6 pr-16 hover:bg-[#EBEBEB]'
                          href={`${ROUTES.USER.DASHBOARD}/${user.id}`}
                        >
                          {profile.title}
                        </Link>
                      </div>
                    ))}
                    <Separator className='h-[1px]' />
                    {sub.profile.logged.bottom.map((profile) => (
                      <div key={profile.key}>
                        <Link className='inline-block w-full py-2 pl-6 pr-16 hover:bg-[#EBEBEB]' href={profile.url}>
                          {profile.title}
                        </Link>
                      </div>
                    ))}
                    <Separator className='h-[1px]' />
                    <Button
                      type='button'
                      variant='outline'
                      className='justify-start rounded-none border-none py-2 pl-6 pr-16 text-base font-normal shadow-none hover:bg-[#EBEBEB] hover:text-inherit'
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    {sub.profile.unLogin.top.map((profile) => (
                      <div key={profile.key}>
                        <Link className='inline-block w-full py-2 pl-6 pr-16 hover:bg-[#EBEBEB]' href={profile.url}>
                          {profile.title}
                        </Link>
                      </div>
                    ))}
                    <Separator className='h-[1px]' />
                    {sub.profile.unLogin.bottom.map((profile) => (
                      <div key={profile.key}>
                        <Link className='inline-block w-full py-2 pl-6 pr-16 hover:bg-[#EBEBEB]' href={profile.url}>
                          {profile.title}
                        </Link>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
