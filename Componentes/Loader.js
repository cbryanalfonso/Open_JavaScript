import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  ActivityIndicator,
  View,
} from 'react-native';
import { Overlay } from 'react-native-elements';

export default function Loader ({ isVisible, text}){

    return(
      <Overlay
        isVisible={isVisible}
        overlayStyle={styles.Overlay}
      >
          <View>
              <ActivityIndicator
                size="large"
                color="#442484"
              >

              </ActivityIndicator>
          </View>

      </Overlay>
    );

}

const styles= StyleSheet.create({
    overlay:{
        height: 100,
        width: 200,
        backgroundColor: "#fff",
        borderColor: "#442484",
        borderWidth: 2,
        borderRadius: 10,
    },
    view:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})