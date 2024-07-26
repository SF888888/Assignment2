import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestoreHelper';
import { db } from '../firebase/config';
import ItemsList from '../components/ItemsList';

export default function Activities() {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);

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