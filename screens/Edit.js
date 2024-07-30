import React, { useState, useContext, useLayoutEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../components/Button';
import { FontAwesome } from '@expo/vector-icons';

export default function Edit(props) {
  //const navigation = useNavigation();
  const route = useRoute();
  const { item, itemType, flag } = route.params;
  const [activityType, setActivityType] = useState(item.type || '');
  const [description, setDescription] = useState(item.description || '');
  const [duration, setDuration] = useState(item.duration?.toString() || '');
  const [calories, setCalories] = useState(item.calories?.toString() || '');
  const [date, setDate] = useState(new Date(item.date));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { navigation } = props;
  const { theme } = useContext(ThemeContext);
  const [isImportant, setIsImportant] = useState(item.important || false);

  const [items, setItems] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' },
  ]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleDelete}>
          <FontAwesome name="trash" size={20} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  const handleSave = async () => {
    if ((!activityType && !description) || (!duration && !calories) ) {
      
      Alert.alert('Invalid input', 'Please enter valid data.');
      return;
    }
    const updatedEntry = {
      type: activityType,
      description,
      duration: parseInt(duration, 10),
      calories: parseInt(calories, 10),
      date: date.toISOString(),
      important: isImportant,
    };
    const collectionName = itemType === 'activity' ? 'Activities' : 'Diet';
    await updateDoc(doc(db, collectionName, item.id), updatedEntry);

    Alert.alert(
      "Save Changes",
      "Are you sure you want to save these changes?",
      [
        {
          text: "No",
          onPress: () => alert("Changes not saved"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            const updatedEntry = {
              type: activityType,
              duration: parseInt(duration, 10),
              date: date.toISOString(),
              important: isImportant,
            };
            await updateDoc(doc(db, 'Activities', item.id), updatedEntry);
            const newFlag=flag + 1;
            navigation.navigate(itemType === 'activity' ? 'Activities' : 'Diet', {newFlag});
          }
        }
      ]
    );
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this?",
      [
        {
          text: "No",
          onPress: () => alert("Not deleted"),
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            const collectionName = itemType === 'activity' ? 'Activities' : 'Diet';
            await deleteDoc(doc(db, collectionName, item.id));
            const newFlag=flag + 1;
            navigation.navigate(itemType === 'activity' ? 'Activities' : 'Diet', {newFlag});
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.text, fontSize: theme.fontSize }]}>{item.type ? 'Activity Type' : 'Description'}</Text>
      {item.type ? (
        <DropDownPicker
        
        value={activityType}
        items={items}
        setValue={setActivityType}
        setItems={setItems}
        placeholder="Select an activity type"
        containerStyle={[styles.dropdown, { zIndex: 9999 }]}
        //defaultValue={activityType}
        onChangeItem={item => setActivityType(item.value)}
        />
      ) : (
        <TextInput value={description} onChangeText={setDescription} />
      )}
      <Text style={[styles.label, { color: theme.text, fontSize: theme.fontSize }]}>{item.type ? 'Duration' : 'Calories'}</Text>
      <TextInput value={item.type ? duration : calories} onChangeText={item.type ? setDuration : setCalories} keyboardType="numeric" style={styles.input}/>
      <Text style={[styles.label, { color: theme.text, fontSize: theme.fontSize }]}>Date</Text>
      <TextInput value={date.toLocaleDateString()} onFocus={() => setShowDatePicker(true)} style={styles.input}/>
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
      <View style={styles.checkbox}>
        <Checkbox style={styles.checkbox}
          value={isImportant}
          onValueChange={setIsImportant}
        />
        <Text style={styles.checkboxLabel}>This item is marked special, select the checkbox if you would like to approve it</Text>
      </View>
      <View>
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  checkbox: {
    marginTop: 8,
    alignContent:'left',
  },
  deleteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  label: {
    paddingTop: 12, 
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});


