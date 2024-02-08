import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';

const loginValidator = zod.object({
  email: zod.string().email(),
  password: zod.string().min(7),
});

export const loginResolver = zodResolver(loginValidator);

export type TLoginInput = zod.infer<typeof loginValidator>;
