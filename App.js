import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  ActivityIndicator,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Registro from './Screens/Registro/Registro';
import HomeBottom from './Screens/General/HomeBottom';
import BottonApp from './Screens/BottomApp'
const Stack = createNativeStackNavigator();

export default class App extends Component{
  render(){
    return(
      <NavigationContainer>
        <StatusBar 
          backgroundColor= '#ecf0f1'
          barStyle='dark-content'
        />
        <Stack.Navigator>
          
        <Stack.Screen name ="BottomApp" component={BottonApp} options={{headerShown: false}} />
          <Stack.Screen name="Registro" component={Registro} options={{headerShown:false}}/>
          <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}