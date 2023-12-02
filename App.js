import { View, Text } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./src/screens/Welcome";
import LoginParent from "./src/screens/LoginParent";
import LoginTeacher from "./src/screens/LoginTeacher";
import ParentScreen from "./src/screens/ParentScreen";
import TeacherScreen from "./src/screens/TeacherScreen";
import useAuthStore from "./src/hooks/useAuth";
import LeaveNote from "./src/components/parent/LeaveNote";
import ViewLeaveNote from "./src/components/parent/ViewLeaveNote";
import ModifyLeaveNote from "./src/components/teacher/ModifyLeaveNote";
import CreateNotice from "./src/components/teacher/CreateNotice";
import ViewNotice from "./src/components/ViewNotice";
import TakeAttendence from "./src/components/teacher/TakeAttendence";
import ViewAttendence from "./src/components/teacher/ViewAttendence";
import ViewAllLeaveNote from "./src/components/teacher/ViewAllLeaveNote";
import ViewStudentAttendence from "./src/components/parent/ViewStudentAttendence";
const Stack = createNativeStackNavigator();

const App = () => {
  const { id, role } = useAuthStore();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!id ? (
          <Stack.Group>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="LoginParent" component={LoginParent} />
            <Stack.Screen name="LoginTeacher" component={LoginTeacher} />
          </Stack.Group>
        ) : (
          <Stack.Group>
            {role == "PARENT" ? (
              <Stack.Group>
                <Stack.Screen name="ParentScreen" component={ParentScreen} />
                <Stack.Screen name="ApplyLeaveNote" component={LeaveNote} />
                <Stack.Screen name="ViewLeaveNote" component={ViewLeaveNote} />
                <Stack.Screen name="ViewNotice" component={ViewNotice} />
                <Stack.Screen name="ViewStudentAttendence" component={ViewStudentAttendence} />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen name="TeacherScreen" component={TeacherScreen} />
                <Stack.Screen name="CreateNotice" component={CreateNotice} />
                <Stack.Screen name="ViewNotice" component={ViewNotice} />
                <Stack.Screen
                  name="ViewAllLeaveNote"
                  component={ViewAllLeaveNote}
                />
                <Stack.Screen
                  name="ViewAttendence"
                  component={ViewAttendence}
                />
                <Stack.Screen
                  name="TakeAttendence"
                  component={TakeAttendence}
                />

                <Stack.Screen
                  name="ModifyLeaveNote"
                  component={ModifyLeaveNote}
                />
              </Stack.Group>
            )}
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
