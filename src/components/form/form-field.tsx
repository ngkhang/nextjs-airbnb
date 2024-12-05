import React from 'react';
import { z } from 'zod';
import type { UseFormReturn, FieldPath } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

export interface DataFieldType<T extends z.ZodType> {
  id: number;
  fieldName: FieldPath<z.infer<T>>;
  label: string;
  input: {
    require: boolean;
    placeholder?: string;
    typeInput: string;
  };
}

export interface FormFieldType<T extends z.ZodTypeAny> {
  form: UseFormReturn<z.infer<T>>;
  fieldData: DataFieldType<T>;
}

const FormFieldComponent = <T extends z.ZodTypeAny>(props: FormFieldType<T>): React.JSX.Element => {
  const { form, fieldData } = props;
  return (
    <FormField
      control={form.control}
      name={fieldData.fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='text-inherit'>
            {fieldData.label} {fieldData.input.require && <span className='text-sm text-red-500'>*</span>}
          </FormLabel>
          <FormControl>
            <Input type={fieldData.input.typeInput} placeholder={fieldData.input.placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldComponent;
