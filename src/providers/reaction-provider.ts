import { CategoryCrupdateReaction, CrupdateReaction } from '@onitsiky/bookwel-typescript-client';
import { apiProvider } from '.';

export const reactionProvider = {
  reactToCategory: async (createReactions: CategoryCrupdateReaction[]) => {
    const response = await apiProvider.reactionApi().crupdateReactionsToCategories(createReactions);
    return response.data;
  },
  async reactToBook(bookId: string, reaction: CrupdateReaction) {
    const { data } = await apiProvider.reactionApi().crupdateReactionToABook(bookId, reaction);
    return data;
  },
};
