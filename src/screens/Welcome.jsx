import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        margin: 20,
        flex: 1,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("LoginParent")}>
        <Card>
          <Card.Title />
          <Card.Cover
            source={{
              uri: "https://img.freepik.com/free-vector/children-back-school-with-parents_52683-40883.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699056000&semt=ais",
            }}
          />
          <Card.Content>
            <Text variant="titleLarge" style={{ marginTop: 10 }}>
              Parent
            </Text>
            <Text variant="bodyMedium">Login as Parent</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("LoginTeacher")}>
        <Card style={{ marginTop: 30 }}>
          <Card.Title />
          <Card.Cover
            source={{
              uri: "https://www.hindustantimes.com/ht-img/img/2023/09/02/1600x900/teachers_day_1693652054152_1693652065719.jpg",
            }}
          />
          <Card.Content>
            <Text variant="titleLarge" style={{ marginTop: 10 }}>
              Teacher
            </Text>
            <Text variant="bodyMedium">Login as Teacher</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
