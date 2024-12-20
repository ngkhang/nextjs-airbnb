'use client';

import Link from 'next/link';
import Icon, { IconName } from '../../icon/Icon';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import ROUTES from '@/utils/constants/routes';

interface NavMainAdminProps {
  items: {
    key: number;
    id: string;
    title: string;
    icon: string;
  }[];
}

export default function NavMainAdmin({ items }: NavMainAdminProps) {
  return (
    <SidebarMenu className='grid gap-2'>
      {items.map((item) => (
        <SidebarMenuItem key={item.key} className='px-1'>
          <SidebarMenuButton asChild className='px-4'>
            <Link href={ROUTES.ADMIN[item.id as keyof typeof ROUTES.ADMIN]}>
              <Icon name={item.icon as IconName} />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
