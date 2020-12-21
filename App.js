// redux
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
import { PersistGate } from "redux-persist/es/integration/react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import LoadingScreen from "./screens/LoadingScreen";
import MainScreen from "./screens/MainScreen";
import LoginScreen from "./screens/LoginScreen";

const { persistor, store } = ConfigureStore();

import React from "react";
import Main from "./components/MainComponent";
import * as firebase from "firebase";
import { firebaseConfig } from "./config/config";

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      // <Provider store={store}>
      //   <PersistGate persistor={persistor}>
      //     <Main />
      //   </PersistGate>
      // </Provider>
      <AppNavigator />
    );
  }
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  LoginScreen: LoginScreen,
  MainScreen: MainScreen,
});

const AppNavigator = createAppContainer(AppSwitchNavigator);
