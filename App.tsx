import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Button from './src/Components/Button'
import Display from './src/Components/Display'
import React, { useState } from 'react';

interface initialState {
    displayValue: string,
    clearDisplay: boolean,
    operation: null | undefined,
    values: [number, number],
    current: number,
}
const initialState: initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0

}
export default function App() {
  const [value, setValue] = useState<initialState>({...initialState});

  addDigit = n => {
    if (n === '.' && value.displayValue.includes('.')) {
      return
    }
    
    const clearDisplay = value.displayValue === '0'
    || value.clearDisplay;

    const currentValue = clearDisplay ? '' :  value.displayValue;
    const displayValue = currentValue + n;
    setValue((ps) =>  ({...ps, displayValue, clearDisplay: false}));

      if (n !== '.') {
         const newValue = parseFloat(displayValue)
         const values = [...value.values];
         values[value.current] = newValue;
         setValue(pe => ({...pe, values}));
      }
      console.log(value)
  }

  clearMemory = () => {
    setValue(initialState)
    console.log(initialState)
  }

  setOperation = operation => {
    if (value.current === 0) {
        setValue(pe => ({...pe, operation, current: 1, clearDisplay: true}))
        
    } else {
      const equals =  operation === '=';
      const values = [...value.values]
     
      try {
          values[0] = eval(`${values[0]} ${value.operation} ${values[1]}`)
      } catch (e) {
          values[0] = value.values[0];
        }
        
        values[1] = 0;
        setValue(pe => ({
          displayValue: values[0], 
          operation: equals ? null : operation,
          current: equals ? 0 : 1,
          clearDisplay: !equals,
          values,
        }))
     
    }
  }

  return (
    <View style={styles.container}>
      <Display value={value.displayValue} />
      <View style={styles.buttons}>
        <Button label='AC' triple onClick={clearMemory}/>    
        <Button label='/' operationButton onClick={() => setOperation('/')}/>    
        <Button label='7' onClick={() => addDigit(7)}/>    
        <Button label='8' onClick={() => addDigit(8)}/>    
        <Button label='9' onClick={() => addDigit(9)}/>    
        <Button label='*' operationButton onClick={() => setOperation('*')}/>    
        <Button label='4' onClick={() => addDigit(4)}/>    
        <Button label='5' onClick={() => addDigit(5)}/>    
        <Button label='6' onClick={() => addDigit(6)}/>    
        <Button label='-' operationButton onClick={() => setOperation('-')}/>    
        <Button label='1' onClick={() => addDigit(1)}/>    
        <Button label='2' onClick={() => addDigit(2)}/>    
        <Button label='3' onClick={() => addDigit(3)}/>    
        <Button label='+' operationButton onClick={() => setOperation('+')}/>    
        <Button label='0' double onClick={() => addDigit(0)}/>    
        <Button label='.' onClick={() => addDigit('.')} />    
        <Button label='=' operationButton onClick={() => setOperation('=')}/>    
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',

  }
});
