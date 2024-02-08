import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import { fieldErrorMessages } from '.';

const loginValidator = zod.object({
  email: zod.string().email(),
  password: zod.string().min(7, { message: fieldErrorMessages.password_too_sort }),
});

export const loginResolver = zodResolver(loginValidator);

export type TLoginInput = zod.infer<typeof loginValidator>;
