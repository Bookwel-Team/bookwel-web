import { CrupdateReaction, ReactionStatus } from '@onitsiky/bookwel-typescript-client';
import { apiProvider } from '.';

export const reactionProvider = {
  reactCategory: async (categoryId: string, createReaction: CrupdateReaction) => {
    const response = await apiProvider.reactionApi().crupdateReactionToACategory(categoryId, createReaction);
    return response.data;
  },
  async reactToBook(bookId: string, userId: string, reaction: ReactionStatus) {
    const { data } = await apiProvider.reactionApi().crupdateReactionToABook(bookId, { reaction_status: reaction, reactor_id: userId });
    return data;
  },
  async getBookReactions(bookId: string) {
    const { data } = await apiProvider.reactionApi().getReactionsToABook(bookId);
    return data;
  },
  async getBookReaction(bookId: string, userId: string) {
    const { data } = await apiProvider.reactionApi().getReactionsToABook(bookId);
    return data.find(reaction => (reaction.reactor_id = userId));
  },
};
