import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Activities from './screens/Activities';
import Diet from './screens/Diet';
import AddAnActivity from './screens/AddAnActivity';
import AddDietEntry from './screens/AddDietEntry';
import Edit from './screens/Edit';
import Settings from './screens/Settings';
import { ThemeProvider } from './contexts/ThemeContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Activities" component={Activities} />
      <Tab.Screen name="Diet" component={Diet} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="AddAnActivity" component={AddAnActivity} />
          <Stack.Screen name="AddADietEntry" component={AddDietEntry} />
          <Stack.Screen name="EditEntry" component={Edit} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
