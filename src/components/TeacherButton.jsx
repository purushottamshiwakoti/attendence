import { View, Text } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const TeacherButton = ({ title, navigate }) => {
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate(navigate);
  };
  return (
    <View style={{ marginBottom: 20 }}>
      <Button mode="contained" onPress={() => handleNavigate()}>
        {title}{" "}
      </Button>
    </View>
  );
};

export default TeacherButton;
