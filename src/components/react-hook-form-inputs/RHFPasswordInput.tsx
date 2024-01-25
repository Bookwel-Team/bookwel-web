import { FC, useState } from 'react';
import { FaEye as FaEyeIcon, FaEyeSlash as FaEyeSlashIcon } from 'react-icons/fa';
import { RHFTextInput } from '..';
import { PasswordInputProps } from './types';

/**
 * React-Hook-Form-Password-Input
 *
 * Password input that work only under FormProvider by react hook form.
 * Need at least to specify the name and the label.
 *
 * @example
 * function App() {
 *  const form = useForm();
 *  return (
 *    <FormProvider {...form}>
 *      <RHFPasswordInput name="password" label="Password" />
 *    </FormProvider>
 * )
 * }
 */
export const RHFPasswordInput: FC<PasswordInputProps> = props => {
  const [isVisible, setIsVisible] = useState(false);

  const icon = isVisible ? <FaEyeIcon /> : <FaEyeSlashIcon />;
  const type = isVisible ? 'text' : 'password';

  const toggleVisibility = () => setIsVisible(value => !value);

  return <RHFTextInput type={type} {...props} endIcon={<span className='cursor-pointer'>{icon}</span>} onClickEndIcon={toggleVisibility} />;
};
