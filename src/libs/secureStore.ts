import * as SecureStore from "expo-secure-store"

export async function saveStore(key: string, value: string) {
  return await SecureStore.setItemAsync(key, value)
}

export async function getStore(key: string) {
  return await SecureStore.getItemAsync(key)
}
