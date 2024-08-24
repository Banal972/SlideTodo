import * as SecureStore from "expo-secure-store"

const logout = async () => {
  SecureStore.deleteItemAsync("accessToken")
}

export default logout
