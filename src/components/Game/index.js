import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
import Cell from './Cell'

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: '5',
      columns: '5'
    }
  }

  handleRowChange = text => {
    this.setState({
      rows: text
    })
  }

  handleColumnChange = text => {
    this.setState({
      columns: text
    })
  }

  renderBoard = () => {
    var newBoard = []
    var cellRow = []
    for (var i = 0; i < this.state.rows; i++) {
      for (var j = 0; j < this.state.columns; j++) {
        cellRow.push(<Cell key={[i, j]} />)
      }
      newBoard.push(
        <View style={styles.row} key={i}>
          {cellRow}
        </View>
      )
      cellRow = []
    }
    return newBoard
  }

  render() {
    return (
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Rows</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={this.state.rows}
              onChangeText={this.handleRowChange}
            />
          </View>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Columns</Text>
            <TextInput
              style={styles.input}
              value={this.state.columns}
              onChangeText={this.handleColumnChange}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.board}>{this.renderBoard()}</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  labelContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 5
  },
  label: {
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: 'black',
    backgroundColor: '#d6d6d6',
    borderWidth: 1,
    padding: 10
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20
  },
  button: {
    backgroundColor: '#008cba',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  board: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    margin: 20,
    borderColor: 'black',
    borderStyle: 'dotted',
    borderWidth: 2
  }
})
