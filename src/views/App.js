import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { registerRootComponent } from 'expo'; // import it explicitly

class App extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello world with Eric</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  text: {
    color: 'red'
  }
});

export default registerRootComponent(App); // this is how I register the App component