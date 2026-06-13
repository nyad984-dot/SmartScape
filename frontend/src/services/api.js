import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 8000,
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('citySafetyToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const postAssistantMessage = async (content) => {
  const response = await api.post('/assistant/chat', { message: content })
  return response.data
}

export default api
