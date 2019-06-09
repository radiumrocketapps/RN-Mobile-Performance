import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export default class Cell extends Component {
  render() {
    return <View style={styles.cellContainer} />
  }
}

const styles = StyleSheet.create({
  cellContainer: {
    flex: 0,
    padding: 10,
    margin: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid'
  }
})
