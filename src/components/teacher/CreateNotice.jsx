import { View, Text } from "react-native";
import React, { useState } from "react";
import { Appbar, Button, TextInput } from "react-native-paper";
import useAuthStore from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const CreateNotice = () => {
  const { name, logout, id } = useAuthStore();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescripton] = React.useState("");

  const handleSubmitNotice = async () => {
    try {
      setLoading(false);
      const response = await axios.post(
        "https://attendence-five.vercel.app/api/notices",
        { title, description, teacherId: id }
      );
      const data = response.data;
      console.log(data);
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
      <View style={{ margin: 20 }}>
        <Text style={{ fontSize: 17, color: "green", fontWeight: "500" }}>
          Add Notice
        </Text>
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <TextInput
            label="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            mode="outlined"
          />
          <TextInput
            label="Description"
            value={description}
            numberOfLines={10}
            onChangeText={(text) => setDescripton(text)}
            style={{ marginTop: 10 }}
            mode="outlined"
          />
          <Button
            mode="contained-tonal"
            style={{ marginTop: 10 }}
            onPress={() => handleSubmitNotice()}
          >
            {" "}
            Add
          </Button>
        </View>
      </View>
    </View>
  );
};

export default CreateNotice;
