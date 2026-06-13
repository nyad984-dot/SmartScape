import api from './api';

export const assistantService = {
  async sendMessage(message) {
    try {
      const response = await api.post('/api/ai/chat', { message });
      return response.data.reply;
    } catch (error) {
      console.error('AI chat error:', error);
      return 'Sorry, I am having trouble connecting to the server right now.';
    }
  },
}

