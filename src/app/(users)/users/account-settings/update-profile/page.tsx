'use client';

import { useEffect, useState } from 'react';
import FormProfile from './FormProfile';
import FormAvatar from './FormAvatar';
import { defaultContent } from '@/lib/staticContent';
import { useAuth } from '@/components/AuthProvider';
import { User } from '@/types/user.type';

const { updateProfile } = defaultContent.userContent.accountSettings.pages;

export default function UpdateProfilePage() {
  const { isLoading, session } = useAuth();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!isLoading && session) {
      setUser(session.user);
    }
  }, [isLoading, session]);

  return (
    <div className='mx-auto lg:max-w-[700px]'>
      {/* Title */}
      <div className='mb-10'>
        <h2 className='mb-3 text-3xl font-semibold'>{updateProfile.title}</h2>
        <p className='text-sm'>{updateProfile.description}</p>
      </div>

      {/* Main form */}
      <div className='grid gap-4 lg:grid-cols-3'>
        {/* Form upload avatar */}
        <div className='lg:col-span-1'>{user && <FormAvatar user={user} />}</div>

        {/* Form update profile */}
        <div className='lg:col-span-2'>{user && <FormProfile user={user} />}</div>
      </div>
    </div>
  );
}
