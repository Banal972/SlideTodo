import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native"

import { RichText, Toolbar } from "@10play/tentap-editor"
import { useQueryClient } from "@tanstack/react-query"
import LinkModal from "components/page/note/LinkModal"
import { useLocalSearchParams, useRouter } from "expo-router"
import useEditor from "hooks/note/post/useEditor"
import useKeyboardVerticalOffset from "hooks/note/post/useKeyboardVerticalOffset"
import { useGetNoteDetail } from "hooks/note/useGetNoteDetail"
import useUpdateNote from "hooks/note/useUpdateNote"
import { IuseSumbit, NoteSlug, PostFormData } from "types/note"

const NotePostPage = () => {
  const { slug } = useLocalSearchParams<NoteSlug>()
  const [isModal, setIsModal] = useState(false)

  const { editor, customToolbarItems, charCount } = useEditor()

  const { control, watch, onSubmit, setValue } = useSumbit({ slug, editor })
  const titleWatch = watch("title")

  const { data } = useGetNoteDetail({ noteId: Number(slug) })

  const { keyboardVerticalOffset } = useKeyboardVerticalOffset()

  useEffect(() => {
    if (!data) return
    setValue("title", data.title)
    setValue("linkUrl", data.linkUrl)
    editor.setContent(data.content)
  }, [data])

  return (
    <>
      <View className="bg-white flex-1">
        <View className="pt-[11px] px-4 flex-1">
          <View className="flex-row justify-between py-[11px] items-center">
            <Text className="text-base font-semibold text-slate-900">노트 수정</Text>
            <View className="flex-row" style={{ gap: 8 }}>
              <TouchableOpacity
                onPress={onSubmit}
                className="w-[84px] h-9 items-center justify-center bg-blue-400 rounded-xl"
              >
                <Text className="text-white text-sm font-semibold">수정 완료</Text>
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
              <Text className="text-base font-medium text-slate-800">{data?.goal.title}</Text>
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
            <Text className="text-sm text-slate-700">{data?.todo.title}</Text>
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

const useSumbit = ({ slug, editor }: IuseSumbit) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { control, watch, handleSubmit, setValue } = useForm<PostFormData>()
  const { mutate } = useUpdateNote(queryClient, router)
  const onSubmit = handleSubmit(async (data) => {
    const content = await editor.getHTML()
    mutate({
      ...data,
      content,
      noteId: Number(slug),
    })
  })

  return { control, watch, onSubmit, setValue }
}
