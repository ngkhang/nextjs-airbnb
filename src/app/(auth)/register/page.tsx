'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RegisterSchema } from '@/schemas/auth.schema';
import useZodForm from '@/hooks/useZodForm';
import { RegisterType } from '@/types/auth.type';
import ROUTES from '@/utils/constants/routes';
import authService from '@/services/auth.service';
import { ErrorResponse } from '@/types/common.type';

interface FormFieldType<T extends z.ZodTypeAny> {
  id: number;
  fieldName: keyof z.infer<T>;
  label: string;
  input: {
    require: boolean;
    placeholder?: string;
    typeInput: string;
  };
}

const formFields: FormFieldType<typeof RegisterSchema>[] = [
  {
    id: 0,
    fieldName: 'email',
    label: 'Email Address',
    input: {
      require: true,
      placeholder: 'Enter your email',
      typeInput: 'email',
    },
  },
  {
    id: 1,
    fieldName: 'name',
    label: 'Full Name',
    input: {
      require: true,
      placeholder: 'Enter full name',
      typeInput: 'text',
    },
  },
  {
    id: 2,
    fieldName: 'password',
    label: 'Password',
    input: {
      require: true,
      placeholder: 'Enter your password',
      typeInput: 'password',
    },
  },
];

const RegisterPage = () => {
  const router = useRouter();

  const form = useZodForm(RegisterSchema, {
    defaultValues: {
      email: '',
      password: '',
      name: '',
      role: 'USER', // Default user have USER role
    },
  });

  const onSubmit = async (data: RegisterType) => {
    try {
      await authService.register(data);
      toast.success('Register successful', {
        onClose: () => {
          form.reset({}, { keepValues: false });
          router.push(ROUTES.AUTH.LOGIN);
        },
      });
    } catch (error) {
      toast.error((error as ErrorResponse).content);
    }
  };

  return (
    <Form {...form}>
      <form name='RegisterForm' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {formFields.map((item) => (
          <FormField
            key={item.id}
            control={form.control}
            name={item.fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-inherit'>
                  {item.label} {item.input.require && <span className='text-sm text-red-500'>*</span>}
                </FormLabel>
                <FormControl>
                  <Input type={item.input.typeInput} placeholder={item.input.placeholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type='submit' className='w-full py-5'>
          Create New Account
        </Button>
      </form>
    </Form>
  );
};

export default RegisterPage;
