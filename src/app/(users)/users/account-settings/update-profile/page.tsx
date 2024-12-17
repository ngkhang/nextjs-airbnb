'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { defaultContent } from '@/lib/staticContent';
import useZodForm from '@/hooks/useZodForm';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/icon/Icon';
import { UpdateProfileSchema, type UpdateProfileType } from '@/schemas/user.schema';

const { updateProfile } = defaultContent.userContent.accountSettings.pages;

export default function UpdateProfilePage() {
  const updateProfileForm = useZodForm(UpdateProfileSchema, {
    defaultValues: {
      id: '1',
    },
  });
  const [preview, setPreview] = useState<string | null>(null);

  function onSubmit(data: UpdateProfileType) {
    console.log(JSON.stringify(data, null, 2));
  }

  // const handleUploadedFile = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { target } = event;
  //   const files = target.files as FileList;
  //   if (files[0]) {
  //     const urlImage = URL.createObjectURL(files[0]);
  //     setPreview(urlImage);
  //   }
  // };

  return (
    <div className='mx-auto lg:max-w-[700px]'>
      {/* Title */}
      <div className='mb-10'>
        <h2 className='mb-3 text-3xl font-semibold'>{updateProfile.title}</h2>
        <p className='text-sm'>{updateProfile.description}</p>
      </div>

      {/* Form Update profile password */}
      <Form {...updateProfileForm}>
        <form onSubmit={updateProfileForm.handleSubmit(onSubmit)} className='grid gap-4 lg:grid-cols-3'>
          <div className='lg:col-span-1'>
            <FormField
              control={updateProfileForm.control}
              name='avatar'
              render={({ field }) => (
                <FormItem className='relative flex-col pb-5 center'>
                  {/* TODO: Handle preview avatar */}
                  <Avatar className='size-32'>
                    <AvatarImage
                      loading='lazy'
                      className='mb-10 object-cover'
                      src={preview || 'https://github.com/shadcn.png'}
                    />
                    <AvatarFallback>
                      <Icon size={30} name='CircleUserRound' />
                    </AvatarFallback>
                  </Avatar>

                  <FormLabel
                    className={cn('absolute bottom-0 rounded-lg border bg-white p-2 shadow-lg', {
                      buttonVariants: 'outline',
                    })}
                  >
                    <Icon size={16} name='CloudUpload' />
                  </FormLabel>

                  <FormControl>
                    <Input type='file' accept='image/*' className='hidden' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid gap-4 lg:col-span-2'>
            <FormField
              control={updateProfileForm.control}
              name='id'
              render={({ field }) => (
                <FormItem className='col-span-full hidden'>
                  <FormLabel className='text-inherit'>
                    Id <span className='text-sm text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type='number' placeholder={''} {...field} />
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
                    <Input type='email' placeholder={'Enter your email'} {...field} />
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
                    <Input type='text' readOnly={false} placeholder={''} {...field} />
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
                          {field.value ? format(field.value, 'dd/MM/yyyy') : <span>Pick a date</span>}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
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
                  <Select onValueChange={field.onChange} defaultValue={field.value ? 'male' : 'female'}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a gender' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='male'>Male</SelectItem>
                      <SelectItem value='female'>Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='col-span-full mt-6 bg-[#23A695] hover:bg-[#23A695]/90'>
              Update password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
