import { StyleSheet, Text, View } from "react-native"

import Color from "constant/color"
import { Link } from "expo-router"

const BottomLink = ({
  label,
  linkHref,
  linkLabel,
}: {
  label: string
  linkHref: string
  linkLabel: string
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 40,
        justifyContent: "center",
        gap: 4,
      }}
    >
      <Text style={styles.sign}>{label}</Text>
      <Link href={linkHref} style={styles.signLink}>
        {linkLabel}
      </Link>
    </View>
  )
}

export default BottomLink

const styles = StyleSheet.create({
  sign: {
    textAlign: "center",
    color: Color.slate800,
    fontSize: 14,
    fontWeight: "medium",
  },
  signLink: {
    color: "#3182F6",
    fontWeight: "medium",
    fontSize: 14,
  },
})
