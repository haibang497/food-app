import React, { Component } from "react";
import { Text, View, ActivityIndicator, StyleSheet } from "react-native";

import firebase from 'firebase';

export default class LoadingScreen extends Component {

    componentDidMount(){
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn=()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                this.props.navigation.navigate('MainScreen')
            } else {
                this.props.navigation.navigate('LoginScreen')
            }
        })
    }

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="gray" />
        <Text style={{ color: "gray", fontSize: 18, fontWeight: "bold" }}>
          Loading . . .
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
