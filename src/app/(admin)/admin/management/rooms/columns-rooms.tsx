'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import Icon from '@/components/icon/Icon';
import { DataTableColumnHeaderProps } from '@/components/table/table.type';
import { formatCurrency } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import RoomType from '@/types/room.type';

const serviceRooms = [
  {
    key: 'mayGiat',
    title: 'Máy giặt',
  },
  {
    key: 'banLa',
    title: 'Bàn là',
  },
  {
    key: 'tivi',
    title: 'Tivi',
  },
  {
    key: 'dieuHoa',
    title: 'Điều hòa',
  },
  {
    key: 'wifi',
    title: 'Wifi',
  },
  {
    key: 'bep',
    title: 'Bếp',
  },
  {
    key: 'doXe',
    title: 'Đỗ xe',
  },
  {
    key: 'hoBoi',
    title: 'Hồ bơi',
  },
  {
    key: 'banUi',
    title: 'Bàn ủi',
  },
] as const;

export const columns: ColumnDef<RoomType>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' iconName='ArrowUpDown' />,
    cell: ({ row }) => <span>{row.original.id}</span>,
    enableResizing: false,
  },
  {
    accessorKey: 'tenPhong',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Room name' iconName='ArrowUpDown' />,
    cell: ({ row }) => <span>{row.original.tenPhong}</span>,
  },
  {
    accessorKey: 'giaTien',
    header: 'Price',
    cell: ({ row }) => <span>{formatCurrency(row.original.giaTien)}</span>,
  },
  {
    accessorKey: 'khach',
    header: 'Guests',
    cell: ({ row }) => <span>{row.original.khach}</span>,
  },
  {
    accessorKey: 'info',
    header: 'Info',
    cell: ({ row }) => (
      <ul className='grid gap-2'>
        <li>Phòng ngủ: {row.original.phongNgu}</li>
        <li>Phòng tắm: {row.original.phongTam}</li>
        <li>Giường: {row.original.giuong}</li>
      </ul>
    ),
  },
  {
    accessorKey: 'service',
    header: 'Service',
    cell: ({ row }) => (
      <p className=''>
        {serviceRooms.reduce((pre, value, index) => {
          const isValid = row.original[value.key];
          if (isValid) pre += serviceRooms.length - 1 === index ? value.title : `${value.title}, `;
          return pre;
        }, '')}
      </p>
    ),
  },
  {
    accessorKey: 'action',
    header: '',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-label='Open menu' variant='ghost' className='flex size-8 p-0 data-[state=open]:bg-muted'>
            <Icon name='Ellipsis' size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=''>
          <DropdownMenuGroup>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
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
