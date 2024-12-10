'use client';

import React from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { cn } from '@/lib/utils';

interface Props {
  btn: {
    label: string;
    placeholder: string;
    type?: React.HTMLInputTypeAttribute | 'text';
    id: string;
    defaultValue?: string | number | undefined;
    isDisabled?: boolean;
  };
  className?: string;
}

const SearchButton = ({ btn, className }: Props): React.ReactNode => {
  const { label, placeholder, type, id, defaultValue, isDisabled = false } = btn;
  return (
    <Button
      variant='outline'
      className={cn(
        'flex h-full w-full flex-col items-start rounded-full border-none px-4 py-3 text-start text-sm text-[#6A6A6A] shadow-none hover:bg-[#EBEBEB] hover:text-inherit data-[state=open]:bg-[#EBEBEB] md:px-8 md:py-4 lg:hover:bg-[#EBEBEB]',
        className
      )}
    >
      <Label className='w-full overflow-hidden text-ellipsis font-semibold'>{label}</Label>
      <Input
        id={id}
        type={type}
        readOnly={isDisabled}
        defaultValue={defaultValue}
        className='h-fit text-ellipsis border-none p-0 text-sm shadow-none hover:border-none focus-visible:ring-0'
        placeholder={placeholder}
      />
    </Button>
  );
};

export default SearchButton;
