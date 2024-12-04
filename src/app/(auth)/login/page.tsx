'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LogInSchema } from '@/schemas/auth.schema';
import useZodForm from '@/hooks/useZodForm';
import { LogInType } from '@/types/auth.type';
import AuthService from '@/services/auth.service';
import ROUTE from '@/utils/constants/routes';
import { ErrorResponse } from '@/types/common.type';

const LoginPage = () => {
  const router = useRouter();

  const form = useZodForm(LogInSchema, {
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LogInType) => {
    // Handle logic: set global state, ...
    try {
      const response = await AuthService.login(data);
      toast.success(`Login successful`, {
        onClose: () => {
          form.reset({}, { keepValues: false });
          router.push(ROUTE.HOME.ROOT);
        },
      });
    } catch (error) {
      toast.error((error as ErrorResponse).content);
    }
  };

  return (
    <Form {...form}>
      <form name='LogInForm' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
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
                <Input placeholder='Enter your email' {...field} />
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
                {/* TODO: Add icon hide/show password */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full py-5'>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default LoginPage;
