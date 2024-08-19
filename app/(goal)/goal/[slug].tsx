import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import BaseContainer from "@/components/common/Container/BaseContainer";
import Color from "@/constant/color";
import Process from "@/components/page/goal/Process";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import CheckList from "@/components/common/CheckList";

const GoalDetail = () => {
  const router = useRouter();

  return (
    <View style={{ padding: 16, gap: 16 }}>
      <BaseContainer color="white">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: Color.slate800,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <Image source={require("@/assets/images/goal/icon01.png")} />
            </View>
            <Text
              style={{ fontSize: 16, fontWeight: "600", color: Color.slate800 }}
            >
              자바스크립트로 웹 서비스 만들기
            </Text>
          </View>
          <Pressable>
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color={Color.slate400}
            />
          </Pressable>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 12, fontWeight: "600", color: "#0F172A" }}>
            진행율
          </Text>
          <Process />
        </View>
      </BaseContainer>
      <Pressable onPress={() => router.push("/")}>
        <BaseContainer
          color={Color.blue100}
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
            <Image source={require("@/assets/images/goal/note.png")} />
            <Text
              style={{
                color: Color.slate800,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              노트 모아보기
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={Color.slate600} />
        </BaseContainer>
      </Pressable>
      <BaseContainer color="white">
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: "bold", color: Color.slate800 }}
          >
            To do
          </Text>
          <Pressable>
            <Text
              style={{ color: Color.blue500, fontSize: 14, fontWeight: "600" }}
            >
              + 할일 추가
            </Text>
          </Pressable>
        </View>
        <View style={{ gap: 8, marginTop: 16 }}>
          <CheckList label="자바스크립트 기초 1" />
          <CheckList label="자바스크립트 기초 2" />
          <CheckList label="자바스크립트 기초 3" />
          <CheckList label="자바스크립트 기초 4" />
          <CheckList label="자바스크립트 기초 5" />
        </View>
      </BaseContainer>
      <BaseContainer color={Color.slate200}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{ fontSize: 18, fontWeight: "bold", color: Color.slate800 }}
          >
            Done
          </Text>
        </View>
        <View style={{ gap: 8, marginTop: 16 }}>
          <CheckList label="자바스크립트 기초 1" />
          <CheckList label="자바스크립트 기초 2" />
          <CheckList label="자바스크립트 기초 3" />
          <CheckList label="자바스크립트 기초 4" />
          <CheckList label="자바스크립트 기초 5" />
        </View>
      </BaseContainer>
    </View>
  );
};

export default GoalDetail;
