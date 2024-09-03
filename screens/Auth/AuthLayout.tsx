import { ReactNode } from "react"
import { Image, StyleSheet, View } from "react-native"

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          marginHorizontal: "auto",
          marginBottom: 40,
        }}
      >
        <Image source={require("@/assets/images/logo.png")} />
      </View>
      {children}
    </View>
  )
}

export default AuthLayout

const styles = StyleSheet.create({
  logo: {
    fontSize: 48,
    textAlign: "center",
    fontWeight: "black",
    marginBottom: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
  },
})
