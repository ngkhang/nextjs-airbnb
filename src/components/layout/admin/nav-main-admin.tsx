'use client';

import Link from 'next/link';
import Icon, { IconName } from '../../icon/Icon';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

interface NavMainAdminProps {
  items: {
    key: number;
    title: string;
    url: string;
    icon: string;
  }[];
}

export default function NavMainAdmin({ items }: NavMainAdminProps) {
  return (
    <SidebarMenu className='grid gap-2'>
      {items.map((item) => (
        <SidebarMenuItem key={item.key}>
          <SidebarMenuButton asChild className='px-4'>
            <Link href={item.url}>
              <Icon name={item.icon as IconName} />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
