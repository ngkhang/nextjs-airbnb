'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { RegisterSchema } from '@/schemas/auth.schema';
import useZodForm from '@/hooks/useZodForm';
import { RegisterType } from '@/types/auth.type';
import ROUTES from '@/utils/constants/routes';
import authService from '@/services/auth.service';
import { ErrorResponse } from '@/types/common.type';
import FormFieldComponent, { DataFieldType } from '@/components/form/form-field';
import FormWrapper from '@/components/form/form-wrapper';

const dataFields: DataFieldType<typeof RegisterSchema>[] = [
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
    <FormWrapper formName='RegisterForm' form={form} buttonSubmit={{ text: 'Create New Account' }} onSubmit={onSubmit}>
      {dataFields.map((item) => (
        <FormFieldComponent key={item.id} form={form} fieldData={item} />
      ))}
    </FormWrapper>
  );
};

export default RegisterPage;
