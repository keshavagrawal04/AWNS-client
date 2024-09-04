import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Welcome, AddMeeting, UpdateMeeting} from "../screens";
import {
  CreatePassword,
  ForgotPassword,
  Login,
  OtpVerification,
  Signup,
} from "../screens/Authentication";
import {EmployeeAdd, Details, PendingApproval} from "../screens/Employee/Add";
import {
  ApplyLeaves,
  EmployeeDashboard,
  Leaves,
  Profile,
  UpdateProfile,
} from "../screens/Employee/Dashboard";
import {MainLayout} from "../layouts";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Dashboard">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Dashboard" component={MainLayout} />
        <Stack.Screen name="AddMeeting" component={AddMeeting} />
        <Stack.Screen name="UpdateMeeting" component={UpdateMeeting} />
        {/* Authentication Routes */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="CreatePassword" component={CreatePassword} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        {/* Employee Add */}
        <Stack.Screen name="EmployeeAdd" component={EmployeeAdd} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="PendingApproval" component={PendingApproval} />
        <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboard} />
        <Stack.Screen name="Leaves" component={Leaves} />
        <Stack.Screen name="ApplyLeaves" component={ApplyLeaves} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
