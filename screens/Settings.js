import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={{ backgroundColor: theme.background, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: theme.text }}>Current Theme: {theme === themes.light ? 'Light' : 'Dark'}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}
