import { Slot } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

const AuthLayout = () => {
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
      <Slot />
    </View>
  );
};

export default AuthLayout;

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
});
