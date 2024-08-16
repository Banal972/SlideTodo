import { Slot } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const AuthLayout = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.testLogo}>로고</Text>
      <Slot />
    </View>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  testLogo: {
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
