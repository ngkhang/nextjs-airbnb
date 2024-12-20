'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon, { IconName } from '@/components/icon/Icon';
import { cn } from '@/lib/utils';
import { defaultContent } from '@/lib/staticContent';

const { title, description, itemsSection } = defaultContent.userContent.accountSettings;

export default function AccountSettingsPage() {
  return (
    <div>
      {/* Title */}
      <div className='mb-10'>
        <h2 className='mb-3 text-3xl font-semibold'>{title}</h2>
        <p className='text-sm'>{description}</p>
      </div>

      <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4'>
        {itemsSection.map((item) => (
          <Link href={item.url} key={item.key} className={cn(!item.isActive && 'pointer-events-none')}>
            <Card className={cn('h-full p-5', item.isActive ? 'shadow-lg' : 'opacity-70')}>
              <CardHeader className='p-0 pb-4'>
                <CardTitle>
                  <Icon size={24} name={item.icon as IconName} />
                </CardTitle>
              </CardHeader>
              <CardContent className='p-0'>
                <p className='mb-2 font-semibold'>{item.title}</p>
                <p className='text-sm text-muted-foreground'>{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
