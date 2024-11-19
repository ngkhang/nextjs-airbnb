import { z } from 'zod';
import type { UseFormProps, UseFormReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type TZodForm = <T extends z.ZodTypeAny>(_schema: T, _options?: UseFormProps<z.infer<T>>) => UseFormReturn<z.infer<T>>;

const useZodForm: TZodForm = (schema, options) =>
  useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    ...options,
  });

export default useZodForm;
