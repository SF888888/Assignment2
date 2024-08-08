import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../components/Button';

export default function AddADietEntry() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const { theme } = useContext(ThemeContext);
  const route = useRoute();
  const flag = route.params.flag;

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
    const newFlag = flag + 1;
    navigation.navigate('Diet', {newFlag});
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text, fontSize: theme.fontSize }]}>Description</Text>
      <TextInput value={description} onChangeText={setDescription} style={styles.input}/>
      <Text style={[styles.label, { color: theme.text, fontSize: theme.fontSize }]}>Calories</Text>
      <TextInput value={calories} onChangeText={setCalories} keyboardType="numeric" style={styles.input}/>
      <Text style={[styles.label, { color: theme.text, fontSize: theme.fontSize }]}>Date</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  dropdown: {
    marginBottom: 16,
  },
  label: {
    paddingBottom: 12, 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});