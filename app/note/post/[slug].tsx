import { Button, Image, Pressable, Text, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"

import Color from "@/constant/color"
import { useLocalSearchParams } from "expo-router"

const NotePost = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  return (
    <View
      style={{
        paddingTop: 11,
        paddingHorizontal: 16,
        paddingBottom: 24,
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontSize: 16, fontWeight: "600", color: Color.slate900 }}>노트 작성</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable>
            <Text>임시 저장</Text>
          </Pressable>
          <Pressable>
            <Text>작성 완료</Text>
          </Pressable>
        </View>
      </View>

      <View
        style={{
          marginTop: 11,
          flexDirection: "row",
          gap: 6,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
          }}
        >
          <Image
            style={{ width: 16, height: 16 }}
            source={require("@/assets/images/goal/icon01.png")}
          />
        </View>
        <Text style={{ fontSize: 16, fontWeight: "500", color: Color.slate800 }}>
          자바스크립트로 웹 서비스 만들기
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginTop: 12,
        }}
      >
        <View
          style={{
            paddingHorizontal: 2,
            paddingVertical: 3,
            backgroundColor: Color.slate100,
            borderRadius: 4,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "500", color: Color.slate700 }}>To do</Text>
        </View>
        <Text style={{ fontSize: 14, color: Color.slate700 }}>자바스크립트 기초 챕터1 듣기</Text>
      </View>

      <View
        style={{
          marginTop: 16,
          paddingVertical: 8,
          flexDirection: "row",
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: Color.slate200,
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <TextInput
          style={{
            fontSize: 16,
            fontWeight: "500",
            color: Color.slate900,
            flexGrow: 1,
          }}
          placeholder="노트의 제목을 입력해주세요"
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: Color.slate800, fontSize: 12, fontWeight: "500" }}>0/</Text>
          <Text style={{ color: Color.blue500, fontSize: 12, fontWeight: "500" }}>30</Text>
        </View>
      </View>

      <View style={{ flex: 0.95 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 12,
              marginTop: 12,
              marginBottom: 8,
              fontWeight: "500",
              color: Color.slate800,
            }}
          >
            공백포함 : 총 0자 | 공백제외 : 총 0자
          </Text>
          <TextInput
            style={{
              fontSize: 16,
              color: Color.slate900,
              flexGrow: 1,
            }}
            multiline
            editable
            placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
            placeholderTextColor={Color.slate400}
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderRadius: 1000,
            borderColor: Color.slate200,
            height: 44,
            width: "100%",
          }}
        />
      </View>
    </View>
  )
}

export default NotePost
