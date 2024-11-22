'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RegisterSchema } from '@/schemas/auth.schema';
import useZodForm from '@/hooks/useZodForm';
import { RegisterType } from '@/types/auth.type';
import { ROUTE } from '@/utils/constant';

const RegisterPage = () => {
  const router = useRouter();

  const form = useZodForm(RegisterSchema, {
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      role: 'USER',
    },
  });

  const onSubmit = async (data: RegisterType) => {
    // Handle logic: set global state, ...
    console.log('Send request and response from server: ', data);
    setTimeout(() => {
      // Get notification
      toast.success('Register successful', {
        onClose: () => {
          // Clear form
          form.reset({}, { keepValues: false });
          // Redirect to home
          router.push(ROUTE.HOME.root);
        },
      });
    }, 4000);
  };

  return (
    <Form {...form}>
      <form name='RegisterForm' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {/* TODO: Refactor map component */}
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-inherit'>
                Email Address <span className='text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='email' placeholder='Enter your email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='fullName'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-inherit'>
                Full Name <span className='text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input type='text' placeholder='Enter full name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-inherit'>
                Password <span className='text-sm text-red-500'>*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder='Enter your password' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' className='w-full py-5'>
          Create New Account
        </Button>
      </form>
    </Form>
  );
};

export default RegisterPage;
