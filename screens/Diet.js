import React, { useEffect, useState, useContext } from 'react';
import { View} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import ItemsList from '../components/ItemsList';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../components/Button';

export default function Diet(props) {
  const navigation = useNavigation();
  const [dietEntries, setDietEntries] = useState([]);
  const { theme } = useContext(ThemeContext);
  const [flag, setFlag] = useState(0);
  const route = useRoute();
  const newFlag = route.params?.newFlag;

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
  }, [flag]);

  useEffect(() => {
    if(newFlag){
      setFlag(flag + 1);
    }
  }, [newFlag]);

  return (
    <View>
      <Button title="Add Diet" onPress={() => navigation.navigate('AddADietEntry', {flag})} />
      <ItemsList data={dietEntries} itemType="diet" navigation={navigation} flag = {flag}/>
    </View>
  );
}
