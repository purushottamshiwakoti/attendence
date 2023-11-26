import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { Appbar } from "react-native-paper";
import { ScrollView } from "react-native";
import axios from "axios";
import { List } from "react-native-paper";

const ViewAttendence = () => {
  const { name, logout, id } = useAuthStore();
  const navigation = useNavigation();
  const [attendence, setAttendence] = useState([]);

  useEffect(() => {
    const fetchAttendence = async () => {
      try {
        const response = await axios.get(
          "https://attendence-five.vercel.app/api/attendence"
        );
        const { attendence } = response.data;
        setAttendence(attendence);
      } catch (error) {
        console.error(error);
      }
    };
    fetchAttendence();
  }, []);

  console.log(attendence);
  return (
    <ScrollView>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />

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
      <View style={{ margin: 10 }}>
        <Text>ViewAttendence</Text>
        {attendence.map((item) => (
          <List.Item
            title={`${item.parent.studentName} - ${item.status}`}
            description={item.date.split("T")[0]}
            left={(props) => <List.Icon {...props} icon="account" />}
            key={item.id}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ViewAttendence;
