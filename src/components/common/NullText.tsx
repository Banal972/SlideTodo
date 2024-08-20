import Color from "@/constant/color";
import { ReactNode } from "react";
import { Text } from "react-native";

const NullText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      style={{
        textAlign: "center",
        fontSize: 14,
        color: Color.slate500,
        paddingTop: 30,
        paddingBottom: 60,
      }}
    >
      {children}
    </Text>
  );
};

export default NullText;
