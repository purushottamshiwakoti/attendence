import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Button, Card } from "react-native-paper";
import useAuthStore from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ModifyLeaveNote = () => {
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
        console.log(data);
        const { leaveNote } = data;
        setNotes(leaveNote);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  const handleReject = async (id) => {
    try {
      const response = await axios.patch(
        `https://attendence-five.vercel.app/api/leaveNote/${id}`,
        { status: "Rejected" }
      );
      const data = response.data;
      const { message } = data;
      alert(message);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleAccept = async (id) => {
    try {
      const response = await axios.patch(
        `https://attendence-five.vercel.app/api/leaveNote/${id}`,
        { status: "Approved" }
      );
      const data = response.data;
      const { message } = data;
      alert(message);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

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
          notes.map(
            (note) =>
              note.status === "Pending" && (
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
                  <Card.Actions>
                    <Button onPress={() => handleReject(note.id)}>
                      Reject
                    </Button>
                    <Button onPress={() => handleAccept(note.id)}>
                      Accept
                    </Button>
                  </Card.Actions>
                </Card>
              )
          )
        ) : (
          <Text style={{ color: "red" }}>No leave note found yet!</Text>
        )}
      </View>
    </View>
  );
};

export default ModifyLeaveNote;
