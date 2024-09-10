import { Image, ScrollView, Text, View } from "react-native"

import BaseContainer from "components/common/Container/BaseContainer"
import NoteContainer from "components/page/note/NoteContainer"
import { Link, useLocalSearchParams } from "expo-router"
import { useGetGoalDetail } from "hooks/goal/useGetGoalDetail"
import { useGetNoteList } from "hooks/note/useGetNoteList"
import { NoteSlug } from "types/note"

const NoteList = () => {
  const { slug } = useLocalSearchParams<NoteSlug>()
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
          data.notes.map((note) => <NoteContainer key={note.id} note={note} />)
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
