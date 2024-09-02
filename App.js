"use Client";

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, SafeAreaView } from 'react-native';
import * as React from 'react';
import { getById } from './services/UserServices';

export default function App() {
  const [number, setNumber] = React.useState(''); 

  const handlePress = () => {
    if (number.trim() !== '') {
      getById(number);
    } else {
      alert('Please enter a valid ID');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Inserte un ID para buscar: </Text>
      <TextInputExample value={number} onChangeText={setNumber} />
      <Button
        title="Enviar"
        onPress={handlePress}
      />

      <Text>Login </Text>
      <TextInputExample value={user} onChangeText={setNumber} placeholder="User"/>
      <TextInputExample value={password} onChangeText={setNumber} placeholder="Password"/>
      <StatusBar style="auto" />
    </View>
  );
}



const TextInputExample = ({ value, onChangeText }) => {
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder="Place ID"
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
