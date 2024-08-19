import BaseContainer from "@/components/common/Container/BaseContainer";
import BaseTitle from "@/components/page/dashboard/common/BaseTitle";
import Color from "@/constant/color";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CheckList from "@/components/common/CheckList";
import Process from "@/components/page/goal/Process";

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
          <Link href={"/goal/1"} style={styles.goalListTitle}>
            자바스크립트로 웹 서비스 만들기
          </Link>
          <Link href={"/"}>
            <View style={styles.goalListLinkFlex}>
              <Ionicons name="add" size={24} color={Color.blue500} />
              <Text style={styles.goalListLink}>할일 추가</Text>
            </View>
          </Link>
        </View>

        <Process />

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

        <Process />

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
});
