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

import { columns } from './columns-locations';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { DataTablePagination } from '@/components/table/data-table-pagination';
import { Button } from '@/components/ui/button';
import { DataTableViewOptions } from '@/components/table/data-table-view-options';
import LocationType from '@/types/location';

const filter = {
  key: 'tenViTri',
  title: 'location',
};

export default function ManagementLocationPage() {
  const [data, setData] = useState<LocationType[] | []>([]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 6,
  });
  useEffect(() => {
    async function getData() {
      // Fetch data from your API here.
      const res = [
        {
          id: 1,
          tenViTri: 'Quận 1',
          tinhThanh: 'Hồ Chí Minh',
          quocGia: 'Việt Nam',
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/vt1.jpg',
        },
        {
          id: 2,
          tenViTri: 'Cái Răng',
          tinhThanh: 'Cần Thơ',
          quocGia: 'Việt Nam',
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/vt2.jpg',
        },
        {
          id: 3,
          tenViTri: 'Hòn Rùa',
          tinhThanh: 'Nha Trang',
          quocGia: 'Việt Nam',
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/vt3.jpg',
        },
        {
          id: 4,
          tenViTri: 'Hoàn Kiếm',
          tinhThanh: 'Hà Nội',
          quocGia: 'Việt Nam',
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/vt4.jpg',
        },
        {
          id: 5,
          tenViTri: 'Hòn Tằm',
          tinhThanh: 'Phú Quốc',
          quocGia: 'Việt Nam',
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/vt5.jpg',
        },
        {
          id: 6,
          tenViTri: 'Hải Châu',
          tinhThanh: 'Đà Nẵng',
          quocGia: 'Việt Nam',
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/vt6.jpg',
        },
        {
          id: 7,
          tenViTri: 'Langbiang',
          tinhThanh: 'Đà Lạt',
          quocGia: 'Việt Nam',
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/vt7.jpg',
        },
        {
          id: 8,
          tenViTri: 'Mũi Né',
          tinhThanh: 'Phan Thiết',
          quocGia: 'Việt Nam',
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/vt8.jpg',
        },
        {
          id: 3440,
          tenViTri: 'Huyện Tân Yên',
          tinhThanh: 'Bắc Giang',
          quocGia: 'Việt Nam',
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/avatar/22-10-2024-02-07-11-13.jpg',
        },
        {
          id: 3441,
          tenViTri: 'Huyện Long Điền',
          tinhThanh: 'Bà Rịa - Vũng Tàu',
          quocGia: 'Việt Nam',
          hinhAnh: 'https://cdn3.ivivu.com/2022/09/T%E1%BB%95ng-quan-du-l%E1%BB%8Bch-V%C5%A9ng-T%C3%A0u-ivivu.jpg',
        },
        {
          id: 3443,
          tenViTri: 'Thành phố Bắc Kạn',
          tinhThanh: 'Bắc Kạn',
          quocGia: 'Việt Nam',
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/vt1.jpg',
        },
        {
          id: 3445,
          tenViTri: 'Bùi Viện',
          tinhThanh: 'Hồ Chí Minh',
          quocGia: 'Việt Nam',
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/avatar/24-10-2024-07-21-32-capture.jpg',
        },
        {
          id: 3446,
          tenViTri: 'Gành Đá Đĩa',
          tinhThanh: 'Phú Yên',
          quocGia: 'Việt Nam',
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/avatar/24-10-2024-07-26-11-capture1.jpg',
        },
      ];
      setData(res);
    }

    getData();
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
          placeholder={`Filter ${filter.title}...`}
          value={(table.getColumn(filter.key)?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn(filter.key)?.setFilterValue(event.target.value)}
          className='max-w-sm'
        />
        <div className='grid grid-flow-col gap-2'>
          {/* TODO: Add new location */}
          <Button type='button' className='bg-chart-2 text-white hover:bg-chart-2/75'>
            Add new location
          </Button>
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
