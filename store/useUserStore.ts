import * as SecureStore from "expo-secure-store"
import { saveStore } from "libs/secureStore"
import { create } from "zustand"

interface AuthState {
  token: string | null
  isAuthenticated: boolean
  login: (token: string) => Promise<void>
  logout: () => Promise<void>
}

const useUserStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  login: async (token) => {
    await saveStore("accessToken", token)
    set({ token, isAuthenticated: true })
  },
  logout: async () => {
    await SecureStore.deleteItemAsync("accessToken")
    set({ token: null, isAuthenticated: false })
  },
}))

export default useUserStore
