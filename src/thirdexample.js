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
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      users: [],
      key: 0,
    };
  }
  userNameChange = (text) => {
    this.setState({
      username: text,
    });
  };
  passwordChange = (text) => {
    this.setState({
      password: text,
    });
  };
  removeData = async () => {
    try {
      await AsyncStorage.removeItem('Users');
      this.setState({users: []});
    } catch (err) {
      console.log(err);
    }
  };
  saveUser = async () => {
    const user = {
      key: this.state.key,
      username: this.state.username,
      password: this.state.password,
    };
    const number = this.state.key + 1;
    this.setState({key: number});
    const users = [...this.state.users, user];
    this.setState({users: users});
    try {
      await AsyncStorage.setItem('Users', JSON.stringify(users));
      console.log(users);
    } catch (err) {
      console.log(err);
    }
  };
  getUsers = async () => {
    try {
      const retrievedUser = await AsyncStorage.getItem('Users');
      console.log(retrievedUser);
      const users = JSON.parse(retrievedUser);
      this.setState({users: users});
      console.log(users);
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
            value={this.state.password}
            onChangeText={this.passwordChange}
          />
          <Button
            style={styles.formButton}
            onPress={this.saveUser}
            title="Save value"
            color="#2196f3"
            accessibilityLabel="Save Key"
          />
          <Button
            style={styles.formButton}
            onPress={this.getUsers}
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
          <FlatList
            keyExtractor={(user) => user.key.toString()}
            data={this.state.users}
            renderItem={({item}) => {
              return (
                <View>
                  <Text style={styles.textStyle}>
                    Firstname: {item.username} Lastname: {item.password}
                  </Text>
                </View>
              );
            }}
          />
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
