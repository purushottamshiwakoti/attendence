import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import useAuthStore from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import TeacherButton from "../components/TeacherButton";

const TeacherScreen = () => {
  const { name, logout } = useAuthStore();
  const navigation = useNavigation();
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title={`Hello ${name}`} />
        <Appbar.Action
          icon="logout"
          color="red"
          onPress={() => {
            logout();
            navigation.navigate("Welcome");
            alert("Logged out successfully");
          }}
        />
      </Appbar.Header>
      <View style={{ marginTop: 10, margin: 10 }}>
        <TeacherButton title={"Take Attendence"} navigate={"screen"} />
        <TeacherButton title={"View Attendence"} navigate={"screen"} />
        <TeacherButton title={"Create Notice"} navigate={"CreateNotice"} />
        <TeacherButton title={"View Notice"} navigate={"ViewNotice"} />
        <TeacherButton
          title={"Check Leave Notes"}
          navigate={"ModifyLeaveNote"}
        />
      </View>
    </View>
  );
};

export default TeacherScreen;
