import React, { useEffect, useState, useContext } from 'react';
import { View} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseSetup';
import ItemsList from '../components/ItemsList';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../components/Button';

export default function Activities(props) {
  const navigation = useNavigation();
  const [activities, setActivities] = useState([]);
  const [flag, setFlag] = useState(0);
  const route = useRoute();
  const newFlag = route.params?.newFlag;
  console.log(route.params);
  //const { newFlag } = route.params;
  // const { theme } = useContext(ThemeContext);

  /*const changeFlag = () => {
    setFlag(flag + 1);
  };*/

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
  }, [flag]);

  useEffect(() => {
    if(newFlag){
      setFlag(flag + 1);
    }
  }, [newFlag]);

  return (
    <View>
      <Button title="Add Activity" onPress={() => navigation.navigate('AddAnActivity', {flag})} />
      <ItemsList data={activities} itemType="activity" navigation={navigation} flag = {flag}/>
    </View>
  );
}