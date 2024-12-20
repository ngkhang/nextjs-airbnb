/* eslint-disable no-undefined */
'use client';

import { useEffect, useRef, useState } from 'react';
import useZodForm from '@/hooks/useZodForm';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/icon/Icon';
import { UploadAvatarSchema, type UploadAvatarType } from '@/schemas/user.schema';
import { User } from '@/types/user.type';

interface UploadAvatarProps {
  user: User | null;
}

export default function FormAvatar({ user }: UploadAvatarProps) {
  const [preview, setPreview] = useState<string | null>(user?.avatar || null);
  const uploadAvatarForm = useZodForm(UploadAvatarSchema, {});
  const fileInputRef = useRef<HTMLInputElement>(null);

  function onSubmitAvatar(data: UploadAvatarType) {
    const formData = new FormData();

    // Add all other form fields
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });
    // TODO: Call API upload avatar
    console.log('🚀 ~ onSubmitAvatar ~ formData:', formData);
  }
  const avatarChange = uploadAvatarForm.watch('avatar');

  const handleUploadedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  useEffect(
    () => () => {
      // Cleanup preview URL when component unmounts
      if (preview && !preview.startsWith('http')) {
        URL.revokeObjectURL(preview);
      }
    },
    [preview]
  );

  return (
    <Form {...uploadAvatarForm}>
      <form onSubmit={uploadAvatarForm.handleSubmit(onSubmitAvatar)} className='flex-col center'>
        <FormField
          control={uploadAvatarForm.control}
          name='avatar'
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <div className='relative pb-4 center'>
                <Avatar className='size-40'>
                  <AvatarImage loading='lazy' className='object-cover' src={preview || undefined} />
                  <AvatarFallback>
                    <Icon size={30} name='CircleUserRound' />
                  </AvatarFallback>
                </Avatar>
                <FormLabel htmlFor='avatar' className='absolute bottom-0 rounded-lg border bg-white p-2 shadow-lg'>
                  <Icon size={16} name='CloudUpload' />
                </FormLabel>
              </div>

              <Input
                id='avatar'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file);
                    handleUploadedFile(e);
                  }
                }}
                {...field}
                value={undefined}
                ref={fileInputRef}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {avatarChange && (
          <Button type='submit' className='col-span-full mt-4 bg-[#23A695] hover:bg-[#23A695]/90'>
            Upload
          </Button>
        )}
      </form>
    </Form>
  );
}
