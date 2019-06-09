import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Game from './Game'

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Conways Game of Life - PWA</Text>
        <Game />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#efefef',
    padding: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
