import BaseContainer from "@/components/page/dashboard/common/BaseContainer";
import BaseTitle from "@/components/page/dashboard/common/BaseTitle";
import Color from "@/constant/color";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CheckList from "@/components/common/CheckList";

const GoalList = () => {
  return (
    <BaseContainer color="white" style={{ gap: 16 }}>
      <BaseTitle
        baseIcon={{
          color: Color.orange500,
          source: require("@/assets/images/dashboard/icon02.png"),
        }}
        title="목표 별 할 일"
      />

      <View style={styles.goalListCotanier}>
        <View style={styles.goalListFlex}>
          <Text style={styles.goalListTitle}>
            자바스크립트로 웹 서비스 만들기
          </Text>
          <Link href={"/"}>
            <View style={styles.goalListLinkFlex}>
              <Ionicons name="add" size={24} color={Color.blue500} />
              <Text style={styles.goalListLink}>할일 추가</Text>
            </View>
          </Link>
        </View>

        <View style={styles.processContainer}>
          <View style={styles.processBox}>
            <View style={styles.processLine} />
          </View>
          <Text style={styles.processPercent}>64%</Text>
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={styles.goalViewTitle}>To do</Text>
          <View style={styles.goalView}>
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={styles.goalViewTitle}>Done</Text>
          <View style={styles.goalView}>
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
          </View>
        </View>
      </View>

      <View style={styles.goalListCotanier}>
        <View style={styles.goalListFlex}>
          <Text style={styles.goalListTitle}>
            자바스크립트로 웹 서비스 만들기
          </Text>
          <Link href={"/"}>
            <View style={styles.goalListLinkFlex}>
              <Ionicons name="add" size={24} color={Color.blue500} />
              <Text style={styles.goalListLink}>할일 추가</Text>
            </View>
          </Link>
        </View>

        <View style={styles.processContainer}>
          <View style={styles.processBox}>
            <View style={styles.processLine} />
          </View>
          <Text style={styles.processPercent}>64%</Text>
        </View>

        <View style={{ marginTop: 16 }}>
          <Text style={styles.goalViewTitle}>To do</Text>
          <View style={styles.goalView}>
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={styles.goalViewTitle}>Done</Text>
          <View style={styles.goalView}>
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
            <CheckList label="자바스크립트 기초 챕터4 듣기" />
          </View>
        </View>
      </View>
    </BaseContainer>
  );
};

export default GoalList;

const styles = StyleSheet.create({
  goalListCotanier: {
    backgroundColor: Color.blue50,
    padding: 24,
    borderRadius: 32,
  },
  goalListFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  goalListTitle: {
    color: Color.slate800,
    fontSize: 16,
    fontWeight: "bold",
  },
  goalListLinkFlex: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  goalListLink: {
    color: Color.blue500,
    fontSize: 12,
    fontWeight: "600",
  },
  goalViewTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  goalView: {
    flexDirection: "column",
    gap: 8,
    marginTop: 12,
  },
  processContainer: {
    marginTop: 8,
    gap: 8,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 2,
    borderRadius: 100,
  },
  processBox: {
    position: "relative",
    flex: 1,
    height: 4,
    borderRadius: 6,
    backgroundColor: Color.slate100,
  },
  processLine: {
    position: "absolute",
    width: "50%",
    height: "100%",
    borderRadius: 6,
    top: 0,
    left: 0,
    backgroundColor: Color.slate900,
  },
  processPercent: {
    color: "#0F172A",
    fontSize: 12,
    fontWeight: "600",
  },
});
