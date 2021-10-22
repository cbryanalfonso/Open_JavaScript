import React, { Component, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeBottom from './General/HomeBottom';
import Mensajes from './General/Mensajes';
import Calendario from './General/Calendario';
import Ubicacion from './General/Ubucacion';
import Perfil from './General/Perfil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export default function Registro({ navigation }) {
    return (
        <Tab.Navigator
        initialRouteName='H'
            screenOptions={{

                tabBarActiveTintColor: '#e91e63',
            }}
            

        >
            <Tab.Screen
                name="H"
                component={HomeBottom}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" size={30} color = {color}/>
                    ),
                }}
            />
            <Tab.Screen
                name="Mensajes"
                component={Mensajes}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Calendario"
                component={Calendario}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Ubicacion"
                component={Ubicacion}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    headerShown: false,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}

            />
        </Tab.Navigator>


    );
}