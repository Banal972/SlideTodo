import BaseContainer from "@/components/common/Container/BaseContainer";
import Color from "@/constant/color";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, Image, Pressable, ScrollView } from "react-native";

const Note = () => {
  return (
    <ScrollView>
      <View style={{ gap: 16, padding: 16 }}>
        <BaseContainer color="white">
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Color.blue100,
              }}
            >
              <Image source={require("@/assets/images/goal/flip.png")} />
            </View>
            <Pressable>
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={Color.slate400}
              />
            </Pressable>
          </View>
          <Text
            style={{
              marginTop: 16,
              fontSize: 18,
              fontWeight: "500",
              color: Color.slate800,
            }}
          >
            자바스크립트를 배우기 전 알아두어야 할 것
          </Text>
          <View
            style={{
              marginVertical: 12,
              height: 1,
              width: "100%",
              backgroundColor: Color.slate200,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                backgroundColor: Color.slate100,
                paddingHorizontal: 3,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              To do
            </Text>
            <Text style={{ fontSize: 12, color: Color.slate700 }}>
              자바스크립트 기초 챕터1 듣기
            </Text>
          </View>
        </BaseContainer>
        <BaseContainer color="white">
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Color.blue100,
              }}
            >
              <Image source={require("@/assets/images/goal/flip.png")} />
            </View>
            <Pressable>
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={Color.slate400}
              />
            </Pressable>
          </View>
          <Text
            style={{
              marginTop: 16,
              fontSize: 18,
              fontWeight: "500",
              color: Color.slate800,
            }}
          >
            자바스크립트를 배우기 전 알아두어야 할 것
          </Text>
          <View
            style={{
              marginVertical: 12,
              height: 1,
              width: "100%",
              backgroundColor: Color.slate200,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                backgroundColor: Color.slate100,
                paddingHorizontal: 3,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              To do
            </Text>
            <Text style={{ fontSize: 12, color: Color.slate700 }}>
              자바스크립트 기초 챕터1 듣기
            </Text>
          </View>
        </BaseContainer>
        <BaseContainer color="white">
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Color.blue100,
              }}
            >
              <Image source={require("@/assets/images/goal/flip.png")} />
            </View>
            <Pressable>
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={Color.slate400}
              />
            </Pressable>
          </View>
          <Text
            style={{
              marginTop: 16,
              fontSize: 18,
              fontWeight: "500",
              color: Color.slate800,
            }}
          >
            자바스크립트를 배우기 전 알아두어야 할 것
          </Text>
          <View
            style={{
              marginVertical: 12,
              height: 1,
              width: "100%",
              backgroundColor: Color.slate200,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                backgroundColor: Color.slate100,
                paddingHorizontal: 3,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              To do
            </Text>
            <Text style={{ fontSize: 12, color: Color.slate700 }}>
              자바스크립트 기초 챕터1 듣기
            </Text>
          </View>
        </BaseContainer>
        <BaseContainer color="white">
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Color.blue100,
              }}
            >
              <Image source={require("@/assets/images/goal/flip.png")} />
            </View>
            <Pressable>
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={Color.slate400}
              />
            </Pressable>
          </View>
          <Text
            style={{
              marginTop: 16,
              fontSize: 18,
              fontWeight: "500",
              color: Color.slate800,
            }}
          >
            자바스크립트를 배우기 전 알아두어야 할 것
          </Text>
          <View
            style={{
              marginVertical: 12,
              height: 1,
              width: "100%",
              backgroundColor: Color.slate200,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                backgroundColor: Color.slate100,
                paddingHorizontal: 3,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              To do
            </Text>
            <Text style={{ fontSize: 12, color: Color.slate700 }}>
              자바스크립트 기초 챕터1 듣기
            </Text>
          </View>
        </BaseContainer>
        <BaseContainer color="white">
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Color.blue100,
              }}
            >
              <Image source={require("@/assets/images/goal/flip.png")} />
            </View>
            <Pressable>
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={Color.slate400}
              />
            </Pressable>
          </View>
          <Text
            style={{
              marginTop: 16,
              fontSize: 18,
              fontWeight: "500",
              color: Color.slate800,
            }}
          >
            자바스크립트를 배우기 전 알아두어야 할 것
          </Text>
          <View
            style={{
              marginVertical: 12,
              height: 1,
              width: "100%",
              backgroundColor: Color.slate200,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                backgroundColor: Color.slate100,
                paddingHorizontal: 3,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              To do
            </Text>
            <Text style={{ fontSize: 12, color: Color.slate700 }}>
              자바스크립트 기초 챕터1 듣기
            </Text>
          </View>
        </BaseContainer>
        <BaseContainer color="white">
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Color.blue100,
              }}
            >
              <Image source={require("@/assets/images/goal/flip.png")} />
            </View>
            <Pressable>
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={Color.slate400}
              />
            </Pressable>
          </View>
          <Text
            style={{
              marginTop: 16,
              fontSize: 18,
              fontWeight: "500",
              color: Color.slate800,
            }}
          >
            자바스크립트를 배우기 전 알아두어야 할 것
          </Text>
          <View
            style={{
              marginVertical: 12,
              height: 1,
              width: "100%",
              backgroundColor: Color.slate200,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                backgroundColor: Color.slate100,
                paddingHorizontal: 3,
                paddingVertical: 2,
                borderRadius: 4,
              }}
            >
              To do
            </Text>
            <Text style={{ fontSize: 12, color: Color.slate700 }}>
              자바스크립트 기초 챕터1 듣기
            </Text>
          </View>
        </BaseContainer>
      </View>
    </ScrollView>
  );
};

export default Note;
