'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import Link from 'next/link';
import { Booking } from '@/types/booking.type';
import { Button } from '@/components/ui/button';
import Icon from '@/components/icon/Icon';
import { DataTableColumnHeaderProps, DateTableColumnCellProps } from '@/components/table/table.type';
import ROUTES from '@/utils/constants/routes';

// TODO: Change language
export const defaultColumns: ColumnDef<Booking>[] = [
  {
    accessorKey: 'index',
    header: '#',
    cell: ({ row }) => <span>{row.index + 1}</span>,
    enableResizing: false,
  },
  {
    accessorKey: 'maPhong',
    header: 'Room code',
    cell: ({ row }) => (
      <Link className='hover:text-muted-foreground hover:underline' href={ROUTES.ROOM.DETAIL(row.original.id)}>
        {row.original.id}
      </Link>
    ),
  },
  {
    accessorKey: 'ngayDen',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Check in' iconName='ArrowUpDown' />,
    cell: ({ row }) => <DateTableColumnCell row={row} accessorKey='ngayDen' />,
  },
  {
    accessorKey: 'ngayDi',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Check out' iconName='ArrowUpDown' />,
    cell: ({ row }) => <DateTableColumnCell row={row} accessorKey='ngayDi' />,
  },
  {
    accessorKey: 'soLuongKhach',
    header: () => (
      <div className='text-center'>
        <span>Guests</span>
      </div>
    ),
    cell: ({ row }) => <span className='max-w-fit'>{row.original.soLuongKhach}</span>,
  },
];

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  iconName,
  sizeIcon = 20,
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
      {title}
      <Icon size={sizeIcon} name={iconName} className='ml-2' />
    </Button>
  );
}

export const DateTableColumnCell = <TData,>({ row, accessorKey }: DateTableColumnCellProps<TData>) => {
  const date = row.getValue(accessorKey) as string;
  const formatted = format(date, 'dd/MM/yyyy');

  return <div className='text-center font-medium'>{formatted}</div>;
};
