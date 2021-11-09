import React, { Component, useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  Dimensions,
  Alert,
  PermissionsAndroid
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView from 'react-native-maps';
const {width, height}= Dimensions.get('window')


export default class Ubucacion extends Component{
  constructor(){
    super()
    this.state={
      region:{
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null,
      }
    }
  }

  calcDelta(lat, lon, accuracy){
    const oneDegreeOfLongitudInMeters = 111.32;
    const circumReference = (40075 /360)
    const latDelta = accuracy * (1/ (Math.cos(lat) *circumReference))
    const lonDelta = (accuracy / oneDegreeOfLongitudInMeters)
    this.setState({
      region:{
        latitude: lat,
        longitude: lon,
        latitudeDelta: latDelta,
        longitudeDelta: lonDelta,
      }
    })
  }

  componentDidMount(){
    const requestLocationPermission = async() =>{
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
            'title': 'Location acces requerid',
            'message': 'This app needs to access you location'
          }
        )
        if(granted === PermissionsAndroid.RESULTS.GRANTED){
          Geolocation.getCurrentPosition(
            (position)=>{
              const lat = position.coords.latitude
                  const lon = position.coords.longitude
                  const accuracy = position.coords.accuracy
                  this.calcDelta(lat,lon,accuracy)
                  console.log(lat)
            }
            
          )
          console.log("Ubicacion accedida")
          
        }else{
          Alert.alert('Permiso denegado')
        }
      } catch (error) {
        Alert.alert("error",error)
      }
    }
    requestLocationPermission();
  }

  
  render(){
    return(
      <View style={styles.container}>
        {this.state.region.latitude ? <MapView
        //provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={this.state.region}
          showsUserLocation
          zoomEnabled={true}
          showsMyLocationButton={false}
        /> : <Text style={{color: 'red', fontSize: 30}}>NO FUNCIONA PERRAs</Text>}
      </View>
    );
  }

}


const styles = StyleSheet.create({ 
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map:{
    flex:1,
    width: width
  }

})