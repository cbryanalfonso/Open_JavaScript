import React, { Component, useEffect, useState } from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import Modal from '../../Componentes/Modall';
import { SafeAreaView } from 'react-native-safe-area-context';

export const getCurrentUser = () => {
  return firebase.auth().currentUser
}

export default function Perfil({ navigation }) {

  const [showModal, setShowModal] = useState(false)
  console.log(firebase.auth().currentUser)

  return (
    <SafeAreaView style={styles.container}>

      <Modal isVisible={showModal} setVisible={setShowModal} navigation={navigation} />


      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', }}>
            <TouchableOpacity style={styles.btnIcono}>
              <Image source={require('../../resources/editing.png')} style={styles.imagen}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIcono}>
              <Image source={require('../../resources/upload.png')} style={styles.imagen}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnIcono}
              onPress={() => setShowModal(true)}
            >
              <Image source={require('../../resources/set.png')} style={styles.imagen}></Image>
            </TouchableOpacity>
          </View>
          <View style={{ paddingVertical: 30, }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Avatar
                  rounded
                  size="large"
                  containerStyle={styles.btnFoto}
                  source={
                    getCurrentUser().photoURL
                      ? { uri: photoURL }
                      :
                      require("../../resources/avatar-default.jpg")
                  }
                />
              </View>
              <View style={styles.Foto}>
                <TouchableOpacity style={styles.botonesPerfil}>
                  <Text style={{ color: 'green' }}>My meets</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.botonesPerfil, { marginLeft: 20, width: 100 }]}>
                  <Text style={{ color: 'green' }}>Gramification</Text>
                </TouchableOpacity>


              </View>


            </View>

            <Text style={[styles.Titulos, { fontSize: 17, marginTop: 10, fontWeight: 'bold' }]}>{
              getCurrentUser().displayName ? getCurrentUser().displayName : "Anónimo"
            }</Text>

            <Text style={[styles.Titulos, { fontSize: 17, marginTop: 1, color: 'black' }]}>{
              getCurrentUser().email
            }</Text>
          </View>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
            <TouchableOpacity style={[styles.botonesPerfil, { marginLeft: 20, width: 100, borderColor: '#0984e3' }]}>
              <Text style={{ color: '#0984e3' }}>Upload cv</Text>
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.Titulos}> My Interest</Text>

          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.Titulos}> Score</Text>
            <View style={{ flexDirection: 'row', paddingTop: 13 }}>
              <View style={styles.chall}>
                <Text style={styles.txt}>Challege</Text>
              </View>
              <View style={styles.chall}>
                <Text style={styles.txt}>Points</Text>
              </View>

            </View>

          </View>

        </View>


      </ScrollView>







    </SafeAreaView>


  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: "#ecf0f1"
  },
  subcontainer: {
    flex: 1,

  },
  Titulos:
    { color: "#0984e3", fontSize: 20, paddingTop: 20, paddingLeft: 20, }
  ,
  txt: {
    color: 'blue',
    fontSize: 15,
  },
  chall: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    alignItems: 'center'
  },
  Foto: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  botonesPerfil: {
    backgroundColor: '#ecf0f1',
    borderColor: 'green',
    padding: 5,
    height: 30,
    width: 80,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center'
  },
  txtNombre: {
    color: 'blue',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
    marginLeft: 14,
  },
  touch: {
    margin: 15,
    backgroundColor: 'white',
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  btnInside: {
    borderRadius: 10,
    width: 50,
    height: 30,
    backgroundColor: 'green',
    alignSelf: 'center'
  },
  btnIcono: {
    borderRadius: 100,
    backgroundColor: "#dfe6e9",
    width: 50,
    height: 50,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnFoto: {

    backgroundColor: "#dfe6e9",
    width: 100,
    height: 100,
    marginLeft: 17,

  },
  imagen: {
    height: 25,
    width: 25,
  },

})
/*
   <Button onPress={() => {

        const user = auth().currentUser;
        // const con = firestore().collection('Registro').where("uid", "==", user.uid).get()
        console.log(user)
      }}
        title="asfd"
        style={{ backgroundColor: 'red' }}
      ></Button>
      <Button onPress={() => {

        const user = auth().signOut();
        // const con = firestore().collection('Registro').where("uid", "==", user.uid).get()
        console.log(user)
      }}
        title="asfd"
        style={{ backgroundColor: 'red' }}
      ></Button>



      <TouchableOpacity style={styles.btnFoto}>
                  <Image source={require('../../resources/editing.png')} style={styles.imagen}></Image>
                </TouchableOpacity>

*/