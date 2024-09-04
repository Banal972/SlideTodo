import { useState } from "react"
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import { useQueryClient } from "@tanstack/react-query"
import BaseContainer from "components/common/Container/BaseContainer"
import Color from "constant/color"
import { Link, useLocalSearchParams, useRouter } from "expo-router"
import { useGetGoalDetail } from "hooks/goal/useGetGoalDetail"
import useDeleteNote from "hooks/note/useDeleteNote"
import { useGetNoteList } from "hooks/note/useGetNoteList"
import useNoteDetailModalStore from "store/useNoteDetailModalStore"

const NoteList = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { data: detail } = useGetGoalDetail({ goalId: slug })
  const { data } = useGetNoteList({ goalId: Number(slug) })

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
          data.notes.map((note) => <NoteContainer note={note} />)
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

const NoteContainer = ({ note }: any) => {
  const queryClient = useQueryClient()

  const { open } = useNoteDetailModalStore()

  const openNoteDetail = (id: number) => {
    open({ noteId: id })
  }

  const router = useRouter()

  const [isEdit, setIsEdit] = useState(false)

  const closeIsEditHandler = () => {
    setIsEdit(false)
  }
  const { mutate: deleteMutate } = useDeleteNote(queryClient, closeIsEditHandler)

  return (
    <Pressable
      key={note.id}
      onPress={(e) => {
        e.stopPropagation()
        openNoteDetail(note.id)
      }}
      className=" relative -z-10"
    >
      <BaseContainer color="white">
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View className="w-7 h-7 rounded-lg items-center justify-center bg-blue-100">
            <Image source={require("@/assets/images/goal/flip.png")} />
          </View>
          <Pressable
            onPress={(e) => {
              e.stopPropagation()
              setIsEdit(!isEdit)
            }}
          >
            <Ionicons name="ellipsis-vertical" size={24} color={Color.slate400} />
          </Pressable>
          {isEdit && (
            <View className="absolute w-[106px] right-0 bg-white top-full border rounded-lg border-slate-300 z-50">
              <Pressable
                onPress={(e) => {
                  e.stopPropagation()
                  router.push(`/note/edit/${note.id}`)
                }}
                className="py-[10]"
              >
                <Text className="text-center">수정하기</Text>
              </Pressable>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation()
                  deleteMutate(note.id)
                }}
                className="py-[10px] border-t border-slate-300"
              >
                <Text style={{ textAlign: "center" }}>삭제하기</Text>
              </Pressable>
            </View>
          )}
        </View>
        <Text className="mt-4 text-lg font-medium text-slate-800">{note.title}</Text>
        <View className="mt-3 pt-3 border-t border-slate-200 w-full relative -z-10">
          <View
            className="flex-row items-center"
            style={{
              gap: 8,
            }}
          >
            <Text className="bg-slate-100 px-[3px] py-[2px] rounded text-xs font-medium">
              To do
            </Text>
            <Text className="text-xs text-slate-700">{note.todo.title}</Text>
          </View>
        </View>
      </BaseContainer>
    </Pressable>
  )
}
