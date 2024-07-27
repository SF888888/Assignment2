import React, { useEffect, useState, useContext } from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import ItemsList from '../components/ItemsList';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../components/Button';

export default function Activities() {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchActivities = async () => {
      const querySnapshot = await getDocs(collection(db, 'Activities'));
      const activitiesList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setActivities(activitiesList);
    };
    fetchActivities();
  }, []);

  return (
    <View>
      <Button title="Add Activity" onPress={() => navigation.navigate('AddAnActivity')} />
      <ItemsList data={activities} />
    </View>
  );
}