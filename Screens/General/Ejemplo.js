import React, { useEffect } from 'react';
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
    Platform,
    PermissionsAndroid,
    Alert,
  } from 'react-native';

import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

export default function Ejemplo({ navigation }) {
    return(
        <View style={{flex:1,backgroundColor: 'white', }}>
            
        </View>
    );
}

/*export default function Ejemplo({ navigation }) {
  // create bucket storage reference to not yet existing image
  const reference = storage().ref('../../resources/avatar-default.jpg');

  return (
    <View>
        <Text>as</Text>
    </View>
  );
}
*/
/*

      <Button
        onPress={async () => {
          // path to existing file on filesystem
          const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/black-t-shirt-sm.png`;
          // uploads file
          await reference.putFile(pathToFile);
        }}
      />

*/

