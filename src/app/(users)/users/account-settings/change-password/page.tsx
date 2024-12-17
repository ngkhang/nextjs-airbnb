'use client';

import React from 'react';
import type { FieldPath } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import useZodForm from '@/hooks/useZodForm';
import { PasswordInput } from '@/components/ui/password-input';
import { Button } from '@/components/ui/button';
import { type UpdatePassword, UpdatePasswordSchema } from '@/schemas/user.schema';
import { defaultContent } from '@/lib/staticContent';

interface DataFieldType {
  key: number;
  id: string;
  label: string;
  input: {
    isHidden: boolean;
    require: boolean;
    placeholder?: string;
    type: string;
  };
}

const { changePassword } = defaultContent.userContent.accountSettings.pages;

const formFields: DataFieldType[] = changePassword.formFields;

export default function ChangePasswordPage() {
  const updatePassword = useZodForm(UpdatePasswordSchema);

  function onSubmit(data: UpdatePassword) {
    console.log(JSON.stringify(data, null, 2));
    // TODO: Update password
    // 1. Check current password
    // 2. Update new password
  }

  return (
    <div className='mx-auto lg:max-w-[400px]'>
      {/* Title */}
      <div className='mb-10'>
        <h2 className='mb-3 text-3xl font-semibold'>{changePassword.title}</h2>
        <p className='text-sm'>{changePassword.description}</p>
      </div>

      {/* Form */}
      <Form {...updatePassword}>
        <form onSubmit={updatePassword.handleSubmit(onSubmit)} className='grid gap-10'>
          <div className='grid gap-4'>
            {formFields.map((item) => (
              <FormField
                key={item.key}
                control={updatePassword.control}
                name={item.id as FieldPath<UpdatePassword>}
                render={({ field }) => (
                  <FormItem className='col-span-full'>
                    <FormLabel className='text-inherit'>
                      {item.label} {item.input.require && <span className='text-sm text-red-500'>*</span>}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput placeholder={item.input.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          <div className='col-span-full grid grid-cols-2 gap-4'>
            <Button type='submit' className='col-span-full bg-[#23A695] hover:bg-[#23A695]/90'>
              Update password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
