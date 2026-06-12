import { userProfile } from '../utils/mockData'

const TOKEN_KEY = 'citySafetyToken'
const USER_KEY = 'citySafetyUser'

const getSavedUser = () => JSON.parse(localStorage.getItem(USER_KEY) || 'null')

export const authService = {
  getCurrentUser() {
    return localStorage.getItem(TOKEN_KEY) ? getSavedUser() || userProfile : null
  },
  async login(credentials) {
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

    localStorage.setItem(TOKEN_KEY, 'mock-token')
    localStorage.setItem(USER_KEY, JSON.stringify(user))

    return { user, token: 'mock-token' }
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY)
  },
}
