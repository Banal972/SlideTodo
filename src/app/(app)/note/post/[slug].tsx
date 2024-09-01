import { useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { DEFAULT_TOOLBAR_ITEMS, RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor"
import Color from "@/constant/color"
import usePostNote from "@/hooks/note/usePostNote"
import usePostNoteStore from "@/store/usePostNoteStore"
import { useQueryClient } from "@tanstack/react-query"
import { useLocalSearchParams, useRouter } from "expo-router"

type FormData = {
  title: string
  content: string
}

const NotePostPage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
  })

  const customToolbarItems = DEFAULT_TOOLBAR_ITEMS.filter((_, index) => index !== 2)

  const { slug } = useLocalSearchParams<{ slug: string }>()

  const { control, watch, handleSubmit } = useForm<FormData>()
  const titleWatch = watch("title")
  const contentWatch = watch("content")

  const { data } = usePostNoteStore()
  const { mutate } = usePostNote(queryClient, router)

  const { top } = useSafeAreaInsets()
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height
  const headerHeight = isLandscape ? 32 : 44
  const keyboardVerticalOffset = headerHeight + top

  const onSubmit = handleSubmit((data) => {
    mutate({
      ...data,
      todoId: Number(slug),
      linkUrl: "https://banal972.github.io/",
    })
  })

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: 11,
          paddingHorizontal: 16,
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
              onPress={onSubmit}
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
          <Text style={{ fontSize: 16, fontWeight: "500", color: Color.slate800 }}>
            {data.title}
          </Text>
          <Pressable
            style={{
              width: 24,
              height: 24,
              borderRadius: 1000,
              backgroundColor: Color.slate200,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image source={require("@/assets/images/icon/link_alt.png")} />
          </Pressable>
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
          <Text style={{ fontSize: 14, color: Color.slate700 }}>{data.todoTitle}</Text>
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
              {contentWatch ? contentWatch.replace(/\s/g, "").length : 0}자
            </Text>

            <View style={{ flex: 1 }}>
              <RichText editor={editor} />
            </View>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          position: "absolute",
          width: "100%",
          bottom: 0,
        }}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <Toolbar editor={editor} items={customToolbarItems} />
      </KeyboardAvoidingView>
    </View>
  )
}

export default NotePostPage
