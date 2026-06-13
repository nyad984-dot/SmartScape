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
      
      const token = response.data
      localStorage.setItem(TOKEN_KEY, token)

      // Since the backend doesn't return user details yet, we create a mock user object
      const user = {
        phone: credentials.phone,
        name: 'User ' + credentials.phone,
        role: 'ADMIN' // Defaulting to ADMIN to see the dashboard properly for now
      }
      localStorage.setItem(USER_KEY, JSON.stringify(user))

      return { user, token }
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || error.message || 'Login failed'
      throw new Error(typeof message === 'string' ? message : 'Login failed')
    }
  },
  async register(values) {
    try {
      await api.post('/api/auth/register', {
        phone: values.phone,
        password: values.password,
        role: 'CITIZEN' // or 'ADMIN' depending on needs
      })

      // After successful registration, automatically login
      return await this.login({
        phone: values.phone,
        password: values.password
      })
    } catch (error) {
      const message = error.response?.data?.message || error.response?.data || error.message || 'Registration failed'
      throw new Error(typeof message === 'string' ? message : 'Registration failed')
    }
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
}
