import { useEffect, useState } from "react"
import { Image, Pressable, ScrollView, Text, View } from "react-native"

import BaseContainer from "@/components/common/Container/BaseContainer"
import Color from "@/constant/color"
import useGetUser from "@/hooks/useGetUser"
import useNoteNameStore from "@/store/useNoteStore"
import { noteType } from "@/types/note"
import Ionicons from "@expo/vector-icons/Ionicons"
import { useLocalSearchParams } from "expo-router"
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "firebaseConfig"

const NoteList = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { name } = useNoteNameStore()
  const { user } = useGetUser()
  const [noteList, setNoteList] = useState<noteType[]>([])

  useEffect(() => {
    const fetch = async () => {
      if (!user) return []

      const q = query(
        collection(db, "notes"),
        where("goal_ID", "==", slug),
        orderBy("createDate", "desc"),
      )

      const querySnapShot = await getDocs(q)

      const noteListPromises = querySnapShot.docs.map(async (docx) => {
        const { title, content, createDate, todo_ID } = docx.data()

        const docSnap = await getDoc(doc(db, "todos", todo_ID))
        if (docSnap.exists()) {
          const docData = docSnap.data()
          return {
            title,
            content,
            todoTitle: docData.title,
            createDate,
            id: docx.id,
          }
        }

        return {
          title,
          content,
          todoTitle: "",
          createDate,
          id: docx.id,
        }
      })

      const noteList = await Promise.all(noteListPromises)
      setNoteList(noteList)
    }

    fetch()
  }, [slug, user])

  return (
    <ScrollView>
      <View style={{ gap: 16, padding: 16 }}>
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

        {noteList.map((note) => (
          <BaseContainer key={note.id} color="white">
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
        ))}
      </View>
    </ScrollView>
  )
}

export default NoteList
