import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../hooks/useAuth";
import { Appbar, Card } from "react-native-paper";
import axios from "axios";

const ViewLeaveNote = () => {
  const navigation = useNavigation();
  const { name, logout } = useAuthStore();
  const [notes, setNotes] = useState([]);
  const { id } = useAuthStore();
  console.log(id);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `https://attendence-five.vercel.app/api/leaveNote/${id}`
        );
        const data = response.data;
        console.log(data);
        const { LeaveNote } = data;
        setNotes(LeaveNote);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  console.log(notes);
  return (
    <View>
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
      <View>
        {notes ? (
          notes.map((note) => (
            <Card key={note.id}>
              <Card.Title />
              <Card.Content>
                <Text variant="titleLarge">Title: {note.title}</Text>
                <Text variant="bodyMedium">
                  Description: {note.description}
                </Text>
                <Text
                  variant="bodyMedium"
                  style={{ fontSize: 18, fontWeight: "500" }}
                >
                  Status: {note.status}
                </Text>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={{ color: "red" }}>No leave note found yet!</Text>
        )}
      </View>
    </View>
  );
};

export default ViewLeaveNote;
