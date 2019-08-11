import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

export default class Cell extends Component {
  render() {
    return (
      // <TouchableOpacity
      //   onPress={() => this.props.storeCell(this.props.position)}
      // >
        <View
          style={
            this.props.live
              ? styles.cellContainerLive
              : styles.cellContainerDead
          }
        />
      // </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  cellContainerLive: {
    flex: 0,
    padding: 3,
    margin: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    backgroundColor: 'black'
  },
  cellContainerDead: {
    flex: 0,
    padding: 3,
    margin: 1,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid'
  }
})
