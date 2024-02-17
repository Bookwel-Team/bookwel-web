import { FC, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { InputProps } from './types';

/**
 * React-Hook-Form-Input
 *
 * Text input that work only under FormProvider by react hook form.
 * Need at least to specify the name and the label.
 *
 * @example
 * function App() {
 *  const form = useForm();
 *  return (
 *    <FormProvider {...form}>
 *      <RHFTextInput name="username" label="Username" />
 *    </FormProvider>
 * )
 * }
 */
export const RHFTextInput: FC<InputProps> = props => {
  const { label, name, disabled, endIcon, startIcon, onClickEndIcon, className, hideLabel = false, containerClassName, placeholder, ...others } = props;
  const { formState, register } = useFormContext();
  const labelContainer = useRef<HTMLDivElement>(null);
  const error = formState.errors[name];

  return (
    <div className={`form-control my-3 w-full ${containerClassName}`}>
      <label>
        {!hideLabel && (
          <div className={`${error ? 'text-error' : 'text-neutral'} label`} ref={labelContainer}>
            <span className='label-text'>{label}</span>
          </div>
        )}
      </label>
      <div className='relative'>
        <input
          {...others}
          {...register(name)}
          placeholder={placeholder || label}
          disabled={disabled}
          className={`input input-bordered ${error ? 'border-error' : 'border-neutral'} w-full  ${endIcon && 'pr-10'} ${startIcon && 'pl-10'} ${className}`}
        />

        {!!startIcon && <span className={`absolute top-1/2 -translate-y-1/2 left-4 ${error && 'text-error'}`}>{startIcon}</span>}
        {!!endIcon && (
          <span onClick={onClickEndIcon} className={`absolute top-1/2 -translate-y-1/2 right-4 ${error && 'text-error'}`}>
            {endIcon}
          </span>
        )}
      </div>
      {error && (
        <div className='label'>
          <span className='label-text-alt text-error'>{error?.message?.toString()}</span>
        </div>
      )}
    </div>
  );
};
