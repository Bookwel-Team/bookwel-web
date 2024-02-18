import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputFileProps } from './types';
import { bookSchema } from '../../resolvers';

/**
 * React-Hook-Form-Input
 *
 * File input that work only under FormProvider by react hook form.
 * Need at least to specify the name and the label.
 *
 * @example
 * function App() {
 *  const form = useForm();
 *  return (
 *    <FormProvider {...form}>
 *      <RHFFileInput name="picture" label="Picture" />
 *    </FormProvider>
 * )
 * }
 */
export const RHFFileInput: FC<InputFileProps> = props => {
  const { label, name, disabled, className, hideLabel = false, containerClassName, hideAll, accept, getFileChange, ...others } = props;
  const { formState, setValue, setError } = useFormContext();
  const error = formState.errors[name];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files != null && files.length > 0) {
      const file = files.item(0);
      getFileChange && getFileChange(file as File);
      const validResult = bookSchema.safeParse({ name: file });

      if (!validResult.success) {
        const errorMessage = validResult.error.issues.find(issue => issue.path[0] === name)?.message;
        if (errorMessage) {
          setError(name, { message: errorMessage });
          return;
        }
      }
      setValue(name, file);
    }
  };

  return (
    <label className={`form-control my-3 w-full ${containerClassName}`} style={{ display: hideAll ? 'none' : '' }}>
      {!hideLabel && (
        <div className={`${error ? 'text-error' : 'text-neutral'} label`}>
          <span className='label-text'>{label}</span>
        </div>
      )}
      <div className='relative w-fit'>
        <div className='relative'>
          <input
            {...others}
            name={name}
            onChange={handleFileChange}
            id='image-input'
            accept={accept}
            type='file'
            className='file-input file-input-bordered w-full max-w-xs'
          />
        </div>
        {error && (
          <div className='label'>
            <span className='label-text-alt text-error'>{error?.message?.toString()}</span>
          </div>
        )}
      </div>
    </label>
  );
};
