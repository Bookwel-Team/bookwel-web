import { useEffect, useMemo, useState } from 'react';
import debounce from 'debounce';
import { useFetch } from '../../common/hooks';
import { TCategory, TUploadBook, bookProvider, categoryProvider } from '../../providers';
import { Category, Book } from '@onitsiky/bookwel-typescript-client';
import { Button, RHFAutocomplete } from '../../common/components';
import { FormProvider, useForm } from 'react-hook-form';
import { TBookInput, bookResolver } from '../../common/resolvers';
import { RHFFileInput } from '../../common/components/react-hook-form-inputs/RHFFileInput';
import { useSnackbar } from 'notistack';
import { getErrorMessage } from '../../common/utils';

export const UploadBook = () => {
  const form = useForm<TBookInput>({ mode: 'all', resolver: bookResolver });
  const { enqueueSnackbar } = useSnackbar();

  const [preview, setPreview] = useState('');
  const { fetch, data: categoryList, isLoading: loadCategory } = useFetch<Category[], TCategory>(categoryProvider.getAll);
  const { fetch: uploadBook, isLoading: isUpload, error: uploadError } = useFetch<Book, TUploadBook>(bookProvider.upload);

  const onChangeFetch = useMemo(() => debounce((name: string) => fetch(name.length > 0 ? name : undefined), 1000), []);

  const loadPreview = (file: File) => {
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleSubmit = form.handleSubmit(async ({ picture, category, book }) => {
    await uploadBook({ picture, category, book });
    if (!uploadError) {
      enqueueSnackbar('Book added succesfully.', { className: 'bg-success' });
    } else {
      enqueueSnackbar(getErrorMessage(uploadError), { className: 'bg-error' });
    }
  });

  return (
    <div className='w-screen h-screen relative flex justify-center items-center'>
      <div className='w-full h-full xl:w-1/2 bg-white  flex justify-center text-center items-center'>
        <div>
          <h1 className='text-4xl font-bold mb-10'>Upload book</h1>
          <FormProvider {...form}>
            <form onSubmit={handleSubmit}>
              <div className='w-full flex justify-center items-center  '>
                <label className='cursor-pointer p-2' style={{ border: '0.15rem dashed black' }} data-cy='input-picture'>
                  <RHFFileInput id='image-input' name='picture' label='Book cover' accept='image/*' getFileChange={loadPreview} hideLabel hideAll />
                  {preview ? <img src={preview} style={{ width: 'auto', height: '10rem', objectFit: 'cover' }} /> : <span>Add image cover</span>}
                </label>
              </div>

              <RHFFileInput name='book' label='Pdf book' accept='application/pdf' data-cy='input-pdf' />
              <RHFAutocomplete
                name='category'
                label='Category'
                items={categoryList?.map(category => category.name) as []}
                onChange={onChangeFetch}
                loadItems={loadCategory}
                data-cy='input-category'
              />

              <Button label='Submit' type='submit' isLoading={isUpload} className='w-full btn-primary' data-cy='submit-book' />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
