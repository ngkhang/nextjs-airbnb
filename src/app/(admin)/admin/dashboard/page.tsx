'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { useAuth } from '@/components/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { defaultContent } from '@/lib/staticContent';
import Icon, { IconName } from '@/components/icon/Icon';

const { cardOverview, listNewUser, overviewChart } = defaultContent.adminContent.dashboard;

// TODO: Call API get list user
const listUserResponse = [
  {
    key: 0,
    id: 123,
    email: 'olivia.martin@email.com',
    name: 'Olivia Martin',
    avatar: '/avatars/01.png',
  },
  {
    key: 1,
    id: 123,
    email: 'olivia.martin@email.com',
    name: 'Olivia Martin',
    avatar: '/avatars/01.png',
  },
  {
    key: 2,
    id: 123,
    email: 'olivia.martin@email.com',
    name: 'Olivia Martin',
    avatar: '/avatars/01.png',
  },
  {
    key: 3,
    id: 123,
    email: 'olivia.martin@email.com',
    name: 'Olivia Martin',
    avatar: '/avatars/01.png',
  },
  {
    key: 4,
    id: 123,
    email: 'olivia.martin@email.com',
    name: 'Olivia Martin',
    avatar: '/avatars/01.png',
  },
];

const data = [
  {
    name: 'Jan',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Feb',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Mar',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Apr',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'May',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jun',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Jul',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Aug',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Sep',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Oct',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Nov',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: 'Dec',
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { isLoading, session, hasRole } = useAuth();

  // useEffect(() => {
  //   // Check useAuth load completed
  //   if (!isLoading) {
  //     // Check Authen login and Author based on Role user
  //     if (!session || !hasRole(['USER'])) {
  //       router.push('/unauthorize');
  //       return;
  //     }
  //   }
  // }, [session, router, isLoading, hasRole]);

  return (
    <div className='flex flex-1 flex-col gap-4 p-8 pt-0'>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {cardOverview.map((item) => (
          <Card key={item.key}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>{item.title}</CardTitle>
              <Icon name={item.icon as IconName} />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{item.content}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
        <Card className='lg:col-span-4'>
          <CardHeader>
            <CardTitle>{overviewChart.title}</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <ResponsiveContainer width='100%' height={350}>
              <BarChart data={data}>
                <XAxis dataKey='name' stroke='#888888' fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke='#888888'
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey='total' fill='currentColor' radius={[4, 4, 0, 0]} className='fill-chart-2' />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className='lg:col-span-3'>
          <CardHeader>
            <CardTitle>{listNewUser.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-8'>
              {listUserResponse.map((item) => (
                <div key={item.key} className='flex items-center'>
                  <Avatar className='h-9 w-9'>
                    <AvatarImage src={item.avatar} alt='Avatar' />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className='ml-4 space-y-1 overflow-hidden'>
                    <p className='text-sm font-medium leading-none'>{item.name}</p>
                    <p className='truncate text-sm text-muted-foreground'>{item.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
