import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import useAuthStore from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import TeacherButton from "../components/TeacherButton";

const ParentScreen = () => {
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
        <TeacherButton title={"View Attendence"} navigate={"screen"} />
        <TeacherButton title={"View Notice"} navigate={"ViewNotice"} />
        <TeacherButton title={"Apply Leave Note"} navigate={"ApplyLeaveNote"} />
        <TeacherButton title={"Check Leave Notes"} navigate={"ViewLeaveNote"} />
      </View>
    </View>
  );
};

export default ParentScreen;
