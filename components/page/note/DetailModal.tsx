import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
  useWindowDimensions,
} from "react-native"
import RenderHtml from "react-native-render-html"

import Ionicons from "@expo/vector-icons/Ionicons"
import dayjs from "dayjs"
import * as WebBrowser from "expo-web-browser"
import { useGetNoteDetail } from "hooks/note/useGetNoteDetail"
import useNoteDetailModalStore from "store/useNoteDetailModalStore"

const NoteDetailModal = ({ isModal }: { isModal: boolean }) => {
  const { data, close } = useNoteDetailModalStore()
  const { data: noteDetail } = useGetNoteDetail({ noteId: data.noteId })
  const { width } = useWindowDimensions()

  const modalClose = () => {
    close()
  }

  const handlePressBrowser = async (link: string) => {
    await WebBrowser.openBrowserAsync(link)
  }

  return (
    <Modal animationType="slide" transparent visible={isModal} className="flex-1">
      <SafeAreaView className="flex-1 bg-white">
        <View className="p-4 flex-1">
          <View>
            <Pressable onPress={modalClose}>
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          </View>

          <View
            className=" mt-4 flex-row items-center"
            style={{
              gap: 6,
            }}
          >
            <View className="w-6 h-6 rounded-md items-center justify-center bg-black">
              <Image className="w-4 h-4" source={require("@/assets/images/goal/icon01.png")} />
            </View>
            <Text className="text-base font-medium text-slate-800">{noteDetail?.goal.title}</Text>
          </View>

          <View className="justify-between flex-row items-center mt-3">
            <View
              className="flex-row items-center"
              style={{
                gap: 8,
              }}
            >
              <View className="py-[3px] px-[2px] bg-slate-100 rounded items-center">
                <Text className="text-sm font-medium text-slate-700 px-1">To do</Text>
              </View>
              <Text className="text-sm text-slate-700">{noteDetail?.todo.title}</Text>
            </View>
            <Text className="text-slate-500 text-xs">
              {dayjs(noteDetail?.createdAt).format("YYYY.MM.DD")}
            </Text>
          </View>

          <View className="mt-6 flex-1">
            <View className="py-3 border border-l-0 border-r-0 border-slate-200">
              <Text className="text-lg font-medium text-slate-800">{noteDetail?.title}</Text>
            </View>

            <View className="pt-4 flex-1">
              {noteDetail?.linkUrl && (
                <Pressable onPress={() => handlePressBrowser(noteDetail.linkUrl)}>
                  <View className="px-4 py-1 bg-slate-200 rounded-full mb-4">
                    <Text className="text-base font-normal text-slate-800">
                      {noteDetail.linkUrl}
                    </Text>
                  </View>
                </Pressable>
              )}

              <View className="flex-1">
                {noteDetail && (
                  <RenderHtml contentWidth={width} source={{ html: noteDetail.content }} />
                )}
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default NoteDetailModal
