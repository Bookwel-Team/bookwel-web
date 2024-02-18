import { aiApi } from '.';

export const aiProvider = {
  chat: async (message: string) => {
    const { data } = await aiApi().chat(message);
    return data;
  },
};
