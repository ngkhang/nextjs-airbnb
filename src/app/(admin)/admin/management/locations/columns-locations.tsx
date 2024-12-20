'use client';

import { type ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Icon from '@/components/icon/Icon';
import { DataTableColumnHeaderProps } from '@/components/table/table.type';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LocationType from '@/types/location';

export const columns: ColumnDef<LocationType>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID' iconName='ArrowUpDown' />,
    cell: ({ row }) => <span>{row.original.id}</span>,
    enableResizing: false,
  },
  {
    accessorKey: 'hinhAnh',
    header: 'Image',
    cell: ({ row }) => (
      <Image
        src={row.original.hinhAnh}
        alt={row.original.tenViTri}
        width={50}
        height={50}
        className='mx-auto aspect-square size-20 rounded-xl object-cover transition-all hover:scale-105'
        quality={75}
      />
    ),
  },
  {
    accessorKey: 'tenViTri',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Location' iconName='ArrowUpDown' />,
    cell: ({ row }) => <span>{row.original.tenViTri}</span>,
  },
  {
    accessorKey: 'tinhThanh',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Provide' iconName='ArrowUpDown' />,
    cell: ({ row }) => <span>{row.original.tinhThanh}</span>,
  },
  {
    accessorKey: 'quocGia',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Nation' iconName='ArrowUpDown' />,
    cell: ({ row }) => <span>{row.original.quocGia}</span>,
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
            {/* TODO: Handle modal management location */}
            <DropdownMenuItem>View</DropdownMenuItem>
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
