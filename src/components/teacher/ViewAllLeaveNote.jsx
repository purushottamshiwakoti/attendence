import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Card } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../../hooks/useAuth";
import { ScrollView } from "react-native";

const ViewAllLeaveNote = () => {
  const { name, logout } = useAuthStore();
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(
          `https://attendence-five.vercel.app/api/leaveNote`
        );
        const data = response.data;
        const { leaveNote } = data;
        setNotes(leaveNote);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

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
        <Text style={{ fontSize: 18, color: "green", fontWeight: "500" }}>
          All Leave Notes
        </Text>
        <View>
          {notes ? (
            notes.map((note) => (
              <Card key={note.id} style={{ marginBottom: 10 }}>
                <Card.Title />
                <Card.Content>
                  <Text variant="titleLarge">Title: {note.title}</Text>
                  <Text variant="bodyMedium">
                    Description: {note.description}
                  </Text>
                  <Text variant="bodyMedium">Status: {note.status}</Text>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Text style={{ color: "red" }}>No leave note found yet!</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ViewAllLeaveNote;
