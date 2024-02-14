import { apiProvider } from '.';

export const aiProvider = {
  chat: async (message: string) => {
    const { data } = await apiProvider.aiApi().chat(message);
    return data;
  },
};
