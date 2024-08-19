import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { ReactNode } from "react";

const BaseContainer = ({
  children,
  color,
  style,
}: {
  children?: ReactNode;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <View style={[{ backgroundColor: color }, styles.baseContainer, style]}>
      {children}
    </View>
  );
};

export default BaseContainer;

const styles = StyleSheet.create({
  baseContainer: {
    borderRadius: 12,
    padding: 16,
    overflow: "hidden",
  },
});
