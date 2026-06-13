import { userProfile } from '../utils/mockData'

const TOKEN_KEY = 'citySafetyToken'
const USER_KEY = 'citySafetyUser'

const getSavedUser = () => JSON.parse(localStorage.getItem(USER_KEY) || 'null')

export const authService = {
  getCurrentUser() {
    return localStorage.getItem(TOKEN_KEY) ? getSavedUser() || userProfile : null
  },
  async login(credentials) {
    if (credentials.email === 'danya@gmail.com' && credentials.password === 'danya123456789') {
      const adminUser = {
        name: 'Danya',
        email: 'danya@gmail.com',
        role: 'ADMIN',
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
    const user = {
      ...userProfile,
      name: values.name,
      email: values.email,
      password: values.password,
    }

    const generatedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + btoa(values.email) + '.' + Math.random().toString(36).substring(2, 15);

    localStorage.setItem(TOKEN_KEY, generatedToken)
    localStorage.setItem(USER_KEY, JSON.stringify(user))

    return { user, token: generatedToken }
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY)
  },
}
