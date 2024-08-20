import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native"

import Color from "@/constant/color"
import Octicons from "@expo/vector-icons/Octicons"
import { Link } from "expo-router"

const BaseTitle = ({
  baseIcon,
  title,
  linkURL,
}: {
  baseIcon: {
    color?: string
    source?: ImageSourcePropType
  }
  title?: string
  linkURL?: string
}) => {
  return (
    <View style={styles.baseGrid}>
      <View style={styles.baseTitleGrid}>
        <View style={[styles.baseIcon, { backgroundColor: baseIcon.color }]}>
          {baseIcon.source && (
            <View style={styles.imagePosition}>
              <Image source={baseIcon.source} />
            </View>
          )}
        </View>
        <Text style={styles.baseTitle}>{title}</Text>
      </View>
      {linkURL && (
        <Link href={linkURL}>
          <View style={styles.baseLinkContainer}>
            <Text style={styles.baseLink}>모두 보기</Text>
            <Octicons name="chevron-right" size={24} color="#4B5563" />
          </View>
        </Link>
      )}
    </View>
  )
}

export default BaseTitle

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  baseGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  baseTitleGrid: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  baseTitle: {
    color: Color.slate800,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  baseLinkContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  baseLink: {
    color: "#4B5563",
    fontSize: 14,
    fontWeight: "500",
  },
  baseIcon: {
    width: 40,
    height: 40,
    borderRadius: 15,
    position: "relative",
  },
  imagePosition: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
})
