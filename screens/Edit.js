import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../components/Button';

export default function EditEntry() {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [activityType, setActivityType] = useState(item.type || '');
  const [description, setDescription] = useState(item.description || '');
  const [duration, setDuration] = useState(item.duration?.toString() || '');
  const [calories, setCalories] = useState(item.calories?.toString() || '');
  const [date, setDate] = useState(new Date(item.date));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSpecial, setIsSpecial] = useState(item.special);
  const { theme } = useContext(ThemeContext);

  const handleSave = async () => {
    if ((!activityType && !description) || (!duration && !calories) || isNaN(duration) || isNaN(calories)) {
      Alert.alert('Invalid input', 'Please enter valid data.');
      return;
    }

    const updatedEntry = {
      type: activityType,
      description,
      duration: parseInt(duration, 10),
      calories: parseInt(calories, 10),
      date: date.toISOString(),
      special: isSpecial,
    };

    await updateDoc(doc(db, 'Activities', item.id), updatedEntry);
    navigation.goBack();
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'Activities', item.id));
    navigation.goBack();
  };

  return (
    <View>
      <Text>{item.type ? 'Activity Type' : 'Description'}</Text>
      {item.type ? (
        <DropDownPicker
          items={[
            { label: 'Walking', value: 'Walking' },
            { label: 'Running', value: 'Running' },
            { label: 'Swimming', value: 'Swimming' },
            { label: 'Weights', value: 'Weights' },
            { label: 'Yoga', value: 'Yoga' },
            { label: 'Cycling', value: 'Cycling' },
            { label: 'Hiking', value: 'Hiking' },
          ]}
          defaultValue={activityType}
          onChangeItem={item => setActivityType(item.value)}
        />
      ) : (
        <TextInput value={description} onChangeText={setDescription} />
      )}
      <Text>{item.type ? 'Duration' : 'Calories'}</Text>
      <TextInput value={item.type ? duration : calories} onChangeText={item.type ? setDuration : setCalories} keyboardType="numeric" />
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
      <View>
        <Button title="Save" onPress={handleSave} />
        <Button title="Delete" onPress={handleDelete} />
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}
