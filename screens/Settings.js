import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../components/Button';

const Settings = () => {
  const { switchToScheme1, switchToScheme2 } = useContext(ThemeContext);
  const [isScheme1, setIsScheme1] = useState(true);

  const toggleTheme = () => {
    if (isScheme1) {
      switchToScheme2();
    } else {
      switchToScheme1();
    }
    setIsScheme1(!isScheme1);
  };
  return (
    <View style={styles.container}>
      <Button title={`Switch to ${isScheme1 ? 'Warm' : 'Calm'} Scheme`} onPress={toggleTheme}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Settings;
