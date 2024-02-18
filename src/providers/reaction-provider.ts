import { CategoryCrupdateReaction, CrupdateReaction } from '@onitsiky/bookwel-typescript-client';
import { reactionApi } from '.';

export const reactionProvider = {
  async reactToCategory(createReactions: CategoryCrupdateReaction[]) {
    const response = await reactionApi().crupdateReactionsToCategories(createReactions);
    return response.data;
  },
  async reactToBook(bookId: string, reaction: CrupdateReaction) {
    const { data } = await reactionApi().crupdateReactionToABook(bookId, reaction);
    return data;
  },
};
