import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {
  Dashboard,
  Welcome,
  QRScanner,
  Meeting,
  Employees,
  Department,
} from "../screens";
import {
  CreatePassword,
  ForgotPassword,
  Login,
  OtpVerification,
  Signup,
} from "../screens/Authentication";
import {EmployeeAdd, Details} from "../screens/Employee";
import {MainLayout} from "../layouts";

const Stack = createNativeStackNavigator();

const withMainLayout = Component => {
  return props => (
    <MainLayout {...props}>
      <Component {...props} />
    </MainLayout>
  );
};

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Dashboard" component={withMainLayout(Dashboard)} />
        <Stack.Screen
          name="Department"
          component={withMainLayout(Department)}
        />
        <Stack.Screen name="QRScanner" component={withMainLayout(QRScanner)} />
        <Stack.Screen name="Meeting" component={withMainLayout(Meeting)} />
        <Stack.Screen name="Employees" component={withMainLayout(Employees)} />
        {/* Authentication Routes */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="CreatePassword" component={CreatePassword} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        {/* Employee Add */}
        <Stack.Screen name="EmployeeAdd" component={EmployeeAdd} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
