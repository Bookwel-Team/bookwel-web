import { ReactionStatus } from '@onitsiky/bookwel-typescript-client';
import { apiProvider } from '.';

export const reactionProvider = {
  async reactToBook(bookId: string, userId: string, reaction: ReactionStatus) {
    const { data } = await apiProvider.reactionApi().crupdateReactionToABook(bookId, { reaction_status: reaction, reactor_id: userId });
    return data;
  },
};
