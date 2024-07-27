import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
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
  const { item, itemType } = route.params;
  const [activityType, setActivityType] = useState(item.type || '');
  const [description, setDescription] = useState(item.description || '');
  const [duration, setDuration] = useState(item.duration?.toString() || '');
  const [calories, setCalories] = useState(item.calories?.toString() || '');
  const [date, setDate] = useState(new Date(item.date));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isSpecial, setIsSpecial] = useState(item.special);
  const { theme } = useContext(ThemeContext);
  const [isImportant, setIsImportant] = useState(false);

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
      important: isImportant,
    };
    const collectionName = itemType === 'activity' ? 'Activities' : 'Diet';
    await updateDoc(doc(db, collectionName, item.id), updatedEntry);
    Alert.alert('Are you sure you want to save these changes?');
    navigation.goBack();
  };

  const handleDelete = async () => {
    const collectionName = itemType === 'activity' ? 'Activities' : 'Diet';
    await deleteDoc(doc(db, collectionName, item.id));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isImportant}
          onValueChange={setIsImportant}
        />
        <Text style={styles.checkboxLabel}>This item is marked special, select the checkbox if you would like to approve it</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
  },
});


