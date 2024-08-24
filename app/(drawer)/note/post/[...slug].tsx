import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Alert, Image, Pressable, Text, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"

import Color from "@/constant/color"
import useGetUser from "@/hooks/useGetUser"
import useNotePostStore from "@/store/useNotePostStore"
import { useLocalSearchParams, useRouter } from "expo-router"
import { addDoc, collection, doc, getDoc, query, where } from "firebase/firestore"
import { db } from "firebaseConfig"

type FormData = {
  title: string
  content: string
}

const NotePost = () => {
  const {
    slug: [goalId, todoId],
  } = useLocalSearchParams<{ slug: string[] }>()

  const router = useRouter()

  const { todoName } = useNotePostStore()
  const { user } = useGetUser()

  const [goalTitle, setGoalTitle] = useState("")

  useEffect(() => {
    const fetch = async () => {
      const goalSnap = await getDoc(doc(db, "goals", goalId))

      if (goalSnap.exists()) {
        const { title } = goalSnap.data()
        setGoalTitle(title)
      }
    }

    fetch()
  }, [goalId, todoId])

  const { control, handleSubmit, watch } = useForm<FormData>()
  const titleWatch = watch("title")
  const contentWatch = watch("content")

  /* const onSubmit = handleSubmit(async (data) => {
    const { title, content } = data

    if (!goalId || !todoId) return Alert.alert("알수없는 오류")

    if (!user) return Alert.alert("로그인 오류")

    if (!title || !content) return Alert.alert("작성 실패", "빈칸이 있습니다")

    try {
      await addDoc(collection(db, "notes"), {
        uid: user.uid,
        title,
        content,
        todo_ID: todoId,
        goal_ID: goalId,
        createDate: new Date(),
      })
      router.back()
    } catch (e) {
      console.log(e)
    }
  }) */

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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 11,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600", color: Color.slate900 }}>노트 작성</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <Pressable
            style={{
              width: 84,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 12,
            }}
          >
            <Text style={{ color: Color.blue500, fontSize: 14, fontWeight: 600 }}>임시 저장</Text>
          </Pressable>
          <Pressable
            // onPress={onSubmit}
            style={{
              width: 84,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Color.slate400,
              borderRadius: 12,
            }}
          >
            <Text style={{ color: "white", fontSize: 14, fontWeight: 600 }}>작성 완료</Text>
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
        <Text style={{ fontSize: 16, fontWeight: "500", color: Color.slate800 }}>{goalTitle}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginTop: 12,
          alignItems: "center",
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
        <Text style={{ fontSize: 14, color: Color.slate700 }}>{todoName}</Text>
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
          alignItems: "center",
          gap: 10,
        }}
      >
        <Controller
          control={control}
          name="title"
          rules={{
            maxLength: 30,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="노트의 제목을 입력해주세요"
              maxLength={30}
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: Color.slate900,
                flexGrow: 1,
              }}
            />
          )}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: Color.slate800, fontSize: 12, fontWeight: "500" }}>
            {titleWatch ? titleWatch.length : 0}/
          </Text>
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
            공백포함 : 총 {contentWatch ? contentWatch.length : 0}자 | 공백제외 : 총{" "}
            {contentWatch ? contentWatch.trim().length : 0}자
          </Text>
          <Controller
            name="content"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
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
            )}
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
