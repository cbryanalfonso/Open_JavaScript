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
  Dimensions
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
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        const lat = position.coords.latitude
            const lon = position.coords.longitude
            const accuracy = position.coords.accuracy
            this.calcDelta(lat,lon,accuracy)
      }
    )
  }

  render(){
    return(
      <View style={StyleSheet.container}>
        {this.state.region.latitude ? <MapView
          style={styles.map}
          initialRegion={this.state.region}
        /> : null}
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