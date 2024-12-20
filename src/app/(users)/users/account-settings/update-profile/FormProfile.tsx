/* eslint-disable no-undefined */
'use client';

import { useEffect } from 'react';
import useZodForm from '@/hooks/useZodForm';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn, formatBirthday, parseBirthday } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import Icon from '@/components/icon/Icon';
import { UpdateProfileSchema, type UpdateProfileType } from '@/schemas/user.schema';
import { User } from '@/types/user.type';

interface UploadAvatarProps {
  user: User | null;
}

export default function FormProfile({ user }: UploadAvatarProps) {
  const updateProfileForm = useZodForm(UpdateProfileSchema, {
    defaultValues: {
      id: user?.id,
      name: user?.name ?? '',
      email: user?.email,
      phone: user?.phone ?? undefined,
      birthday: user?.birthday ? parseBirthday(user.birthday) : undefined,
      gender: user?.gender ? 'Male' : 'Female',
      role: user?.role,
    },
  });

  useEffect(() => {
    const formData = {
      ...user,
      gender: user?.gender ? 'Male' : 'Female',
      birthday: user?.birthday ? parseBirthday(user.birthday) : undefined,
    };

    updateProfileForm.reset(formData);
  }, [user]);

  function onSubmitProfile(data: UpdateProfileType) {
    console.log(JSON.stringify(data, null, 2));
    // TODO: Call API
  }
  return (
    <Form {...updateProfileForm}>
      <form onSubmit={updateProfileForm.handleSubmit(onSubmitProfile)} className='grid gap-4'>
        <FormField
          control={updateProfileForm.control}
          name='id'
          render={({ field }) => (
            <FormItem className='col-span-full hidden'>
              <FormLabel className='text-inherit'>
                Id <span className='text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='number' placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateProfileForm.control}
          name='email'
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel className='text-inherit'>
                Email <span className='text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input
                  readOnly={true}
                  type='email'
                  placeholder={'Enter your email'}
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={updateProfileForm.control}
          name='name'
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel className='text-inherit'>
                Full name <span className='text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='text' readOnly={false} placeholder={'Enter full name'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateProfileForm.control}
          name='phone'
          render={({ field }) => (
            <FormItem className='col-span-full'>
              <FormLabel className='text-inherit'>Phone numbers</FormLabel>
              <FormControl>
                <Input type='text' readOnly={false} placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateProfileForm.control}
          name='birthday'
          render={({ field }) => (
            <FormItem className='col-span-1'>
              <FormLabel className='text-inherit'>Date of birth</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type='button'
                      variant={'outline'}
                      className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? formatBirthday(field.value) : <span>Pick a date</span>}
                      <Icon name='CalendarIcon' size='16' className='ml-auto opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-auto p-0' align='start'>
                  <Calendar
                    mode='single'
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={updateProfileForm.control}
          name='gender'
          render={({ field }) => (
            <FormItem className='col-span-1'>
              <FormLabel className='text-inherit'>Gender</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={field.value !== undefined ? field.value : 'Select a gender'} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='Male'>Male</SelectItem>
                  <SelectItem value='Female'>Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='col-span-full mt-6 bg-[#23A695] hover:bg-[#23A695]/90'>
          Update profile
        </Button>
      </form>
    </Form>
  );
}
