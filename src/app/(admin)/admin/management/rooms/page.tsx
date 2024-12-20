'use client';

import React, { useEffect, useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table';

import { columns } from './columns-rooms';
import RoomType from '@/types/room.type';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { DataTableViewOptions } from '@/components/table/data-table-view-options';
import roomService from '@/services/room.service';
import DrawerDialog from '@/components/custom/DrawerDialog';

const filter = {
  key: 'tenPhong',
  title: 'Filter by room name',
};

export default function ManagementRoomPage() {
  const [data, setData] = useState<RoomType[] | []>([]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });
  useEffect(() => {
    async function getRoomsData() {
      const res = await roomService.getAllRooms();
      setData(res.content);
    }

    getRoomsData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
    },
  });

  return (
    <div className='flex flex-1 flex-col gap-4 p-8 pt-0'>
      <div className='flex items-center justify-between'>
        <Input
          placeholder={filter.title}
          value={(table.getColumn(filter.key)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(filter.key)?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <div className='grid grid-flow-col gap-2'>
          <DrawerDialog
            title='New room'
            button={{ title: ' Add new room', className: 'bg-chart-2 text-white hover:bg-chart-2/75' }}
          >
            {/* TODO: form add new room */}
            <p>Children</p>
          </DrawerDialog>
          <DataTableViewOptions table={table} />
        </div>
      </div>

      {/* Table */}
      <div className='overflow-hidden rounded-md border'>
        <Table className='text-center'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='w-fit text-center'>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}
