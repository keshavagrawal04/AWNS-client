import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Welcome} from "../screens";
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
        initialRouteName="Login">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Dashboard" component={MainLayout} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
