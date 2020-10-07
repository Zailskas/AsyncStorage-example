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

  onSubmit = async () => {
    try {
      this.setState({myValue: 'Test'});
      await AsyncStorage.setItem('myValue', 'Test');
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <SafeAreaView>
        <View>
          <Text style={styles.welcome}>Welcome to Demo AsyncStorage!</Text>
          <Button
            style={styles.formButton}
            onPress={this.onSubmit}
            title="Get Key"
            color="#2196f3"
            accessibilityLabel="Get Key"
          />
          <Text style={styles.instructions}>
            Stored key is = {this.state.myValue}
          </Text>
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
