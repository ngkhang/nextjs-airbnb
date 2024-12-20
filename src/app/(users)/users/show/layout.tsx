'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DropdownSettingsUser } from './dropdown-setting';
import Icon from '@/components/icon/Icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { defaultContent } from '@/lib/staticContent';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/components/AuthProvider';
import { User } from '@/types/user.type';

interface Props {
  children: React.ReactNode;
}

const { shortOverview, confirmed, accountSettings, report } = defaultContent.userContent.shared;

export default function DashboardUserLayout({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const { isLoading, session } = useAuth();

  useEffect(() => {
    if (!isLoading && session) setUser(session.user);
  }, [isLoading, session]);
  return (
    <div className='grid grid-rows-1 gap-6 lg:flex lg:gap-14'>
      {/* Left section */}
      <div className='lg:relative lg:w-[350px]'>
        {user && (
          <div className='lg:sticky lg:top-[120px] lg:grid lg:gap-6'>
            {/* Short card Info */}
            <Card className='grid grid-cols-5 gap-4 p-5 shadow-xl'>
              <CardHeader className='col-span-3 flex flex-col items-center p-0'>
                <div className='relative mb-5 px-4'>
                  <Avatar className='size-fit'>
                    {user && user.avatar ? (
                      <>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>CN</AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src='' />
                        <AvatarFallback>
                          <Icon name='CircleUserRound' size='18' />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>
                  <div className='absolute bottom-2 right-6 rounded-full bg-primary p-1 lg:bottom-0 lg:p-2'>
                    <Icon name='ShieldCheck' size={21} className='text-white' />
                  </div>
                </div>
                <CardTitle className='text-3xl font-semibold'>{user.name.split(' ').slice(-1).toString()}</CardTitle>
                <CardDescription>{shortOverview.typeUser}</CardDescription>

                <DropdownSettingsUser user={user} itemsSetting={accountSettings} side='right' />
              </CardHeader>

              <CardContent className='col-span-2 p-0'>
                {shortOverview.items.map((item) => (
                  <div key={item.key} className='space-y-1'>
                    {item.key !== 0 && <Separator className='my-4' />}
                    <div className='flex items-center'>
                      <span className='text-2xl font-semibold'>{item.description}</span>
                      {item.icon && <Icon name='Star' className='ml-1 fill-black' size={20} />}
                    </div>
                    <p className='text-sm font-medium text-muted-foreground'>{item.title}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Confirmed card */}
            <Card className='hidden gap-4 p-5 lg:grid'>
              <CardHeader className='p-0'>
                <CardTitle className='text-2xl font-semibold'>{`${user.name}${confirmed.title}`}</CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                <ul className='grid gap-3'>
                  {confirmed.items.map(({ key, title, id }) => (
                    <li key={key} className='flex items-center gap-3'>
                      <Icon name={user[id as keyof typeof user] ? 'Check' : 'Dot'} />
                      <span className='flex-1'>{title}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className='hidden items-center lg:flex'>
              <Icon name='Flag' size={20} className='mr-2 fill-black' />
              <Link className='font-medium underline' href={report.url}>
                {report.title}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Right section */}
      <div className='lg:flex-1'>{children}</div>
    </div>
  );
}
