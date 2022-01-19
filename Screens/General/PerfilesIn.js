import React, { useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
    ScrollView,
} from 'react-native';

export default function PerfilesIn({ navigation, dataSet }) {

    useEffect(() => {
        console.log(dataSet);
    }, [])
    return (
        <View style={{ marginTop: 20}}>
            <TouchableOpacity>
                <View style={{ margin: 15, marginTop: 30, backgroundColor: 'white', width: 180, height: 250, borderRadius: 20 }}>
                    <View style={{ flex: 0.8, alignItems: 'center', justifyContent: 'center', marginTop: -40 }}>
                        <View style={{ borderRadius: 50, borderColor: 'blue', borderWidth: 4, width: 110, height: 110, justifyContent: 'center', alignItems: 'center' }}>
                            <Image style={{ width: 100, height: 100, borderRadius: 50 }}
                               // source={{ uri: dataSet.foto }}
                            />
                        </View>

                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: 'gray', fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>{dataSet.nombrePersona}</Text>
                        <Text style={{ color: '#95a5a6', marginBottom: 20 }}></Text>
                        <Text style={{ color: '#95a5a6', marginBottom: 20 }}></Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'space-between',  marginBottom:15 }}>
                        <TouchableOpacity style={[styles.btnInside,{marginLeft: 10}]}>
                            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Seller</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btnInside,{backgroundColor: '#3498db', marginLeft: 10, width:70 }]}>
                            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>Asociasión</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </TouchableOpacity>
        </View>

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
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',

    },
})