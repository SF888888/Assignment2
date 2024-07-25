import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';

export default function AddAnActivity() {
  const navigation = useNavigation();
  const [activityType, setActivityType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    if (!activityType || !duration || isNaN(duration)) {
      Alert.alert('Invalid input', 'Please enter valid data.');
      return;
    }

    const activity = {
      type: activityType,
      duration: parseInt(duration, 10),
      date: date.toISOString(),
      special: (activityType === 'Running' || activityType === 'Weight Training') && duration > 60,
    };

    await addDoc(collection(db, 'Activities'), activity);
    navigation.goBack();
  };

  return (
    <View>
      <Text>Activity Type</Text>
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
      <Text>Duration</Text>
      <TextInput value={duration} onChangeText={setDuration} keyboardType="numeric" />
      <Text>Date</Text>
      <TextInput value={date.toLocaleDateString()} onFocus={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="inline"
          onChange={(event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShowDatePicker(false);
            setDate(currentDate);
          }}
        />
      )}
      <Button title="Save" onPress={handleSave} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
}
