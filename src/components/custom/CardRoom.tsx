import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '../ui/card';

import { Separator } from '../ui/separator';
import RoomType from '@/types/room.type';
import { cn, formatCurrency } from '@/lib/utils';
import ROUTES from '@/utils/constants/routes';
import { keyLocation } from '@/utils/constants/common';
import { defaultContent } from '@/lib/staticContent';
import LocationType from '@/types/location';
import Icons from '@/components/icon/Icons';
import Icon from '@/components/icon/Icon';

const { infoRooms } = defaultContent.commonContent;

interface CardRoomProps {
  room: RoomType;
  locations: LocationType[];
}

export default function CardRoom({ room, locations }: CardRoomProps) {
  const locationInfo = (id: number) => locations.filter((item) => item.id === id);

  return (
    <Card key={room.id} className={cn('w-full rounded-none border-none p-0 shadow-none')}>
      {/* Card Header */}
      <Link href={ROUTES.ROOM.DETAIL(room.id)} className='block overflow-hidden rounded-2xl'>
        <CardHeader
          className='relative mb-3 size-56 w-full rounded-2xl bg-left-bottom bg-no-repeat p-0 duration-300 hover:scale-125 hover:opacity-80 lg:size-64 lg:w-full'
          style={{ backgroundImage: `url(${room.hinhAnh})` }}
        >
          <Icon name='Heart' color='#fff' className='absolute right-3 top-3 fill-black/50 hover:scale-125' />
        </CardHeader>
      </Link>

      {/* Card content */}
      <CardContent className='p-0'>
        <div className='mb-2 flex items-center justify-between text-[#6A6A6A]'>
          <Link href={ROUTES.ROOM.DETAIL(room.id)} className='mr-2 truncate font-semibold capitalize text-[#222222]'>
            {room.tenPhong}
          </Link>
          <div className='flex items-center'>
            <Icon name='Star' size='20' fill='#000' className='mr-1' />
            <span>4.7</span>
          </div>
        </div>

        <div className='mb-1 flex items-stretch space-x-2 text-sm text-[#6A6A6A]'>
          {keyLocation.map((location, index) => (
            <div key={index} className='flex h-5 items-center space-x-2 text-sm'>
              {locationInfo(room.maViTri)[0] && <span>{locationInfo(room.maViTri)[0][location]}</span>}
              {keyLocation.length - 1 !== index && <Separator orientation='vertical' className='bg-[#6A6A6A]' />}
            </div>
          ))}
        </div>

        <div className='mb-2 grid grid-cols-2 grid-rows-2 gap-1 text-sm text-[#6A6A6A]'>
          {infoRooms.map((info) => (
            <span key={info.key}>{`· ${room[info.id as keyof typeof room]} ${info.title}`}</span>
          ))}
        </div>
        <p className='mb-2 hidden truncate text-sm'>{room.moTa}</p>

        <div className='flex items-center text-sm'>
          <Icons className='size-5' name='Vnd' />
          {/* <Vnd /> */}
          <span className='mr-1 text-lg font-semibold'>{formatCurrency(+room.giaTien)}</span>
          <span>đêm</span>
        </div>
      </CardContent>
    </Card>
  );
}
