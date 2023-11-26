import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Button, Checkbox, TextInput } from "react-native-paper";
import useAuthStore from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const TakeAttendence = () => {
  const { name, logout, id } = useAuthStore();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [students, setStudents] = useState([]);
  const [checkedStudents, setCheckedStudents] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://attendence-five.vercel.app/api/parent"
        );
        const { parent } = response.data;
        // Initialize checked state for each student
        const initialCheckedState = {};
        parent.forEach((student) => {
          initialCheckedState[student.id] = false;
        });
        setCheckedStudents(initialCheckedState);
        setStudents(parent);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStudents();
  }, []);

  const handleCheckBoxChange = (studentId) => {
    setCheckedStudents({
      ...checkedStudents,
      [studentId]: !checkedStudents[studentId],
    });
  };

  const handleSubmitAttendence = async () => {
    const attendenceData = students.map((student) => ({
      parentId: student.id,
      status: checkedStudents[student.id] == true ? "PRESENT" : "ABSENT",
    }));
    console.log(attendenceData);
    try {
      const response = await axios.post(
        "https://attendence-five.vercel.app/api/attendence",
        {
          attendenceData,
        }
      );
      const { message } = await response.data;
      alert(message);
      navigation.navigate("TeacherScreen");
    } catch (error) {
      console.log({ error });
    }
  };

  console.log(students);
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
        {students.map((item) => (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            key={item.id}
          >
            <Checkbox
              status={checkedStudents[item.id] ? "checked" : "unchecked"}
              onPress={() => {
                handleCheckBoxChange(item.id);
              }}
            />
            <Text>{item.studentName}</Text>
          </View>
        ))}
        <Button onPress={() => handleSubmitAttendence()}>Submit</Button>
      </View>
    </View>
  );
};

export default TakeAttendence;
