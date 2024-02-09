import axios from 'axios';

export const aiProvider = {
  chat: async (message: string) => {
    const { data } = await axios.post(`${import.meta.env.VITE_APP_API_URL}/chats`, message);
    return data;
  },
};
