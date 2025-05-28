import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/lib/axios'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<any>(null)
  const router = useRouter()

  async function login(username: string, password: string) {
    try {
      const res = await api.post('/auth/login', { username, password })

      token.value = res.data.token
      user.value = res.data.user
      localStorage.setItem('token', res.data.token)

      router.push('/')
    } catch (err: any) {
      console.error(err)
      throw new Error(err.response?.data?.message || 'Login failed')
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  return { token, user, login, logout }
})