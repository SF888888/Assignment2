import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TextInput, Alert, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../components/Button';

export default function AddAnActivity(props) {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [activityType, setActivityType] = useState(null);
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const route = useRoute();
  const flag = route.params.flag;
  console.log(route.params);
  // const { theme } = useContext(ThemeContext);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);

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
    const newFlag = flag + 1;
    navigation.navigate('Activities', {newFlag});
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text, fontSize: theme.fontSize }]}>Activity Type</Text>
      <DropDownPicker
        open={open}
        value={activityType}
        items={items}
        setOpen={setOpen}
        setValue={setActivityType}
        setItems={setItems}
        placeholder="Select an activity type"
        containerStyle={styles.dropdown}
      />
      <Text style={[styles.label, { color: theme.text, fontSize: theme.fontSize }]}>Duration</Text>
      <TextInput
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text style={[styles.label, { color: theme.text, fontSize: theme.fontSize }]}>Date</Text>
      <TextInput
        value={date.toLocaleDateString()}
        onFocus={() => setShowDatePicker(true)}
        style={styles.input}
      />
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