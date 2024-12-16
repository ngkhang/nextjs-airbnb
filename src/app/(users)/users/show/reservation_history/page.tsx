import { defaultColumns } from './columns-reservation';
import { DataTable } from '@/components/table/data-table';
import { defaultContent } from '@/lib/staticContent';
import { Booking } from '@/types/booking.type';

async function getData(): Promise<Booking[]> {
  // Fetch data from your API here.
  return [
    {
      id: 31897,
      maPhong: 1,
      ngayDen: '2024-08-07T00:00:00',
      ngayDi: '2024-08-14T00:00:00',
      soLuongKhach: 5,
      maNguoiDung: 43317,
    },
    {
      id: 31898,
      maPhong: 6,
      ngayDen: '2024-08-08T00:00:00',
      ngayDi: '2024-08-15T00:00:00',
      soLuongKhach: 3,
      maNguoiDung: 43317,
    },
    {
      id: 31900,
      maPhong: 8,
      ngayDen: '2024-08-23T00:00:00',
      ngayDi: '2024-08-24T00:00:00',
      soLuongKhach: 3,
      maNguoiDung: 43322,
    },
    {
      id: 31953,
      maPhong: 1,
      ngayDen: '2024-09-20T00:00:00',
      ngayDi: '2024-09-25T00:00:00',
      soLuongKhach: 1,
      maNguoiDung: 43374,
    },
    {
      id: 31954,
      maPhong: 9,
      ngayDen: '2024-09-26T00:00:00',
      ngayDi: '2024-10-23T00:00:00',
      soLuongKhach: 1,
      maNguoiDung: 43377,
    },
  ];
}

const { title, description } = defaultContent.userContent.reservationHistory;

export default async function ReservationHistoryPage() {
  const data = await getData();

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
