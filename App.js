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
  constructor() {
    super();
    this.state = {
      myValue: '',
      username: '',
      password: '',
      users: [],
      key: 0,
    };
  }
  changeInputValue = (text) => {
    this.setState({
      myValue: text,
    });
  };
  userNameValue = (text) => {
    this.setState({
      username: text,
    });
  };
  passwordValue = (text) => {
    this.setState({
      password: text,
    });
  };
  onSubmit = async () => {
    try {
      this.setState({myValue: 'Hello'});
      await AsyncStorage.setItem('myValue', 'Hello');
    } catch (err) {
      console.log(err);
    }
  };
  save = async () => {
    try {
      await AsyncStorage.setItem('key', this.state.myValue);
    } catch (err) {
      console.log(err);
    }
  };
  saveUSer = async () => {
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
      const users = JSON.parse(retrievedUser);
      this.setState({users: users});
      console.log(users);
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
      await AsyncStorage.removeItem('Users');
      this.setState({users: []});
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
            onChangeText={this.userNameValue}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Insert password"
            value={this.state.password}
            onChangeText={this.passwordValue}
          />
          <Button
            style={styles.formButton}
            onPress={this.saveUSer}
            title="Get Key"
            color="#2196f3"
            accessibilityLabel="Save Key"
          />
          <Button
            style={styles.formButton}
            onPress={this.getUsers}
            title="Get Data"
            color="#2196f3"
            accessibilityLabel="Get Key"
          />
          <Button
            style={styles.formButton}
            onPress={this.removeData}
            title="Delete Data"
            color="#2196f3"
            accessibilityLabel="Delete"
          />
          <Text style={styles.instructions}>
            Stored key is = {this.state.myValue}
          </Text>
          <FlatList
            keyExtractor={(user) => user.key.toString()}
            data={this.state.users}
            renderItem={({item}) => {
              return (
                <View>
                  <Text style={styles.textStyle}>
                    Username: {item.username} password: {item.password}
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
