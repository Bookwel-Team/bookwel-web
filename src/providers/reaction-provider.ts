import { CrupdateReaction } from '@onitsiky/bookwel-typescript-client';
import { apiProvider } from '.';

export const reactionProvider = {
  reactCategory: async (categoryId: string, createReaction: CrupdateReaction) => {
    const response = await apiProvider.reactionApi.crupdateReactionToACategory(categoryId, createReaction);
    return response.data;
  },
};
