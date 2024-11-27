'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ImageContainer from '@/components/ImageContainer';
import { defaultContent } from '@/lib/staticContent';
import { ROUTE } from '@/utils/constant';

const { rootContent, authContent } = defaultContent;

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [contentPage, setContentPage] = useState<typeof authContent.Login>();
  const pathname = usePathname();
  const contentKey: 'Login' | 'Register' = pathname.replace('/', '') === 'login' ? 'Login' : 'Register';

  useEffect(() => {
    // TODO: Add loading
    setContentPage(authContent[contentKey]);
  }, [contentKey]);

  return (
    contentPage && (
      <div className='container py-6 center bg-dot-pattern md:py-10'>
        <div className='flex min-h-fit w-4/5 rounded-lg bg-background drop-shadow-xl md:w-[90%] xl:w-3/4'>
          {/* Banner */}
          <div className='relative hidden md:block md:w-1/2'>
            <Link href='/' className='absolute right-2 top-2 z-10 w-24'>
              <ImageContainer src={rootContent.logo.src.white} alt={rootContent.logo.alt} />
            </Link>
            <ImageContainer
              type='background'
              src={contentPage.banner.src}
              alt={contentPage.banner.alt}
              className='rounded-l-lg bg-center'
            />

            <footer className='absolute bottom-2 right-2 text-xs text-white'>{contentPage.banner.footer}</footer>
          </div>

          {/* Auth Form */}
          <div className='flex flex-col rounded-lg p-5 sm:px-8 md:w-1/2 md:px-5 lg:px-8'>
            <div className='order-1 mb-5 justify-end text-sm center sm:order-none sm:mb-3'>
              <span className='mr-3 sm:hidden'>{contentPage.switchSection.sub}</span>
              <Link
                href={ROUTE.AUTH[contentKey === 'Login' ? 'Register' : 'Login']}
                className='py-1 text-blue-600 hover:text-blue-300'
              >
                {contentPage.switchSection.label}
              </Link>
            </div>

            <div className='mb-4 text-center'>
              <h1 className='mb-2 text-xl font-bold md:text-2xl lg:text-3xl'>{contentPage.title}</h1>
              <p className='text-sm'>{contentPage.description}</p>
            </div>

            <div className='mb-4 sm:mb-6'>{children}</div>

            <div className='order-2 mt-auto text-pretty text-xs italic lg:text-sm'>
              <p>{contentPage.footer}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default AuthLayout;
