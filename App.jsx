import AppNavigation from "./src/navigation";
import {Provider} from "react-redux";
import React from "react";
import store from "./src/store";
import {LogBox} from "react-native";

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
