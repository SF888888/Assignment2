import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import ThemeContext from '../contexts/ThemeContext';
import Button from '../components/Button';

const Settings = () => {
  const { switchToScheme1, switchToScheme2 } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <Button title="Switch to Calm Scheme" onPress={switchToScheme1} />
      <Button title="Switch to Warm Scheme" onPress={switchToScheme2} />
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
