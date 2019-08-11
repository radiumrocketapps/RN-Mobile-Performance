import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Game from './Game'

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
