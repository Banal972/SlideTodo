import Color from "@/constant/color";
import useGetUser from "@/hooks/useGetUser";
import useNewTodoModalStore from "@/store/useNewTodoModalStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/src/types";
import { Link, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "firebaseConfig";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SideMenu = ({ navigation }: { navigation: DrawerNavigationHelpers }) => {
  const router = useRouter();
  const { user } = useGetUser();
  const { open: newModalOpenHandler } = useNewTodoModalStore();

  const logoutHandler = () => {
    Alert.alert("로그아웃", "정말 로그아웃 하시겠습니까?", [
      {
        text: "네",
        onPress: () => {
          signOut(auth)
            .then(() => {
              router.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
        },
      },
      {
        text: "아니요",
      },
    ]);
  };

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
              navigation.closeDrawer();
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
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  backgroundColor: Color.blue50,
                }}
              ></View>
            </ImageBackground>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 16,
                  color: Color.slate800,
                  fontWeight: "600",
                }}
              >
                {user?.displayName}
              </Text>
              <Text
                style={{
                  fontSize: 12,
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
                fontSize: 12,
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

          <Pressable
            style={[styles.listBtn, { backgroundColor: Color.blue500 }]}
            onPress={newModalOpenHandler}
          >
            <Text style={[styles.listBtnText, { color: "white" }]}>
              + 새 할 일
            </Text>
          </Pressable>
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
            <Pressable style={styles.listBtnContainer}>
              <Ionicons name="flag" size={24} color="black" />
              <Text>목표</Text>
            </Pressable>
            <Pressable
              style={[
                styles.listBtn,
                {
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: Color.blue500,
                },
              ]}
            >
              <Text
                style={[
                  styles.listBtnText,
                  {
                    color: Color.blue500,
                  },
                ]}
              >
                + 새 목표
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              marginTop: 20,
              gap: 16,
            }}
          >
            <Link style={styles.listTitle} href={"/goal/1"}>
              · 자바스크립트로 웹 서비스 만들기
            </Link>
            <Link style={styles.listTitle} href={"/goal/2"}>
              · 디자인 시스템 강의 듣기
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  listBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  listBtn: {
    width: 84,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  listBtnText: {
    fontSize: 12,
    fontWeight: "600",
  },
  listTitle: {
    fontSize: 12,
    fontWeight: "500",
  },
});
