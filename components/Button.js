import React, { useContext } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import ThemeContext from '../contexts/ThemeContext';

const Button = ({ title, onPress, style, textStyle }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <Pressable style={[styles.button, style, { backgroundColor: theme.buttonBackground }]} onPress={onPress}>
      <Text style={[styles.text, textStyle, { color: theme.buttonText }]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default Button;