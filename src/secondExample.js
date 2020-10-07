/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myValue: '',
    };
  }
  inputNewMyValue(myValue) {
    this.setState({myValue});
  }
  userNameChange = (text) => {
    this.setState({
      username: text,
    });
  };
  save = async () => {
    try {
      await AsyncStorage.setItem('key', this.state.myValue);
      console.log(this.state.myValue);
    } catch (err) {
      console.log(err);
    }
  };
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('key');
      if (value !== null) {
        this.setState({myValue: value});
        console.log(value);
      }
    } catch (err) {
      console.log(err);
    }
  };
  removeData = async () => {
    try {
      await AsyncStorage.removeItem('key');
      this.setState({myValue: ''});
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <SafeAreaView>
        <View>
          <Text style={styles.welcome}>Welcome to Demo AsyncStorage!</Text>
          <TextInput
            style={styles.formInput}
            placeholder="Insert username"
            value={this.state.username}
            onChangeText={this.userNameChange}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Password"
            value={this.state.myValue}
            onChangeText={(text) => this.inputNewMyValue(text)}
          />
          <Button
            style={styles.formButton}
            onPress={this.save}
            title="Save value"
            color="#2196f3"
            accessibilityLabel="Save Key"
          />
          <Button
            style={styles.formButton}
            onPress={this.getData}
            title="Get"
            color="green"
            accessibilityLabel="Get key"
          />
          <Button
            style={styles.formButton}
            onPress={this.removeData}
            title="Delete"
            color="#f44336"
            accessibilityLabel="Reset"
          />
          <Text>Issaugota reiksme: {this.state.myValue}</Text>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  formInput: {
    paddingLeft: 5,
    height: 50,
    borderWidth: 1,
    borderColor: '#555555',
  },
  formButton: {
    borderWidth: 1,
    borderColor: '#555555',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    marginTop: 5,
  },
});
