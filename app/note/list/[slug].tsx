import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

import BaseContainer from "@/components/common/Container/BaseContainer"
import Color from "@/constant/color"
import useGetNoteList from "@/hooks/note/useGetNoteList"
import useNoteDetailModalStore, { openType } from "@/store/useNoteDetailModalStore"
import useNoteNameStore from "@/store/useNoteStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useLocalSearchParams } from "expo-router"

const NoteList = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { name } = useNoteNameStore()
  const { noteList } = useGetNoteList({ slug })
  const { open } = useNoteDetailModalStore()

  const detailHandler = ({ goalTitle, todoTitle, id, date }: openType) => {
    open({ goalTitle, todoTitle, id, date })
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ gap: 16, padding: 16, flex: 1 }}>
        <BaseContainer color="white">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: Color.slate800,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 15,
                }}
              >
                <Image source={require("@/assets/images/goal/icon01.png")} />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: Color.slate800,
                }}
              >
                {name}
              </Text>
            </View>
          </View>
        </BaseContainer>

        {noteList.length > 0 ? (
          noteList.map((note) => (
            <Pressable
              key={note.id}
              onPress={() =>
                detailHandler({
                  goalTitle: name,
                  todoTitle: note.todoTitle,
                  id: note.id,
                  date: note.todoCreateDate,
                })
              }
            >
              <BaseContainer color="white">
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
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
                    <Ionicons name="ellipsis-vertical" size={24} color={Color.slate400} />
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
                  {note.title}
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
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                  >
                    To do
                  </Text>
                  <Text style={{ fontSize: 12, color: Color.slate700 }}>{note.todoTitle}</Text>
                </View>
              </BaseContainer>
            </Pressable>
          ))
        ) : (
          <View style={styles.nullTextContainer}>
            <Text style={styles.nullText}>아직 등록된 노트가 없어요</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default NoteList

const styles = StyleSheet.create({
  nullTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  nullText: {
    color: Color.slate500,
    fontSize: 14,
  },
})
