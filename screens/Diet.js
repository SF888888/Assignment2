import React, { useEffect, useState } from 'react';
import { View, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestoreHelper';
import { db } from '../firebase/config';
import ItemsList from '../components/ItemsList';

export default function Diet() {
  const navigation = useNavigation();
  const [dietEntries, setDietEntries] = useState([]);

  useEffect(() => {
    const fetchDietEntries = async () => {
      const querySnapshot = await getDocs(collection(db, 'Diet'));
      const dietList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDietEntries(dietList);
    };
    fetchDietEntries();
  }, []);

  return (
    <View>
      <Button title="Add Diet Entry" onPress={() => navigation.navigate('AddADietEntry')} />
      <ItemsList data={dietEntries} />
    </View>
  );
}
