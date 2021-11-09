import React, { Component, useEffect, useState } from 'react';
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
    Alert,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { getCurrentUser } from '../Screens/General/Perfil';
import { SearchBar } from 'react-native-elements';


import firestore from '@react-native-firebase/firestore'
import RegisterCompany from './RegisterCompany';

export default function AgregarCompanyModal({ navigation, isVisible, setVisible, name }) {
    const [data, setData] = useState()
    const [rtData, setRTData] = useState([])
    const [company, setCompany] = useState('')
    const [nombreCompania, setNombreCompania] = useState('')
    const [paginaWEB, setPaginaWEB] = useState('')
    const [descripcionCompania, setDescripcionCompania] = useState('')
    const [showRegistrarCompany, setShowRegistrarCompany] = useState(false)
    ///console.log(company)

    async function loadRTData() {
        const suscriber = firestore().collection('Empresa').onSnapshot(querySnapshot => {
            const empresas = []
            querySnapshot.forEach(documentSnapshot => {
                empresas.push({
                    ...documentSnapshot.data(),
                    key: documentSnapshot.id
                })
            })
            setRTData(empresas)
        })
        return () => suscriber()
    }
    useEffect(() => { loadRTData() }, [])

    function renderRTItem({ item }) {
        return (
            <TouchableOpacity style={styles.botones}>
                <Text style={styles.txtBusqueda}>{item.nombreCompania}</Text>
                <Text style={[styles.txtBusqueda, {fontWeight: 'normal'}]}>{item.Ubicacion}</Text>
            </TouchableOpacity>

        );
    }

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
                <RegisterCompany isVisible={showRegistrarCompany} setVisible={setShowRegistrarCompany} navigation={navigation} name={name}/>

                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', flex: 0.1, }}>


                        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', }}>

                            <TouchableOpacity style={styles.btnIcono}
                                onPress={() => setVisible(false)}
                            >

                                <Image source={require('../resources/back.png')} style={styles.imagen}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', }}>
                            <Image style={{ width: 100, height: 50, alignSelf: 'center', marginRight: 20 }}
                                source={{ uri: 'data:image/jpeg;base64,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' }}
                            />
                        </View>

                    </View>




                </View>
                <View style={styles.container} >

                    <View style={[styles.datos, { flexDirection: 'row' }]}>
                        <View style={{ flex: 3 }}>
                            <TextInput
                                placeholder="Rol Company"
                                placeholderTextColor="#bdc3c7"
                                style={styles.txtInputDatos}
                                autoCapitalize='none'
                                onChangeText={text => setCompany(text)}
                            />
                        </View>
                        <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity>
                                <Text style={styles.txtNombre}>cancel</Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={{ flex: 1, }}>
                    <FlatList
                            data={rtData}
                            renderItem={renderRTItem}
                            keyExtractor={item => item.key}
                        />

                    </View>

                    <View style={{ flex: 0.3 }}>
                        <TouchableOpacity style={styles.btn}
                        onPress={()=>
                            setShowRegistrarCompany(true)
                            
                        }

                        >
                            <Image source={require('../resources/mas.png')} style={{ height: 50, width: 50 }}></Image>
                        </TouchableOpacity>
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
        width: "100%",
        //height: "100%"
    },
    modalView: {
        flex: 0.05,
        width: "100%",
        //margin: 5,
        backgroundColor: "white",
        //borderRadius: 26,
        paddingTop: 45,
        paddingLeft: 35,
        paddingRight: 35,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },

    btnIcono: {
        borderRadius: 50 / 2,
        backgroundColor: "#ecf0f1",
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botones: {
        backgroundColor: '#ecf0f1', 
            marginHorizontal: 20,
            marginVertical: 10,
            borderRadius: 20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            
                
    },
    imagen: {
        height: 20,
        width: 20,
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
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        //alignItems: 'center',
        marginHorizontal: 20,
        // borderRadius: 20,
        marginBottom: 2,
        width: "100%",
        paddingHorizontal: 30
    },
    subcontainer: {
        marginTop: 50,
        flexDirection: 'row',
        // marginBottom: 50,
    },
    btnImage: {
        borderRadius: 50,
        height: 100,
        width: 100,
        backgroundColor: 'red'
    },
    txtNombre: {
        color: '#2c3e50',
        fontSize: 15,
        //marginTop: 20,
        //marginLeft: 40,
    },
    txtBusqueda:{
        color: '#2c3e50', 
        fontWeight: 'bold'
    },
    txtInput: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: "#ecf0f1",
        width: "80%",
        height: 55,
        color: 'black',

        paddingLeft: 20,
    },
    datos: {
        marginTop: 30,
        width: "100%",
    },
    txtInputDatos: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: "#ecf0f1",
        width: "90%",
        height: 55,
        color: 'black',

        paddingLeft: 20,
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
        paddingLeft: 20,
    },
    btn: {
        borderRadius: 50 / 2,
        backgroundColor: '#00a8ff',
        alignItems: 'center',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginRight: 5,
        marginTop: 20,

    },
    txtBtn: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    btnIcono: {
        borderRadius: 100,
        backgroundColor: "#dfe6e9",
        width: 50,
        height: 50,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    btnFoto: {

        backgroundColor: "#dfe6e9",
        width: 100,
        height: 100,
        marginLeft: 17,

    },

})

