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
import AcercaCompany from './Screens/Nuevo/AcercaComapany';
import AgregarCompany from './Screens/Nuevo/AgregarCompany';
import RegistrarCompany from './Screens/Nuevo/RegistrarCompany';
import CuentaAcercaCompany from './Screens/Nuevo/CuentaAcercaCompany';
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
        <Stack.Screen name="Registro" component={Registro} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        
        <Stack.Screen name ="BottomApp" component={BottonApp} options={{headerShown: false}} />
          

        <Stack.Screen name ="AcercaCompany" component={AcercaCompany} options={{headerShown:true}}/>
        <Stack.Screen name="AgregarCompany" component={AgregarCompany} options={{headerShown: true}}/>
        <Stack.Screen name ="RegistrarCompany" component={RegistrarCompany} options={{headerShown: true}}/>
        <Stack.Screen name ="CuentaAcercaCompany" component={CuentaAcercaCompany} options={{headerShown: true}}/>
        
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}