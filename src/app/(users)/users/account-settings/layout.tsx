'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function AccountSettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      {/* TODO: Breadcrumb */}
      {children}
    </div>
  );
}
