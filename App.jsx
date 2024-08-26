import AppNavigation from "./src/navigation";
import {Provider} from "react-redux";
import React from "react";
import store from "./src/store";

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
