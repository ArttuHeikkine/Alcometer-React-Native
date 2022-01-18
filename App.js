import React, { useState } from 'react'
import { Button, TextInput, Text, View } from 'react-native-web';
import Styles from './style/Styles'
import RadioForm from 'react-native-simple-radio-button';
import {Picker} from '@react-native-picker/picker';

export default function App() {
const [weight, setWeight] = useState(0);
const [gender, setGender] = useState('female');
const [amount, setAmount] = useState(1);
const [time, setTime] = useState(1);
const [bac, setBac] = useState(0);

const times= [
  {label: '1 hour', value: 1},
  {label: '2 hours', value: 2},
  {label: '3 hours', value: 3},
  {label: '4 hours', value: 4},
  {label: '5 hours', value: 5},
]

const amounts= [
  {label: '1 beer', value: 1},
  {label: '2 beers', value: 2},
  {label: '3 beers', value: 3},
  {label: '4 beers', value: 4},
  {label: '5 beers', value: 5},
]

const genders = [
  {label: 'Female', value: 'female'},
  {label: 'Male', value: 'male'}
];

function calculate() {
  let result = 0
  let litres = amount * 0.33;
  let grams = litres * 8 * 4.5;
  let burning = weight / 10;
  let gramsLeft = grams - (burning * time);

  if (gender === 'female') {
    result = gramsLeft / (weight * 0.6)
  } else {
    result = gramsLeft / (weight * 0.7)
  }
  setBac(result);
}

  if (bac < 0) {
    setBac(0);
  }

  return (
    <View>
      <Text style={Styles.header}>Alcometer</Text>
      <Text style={Styles.text}>Weight</Text>
      <TextInput 
        style={Styles.input}
        onChangeText={text => setWeight(text)}
        placeholder="In kilograms"
        keyboardType="numeric"></TextInput>
      <Text style={Styles.text}>Bottles</Text>
      <Picker
        onValueChange={(itemValue) => setAmount(itemValue)}
        selectedValue={amount}
      >
          {amounts.map((amount,index) => (
            <Picker.Item key={index} label={amount.label} value={amount.value}/>
          ))
          }
      </Picker>
      <Text style={Styles.text}>Time</Text>
      <Picker
        onValueChange={(itemValue) => setTime(itemValue)}
        selectedValue={time}
      >
          {times.map((time,index) => (
            <Picker.Item key={index} label={time.label} value={time.value}/>
          ))
          }
      </Picker>

      <Text style={Styles.text}>Gender</Text>
      <RadioForm 
        style={Styles.radio}
        buttonSize = {10}
        radio_props={genders}
        initial={0}
        onPress={(value) => {setGender(value)}}
      ></RadioForm>
      <Text style={Styles.bac}>{bac.toFixed(2)}</Text>
      <Button onPress={calculate} title="Calculate"></Button>
    </View>
  );
}