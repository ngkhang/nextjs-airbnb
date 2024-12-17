'use client';

import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface FormWrapperProps<T extends z.ZodType> {
  form: UseFormReturn<z.infer<T>>;
  formName: string;
  className?: string;
  children: React.ReactNode;
  onSubmit: (data: z.infer<T>) => Promise<void>;
  buttonSubmit: {
    text: string;
    className?: string;
  };
}

const FormWrapper = <T extends z.ZodType>(props: FormWrapperProps<T>) => {
  const { form, formName, children, onSubmit, className = '', buttonSubmit } = props;

  return (
    <Form {...form}>
      <form name={formName} className={cn('space-y-4', className)} onSubmit={form.handleSubmit(onSubmit)}>
        {/* Main form */}
        {children}

        {/* Button */}
        <Button type='submit' className={cn('w-full py-5', buttonSubmit.className)}>
          {buttonSubmit.text}
        </Button>
      </form>
    </Form>
  );
};

export default FormWrapper;
