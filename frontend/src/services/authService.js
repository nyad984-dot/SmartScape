import api from './api'

const TOKEN_KEY = 'citySafetyToken'
const USER_KEY = 'citySafetyUser'

const getSavedUser = () => JSON.parse(localStorage.getItem(USER_KEY) || 'null')

export const authService = {
  getCurrentUser() {
    return localStorage.getItem(TOKEN_KEY) ? getSavedUser() : null
  },
  async login(credentials) {
    if (credentials.email === 'danya@gmail.com' && credentials.password === 'danya123456789') {
      const adminUser = {
        name: 'Danya',
        email: 'danya@gmail.com',
        avatar: 'D',
        district: 'Almaty City Council',
        stats: [
          { label: 'Reports filed', value: 42 },
          { label: 'Resolved', value: 38 },
          { label: 'Impact score', value: 99 },
        ],
      }
      localStorage.setItem(TOKEN_KEY, 'mock-token')
      localStorage.setItem(USER_KEY, JSON.stringify(adminUser))
      return { user: adminUser, token: 'mock-token' }
    }

    const savedUser = getSavedUser()

    if (!savedUser) {
      throw new Error('User not found')
    }

    if (savedUser.email !== credentials.email || savedUser.password !== credentials.password) {
      throw new Error('Invalid email or password')
    }

    localStorage.setItem(TOKEN_KEY, 'mock-token')
    return { user: savedUser, token: 'mock-token' }
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
