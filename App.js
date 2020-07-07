import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import store from "./client/index";
import SignUp from "./client/screens/OnBoard/Signup";
import PlaidLink from './client/screens/OnBoard/PlaidLink'
export default function App() {
  return (
    <Provider store={store}>
      <View>
        <Text>Pls show</Text>
        <PlaidLink />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
