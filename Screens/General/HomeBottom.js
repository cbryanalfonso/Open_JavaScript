import React, { Component, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
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
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PerfilesIn from './PerfilesIn';
import { Button } from 'react-native-elements/dist/buttons/Button';

export default function HomeBottom({ navigation }) {
  const renderItem = ({ item }) => (
    <PerfilesIn navigation={navigation} dataSet={item} />
  );
  const [baseDatos, setBaseDatos] = useState([])
  const [ doc, setDoc] = useState([])
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      name: 'Bryan Alfonso',
      company: 'EOS SOFTWARE',
      puesto: 'Desarrollador React Native',
      foto: 'data:image/jpeg;base64,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',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb',
      name: 'Rodrigo',
      company: 'EOS SOFTWARE',
      puesto: 'Desarrollador BackEnd',
      foto: 'https://noverbal.es/uploads/blog/rostro-de-un-criminal.jpg',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bc',
      name: 'Claudia',
      company: 'Fintechthon',
      puesto: 'DiseĆ±adora',
      foto: 'https://p0.pikist.com/photos/309/404/portrait-fashion-model-woman-hair-makeup-female-people-young.jpg'
    },

  ];

  const datos = async () => {
    const informacion = firestore().collection('Informacion')
    const snapshot = await informacion.get();

    snapshot.forEach(doc => {
      // console.log(doc.id, '=>', doc.data());
      console.log(doc.id);
      //console.log(doc.id, '=>', doc);
      //console.log(doc.data());
      setBaseDatos(doc)
     /// setDoc(doc.id)
    })

    /*const doc = await informacion.get()
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
    }*/

  }

  //console.log(auth().currentUser)
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{ alignItems: 'flex-start', marginTop: 10, marginLeft: 10 }}>
          <Image style={{ width: 130, height: 70 }}
            source={{ uri: 'data:image/jpeg;base64,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' }}
          />
        </View>
        <Text style={styles.txtNombre}>Profiles you match</Text>

        <Text style={styles.txtNombre}>To trade</Text>
        <Button title={'Presioname'} style={{ backgroundColor: 'red', height: 30 }} onPress={() => datos()} />
        <Button title={'Mi nombre'} style={{ backgroundColor: 'red', height: 30 }} onPress={() => console.log(baseDatos.nombrePersona)} />
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={baseDatos}
          renderItem={renderItem}
          keyExtractor={baseDatos => baseDatos.id}
        />

        <Text style={styles.txtNombre}>To invest</Text>
       {/* <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
       />*/}

      </View>
    </ScrollView>

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
})