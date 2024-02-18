import { zodResolver } from '@hookform/resolvers/zod';
import zod from 'zod';
import { fieldErrorMessages } from '.';

export const bookSchema = zod.object({
  category: zod.string({ required_error: fieldErrorMessages.category_not_match }),
  picture: zod.any({ required_error: fieldErrorMessages.file_not_match }),
  book: zod.any({ required_error: fieldErrorMessages.file_not_match }),
});

export const bookResolver = zodResolver(bookSchema);

export type TBookInput = zod.infer<typeof bookSchema>;
