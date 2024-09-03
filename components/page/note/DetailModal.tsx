import { Image, Modal, Pressable, SafeAreaView, Text, View } from "react-native"

import Ionicons from "@expo/vector-icons/Ionicons"
import Color from "constant/color"
import dayjs from "dayjs"
import { useGetNoteDetail } from "hooks/note/useGetNoteDetail"
import useNoteDetailModalStore from "store/useNoteDetailModalStore"

const NoteDetailModal = ({ isModal }: { isModal: boolean }) => {
  const { data, close } = useNoteDetailModalStore()

  const { data: noteDetail } = useGetNoteDetail({ noteId: data.noteId })

  const modalClose = () => {
    close()
  }

  return (
    <Modal animationType="slide" transparent visible={isModal} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 16, backgroundColor: "white", flex: 1 }}>
          <View>
            <Pressable onPress={modalClose}>
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 16,
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: Color.slate800,
              }}
            >
              {noteDetail?.goal.title}
            </Text>
          </View>

          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 8,
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
                <Text style={{ fontSize: 14, fontWeight: "500", color: Color.slate700 }}>
                  To do
                </Text>
              </View>
              <Text style={{ fontSize: 14, color: Color.slate700 }}>{noteDetail?.todo.title}</Text>
            </View>
            <Text
              style={{
                color: Color.slate500,
                fontSize: 12,
              }}
            >
              {dayjs(noteDetail?.createdAt).format("YYYY.MM.DD")}
            </Text>
          </View>

          <View
            style={{
              marginTop: 24,
            }}
          >
            <View
              style={{
                paddingVertical: 12,
                borderWidth: 1,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderColor: Color.slate200,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: Color.slate800,
                }}
              >
                {noteDetail?.title}
              </Text>
            </View>
            <View
              style={{
                paddingTop: 16,
              }}
            >
              <Text
                style={{
                  color: Color.slate700,
                  fontSize: 16,
                }}
              >
                {noteDetail?.content}
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default NoteDetailModal
