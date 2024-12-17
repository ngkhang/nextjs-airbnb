'use client';

import * as React from 'react';
import NavHeaderAdmin from './nav-header-admin';
import NavMainAdmin from '@/components/layout/admin/nav-main-admin';
import NavFooterAdmin from '@/components/layout/admin/nav-footer-admin';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { defaultContent } from '@/lib/staticContent';

// TODO: Call API.
const userLogin = {
  name: 'shadcn',
  email: 'm@example.com',
  avatar: 'https://github.com/shadcn.png',
};
const { sidebar } = defaultContent.adminContent.shared;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      {/* Sidebar Header */}
      <SidebarHeader>
        <NavHeaderAdmin item={sidebar.navHeader} />
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        <NavMainAdmin items={sidebar.navMain} />
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <NavFooterAdmin account={userLogin} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
