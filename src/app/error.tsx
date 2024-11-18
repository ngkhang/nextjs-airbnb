'use client'; // Error boundaries must be Client Components

import Link from 'next/link';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { defaultContent } from '@/lib/staticContent';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError = ({ error, reset }: Props) => {
  useEffect(() => {
    console.log(error);
    // Log the error to an error reporting service
  }, [error]);

  const content = defaultContent.errorContent;

  return (
    <html>
      <body>
        <div className='container center'>
          <div>
            <h1 className='mb-7 text-center text-3xl md:mb-12 md:text-5xl xl:text-7xl'>{content.title}</h1>
            <p>{content.description}</p>
            <div className='center'>
              <Link href='/'>
                <Button className='px-12 py-3 md:px-16 md:py-5 md:text-lg'>Back to Home</Button>
              </Link>
              <Button className='px-12 py-3 md:px-16 md:py-5 md:text-lg' onClick={() => reset()}>
                Try again
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};
export default GlobalError;
