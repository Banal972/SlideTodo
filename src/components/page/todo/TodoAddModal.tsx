import React, { useState } from "react"
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native"

import Button from "@/components/common/Button"
import Input from "@/components/common/Input"
import Label from "@/components/common/Label"
import Color from "@/constant/color"
import useNewTodoModalStore from "@/store/useNewTodoModalStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import { Picker } from "@react-native-picker/picker"
import Checkbox from "expo-checkbox"

const TodoAddModal = ({ isModal }: { isModal: boolean }) => {
  const { close: isModalCloseHandler } = useNewTodoModalStore()
  const [selectedLanguage, setSelectedLanguage] = useState()
  return (
    <Modal animationType="slide" transparent={true} visible={isModal} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.modalContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 20,
            }}
          >
            <Text style={{ fontSize: 18, lineHeight: 28, fontWeight: "bold" }}>할 일 생성</Text>
            <Pressable onPress={isModalCloseHandler}>
              <Ionicons name="close" size={24} color="black" />
            </Pressable>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <View>
              <Label>제목</Label>
              <Input placeholder="할 일의 제목을 적어주세요." />
            </View>
            <View
              style={{
                flexDirection: "column",
                gap: 24,
                flex: 1,
                marginTop: 24,
                justifyContent: "space-between",
              }}
            >
              <View style={{ gap: 24 }}>
                <View>
                  <Label>자료</Label>
                  <View style={{ flexDirection: "row", gap: 12, marginTop: 12 }}>
                    <Pressable
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        gap: 4,
                        paddingHorizontal: 8,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: Color.slate100,
                      }}
                    >
                      <Checkbox
                        style={{
                          borderColor: Color.slate200,
                          width: 18,
                          height: 18,
                          borderRadius: 6,
                          backgroundColor: "#fff",
                        }}
                      />
                      <Text
                        style={{
                          color: Color.slate800,
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        파일 업로드
                      </Text>
                    </Pressable>
                    <Pressable
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        gap: 4,
                        paddingHorizontal: 8,
                        height: 40,
                        borderRadius: 8,
                        backgroundColor: Color.slate100,
                      }}
                    >
                      <Checkbox
                        style={{
                          borderColor: Color.slate200,
                          width: 18,
                          height: 18,
                          borderRadius: 6,
                          backgroundColor: "#fff",
                        }}
                      />
                      <Text
                        style={{
                          color: Color.slate800,
                          fontWeight: "500",
                          fontSize: 16,
                        }}
                      >
                        링크 첨부
                      </Text>
                    </Pressable>
                  </View>
                  <Pressable
                    style={{
                      marginTop: 12,
                      height: 184,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: Color.slate50,
                    }}
                  >
                    <Text style={{ color: Color.slate400, fontSize: 16 }}>
                      파일을 업로드해주세요
                    </Text>
                  </Pressable>
                </View>
                <View>
                  <Label>목표</Label>
                  <View
                    style={{
                      borderRadius: 12,
                      overflow: "hidden",
                      marginTop: 12,
                    }}
                  >
                    <Picker
                      style={{
                        backgroundColor: Color.slate50,
                      }}
                      itemStyle={{
                        fontSize: 14,
                        lineHeight: 20,
                      }}
                      selectedValue={selectedLanguage}
                      onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
                    >
                      <Picker.Item
                        style={{
                          fontSize: 14,
                          lineHeight: 20,
                        }}
                        label="목표를 선택해주세요."
                        value="목표를 선택해주세요."
                      />
                      <Picker.Item
                        style={{
                          fontSize: 14,
                          lineHeight: 20,
                        }}
                        label="목표를 선택해주세요.2"
                        value="목표를 선택해주세요.2"
                      />
                    </Picker>
                  </View>
                </View>
              </View>
              <Button label="확인" />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default TodoAddModal

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderColor: "#fff",
    flex: 1,
  },
})
