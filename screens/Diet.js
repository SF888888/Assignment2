import React, { useEffect, useState, useContext } from 'react';
import { View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import ItemsList from '../components/ItemsList';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../components/Button';

export default function Diet() {
  const navigation = useNavigation();
  const [dietEntries, setDietEntries] = useState([]);
  const { theme } = useContext(ThemeContext);

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
      <ItemsList data={dietEntries} itemType="diet" navigation={navigation} />
    </View>
  );
}
