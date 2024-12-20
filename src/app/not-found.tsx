import { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

import ImageContainer from '@/components/ImageContainer';
import { Button } from '@/components/ui/button';
import { defaultContent } from '@/lib/staticContent';

const { rootContent, notFoundContent } = defaultContent;

export const metadata: Metadata = notFoundContent.metaData;

export default async function NotFoundPage() {
  return (
    <div className='container center sm:items-start'>
      <div className='w-full lg:w-3/4'>
        {/* Logo */}
        <div className='py-3 lg:py-7'>
          <Link href='/' className='inline-block'>
            <ImageContainer src={rootContent.logo.src.black} alt={rootContent.logo.alt} />
          </Link>
        </div>

        {/* Main */}
        <div className='flex-wrap items-stretch center'>
          <div className='mb-7 w-full sm:mb-0 sm:w-2/3 xl:w-3/5'>
            <h1 className='mb-6 py-2 text-8xl font-bold xl:text-[150px]'>{notFoundContent.title}</h1>
            <h3 className='mb-4 text-xl md:mb-12 md:text-4xl'>{notFoundContent.description}</h3>
            <Link href='/'>
              <Button className='rounded-sm bg-secondary px-16 py-3 text-lg font-medium text-foreground hover:border-foreground hover:bg-gray-300 md:py-6'>
                Back to Home
              </Button>
            </Link>
          </div>

          <div className='w-full px-16 py-8 sm:w-1/3 sm:p-0 xl:w-2/5'>
            <ImageContainer unoptimized={true} src={notFoundContent.banner.src} alt={notFoundContent.banner.alt} />
          </div>
        </div>
      </div>
    </div>
  );
}
