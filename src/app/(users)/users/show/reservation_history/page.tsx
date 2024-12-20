'use client';

import { useEffect, useState } from 'react';
import { defaultColumns } from './columns-reservation';
import { useAuth } from '@/components/AuthProvider';
import { DataTable } from '@/components/table/data-table';
import { defaultContent } from '@/lib/staticContent';
import booKingService from '@/services/booking.service';
import { Booking } from '@/types/booking.type';

const { title, description } = defaultContent.userContent.reservationHistory;

export default function ReservationHistoryPage() {
  const [data, setData] = useState<Booking[] | []>([]);

  const { isLoading, session } = useAuth();

  useEffect(() => {
    async function getData(userId: number) {
      const res = await booKingService.getBookingByUserId(userId);
      setData(res.content);
    }
    if (!isLoading && session) {
      getData(session.user.id);
    }
  }, []);

  return (
    <div className='grid gap-4'>
      {/* Title */}
      <div>
        <h2 className='mb-3 text-3xl font-semibold'>{title}</h2>
        <p className='text-sm'>{description}</p>
      </div>

      {/* Main */}
      <DataTable columns={defaultColumns} data={data} />
    </div>
  );
}
