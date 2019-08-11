import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native'
import Board from './boardLogic'
import Cell from './Cell'

export default class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows: '100',
      columns: '100',
      gameRunning: false,
      firstRender: true,
      density: 0.5,
      interval: 100,
      board: new Board()
    }
    this.liveCells = new Array()
    this.numberOfLiveCells =
      this.state.rows * this.state.columns * this.state.density
  }

  // handleRowChange = text => {
  //   if (!this.state.gameRunning) {
  //     this.setState({
  //       rows: text
  //     })
  //   }
  // }

  // handleColumnChange = text => {
  //   if (!this.state.gameRunning) {
  //     this.setState({
  //       columns: text
  //     })
  //   }
  // }

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
              live={this.state.firstRender && this.aleatoryMapping(i, j)}
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

  aleatoryMapping = (x, y) => {
    const random_boolean = Math.random() < this.state.density
    if (random_boolean && this.liveCells.length < this.numberOfLiveCells) {
      this.liveCells.push({ x, y })
      return true
    }
    return false
  }

  handleStart = () => {
    if (!this.state.gameRunning) {
      this.setState(
        {
          gameRunning: true,
          firstRender: false
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

  // handleStop = () => {
  //   this.setState(
  //     {
  //       gameRunning: false
  //     },
  //     () => {
  //       if (this.intervalRef) {
  //         clearInterval(this.intervalRef)
  //       }
  //     }
  //   )
  // }

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

  componentDidMount() {
    this.liveCells.map(cell => {
      this.storeCell(cell)
		})
		this.handleStart();
  }

  render() {
    return (
      <View>
        {/* <View style={styles.inputContainer}>
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
        </View> */}
        <Text>Board: {this.state.board.getnumberBoard()}</Text>
        <ScrollView>
          <ScrollView horizontal={true} style={styles.board}>
            {this.renderBoard()}
          </ScrollView>
        </ScrollView>
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
    paddingTop: 20,
    paddingBottom: 20
  }
})
