'use client';

import React, { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { defaultContent } from '@/lib/staticContent';
import Icon, { IconName } from '@/components/icon/Icon';
import { User } from '@/types/user.type';
import userService from '@/services/user.service';
import roomService from '@/services/room.service';
import locationService from '@/services/location.service';
import RoomType from '@/types/room.type';
import LocationType from '@/types/location';
import { ResponseBase } from '@/types/common.type';

const { cardOverview, listNewUser, overviewChart } = defaultContent.adminContent.dashboard;

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
  // TODO: Check role
  const [totalOverview, setTotalOverview] = useState({
    locations: 0,
    rooms: 0,
    users: 0,
    admins: 0,
  });

  type ResType = [ResponseBase<User[]>, ResponseBase<RoomType[]>, ResponseBase<LocationType[]>];

  const [listUsers, setListUser] = useState<User[] | []>([]);
  useEffect(() => {
    const getALlUsers = async () => {
      Promise.all([
        userService.getAllUsers().catch((err) => err),
        roomService.getAllRooms().catch((err) => err),
        locationService.getAllLocation().catch((err) => err),
      ]).then((res: ResType) => {
        setListUser(res[0].content.slice(-5));
        let lengthUsers = 0;
        let lengthAdmin = 0;

        res[0].content.forEach((user) => (user.role === 'USER' ? lengthUsers++ : lengthAdmin++));

        setTotalOverview({
          users: lengthUsers,
          admins: lengthAdmin,
          rooms: res[1].content.length,
          locations: res[2].content.length,
        });
      });
    };
    getALlUsers();
  }, []);

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
              <div className='text-2xl font-bold'>{totalOverview[item.id as keyof typeof totalOverview]}</div>
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
              {listUsers.map((item) => (
                <div key={item.id} className='flex items-center'>
                  <Avatar className='h-9 w-9'>
                    <AvatarImage src={item.avatar || ''} alt='Avatar' />
                    <AvatarFallback>
                      <Icon name='CircleUserRound' size='16' />
                    </AvatarFallback>
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
