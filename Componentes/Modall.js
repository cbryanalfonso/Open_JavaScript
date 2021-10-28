import React, { Component } from 'react';
import {
  StyleSheet, View, Modal,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import { Overlay } from 'react-native-elements';

export default function Modall({ navigation, isVisible, setVisible }) {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}

    >
      <View style={styles.centeredVieww}>

        <View style={styles.modalView}>
          <View style={{ flexDirection: 'row', flex: 0.5 }}>


            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.modalText}>      SETTINGS</Text>
            </View>

            <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', }}>

              <TouchableOpacity style={styles.btnIcono}
                onPress={() => setVisible(false)}
              >

                <Image source={require('../resources/close.png')} style={styles.imagen}></Image>
              </TouchableOpacity>
            </View>

          </View>
          <View style={styles.botones}>

            <View>
              <TouchableOpacity style={styles.btnSettings}>
                <View style={{ flex: 1, }}>
                  <Text style={styles.botonesText}>Account</Text>

                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginEnd: 10 }}>
                  <Image source={require('../resources/next.png')} style={styles.imagenBtn}></Image>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSettingsDown}>
                <View style={{ flex: 1, }}>
                  <Text style={styles.botonesText}>Interest</Text>

                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginEnd: 10 }}>
                  <Image source={require('../resources/next.png')} style={styles.imagenBtn}></Image>
                </View>
              </TouchableOpacity>

            </View>

            <View style={{ marginTop: 30 }}>
              <TouchableOpacity style={styles.btnSettings}
                onPress={() => 
                 
                   
                  navigation.navigate('Sponsors')
                  
                 
              }
              >

                <View style={{ flex: 1, }}>
                  <Text style={styles.botonesText}>Sponsors</Text>

                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginEnd: 10 }}>
                  <Image source={require('../resources/next.png')} style={styles.imagenBtn}></Image>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnSettingsDown}>
                <View style={{ flex: 1, }}>
                  <Text style={styles.botonesText}>Partners</Text>

                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginEnd: 10 }}>
                  <Image source={require('../resources/next.png')} style={styles.imagenBtn}></Image>
                </View>
              </TouchableOpacity>

            </View>

            <View style={{ marginTop: 30 }}>
              <TouchableOpacity style={styles.btnSettings}>
                <View style={{ flex: 1, }}>
                  <Text style={styles.botonesText}>Contact Us</Text>

                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginEnd: 10 }}>
                  <Image source={require('../resources/right-arrow.png')}
                    style={[styles.imagenBtn, {
                      transform: [{ rotate: '-45 deg' }]
                    }]}></Image>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnSettingsM}>
                <View style={{ flex: 1, }}>
                  <Text style={styles.botonesText}>Terms of Service</Text>

                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginEnd: 10 }}>
                  <Image source={require('../resources/right-arrow.png')}
                    style={[styles.imagenBtn, {
                      transform: [{ rotate: '-45 deg' }]
                    }]}></Image>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnSettingsDown}>
                <View style={{ flex: 1, }}>
                  <Text style={styles.botonesText}>Privacy Policy</Text>

                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginEnd: 10 }}>
                  <Image source={require('../resources/right-arrow.png')}
                    style={[styles.imagenBtn, {
                      transform: [{ rotate: '-45 deg' }]
                    }]}></Image>
                </View>
              </TouchableOpacity>

            </View>

            <View style={{ marginTop: 30 }}>
              <TouchableOpacity style={styles.btnSalir} onPress={()=>navigation.navigate('Registro')}>
                <View style={{ flex: 1, }}>
                  <Text style={styles.salir}>Log out</Text>

                </View>
              </TouchableOpacity>
            </View>


          </View>


        </View>
      </View>
    </Modal>
  );


}



const styles = StyleSheet.create({
  overlay: {
    flexDirection: 'row',
    flex: 0.4,
    width: "90%",
    height: '100%',
    backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',


  },
  centeredView: {
    flex: 1,
    marginTop: 22,

  },
  centeredVieww: {
    alignItems: "center",

    justifyContent: 'flex-end',
    flex: 1,
    width: "100%"
  },
  modalView: {
    flex: 0.9,
    width: "100%",
    //margin: 5,
    backgroundColor: "#dfe6e9",
    borderRadius: 26,
    padding: 35,
    //alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: '#2c3e50',
    fontSize: 23,
    //fontWeight: 'bold',
  },
  btnIcono: {
    borderRadius: 50 / 2,
    backgroundColor: "white",
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botones: {
    flex: 5,
    marginTop: 50,

  },
  imagen: {
    height: 20,
    width: 20,
  },
  btnSettings: {
    backgroundColor: 'white',
    borderTopColor: 'white',
    borderStartColor: 'white',
    borderEndColor: 'white',
    borderBottomColor: '#b2bec3',
    borderWidth: 1,
    flexDirection: 'row',
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: 60,

  },
  btnSettingsDown: {
    backgroundColor: 'white',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    flexDirection: 'row',
    height: 60,
  },
  btnSettingsM: {
    backgroundColor: 'white',
    backgroundColor: 'white',
    borderTopColor: 'white',
    borderStartColor: 'white',
    borderEndColor: 'white',
    borderBottomColor: '#b2bec3',
    borderWidth: 1,
    flexDirection: 'row',
    height: 60,
  },
  btnSalir: {
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row'
  },
  botonesText: {
    color: '#2c3e50',
    fontSize: 20,
    padding: 20,

  },
  salir: {
    color: '#d63031',
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imagenBtn: {
    height: 17,
    width: 17,
  }
})



/*
export default function Modal ({ isVisible, setVisible, children}){

    return(
        <View style={{flex: 1, }}>
           <Overlay
            isVisible={isVisible}
            overlayStyle={styles.overlay}
            onBackdropPress={()=>setVisible(false)}
        >
            {
                children
            }

        </Overlay>
        </View>


        <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={()=>setVisible(false)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
    );*/