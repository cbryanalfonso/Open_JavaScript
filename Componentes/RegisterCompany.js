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
import { Overlay, Input } from 'react-native-elements';
import { getCurrentUser } from '../Screens/General/Perfil';
import { SearchBar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'
import { fileToBlob } from '../acciones/helpers';


import firestore from '@react-native-firebase/firestore'
import { isEmpty } from 'lodash';
import AgregarCompanyModal from './AgregarCompanyModal';


export default function RegisterCompany({ navigation, isVisible, setVisible, name }) {

    const [companyName, setCompanyName] = useState('')
    const [descriptionCompany, setDescriptionCompany] = useState('')
    const [companyLogo, setCompanyLogo] = useState('')
    const [webPage, setWebPage] = useState('')
    const [facebook, setFacebook] = useState('')
    const [instagram, setInstagram] = useState('')
    const [twitter, setTwitter] = useState('')
    const [youtube, setYoutube] = useState('')
    const [errorName, setErrorName] = useState(null)
    const [errorDescripcion, setErrorDescripcion] = useState(null)
    const [errorCompany, setErrorCompany] = useState(null)
    const [errorWeb, setErrorWeb] = useState(null)
    const [regresar, setRegresar] = useState(false)
    
    useEffect(() => {
        
        setCompanyName('')
        setDescriptionCompany('')
        setCompanyLogo('')
        setWebPage('')
        setFacebook('')
        setInstagram('')
        setTwitter('')
        setYoutube('')
        setErrorName(null)
        setErrorDescripcion(null)
        setErrorWeb(null)

    }, []);

    function OpenGallery(){
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
              
            const resultUploadImage = uploadImage(image.path, "Logos", companyName)
          });
    }

    const uploadImage = async (image, path, name) => {
        const result = { statusResponse: false, error: null, url: null }
        const ref = storage().ref(path).child(name)
        const blob = await fileToBlob(image)
        await ref.put(blob)

        try {
            // await ref.put(blob)
            const url = await storage().ref(`${path}/${name}`).getDownloadURL()
            result.statusResponse = true
            result.url = url

            
            console.log(url)
            setCompanyLogo(url)
        } catch (error) {
            //result.error = error
            console.log(error)
        }

        return result
    }



    
    const siguiente = () => {
        setErrorName(null)
        setErrorDescripcion(null)
        setErrorWeb(null)

        if(isEmpty(companyName)){
            setErrorName("Should not be empty")
            if(isEmpty(descriptionCompany)){
                setErrorDescripcion("Should not be empty")
                if(isEmpty(webPage)){
                    setErrorWeb("Should not be empty")
                }
            } 
        }
        else if(isEmpty(descriptionCompany)){
            setErrorDescripcion("Should not be empty")
        }
        /*if(isEmpty(companyLogo)){
            setErrorCompany("Should not be empty")
            return false
        }*/
        else if(isEmpty(webPage)){
            setErrorWeb("Should not be empty")
        }
        else{
            try {
                firestore().collection('Empresa').add({
                    nombreCompania: companyName,
                    descripcionCompania: descriptionCompany,
                    logoCompania: companyLogo,
                    paginaWEB: webPage,
                    facebook: facebook,
                    instagram: instagram,
                    twitter: twitter,
                    youtube: youtube,
                })
                console.log('datos actualizados correctamente.')
                setRegresar(true)
            } catch (error) {
                console.log(error);
            }
            
        }
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
            <AgregarCompanyModal isVisible={regresar} setVisible={setRegresar} navigation={navigation} name={name}/>
                <View style={styles.modalView}>
                    <View style={{ flexDirection: 'row', flex: 0.1, }}>


                        <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center', }}>

                            <TouchableOpacity style={styles.btnIcono}
                                onPress={() => setVisible(false)}
                            >

                                <Image source={require('../resources/back.png')} style={{ height: 20, width: 20 }}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', }}>
                            <Image style={{ width: 100, height: 50, alignSelf: 'center', marginRight: 20 }}
                                source={{ uri: 'data:image/jpeg;base64,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' }}
                            />
                        </View>

                    </View>


                </View>
                <View style={[styles.container]} >
                    <View style={styles.txtTitulo}>
                        <Text style={styles.txtNombre}>
                            Register Company
                        </Text>
                    </View>
                    <ScrollView style={{ flex: 1, }}>
                        <Input
                            placeholder="Company Name"
                            placeholderTextColor="#bdc3c7"
                            style={[styles.txtInputDatos, { marginTop: 20, }]}
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            defaultValue={companyName}
                            onChangeText={text => setCompanyName(text)}
                            errorMessage={errorName}
                        />
                        <Input
                            placeholder="Description"
                            placeholderTextColor="#bdc3c7"
                            style={styles.txtInputDatos}
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            defaultValue={descriptionCompany}
                            onChangeText={text => setDescriptionCompany(text)}
                            errorMessage={errorDescripcion}
                        />
                        <View style={{flexDirection: 'row', marginRight: 20}}>
                            <View style={{flex: 1,}}>
                            <Input
                                placeholder="Company logo (url)"
                                placeholderTextColor="#bdc3c7"
                                style={[styles.txtInputDatos, ]}
                                autoCapitalize='none'
                                inputContainerStyle={{ borderBottomWidth: 0 }}
                                defaultValue={companyLogo}
                                onChangeText={text => setCompanyLogo(text)}
                                errorMessage={errorWeb}
                            />
                            </View>
                            <View style={{flex: 0.5, paddingRight: 10}}>
                                <TouchableOpacity style={[styles.btn, {width: "100%", justifyContent: 'flex-start', alignItems: 'center' }]}
                                    onPress={()=>OpenGallery()}
                                >
                                    <View style={{flex: 1}}>
                                        <Text style={{color: 'white', fontWeight: 'bold'}}>Upload</Text>
                                    </View>
                                    <View style={{flex: 0.8}}>
                                    <Image source={require('../resources/cloud.png')} style={{ height: 23, width: 23 }}></Image>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Input
                            placeholder="Web page"
                            placeholderTextColor="#bdc3c7"
                            style={styles.txtInputDatos}
                            autoCapitalize='none'
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            defaultValue={webPage}
                            onChangeText={text => setWebPage(text)}
                            errorMessage={errorWeb}
                        />
                        <Input
                            placeholder="Facebook (optional)"
                            placeholderTextColor="#bdc3c7"
                            style={styles.txtInputDatos}
                            autoCapitalize='none'
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            defaultValue={facebook}
                            onChangeText={text => setFacebook(text)}
                        />
                        <Input
                            placeholder="Instagram (optional)"
                            placeholderTextColor="#bdc3c7"
                            style={styles.txtInputDatos}
                            autoCapitalize='none'
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            defaultValue={instagram}
                            onChangeText={text => setInstagram(text)}
                        />
                        <Input
                            placeholder="Twitter (optional)"
                            placeholderTextColor="#bdc3c7"
                            style={styles.txtInputDatos}
                            autoCapitalize='none'
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            defaultValue={twitter}
                            onChangeText={text => setTwitter(text)}
                        />
                        <Input
                            placeholder="Youtube (optional)"
                            placeholderTextColor="#bdc3c7"
                            style={[styles.txtInputDatos, { marginBottom: -2 }]}
                            autoCapitalize='none'
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            defaultValue={youtube}
                            onChangeText={text => setYoutube(text)}
                        />

                    </ScrollView>
                   



                    <View style={{ flex: 0.2, justifyContent: 'center' }}>
                    <TouchableOpacity style={[styles.btn,{marginBottom: 10}]}
                     //onPress={siguiente}
                    >
                        <View style={{ flex: 2.5, justifyContent: 'center' }}>
                            <Text style={styles.txtBtn}> Locate my company on map </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('../resources/ubicacion.png')} style={styles.imagen}></Image>
                        </View>
                    </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn]}
                        onPress={siguiente}
                        >
                            <View style={{ justifyContent: 'center' }}>
                                <Text style={[styles.txtBtn, { fontSize: 18 }]}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>

        </Modal>
    );


}



const styles = StyleSheet.create({
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
    btnIcono: {
        borderRadius: 50 / 2,
        backgroundColor: "#ecf0f1",
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagen: {
        height: 30,
        width: 30,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginBottom: 2,
        width: "100%",
        paddingHorizontal: 20
    },
    subcontainer: {
        marginTop: 50,
        flexDirection: 'row',
        // marginBottom: 50,
    },
    datos: {
        marginTop: 30,
        width: "100%",
    },
    txtInputDatos: {
        marginHorizontal: 20,
        borderRadius: 20,
        backgroundColor: "#ecf0f1",
        width: "90%",
        color: 'black',
        fontSize: 14,
        paddingLeft: 20,
       // marginVertical: -5
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
        borderRadius: 20,
        backgroundColor: '#00a8ff',
        marginHorizontal: 20,
        paddingLeft: 20,
        height: 40,
        width: 300,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row'

    },
    txtNombre: {
        color: '#2c3e50',
        fontSize: 20,
        fontWeight: 'bold',
        //marginTop: 20,
        //marginLeft: 40,
    },
    txtTitulo: { flex: 0.05, alignItems: 'center', justifyContent: 'center' },
    txtBtn: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },

})

