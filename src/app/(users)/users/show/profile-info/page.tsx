'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';
import { defaultContent } from '@/lib/staticContent';
import Icon, { IconName } from '@/components/icon/Icon';
import { useAuth } from '@/components/AuthProvider';
import { User } from '@/types/user.type';

const { title, description, fields, subInfo } = defaultContent.userContent.profileInfo;

export default function ProfileInfo() {
  const { session } = useAuth();

  return (
    <div>
      <div className='grid gap-8 lg:gap-12'>
        {/* Title */}
        <div>
          <h2 className='mb-3 text-3xl font-semibold'>{title}</h2>
          <p className='text-sm'>{description}</p>
        </div>

        {/* Main */}
        {session && session.user && (
          <div className='grid-cols-2 items-start gap-8 lg:grid'>
            <div className='grid gap-2'>
              {fields.map((field) => (
                <div key={field.key} className='font-medium'>
                  {field.key !== 0 && <Separator className='my-5' />}
                  <p className='mb-1'>{field.title}</p>
                  {field.id === 'gender' ? (
                    <p className='text-muted-foreground'>{session.user[field.id as keyof User] ? 'Male' : 'Female'}</p>
                  ) : (
                    <p className='text-muted-foreground'>{session.user[field.id as keyof User] || field.textEmpty}</p>
                  )}
                </div>
              ))}
            </div>

            <div className='grid-row-3 hidden gap-3 rounded-lg border p-6 lg:grid'>
              {subInfo.map((sub) => (
                <div key={sub.key} className='grid-row-3 grid gap-2'>
                  {sub.key !== 0 && <Separator className='my-4' />}
                  <Icon name={sub.icon as IconName} size={40} className='mb-2 text-primary' />
                  <span className='font-medium'>{sub.title}</span>
                  <span className='text-sm text-muted-foreground'>{sub.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
