import { firebase } from "@react-native-firebase/firestore";

const db = firebase.firestore

export const isUserLog =() =>{
    let isLogged = false
    firebase.auth().onAuthStateChanged((user)=>{
        user !== null && (isLogged= true)

    })
}