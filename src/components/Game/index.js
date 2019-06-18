import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
import Board from './boardLogic'
import Cell from './Cell'

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: '5',
      columns: '5',
      gameRunning: false,
      interval: 1000,
      board: new Board()
    }
  }

  handleRowChange = text => {
    if (!this.state.gameRunning) {
      this.setState({
        rows: text
      })
    }
  }

  handleColumnChange = text => {
    if (!this.state.gameRunning) {
      this.setState({
        columns: text
      })
    }
  }

  renderBoard = () => {
    let newBoard = []
    let cellRow = []
    for (let i = 0; i < this.state.rows; i++) {
      for (let j = 0; j < this.state.columns; j++) {
        if (this.state.board.isCellAlive(i + ' , ' + j)) {
          cellRow.push(
            <Cell
              key={[i, j]}
              position={{ x: i, y: j }}
              live={true}
              storeCell={this.storeCell.bind(this)}
            />
          )
        } else {
          cellRow.push(
            <Cell
              key={[i, j]}
              position={{ x: i, y: j }}
              live={false}
              storeCell={this.storeCell.bind(this)}
            />
          )
        }
      }
      newBoard.push(
        <View className="row" key={i}>
          {cellRow}
        </View>
      )
      cellRow = []
    }
    return newBoard
  }

  handleStart = () => {
    if (!this.state.gameRunning) {
      this.setState(
        {
          gameRunning: true
        },
        () => {
          this.intervalRef = setInterval(
            () => this.runGame(),
            this.state.interval
          )
        }
      )
    }
  }

  handleStop = () => {
    this.setState(
      {
        gameRunning: false
      },
      () => {
        if (this.intervalRef) {
          clearInterval(this.intervalRef)
        }
      }
    )
  }

  runGame = () => {
    this.setState({
      board: this.state.board.addBoard()
    })
  }

  storeCell = position => {
    if (!this.state.gameRunning) {
      this.setState({
        board: this.state.board.storeCell(position)
      })
    }
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
          <TouchableOpacity style={styles.button} onPress={this.handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.handleStop}>
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>
        <Text>Board: {this.state.board.getnumberBoard()}</Text>
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
