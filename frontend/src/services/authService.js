import api from './api'

const TOKEN_KEY = 'citySafetyToken'
const USER_KEY = 'citySafetyUser'

const getSavedUser = () => JSON.parse(localStorage.getItem(USER_KEY) || 'null')

export const authService = {
  getCurrentUser() {
    return localStorage.getItem(TOKEN_KEY) ? getSavedUser() : null
  },
  async login(credentials) {
    try {
      const response = await api.post('/api/auth/login', {
        phone: credentials.phone,
        password: credentials.password
      })
      
      // The backend returns the token directly as a string or in an object.
      // Based on common patterns and the user's prompt about "returning the key", 
      // let's assume it's response.data or response.data.token.
      const token = typeof response.data === 'string' ? response.data : response.data.token;
      
      if (!token) throw new Error('No token received');

      localStorage.setItem(TOKEN_KEY, token)
      
      // Since there's no profile endpoint, we store what we know
      const userData = { phone: credentials.phone, role: 'CITIZEN' }
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
      
      return { user: userData, token }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed'
      throw new Error(message)
    }
  },
  async register(values) {
    try {
      await api.post('/api/auth/register', {
        phone: values.phone,
        password: values.password,
        role: 'CITIZEN'
      })

      // After successful registration, automatically login
      return await this.login({
        phone: values.phone,
        password: values.password
      })
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Registration failed'
      throw new Error(message)
    }
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
}
