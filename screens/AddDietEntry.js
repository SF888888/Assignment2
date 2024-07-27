import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../components/Button';

export default function AddADietEntry() {
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleSave = async () => {
    if (!description || !calories || isNaN(calories)) {
      Alert.alert('Invalid input', 'Please enter valid data.');
      return;
    }

    const dietEntry = {
      description,
      calories: parseInt(calories, 10),
      date: date.toISOString(),
      special: calories > 800,
    };

    await addDoc(collection(db, 'Diet'), dietEntry);
    navigation.goBack();
  };

  return (
    <View>
      <Text>Description</Text>
      <TextInput value={description} onChangeText={setDescription} />
      <Text>Calories</Text>
      <TextInput value={calories} onChangeText={setCalories} keyboardType="numeric" />
      <Text>Date</Text>
      <TextInput value={date.toLocaleDateString()} onFocus={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            setDate(selectedDate || date);
          }}
        />
      )}
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}
