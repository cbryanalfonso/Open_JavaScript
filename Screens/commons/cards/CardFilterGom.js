import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, Platform, TouchableOpacity} from 'react-native';
import {colorTexto} from '../../utils/colors'

function CardFilterGom({navigation, dataSet}) {
  console.log("Esto es lo que llega desde muy lejos");
  let TouchableHighlight, TouchableOpacity;
  if (Platform.OS === 'ios') {
    ({TouchableHighlight, TouchableOpacity} = require('react-native'));
  }
  return (
    <View style={styles.mainCard}>
      <View style={[styles.Card, {justifyContent: 'center'}]}>
        <TouchableOpacity
         onPress={() => {
             navigation.navigate('ProfileCompany', {
               id_company: dataSet.id_company,
               //titleCompanyGOM: dataSet.title,
               data: dataSet,
             });
           // console.log('Company Title', dataSet.title);
            ///console.log("logo", dataSet.logo);
            //console.log('company title', dataSet.title);
            //console.log("data set", dataSet);
            console.log("No se puede acceder...");
          }}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={[
                    styles.poinCompany,
                    {
                      backgroundColor: dataSet.color
                        ? `#${dataSet.color}`
                        : 'white',
                    },
                  ]}></View>
                <Text style={styles.title}>{dataSet.title}</Text>
              </View>
              <View style={{marginLeft: 20}}>
                <Text style={styles.description}>
                  {dataSet.category_english}
                </Text>
                <Text style={styles.description}>{dataSet.location}</Text>
              </View>
            </View>
            <Image
              style={styles.imgTar}
              source={{uri: dataSet.logo}}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    width: 180,
   height: 190,
   paddingHorizontal: 15,
   paddingTop: 15
  },
  Card: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 10,
    padding: 15,
  },
  imgTar: {
    height: '100%',
    width: '33%',
    borderRadius: 5,
    marginRight: 5,
  },
  poinCompany: {
    width: 10,
    height: 10,
    marginRight: 10,
    borderRadius: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    width: '100%',
    color: '#34495e',
  },
  description: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#95a5a6',
  },
});

export default CardFilterGom;
