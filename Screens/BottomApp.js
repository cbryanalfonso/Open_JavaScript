import React, { Component,useState } from 'react';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
//import firestore from '@react-native-firebase/firestore';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeBottom from './General/HomeBottom';
import Mensajes from './General/Mensajes';

//const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Registro({ navigation }) {
    return(
            <Tab.Navigator>
                <Tab.Screen 
                    name= "H"
                    component={HomeBottom}
                    options={{headerShown: false}}
                />
                <Tab.Screen
                    name="Mensajes"
                    component={Mensajes}
                    options={{headerShown: false}}
                />
            </Tab.Navigator>


    );
}