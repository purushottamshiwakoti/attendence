import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import TeacherButton from "../components/TeacherButton";
import useAuthStore from "../hooks/useAuth";

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
        <TeacherButton title={"Take Attendence"} navigate={"TakeAttendence"} />
        <TeacherButton title={"View Attendence"} navigate={"ViewAttendence"} />
        <TeacherButton title={"Create Notice"} navigate={"CreateNotice"} />
        <TeacherButton title={"View All Notices"} navigate={"ViewNotice"} />
        <TeacherButton
          title={"View All Leave Notes"}
          navigate={"ViewAllLeaveNote"}
        />
        <TeacherButton
          title={"Check Leave Notes"}
          navigate={"ModifyLeaveNote"}
        />
      </View>
    </View>
  );
};

export default TeacherScreen;
