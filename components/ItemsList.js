import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ItemsList({ data }) {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.type || item.description}</Text>
      <Text style={styles.itemText}>{item.duration ? `${item.duration} min` : `${item.calories} kcal`}</Text>
      <Text style={styles.itemText}>{new Date(item.date).toLocaleDateString()}</Text>
    </View>
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
  },
  itemText: {
    fontSize: 16,
  },
});

