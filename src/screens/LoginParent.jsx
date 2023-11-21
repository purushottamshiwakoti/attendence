import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { Appbar, Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import useAuthStore from "../hooks/useAuth";

const LoginParent = () => {
  const { setUserName, setUserRole, setId } = useAuthStore();
  const navigation = useNavigation();
  const [name, setName] = React.useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    try {
      setError(false);
      setLoading(true);
      const response = await axios.post(
        "https://attendence-five.vercel.app/api/plogin",
        {
          name,
          password,
        }
      );

      const data = response.data;
      const { message, parent } = data;
      setUserName(parent.name);
      setUserRole(parent.role);
      setId(parent.id);
      alert(message);
      navigation.navigate("ParentScreen");
      console.log(parent);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#EEE2DE" }}>
      <View>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Appbar.Content title="Login" />
        </Appbar.Header>
        <View style={{ display: "flex", marginTop: 200 }}>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "500" }}
          >
            Login To Your Parent Account
          </Text>
          {error && (
            <Text style={{ color: "red", marginTop: 10, marginLeft: 15 }}>
              Invalid crediantials
            </Text>
          )}
          <View style={{ margin: 10 }}>
            <TextInput
              label="Username"
              placeholder="Enter your username"
              value={name}
              onChangeText={(text) => setName(text)}
              mode="outlined"
            />
            <TextInput
              label="Password"
              value={password}
              placeholder="Enter your password"
              onChangeText={(text) => setPassword(text)}
              style={{ marginTop: 10 }}
              secureTextEntry
              mode="outlined"
            />
            <Button
              icon={"login"}
              mode="contained"
              style={{ marginTop: 20 }}
              onPress={() => handleLogin()}
              disabled={loading}
            >
              Login
            </Button>
            <Text style={{ marginTop: 10, textAlign: "right", fontSize: 16 }}>
              Need Help Contact Us:9890009890
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginParent;
