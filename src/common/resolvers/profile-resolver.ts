import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';

const profileValidator = zod.object({
  email: zod.string().email().readonly(),
  firstName: zod.string().nullable(),
  lastName: zod.string().nullable(),
});

export const profileResolver = zodResolver(profileValidator);

export type TProfileInput = zod.infer<typeof profileValidator>;
