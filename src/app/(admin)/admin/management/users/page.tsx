import React from 'react';
import { defaultColumnsUser } from './columns-users';
import { DataTable } from '@/components/table/data-table';
import { User } from '@/types/user.type';

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: 43391,
      name: 'H2o Huy',
      email: 'huydao2262222222222@gmail.com',
      password: '',
      phone: '0909090911',
      birthday: '2024-09-09T17:00:00.000Z',
      avatar: null,
      gender: false,
      role: 'USER',
    },
    {
      id: 43392,
      name: 'dunguyen',
      email: 'boyreact24042k4@gmail.com',
      password: '',
      phone: null,
      birthday: '24',
      avatar: null,
      gender: true,
      role: 'USER',
    },
    {
      id: 43395,
      name: 'Bibku81',
      email: 'toan0099@gmail.com',
      password: '',
      phone: '08293937677',
      birthday: '22-11-1999',
      avatar: null,
      gender: true,
      role: 'USER',
    },
    {
      id: 43396,
      name: 'test2',
      email: 'test2@gmail.com',
      password: '',
      phone: null,
      birthday: '2024-10-30T17:00:00.000Z',
      avatar: null,
      gender: true,
      role: 'ADMIN',
    },
    {
      id: 43405,
      name: 'Helen Combs',
      email: 'galaman@mailinator.com',
      password: '',
      phone: null,
      birthday: '23-09-2024',
      avatar: null,
      gender: true,
      role: 'USER',
    },
    {
      id: 43406,
      name: 'Trần Trọng Hiếu',
      email: 'abc@gmail.com',
      password: '',
      phone: null,
      birthday: '2004-06-15T17:00:00.000Z',
      avatar: null,
      gender: true,
      role: 'USER',
    },
    {
      id: 43655,
      name: 'ふりがふりが',
      email: 'wpdev2302@gmail.com',
      password: '',
      phone: null,
      birthday: '15/01/1988',
      avatar: null,
      gender: true,
      role: 'USER',
    },
    {
      id: 43656,
      name: 'admin01',
      email: 'admi01n@gmail.com',
      password: '',
      phone: null,
      birthday: 'string',
      avatar: null,
      gender: true,
      role: 'USER',
    },
    {
      id: 43657,
      name: 'logn145236',
      email: 'logn145236@gmail.com',
      password: '',
      phone: null,
      birthday: '01/10/2024',
      avatar: null,
      gender: true,
      role: 'USER',
    },
    {
      id: 43658,
      name: '1',
      email: '1@1.com',
      password: '',
      phone: null,
      birthday: '15/10/2024',
      avatar: null,
      gender: true,
      role: 'USER',
    },
    {
      id: 43659,
      name: 'khang nguyen',
      email: 'khang01@gmail.com',
      password: '',
      phone: null,
      birthday: '21/12/2000',
      avatar: null,
      gender: true,
      role: 'USER',
    },
  ];
}

export default async function ManagementUserPage() {
  const data = await getData();
  return (
    <div className='flex flex-1 flex-col gap-4 p-8 pt-0'>
      <DataTable columns={defaultColumnsUser} data={data} />
    </div>
  );
}
