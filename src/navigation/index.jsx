import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Dashboard, Welcome} from "../screens";
import {
  CreatePassword,
  ForgotPassword,
  Login,
  OtpVerification,
  Signup,
} from "../screens/Authentication";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        {/* Authentication Routes */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="CreatePassword" component={CreatePassword} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
