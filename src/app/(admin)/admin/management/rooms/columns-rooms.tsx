'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
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
import ROUTES from '@/utils/constants/routes';
import { defaultContent } from '@/lib/staticContent';

const { equipments } = defaultContent.commonContent;

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
        {equipments.reduce((pre, value, index) => {
          const isValid = row.original[value.id as keyof typeof row.original];
          if (isValid) pre += equipments.length - 1 === index ? value.title : `${value.title}, `;
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
            <DropdownMenuItem>
              <Link href={ROUTES.ROOM.DETAIL(row.original.id)}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {/* TODO: Delete rooms */}
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
