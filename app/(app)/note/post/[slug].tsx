import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"

import { DEFAULT_TOOLBAR_ITEMS, RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import Button from "components/common/Button"
import Input from "components/common/Input"
import Color from "constant/color"
import { useLocalSearchParams, useRouter } from "expo-router"
import usePostNote from "hooks/note/usePostNote"
import usePostNoteStore from "store/usePostNoteStore"

type FormData = {
  title: string
  content: string
  linkUrl: string
}

const NotePostPage = () => {
  const [isModal, setIsModal] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()

  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    onChange: async () => {
      const content = await editor.getText()

      const withSpaces = content.length
      const withoutSpaces = content.replace(/\s/g, "").length

      setCharCount({ withSpaces, withoutSpaces })
    },
  })

  const customToolbarItems = DEFAULT_TOOLBAR_ITEMS.filter((_, index) => index !== 2)

  const { slug } = useLocalSearchParams<{ slug: string }>()

  const { control, watch, handleSubmit, reset } = useForm<FormData>()
  const titleWatch = watch("title")

  const { data } = usePostNoteStore()
  const { mutate } = usePostNote(queryClient, router, reset, editor)

  const { top } = useSafeAreaInsets()
  const { width, height } = useWindowDimensions()
  const isLandscape = width > height
  const headerHeight = isLandscape ? 32 : 44
  const keyboardVerticalOffset = headerHeight + top

  const [charCount, setCharCount] = useState({ withSpaces: 0, withoutSpaces: 0 })

  const onSubmit = handleSubmit(async (data) => {
    const content = await editor.getHTML()
    mutate({
      ...data,
      todoId: Number(slug),
      content,
    })
  })

  return (
    <>
      <View className="bg-white flex-1">
        <View className="pt-[11px] px-4 flex-1">
          <View className="flex-row justify-between py-[11px] items-center">
            <Text className="text-base font-semibold text-slate-900">노트 작성</Text>
            <View className="flex-row" style={{ gap: 8 }}>
              <TouchableOpacity
                onPress={onSubmit}
                className="w-[84px] h-9 items-center justify-center bg-slate-400 rounded-xl"
              >
                <Text className="text-white text-sm font-semibold">작성 완료</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            className="mt-[11px] flex-row items-center"
            style={{
              gap: 6,
            }}
          >
            <View className="w-6 h-6 rounded-md items-center justify-center bg-black">
              <Image className="w-4 h-4" source={require("@/assets/images/goal/icon01.png")} />
            </View>
            <View className="justify-between flex-1 flex-row">
              <Text className="text-base font-medium text-slate-800">{data.title}</Text>
              <TouchableOpacity
                onPress={() => setIsModal(!isModal)}
                className="w-6 h-6 rounded-full bg-slate-200 items-center justify-center"
              >
                <Image source={require("@/assets/images/icon/link_alt.png")} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            className="flex-row mt-3 items-center"
            style={{
              gap: 8,
            }}
          >
            <View className="py-[3px] px-[2px] bg-slate-100 rounded items-center">
              <Text className="text-sm font-medium text-slate-700">To do</Text>
            </View>
            <Text className="text-sm text-slate-700">{data.todoTitle}</Text>
          </View>

          <View
            className="mt-4 px-2 flex-row border-t border-b border-slate-200 justify-between items-center"
            style={{
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
                  className="text-base font-medium text-slate-900 flex-grow py-2"
                />
              )}
            />
            <View className="flex-row">
              <Text className=" text-slate-800 text-xs font-medium">
                {titleWatch ? titleWatch.length : 0} /
              </Text>
              <Text className="text-blue-500 text-xs font-medium"> 30</Text>
            </View>
          </View>

          <View style={{ flex: 0.95 }}>
            <View className="flex-1">
              <Text className="text-sm mt-3 mb-2 font-medium text-slate-800">
                공백포함 : 총 {charCount.withSpaces}자 | 공백제외 : 총{charCount.withoutSpaces}자
              </Text>

              <View style={{ flex: 1 }}>
                <RichText editor={editor} />
              </View>
            </View>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="absolute w-full bottom-0"
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <Toolbar editor={editor} items={customToolbarItems} />
        </KeyboardAvoidingView>
      </View>
      <LinkModal control={control} isModal={isModal} setIsModal={setIsModal} />
    </>
  )
}

export default NotePostPage

const LinkModal = ({ control, isModal, setIsModal }: any) => {
  return (
    <Modal visible={isModal} animationType="fade" transparent>
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View className="bg-white w-[95%] p-6 rounded-xl overflow-hidden">
          <View className="justify-between flex-row">
            <Text className="text-lg font-bold text-slate-800">링크 등록</Text>
            <TouchableOpacity onPress={() => setIsModal(false)}>
              <Ionicons name="close" size={24} color={Color.slate500} />
            </TouchableOpacity>
          </View>
          <View className="mt-8" style={{ gap: 12 }}>
            <Text className="font-semibold text-slate-800">링크 주소</Text>
            <Controller
              control={control}
              name="linkUrl"
              render={({ field: { onBlur, onChange, value } }) => (
                <Input
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="링크 주소를 입력해주세요"
                />
              )}
            />
          </View>
          <Button
            onPress={() => setIsModal(false)}
            label="확인"
            style={{ marginTop: 40, backgroundColor: Color.blue500 }}
          />
        </View>
      </View>
    </Modal>
  )
}
