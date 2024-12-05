'use client';

import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { LogInSchema } from '@/schemas/auth.schema';
import useZodForm from '@/hooks/useZodForm';
import { LogInType } from '@/types/auth.type';
import AuthService from '@/services/auth.service';
import ROUTE from '@/utils/constants/routes';
import { ErrorResponse } from '@/types/common.type';
import FormFieldComponent, { DataFieldType } from '@/components/form/form-field';
import FormWrapper from '@/components/form/form-wrapper';

const dataFields: DataFieldType<typeof LogInSchema>[] = [
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
    fieldName: 'password',
    label: 'Password',
    input: {
      require: true,
      placeholder: 'Enter your password',
      typeInput: 'password',
    },
  },
];

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
    <FormWrapper formName='LogInForm' form={form} onSubmit={onSubmit} buttonSubmit={{ text: 'Submit' }}>
      {dataFields.map((item) => (
        <FormFieldComponent form={form} key={item.id} fieldData={item} />
      ))}
    </FormWrapper>
  );
};

export default LoginPage;
