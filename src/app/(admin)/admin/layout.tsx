'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AppSidebar } from '@/components/layout/admin/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { defaultContent } from '@/lib/staticContent';

const { pageTitle } = defaultContent.adminContent.shared;

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [title, setTitle] = useState<string>(pageTitle.dashboard);

  useEffect(() => {
    const paths = pathname.split('/').slice(-1).toString();
    setTitle(pageTitle[paths as keyof typeof pageTitle]);
  }, [pathname]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <h3>{title}</h3>
            {/* NOTE: ADD Breadcrumb */}
          </div>
        </header>

        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
