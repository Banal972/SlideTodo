import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import BaseContainer from "components/common/Container/BaseContainer"
import Color from "constant/color"
import { Link, useLocalSearchParams } from "expo-router"
import { useGetGoalDetail } from "hooks/goal/useGetGoalDetail"
import { useGetNoteList } from "hooks/note/useGetNoteList"
import useNoteDetailModalStore from "store/useNoteDetailModalStore"

const NoteList = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { data: detail } = useGetGoalDetail({ goalId: slug })
  const { data } = useGetNoteList({ goalId: Number(slug) })
  const { open } = useNoteDetailModalStore()

  const openNoteDetail = (id: number) => {
    open({ noteId: id })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="p-4 flex-1" style={{ gap: 16 }}>
        <BaseContainer color="white">
          <Link href={`/goal/${slug}`}>
            <View className="flex-row justify-between items-cente">
              <View className="flex-row items-center" style={{ gap: 8 }}>
                <View className="w-10 h-10  bg-slate-800 items-center justify-center rounded-[15px]">
                  <Image source={require("@/assets/images/goal/icon01.png")} />
                </View>
                <Text className="text-base font-semibold text-slate-800">{detail?.title}</Text>
              </View>
            </View>
          </Link>
        </BaseContainer>

        {data && data.notes.length > 0 ? (
          data.notes.map((note) => (
            <Pressable key={note.id} onPress={() => openNoteDetail(note.id)}>
              <BaseContainer color="white">
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View className="w-7 h-7 rounded-lg items-center justify-center bg-blue-100">
                    <Image source={require("@/assets/images/goal/flip.png")} />
                  </View>
                  <Pressable>
                    <Ionicons name="ellipsis-vertical" size={24} color={Color.slate400} />
                  </Pressable>
                </View>
                <Text className="mt-4 text-lg font-medium text-slate-800">{note.title}</Text>
                <View className="my-3 h-[1px] w-full bg-slate-200" />
                <View
                  className="flex-row items-center"
                  style={{
                    gap: 8,
                  }}
                >
                  <Text className="bg-slate-100 px-[3px] py-[2px] rounded text-xs font-medium">
                    To do
                  </Text>
                  <Text className="text-xs text-slate-700">{note.title}</Text>
                </View>
              </BaseContainer>
            </Pressable>
          ))
        ) : (
          <View className="flex-1 items-center justify-center">
            <Text className="text-slate-500 text-sm">아직 등록된 노트가 없어요</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default NoteList
