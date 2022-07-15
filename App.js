import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import Box from './components/Box';

export default function App() {

  const [boxes, setBoxes] = useState(Array(9).fill(null));
  const [isXChance, setIsXChance] = useState(true);
  const [winner, setWinner] = useState(null);

  function PlayBox(no) {
    return(
      <Box 
        no={no}
        boxInfo={{boxes, setBoxes}}
        chance={{ isXChance, setIsXChance }}
        winner={winner}
      />
    )
  }

  const winPosition = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8] ,[2,4,6]
  ]

  function calculateWin() {
    for (let i=0;  i<winPosition.length; i++) {
      if( 
        boxes[winPosition[i][0]] !== null &&
        boxes[winPosition[i][0]] === boxes[winPosition[i][1]]
        && boxes[winPosition[i][0]] === boxes[winPosition[i][2]]
       ) {
         setWinner(boxes[winPosition[i][0]]);
         return;
       }
    }
  }

  useEffect(() => {
    calculateWin();
  }, [isXChance])

  function resetValues() {      // resets the values
    setWinner(null);
    setBoxes(Array(9).fill(null));
    setIsXChance(true);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto"  backgroundColor='orange'/>
      <View style={styles.featureContainer}>
        {winner !== null 
        ? <Text style={[styles.primaryText, styles.winnerText]}>Winner : {winner}</Text>
        : <Text style={styles.primaryText}>Chance : {isXChance ? 'X' : 'O'}</Text>
        }
        <Ionicons     // reset icon
          style={styles.resetIcon}
          name="reload-circle" 
          size={38} 
          color="black" 
          onPress={resetValues}   // resets the values
        />
      </View>
      <View style={styles.playBoard}>
        <View style={styles.rows}>
          {PlayBox(0)}
          {PlayBox(1)}
          {PlayBox(2)}
        </View>
        <View style={styles.rows}>
          {PlayBox(3)}
          {PlayBox(4)}
          {PlayBox(5)}
        </View>
        <View style={styles.rows}>
          {PlayBox(6)}
          {PlayBox(7)}
          {PlayBox(8)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  playBoard: {
    borderWidth: 10,
    borderRadius: 10,
    borderColor: 'gray'
  },
  rows: {
    flexDirection: 'row',
  },
  resetIcon: {
    position: 'absolute',
    right: 20,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  primaryText: {
    fontSize: 36,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'

  },
  winnerText: {
    color: 'green',
    fontSize: 36,
  }
});