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
} from 'react-native';

export default class AgregarCompany extends Component {

    
  siguiente=()=>{
    const { navigate } = this.props.navigation;
    navigate('RegistrarCompany')
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.datos}>
          <TextInput
            placeholder="Company (ej. Microsoft)"
            placeholderTextColor="#bdc3c7"
            style={styles.txtInputDatos}
            autoCapitalize='none'
            //keyboardType='numeric'
          >

          </TextInput>
          <TouchableOpacity style={{alignItems: 'center',justifyContent:'center'}}>
              <Text style={{color: 'blue'}}>Cancel</Text>
          </TouchableOpacity>
          
          
        </View>
        <View style={{justifyContent: 'flex-end', alignItems: 'flex-end', flex: 3, marginBottom: 100, marginRight: 20,}}>
         
          <TouchableOpacity style={styles.btn} onPress={this.siguiente} >
            
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
  subcontainer: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btnImage: {
    borderRadius: 50,
    height: 100,
    width: 100,
    backgroundColor: 'red'
  },
  txtNombre: {
    color: 'blue',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  txtInput: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: "#ecf0f1",
    width: "80%",
    height: 55,
    color: 'black'
  },
  datos: {
    marginTop: 30,
    width: "90%",
    flexDirection: 'row',
    flex:0.3,
  },
  txtInputDatos: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: "#ecf0f1",
    width: "80%",
    height: 55,
    color: 'black'
  },
  txtInputPersonal: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: "#ecf0f1",
    width: "90%",
    height: 150,
    color: 'black',
    justifyContent: 'flex-start',
  },
  btn: {
    borderRadius: 50,
    backgroundColor: '#3498db',
    marginHorizontal: 20,
    //alignItems: 'center',
    height: 60,
    width: 60,
    marginTop: 20,
    //justifyContent: 'center',
   // alignSelf: 'baseline'
  },
  txtBtn: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },



})
