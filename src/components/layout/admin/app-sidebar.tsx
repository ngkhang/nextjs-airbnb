'use client';

import { useEffect, useState } from 'react';
import NavHeaderAdmin from './nav-header-admin';
import NavMainAdmin from '@/components/layout/admin/nav-main-admin';
import NavFooterAdmin from '@/components/layout/admin/nav-footer-admin';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { defaultContent } from '@/lib/staticContent';
import { useAuth } from '@/components/AuthProvider';
import { User } from '@/types/user.type';

const { sidebar } = defaultContent.adminContent.shared;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isLoading, session } = useAuth();
  const [account, setAccount] = useState<User | null>(null);

  useEffect(() => {
    // Check useAuth load completed
    if (!isLoading) {
      if (session) setAccount(session.user);
    }
  }, [session, isLoading]);

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
      <SidebarFooter>{account && <NavFooterAdmin account={account} />}</SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
