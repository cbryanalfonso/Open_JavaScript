import React, { Component, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    ActivityIndicator,
    View,
    TextInput,
    TouchableOpacity,
    Linking,
    Image,
    Alert,
} from 'react-native';
import { Formik } from 'formik'
import { Input, Icon } from 'react-native-elements'



export default function Registro({ navigation }) {
    /*const signUp = (values) => {
        try {
            if(values.email == '' && values.password ==''){
                Alert.alert("Debe rellenar las casillas de texto")
            }else{
                 firebase.auth().createUserWithEmailAndPassword(values.email,values.password)  
                 console.log('Usuario creado')  
            }
        } catch (e) {
            console.log('Usuario no creado')
        }
    }*/
    const [secury, setSecury] = useState(false)
    const signIn = values => {
        if (values.email && values.password) {
            // setLoader(true);
            auth()
                .signInWithEmailAndPassword(values.email, values.password)
                .then(userCredential => {
                    console.log("Inicio de sesión exitoso. :D");
                    // Signed in
                    navigation.navigate('BottomApp');
                    //setLoader(false);
                })
                .catch(error => {
                    //setLoader(false);
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log('Inicio de sesión fallido')
                });
        }
    };

    //render() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ alignItems: 'center', marginTop: 20, }}>
                <Image style={{ width: 200, height: 100 }}
                    source={{ uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQEhAQEhAWEBEVEBYXFhUWFRcYEBUVGxgbGhgWFxgaHiggHR0lHhgYITIhJSkrLi4uGB8zOD8sOigtLisBCgoKDg0OGRAQGy0fHSAtLS0rLSs3LS0tKysrLTctKy0tKysuLS0tLi0rLS0tLS0tLS0rLS0tLS0tLS0tLS0tLf/AABEIAMgAyAMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABQYEBwECAwj/xABAEAABAwMCAwUEBQsDBQAAAAABAAIDBBESBSEGMVETIjJBYQcUcYFCYpGhwRUjJDNSU5KxstHwFkNzcsLh4vH/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAQIDBAX/xAAiEQEAAgICAgMBAQEAAAAAAAAAAQIDERIxBCETQVFhcSL/2gAMAwEAAhEDEQA/AN4oiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAoXiziCOgp3TvGRvixnIueeQ+GxPyUytX+3AOwo7eDOW/TKzbf9yvirFrxEq3nUK3Hreuak5z4HSloPKLuRt9L/3N1maFx5XUU4grs3x5APEgtMwftA+fzV/9mrojp1N2dtmnO3PtMjlf/OVlS/baYu1pQLdtg/LrhcY3+eS6q2ra/Dj6ZTExHLb19rOtzxT03YVD42Pp8u48hrruNjt6KrsrdabCKsTVHYfvMyWc7b79V243y7LSsvF+T2c+mRt91liw8S1xpBQMF4CC2wZd5Bde1/itKV1SNQrM+5bJ9mfGclb2lPUWMrG5B4Fs23sbjqLj7V76rxFUTymGluBe12+J3rc8goD2ccLVEDKmrlYYy6neyNpFnm+5cR5cgmmak+BsjYx+cksM/pAdG+pXkefeK341nUfxpEzr2y36tW00mLpiXDm0uD2/AqX421Wf8lunbnTykx8iQ4d4ciN7Femg8PNhaaqq5gZYncN9XdT6LG9o9fFPpcz43hwzjv1HfHMeSjw62i8cp7+kz6iVK4C42niqmtqZ3yQy2YS9xODvou35b7H4+i59o2u1cWo1EcdTLGwCOzWvcGi8TCdlTqegkkjmmaLtixz6gOJAPwuPvXGoVz539pIcn4MaT5kMaGC/yaF7fxV57hhynWm8db12SKGnjY49o+BjnO+kAR6+ZN1CGiq+y96LnY875nO17XV2odPhkhgc+Jrz2EYuQCbYhQfFurMYz3SK3llbwtA5NC5sV+q1j/V71+5l78G6vJKXxSOLi1uTXHna9iD9oUPrGrz1M3ZROIZni1rTbL1K54YrYKcSSSSWe5uIABJA57226KO4TqGPqocSD3vnyK1jHEWtbXSnKZiI2yZJauhkALyDYG2V2OC2BQVQmjZIOTmg/DqFT/aG9rXwkmwwdv8AMLM4V4hphBFG6Sx35g28R87WWWSvPHF4j2vS0VvNdrYvnfjXUZ3V1XlK/uzPaBkQA0GwAC3/AFksgic6FrZH43YCbNcfLcLVNXxZCZ3e9aVDnlaS7R2vr4hzVfGidzOtr5GvBWS/vH/xFbU4G48ILaerfcHZkp8vqvP4/arXpmjaVUxtlipYHscOfZtuPQ9D6Kn8ccB9nlUUjbx83xDct9W+np/g2+THk/4tGleNq+4bSBuuy1LwLxwYMaapdeHkyQ7mP0P1f5La7HhwBBuCLgjkR1XJkxTjnUta2i0O6IizWcKI4p0GOvgfTv2ubscObHjk78LdCpdVP2lavPSUrZYH9m8zsbewOxDr7HbyCtTfKNdotrXtrn/TGt6e9zacSYk+KF12O9bf3CzuH/Z7W1Uwnry5jMgXZuymk9PQfFXrQKesEzTJqkdUwA3jbGwOO2xu032Nli8N65UTflfOTLsJ5WxbAYhudvLfkOa6Zy21OtMorCv+1bh+pnmpzT075GMgx7jbtb3jt9iuXs/opIKCnjlYY5Gh92uFnC73FVfgbjaaoiqYqh/6Q2J8kT7AZtANxYbXBH8+is3AWqS1NDFPO/J5L8nWA2DiOQ9AqZOcU4z9LV1vayKkazwvNHJ21LuL5BoNnsPpfYhR/C/GdRPXlsp/RJ3Stp9gBdh23HPb+ayvaTxJVUMtH2DtnZl7MQcw0t26ja/LqufJ4vOYrPaZtGtuklFqdVaOTIMvvlZrPnbmvfivhx7NMkp4GGaVz2F2I7ziHC/yA8lzXcUvkqNINPJaCpLs22BJtbunbYg3C51fVKyqr36fSTCmbFEHyylge4k2sADt9Ifeow+N8dot3P8AUTrSE9l/Dc8fvsdVTujjlia2zxYOHeuPvVR1jgSvhmljjp5Jow44Pa24c3yPxW1+H6jUWe9w1Yz7JpMVQGgNkFunUbfeqrw3qtfWRCV2sxU7i8t7N8cWe3nzHNdsZLcpt6UmsaiFo1rV300EELQWymFlyfoiwB+apZN7kk3Wzp9IimDDM0SPawAu3F+uw9V5f6ao/wByP4nf3UYs9KR17RfFa09qVw7QRVD3RyFwJaS3G1tud7qr6XMaSsjcO9hN/E29vvCu2vz08DjHTMDX2LXvBJsDzaLlZHDvCrHgTVDL3HcbyIH7Rsuj5YiJtbqfpjOOZmIjuFR471r3uduIIYxgAB5kncn+Q+SnqjhptPRxS3PaWaXg+HvdPhdYPEGmxQ1MoYywBba9zbujqrjxQf0IfCP8FW19RSK9JrXc2m3bx4FrHOjkjJvgQR6A32+0feqx7WpaQmNrbGrB7xb5Mtyf68rKV4QikeyqbE8RSFrQ15blid97earlRwlRxzEVWrRZB15GmwlPnuS7YqkRWuaZ21iZmkOPZW2r94Jjv7t/u38B22t9bktukqt0HEOk08bYoqqBkbRsA8fb6lUvjnjoz5U9K4iHk6Tk6T0HmG/zWdq2zX3rS8TFK9oXj2SkdVPNKO7bvkfqzJfctV69lbasQO7W/YbdiHeL1t9VQfAfAxlxqapto+bIzzf9Z31fTzW02tAsALABWz5axX449opWd8ndERcbYVJ9rFJJNRsbHG6R3vLDZjS42s65sFdlwprbjMSiY3GkLpHC1FSPMsEAjeWlpIc47dNz6BVvhOjlZ+XMontzqJSy7SMwc7FvX4hX5FaLz7RxhqOl4YnfpUMzI3xVkDpSAWkSOjLjkyx35bj/AMqRoXVNPoXZtgl7d+cYYGO7QZvddxFrju33+C2WivOaZ7j72jg1FqPCWpU1NTSCVsvuzmyRwsi/OtLnAusQLu35/BT/ABPFJUVeizNheWZZPGDu4DgbP22+avyKPlmfZwhqd3DU9Jq1K1jHvo+3MkZDSWRZeJpPluB9ymNTbNp2py1wp5KinnhDXdk3J7HjHmOnd+/0WwEScsz2cNKroWpVtWKuSaAwU5aRAxzSJzsbl2/4eaofCop6eENqdHqJpxIXZiBx2+jubLcyJGTW40TV508ubWPxLcmg2Is4XF7EdVG8TSStgd2QcXkgd0Eusedv7qUzF7X3te3ouyzidTtaY3GmrIaOoa4OEDyQb7xuIv8ACymYtX1K4Ba+1x/s/wDqr0uVvbyOXdWUYddSqXF+iPkcJ425HGzmjxbciP8AOigppqyZjKcse5rbWGBB25XK2SiiueaxETG9Jti3PaG4X0o00RDvG83d6dB/nVaS4202obXVZdE/vTPc0hpIc0m4IsvoZFFM01tNv1M441EPl4UUv7p/8LltXgTgTw1NWz1ZEf6nj8FsxFe/lWtGo9IriiJ2LlEXM1EREBERAREQFi1GoQxuax8rGOd4Q5wBPltf1WUoTVND94nbI9xEQhLHNBsXHNrgDt4duqmut+0SzTq1Pk9vbx5M8QzF29brtJqUDQS6ZjcSQbuGxAuQd+YG6rv+mpnMZA/sxHGJ8ZASZJDIHAZC1h4rnc3LQsQcI1GMuT2Oe+BxO5A94eRm69uWIAutOFP1Xc/i1M1emOAE8ZL/AA99ve3tt13Flx+WaWxPvEVgbE9o2wO+3PnsfsUDNw9UPcx5Ibi2IYGUvD8JjIcnFgPI7eoXSh0OribTjBkhhlLrGY4uBZI3b833fGD5pwr+p3KzzV8LGtkdKxrHeFxcAw+exvbldcsrIja0jTd2Is4G7rZYj1tvZVur4em7CnjaWlzJpXuDXljR2jZO6x2J2HaW5cgsvR9BMM0crsTjSRsOOze1Axc8N/6GtF+gVZrXXZuUw39c7/ib/U5dKqoc1227Rjfa/M96/Sw3Xdv653/E3+pywquIAubuSdtjjbtHedt3brK8pcU8pGzXZEmxx7xsAfznP6RsFkahXGKAyABz+6AL93NxDRv0uVjSOz8RBHeZ3Dj5Xy52tt/9XpU0jJKeRrgXtkAcQLNI2FrdLWBUY+/4MLS6mpkmsJRNC24kdgGsD/2YiN3W9br1p31VQHSxzCFmTgxuAdkGki7yepHILGpYi0MYahzmRFpETIxG894NbkQdxc+XNNmFzYaowse4uwMWWJJOWB8t77bromPxQqNYlcyEl3u7SZGyyBmbWvYccd+QJBNz0U7QPc6Nhc5ryWi7meB3qPRQwhDWRdhM6MNDw7NuTXC4LnOBI3ub3HVSmkUzYoWMa7IAHci1ySSdvLe+yrbWlo3tnIiKiwiIgIiICIiAiIgIiICIiAiIgIiIPIRd8v6tA+wk/iu5aDvbcefmF2RBjxUrW3Hi2A33sByHw3XvZcoo1odMB0CGJv7I+xd0UjpgOg+xdmgDYbLlEBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREH//2Q==' }}
                />
            </View>
            <View style={styles.subcontainer}>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        imageUrl: '',
                    }}
                    onSubmit={(values) => signIn(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                        <View style={{ alignItems: 'center' }}>

                            <Text style={styles.txtTitulo}>Sign In</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.txtAccount}> New User?</Text>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('crearCuenta');
                                }}>
                                    <Text style={styles.crearCuenta}>  create an account</Text>
                                </TouchableOpacity>
                            </View>

                            <Input
                                placeholder="Ingrese su correo electronico"
                                placeholderTextColor="#bdc3c7"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                containerStyle={styles.txtInput}
                                autoCapitalize='none'
                                underlineColorAndroid= 'transparent'
                            ></Input>

                            <Input
                                containerStyle={styles.txtInput}
                                placeholder="Ingrese su contraseña"
                                placeholderTextColor="#bdc3c7"
                                autoCapitalize="none"
                                secureTextEntry={!secury}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                underlineColorAndroid= '#ecf0f1'
                                
                               rightIcon={
                                   <Icon name={ secury ? "eye-off-outline": "eye-outline"}
                                   type="material-community" 
                                   onPress={()=>setSecury(!secury)}
                                   color="#f150" iconStyle={styles.icono}></Icon>
                               }
                            />
                            
                            
                           

                            <TouchableOpacity style={{ alignSelf: 'flex-end', marginTop: 30, marginRight: 30, }}>
                                <Text style={styles.hipervinculo}>Forgot password</Text>
                            </TouchableOpacity>

                            <View style={{ alignItems: 'flex-start', marginLeft: 30, alignSelf: 'flex-start' }}>
                                <Text style={styles.txtAccount}> Keep me signed in</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                                    <Text style={styles.txtBtn}> Sign In </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )}
                </Formik>

                <Text style={styles.textRegister}> ────────  Or Sign In With  ────────</Text>
                <View style={{ marginHorizontal: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={styles.btnIcono}>
                        <Text > G </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnIcono}>
                        <Text > G </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnIcono}>
                        <Text > G </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView >
    );
    //  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1'
    },
    subcontainer: {
        borderRadius: 20,
        flex: 1,
        margin: 20,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'white'
    },
    icono: {
        color: '#c1c1c1'
    },
    txtTitulo: {
        marginTop: 20,
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
    txtAccount: {
        color: 'black',
        fontSize: 15,
        marginTop: 20,
        marginBottom: 20,
    },
    eye: {
        position: 'absolute',
        zIndex: 10,
        top: '34%',
        right: '4%',
      },
    txtInput: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: "#ecf0f1",
        width: "90%",
        height: 55,
        
    },
    hipervinculo: {
        color: "#2980b9",
        textDecorationLine: 'underline'
    },
    crearCuenta: {
        color: "#2980b9",
        fontSize: 15,
        marginTop: 20,
        marginBottom: 20,
    },
    btn: {
        borderRadius: 20,
        backgroundColor: '#3498db',
        marginHorizontal: 20,
        alignItems: 'center',
        height: 60,
        width: 300,
        justifyContent: 'center',
    },
    txtBtn: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    textRegister: {
        color: 'black',
        fontSize: 20,
        marginTop: 20,
        marginHorizontal: 20,
        alignSelf: 'center',
    },
    btnIcono: {
        borderRadius: 100,
        backgroundColor: "#ecf0f1",
        width: 60,
        height: 60,
        marginTop: 30,
    },
});
/*
constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            response: '',
        }
        this.signUp = this.signUp.bind(this)
        this.login = this.login.bind(this)
    }


    async signUp(){
        try {
           if(this.state.email==='' || this.state.password===''){
            Alert.alert('No puede hacer eso')
           }else{
            await firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
            Alert.alert('Usuario creado con exito')
            this.setState({
                response: 'account created',
            })
           // navigation.navigate()
           }
        } catch (e) {
            this.setState({
                response: e.toString()
            })
            console.log(e);
        }
    }

    async login(){
        try{
            await firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
            this.setState({
                response: 'usuario logeado'
            })
        }catch(error){
            this.setState({
                response: error.toString()
            })
        }
    }


     <TextInput
                                placeholder="Ingrese su contraseña"
                                placeholderTextColor="#bdc3c7"
                                autoCapitalize="none"
                                underlineColorAndroid={'transparent'}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                secureTextEntry={true}
                                style={styles.txtInput}

                            ></TextInput>
*/