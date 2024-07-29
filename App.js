import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Activities from './screens/Activities';
import Diet from './screens/Diet';
import AddAnActivity from './screens/AddAnActivity';
import AddDietEntry from './screens/AddDietEntry';
import Edit from './screens/Edit';
import Settings from './screens/Settings';
import ThemeContext,{ ThemeProvider } from './contexts/ThemeContext';
import { FontAwesome } from '@expo/vector-icons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MainTabs() {
  const { theme } = useContext(ThemeContext);
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: theme.buttonBackground, 
      
    }}>
      <Tab.Screen name="Activities" component={Activities} 
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <FontAwesome name="user" size={size} color={focused ? theme.buttonBackground:theme.background} />
        ),
      }}
      />
      <Tab.Screen name="Diet" component={Diet} 
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <FontAwesome name="spoon" size={size} color={focused ? theme.buttonBackground:theme.background} />
        ),
      }}/>
      <Tab.Screen name="Settings" component={Settings} 
      options={{
        tabBarIcon: ({ color, size, focused }) => (
          <FontAwesome name="gear" size={size} color={focused ? theme.buttonBackground:theme.background} />
        ),
      }}/>
      
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const { theme } = useContext(ThemeContext);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.background,
      text: theme.text,
      primary: theme.navigationBar,
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }}/>
        <Stack.Screen name="Add An Activity" component={AddAnActivity} />
        <Stack.Screen name="Add A Diet" component={AddDietEntry} />
        <Stack.Screen name="Edit" component={Edit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
