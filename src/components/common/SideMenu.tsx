import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native"

import SmallBtn from "@/components/common/Button/SmallBtn"
import Input from "@/components/common/Input"
import Color from "@/constant/color"
import useGetGoalList from "@/hooks/goal/useGetGoalList"
import useGetUser from "@/hooks/useGetUser"
import useNewTodoModalStore from "@/store/useNewTodoModalStore"
import Ionicons from "@expo/vector-icons/Ionicons"
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types"
import { Link, useRouter } from "expo-router"
import { signOut } from "firebase/auth"
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "firebaseConfig"

const SideMenu = ({ navigation }: { navigation: DrawerNavigationHelpers }) => {
  const router = useRouter()
  const { control, handleSubmit, setValue } = useForm()
  const { user } = useGetUser()
  const { open: newModalOpenHandler } = useNewTodoModalStore()
  const { goalLists } = useGetGoalList()
  const [isGoalInput, setIsGoalInput] = useState(false)

  const isGoalHandler = () => {
    setIsGoalInput(!isGoalInput)
  }

  const addGoalHanlder = async (data: any) => {
    const { goal } = data

    if (!user || !goal) return

    try {
      await addDoc(collection(db, "goals"), {
        uid: user.uid,
        title: goal,
        todos: [],
        createDate: new Date(),
      })
      setValue("goal", "")
      setIsGoalInput(false)
    } catch (e) {
      console.log(e)
    }
  }

  const logoutHandler = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      {
        text: "네",
        onPress: () => {
          signOut(auth)
            .then(() => {
              router.push("/")
            })
            .catch((error) => {
              console.log(error)
            })
        },
      },
      {
        text: "아니요",
      },
    ])
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: 44,
          paddingBottom: 24,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Image source={require("@/assets/images/sideMenu/logo.png")} />
          <Pressable
            onPress={() => {
              navigation.closeDrawer()
            }}
          >
            <Image source={require("@/assets/images/sideMenu/fold.png")} />
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 16,
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              gap: 8,
            }}
          >
            <ImageBackground src={user?.photoURL || ""} resizeMode="cover">
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 6,
                  backgroundColor: Color.blue50,
                }}
              ></View>
            </ImageBackground>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 16,
                  color: Color.slate800,
                  fontWeight: "600",
                }}
              >
                {user?.displayName}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  marginTop: 4,
                  lineHeight: 16,
                  color: Color.slate600,
                  fontWeight: "500",
                }}
              >
                {user?.email}
              </Text>
            </View>
          </View>
          <Pressable onPress={logoutHandler}>
            <Text
              style={{
                color: Color.slate400,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              로그아웃
            </Text>
          </Pressable>
        </View>
      </View>

      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderWidth: 1,
            borderColor: Color.slate200,
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
          }}
        >
          <Link href={"/dashboard"}>
            <View style={styles.listBtnContainer}>
              <Ionicons name="home" size={24} color="black" />
              <Text>대시보드</Text>
            </View>
          </Link>

          <SmallBtn onPress={newModalOpenHandler} backgroundColor={Color.blue500} color={"#fff"}>
            + 새 할 일
          </SmallBtn>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: Color.slate200,
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderTopWidth: 0,
            borderBottomWidth: 0,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.listBtnContainer}>
              <Ionicons name="flag" size={24} color="black" />
              <Text>목표</Text>
            </View>
            <SmallBtn
              onPress={isGoalHandler}
              style={{
                backgroundColor: "white",
                borderWidth: 1,
                borderColor: Color.blue500,
              }}
              color={Color.blue500}
            >
              + 새 목표
            </SmallBtn>
          </View>

          {isGoalInput && (
            <View>
              <Controller
                control={control}
                name="goal"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="목표를 입력해주세요"
                    onSubmitEditing={handleSubmit(addGoalHanlder)}
                    returnKeyType="done"
                  />
                )}
              />
            </View>
          )}

          <View
            style={{
              marginTop: 20,
              gap: 20,
            }}
          >
            {goalLists.map((goalList) => (
              <Link key={goalList.id} style={styles.listTitle} href={`/goal/${goalList.id}`}>
                · {goalList.title}
              </Link>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SideMenu

const styles = StyleSheet.create({
  listBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
})
