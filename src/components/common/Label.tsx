import { ReactNode } from "react";
import { Text, StyleSheet } from "react-native";

const Label = ({ children }: { children: ReactNode }) => {
  return <Text style={styles.textInputLabel}>{children}</Text>;
};

export default Label;

const styles = StyleSheet.create({
  textInputLabel: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "bold",
  },
});
