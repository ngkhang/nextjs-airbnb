'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import CardRoom from '@/components/custom/CardRoom';
import locationService from '@/services/location.service';
import roomService from '@/services/room.service';
import LocationType from '@/types/location';
import RoomType from '@/types/room.type';

function LocationPageContent() {
  const searchParams = useSearchParams();
  const locationId = searchParams.get('locationId');

  const [rooms, setRooms] = useState<RoomType[] | []>([]);
  const [locations, setLocations] = useState<LocationType[] | []>([]);

  useEffect(() => {
    const getData = async () => {
      Promise.all([
        roomService.getRoomByLocationId(Number(locationId)).catch((err) => err),
        locationService.getAllLocation().catch((err) => err),
      ]).then((res) => {
        setRooms(res[0].content);
        setLocations(res[1].content);
      });
    };
    getData();
  }, [locationId]);

  return (
    <div className='lg:pt-18 container grid grid-flow-col gap-4 pb-10 pt-4 lg:grid-cols-2 xl:grid-cols-5 xl:gap-6'>
      {/* List room by locationId */}
      <div className='col-span-full lg:col-span-1 xl:col-span-3'>
        <div className='mb-4'>
          <h3 className='font-semibold'>{`Over ${rooms.length} places`}</h3>
        </div>

        {rooms && (
          <div className='grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3 xl:gap-10'>
            {rooms.map((room) => (
              <CardRoom key={room.id} room={room} locations={locations} />
            ))}
          </div>
        )}

        {!rooms && <p>Not found</p>}
      </div>

      {/* Embed a map */}
      <div className='hidden lg:col-span-1 lg:block xl:col-span-2'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15676.573304912468!2d106.7122688!3d10.8003328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1734592326619!5m2!1sen!2s'
          width='80'
          height='100'
          className='size-full border-none'
          allowFullScreen={false}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>
    </div>
  );
}

export default function LocationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LocationPageContent />
    </Suspense>
  );
}
