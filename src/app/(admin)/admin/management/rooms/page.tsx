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
import { Button } from '@/components/ui/button';
import { DataTableViewOptions } from '@/components/table/data-table-view-options';

const filter = {
  key: 'tenPhong',
  title: 'room name',
};

export default function ManagementRoomPage() {
  const [data, setData] = useState<RoomType[] | []>([]);

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
          tenPhong: 'NewApt D1 - Cozy studio - NU apt - 500m Bui Vien!',
          khach: 3,
          phongNgu: 1,
          giuong: 1,
          phongTam: 1,
          moTa: 'Tự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nDinh Long là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.',
          giaTien: 28,
          mayGiat: true,
          banLa: true,
          tivi: true,
          dieuHoa: false,
          wifi: true,
          bep: false,
          doXe: true,
          hoBoi: true,
          banUi: true,
          maViTri: 1,
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/phong1.jpg',
        },
        {
          id: 2,
          tenPhong: 'STUDIO MỚI NETFLIX MIỄN PHÍ/ĐỖ XE MIỄN PHÍ',
          khach: 2,
          phongNgu: 1,
          giuong: 1,
          phongTam: 1,
          moTa: 'Không gian riêng để làm việc\r\nMột khu vực chung có Wi-fi, phù hợp để làm việc.\r\nTự nhận phòng\r\nTự nhận phòng bằng khóa thông minh.\r\nKim Nam là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.',
          giaTien: 21,
          mayGiat: true,
          banLa: true,
          tivi: true,
          dieuHoa: true,
          wifi: true,
          bep: true,
          doXe: false,
          hoBoi: false,
          banUi: false,
          maViTri: 1,
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/phong2.png',
        },
        {
          id: 3,
          tenPhong: 'Phòng sang trọng với ban công tại D.1 - 200m đến Bitexco',
          khach: 2,
          phongNgu: 1,
          giuong: 1,
          phongTam: 1,
          moTa: 'Emmy là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.\r\nTrải nghiệm nhận phòng tuyệt vời\r\n100% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng.\r\nHủy miễn phí trước 28 thg 9.',
          giaTien: 17,
          mayGiat: true,
          banLa: true,
          tivi: true,
          dieuHoa: false,
          wifi: false,
          bep: false,
          doXe: true,
          hoBoi: true,
          banUi: true,
          maViTri: 1,
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/phong3.png',
        },
        {
          id: 4,
          tenPhong: 'Closer home!!!!',
          khach: 4,
          phongNgu: 2,
          giuong: 2,
          phongTam: 2,
          moTa: 'Hieu là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.\r\nĐịa điểm tuyệt vời\r\n100% khách gần đây đã xếp hạng 5 sao cho vị trí này.\r\nTrải nghiệm nhận phòng tuyệt vời\r\n100% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng.',
          giaTien: 28,
          mayGiat: true,
          banLa: true,
          tivi: true,
          dieuHoa: true,
          wifi: true,
          bep: false,
          doXe: false,
          hoBoi: false,
          banUi: false,
          maViTri: 2,
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/phong4.png',
        },
        {
          id: 5,
          tenPhong: 'Toàn bộ quê hương phải của Gi ngay trung tâm Cần Thơ',
          khach: 4,
          phongNgu: 2,
          giuong: 2,
          phongTam: 2,
          moTa: 'Giang là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.\r\nĐịa điểm tuyệt vời\r\n94% khách gần đây đã xếp hạng 5 sao cho vị trí này.\r\nTrải nghiệm nhận phòng tuyệt vời\r\n94% khách gần đây đã xếp hạng 5 sao cho quy trình nhận phòng.',
          giaTien: 25,
          mayGiat: true,
          banLa: true,
          tivi: true,
          dieuHoa: true,
          wifi: false,
          bep: false,
          doXe: true,
          hoBoi: false,
          banUi: true,
          maViTri: 2,
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/phong5.png',
        },
        {
          id: 6,
          tenPhong: 'Ngôi nhà có hoa, nắng đẹp, trung tâm Cần Thơ',
          khach: 4,
          phongNgu: 1,
          giuong: 2,
          phongTam: 2,
          moTa: 'Tự nhận phòng\r\nTự nhận phòng với hộp khóa an toàn.\r\nDang là Chủ nhà siêu cấp\r\nChủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.',
          giaTien: 21,
          mayGiat: true,
          banLa: true,
          tivi: true,
          dieuHoa: true,
          wifi: true,
          bep: true,
          doXe: false,
          hoBoi: false,
          banUi: false,
          maViTri: 2,
          hinhAnh: 'https://airbnbnew.cybersoft.edu.vn/images/phong6.png',
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
          {/* TODO: Add new room */}
          <Button type='button' className='bg-chart-2 text-white hover:bg-chart-2/75'>
            Add new room
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
