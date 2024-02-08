import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import { fieldErrorMessages } from '.';

const signUpValidator = zod
  .object({
    email: zod.string().email(),
    password: zod.string().min(7, { message: fieldErrorMessages.password_too_sort }),
    confirm: zod.string(),
  })
  .refine(({ password, confirm }) => password === confirm, fieldErrorMessages.password_not_match);

export const signUpResolver = zodResolver(signUpValidator);

export type TSignUpInput = zod.infer<typeof signUpValidator>;
