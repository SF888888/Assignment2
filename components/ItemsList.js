import React, {useContext} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ThemeContext from '../contexts/ThemeContext';
import { FontAwesome } from '@expo/vector-icons';


export default function ItemsList({ data, itemType, navigation, flag }) {
  const { theme } = useContext(ThemeContext);
  //const navigation = useNavigation();
  
  const handlePress = (item) => {
    navigation.navigate('Edit', { item, itemType, flag});
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handlePress(item)}>
      <View>
      <Text style={[{ color: theme.text, fontSize: theme.fontSize }]}>{item.type || item.description}</Text>
      <Text style={styles.itemText}>{item.duration ? `${item.duration} min` : `${item.calories} kcal`}</Text>
      <Text style={styles.itemText}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      {item.important && (
        <FontAwesome name="warning" size={25} color={theme.buttonBackground} />
      )}
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    flexDirection: 'row', 
  },
  itemText: {
    fontSize: 16,
    padding:5,
  },
});

