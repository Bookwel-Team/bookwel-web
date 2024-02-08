import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import { fieldErrorMessages } from '.';

const signUpValidator = zod
  .object({
    email: zod.string().email(),
    password: zod.string().min(7, { message: fieldErrorMessages.password_too_sort }),
    confirmPassword: zod.string().min(7, { message: fieldErrorMessages.password_too_sort }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, { message: fieldErrorMessages.password_not_match, path: ['confirmPassword'] });

export const signUpResolver = zodResolver(signUpValidator);

export type TSignUpInput = zod.infer<typeof signUpValidator>;
