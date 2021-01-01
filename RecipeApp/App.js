import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainUI from './src/components/MainUI';
import Ingredients from './src/components/Ingredients';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "MainUI" component = {MainUI}></Stack.Screen>
        <Stack.Screen name = "Ingredients" component = {Ingredients}></Stack.Screen>
      
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;