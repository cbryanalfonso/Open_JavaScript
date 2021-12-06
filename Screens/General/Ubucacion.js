import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Platform,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Keyboard,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
// import {useDispatch, useSelector} from 'react-redux';
function Ubucacion({ navigation }) {
  //const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [cat, setCat] = useState(1);
  const [points, setPoints] = useState([]);
  const [company, setCompany] = useState(null);
  const [textSearch, setTextSearch] = useState('');
  const [dataSetSearch, setDataSetSearch] = useState([]);

  const [showAler, setShowAlert] = useState(false);
  const [safe, setSafe] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [newUserValue, setNewUserValue] = useState();
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);


  useEffect(() => {

    startLoading();
  }, []);


  const zoom = point => {
    mapRef.current.animateToRegion(
      {
        latitude: point.lat,
        longitude: point.lng,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005,
      },
      1500,
    );
  };

  const zoomout = point => {
    mapRef.current.animateToRegion(
      {
        latitude: point.lat,
        longitude: point.lng,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      },
      1500,
    );
    setCompany(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        {loading ? (
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: "white",
            }}>
            <Text style={[styles.textDescription, { marginBottom:20 }]}>
              Loading GOM
            </Text>
            <ActivityIndicator color="#05A8F3" size="large" />
          </SafeAreaView>
        ) : (
          <>
            <View style={styles.main}>
              <MapView
                ref={mapRef}
                style={styles.map}
                provider={Platform.OS === 'ios' ? null : PROVIDER_GOOGLE}>
               
              </MapView>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  barTools: {
    height: 80,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  main: {
    width: '100%',
    height: '100%',
    //backgroundColor: "white",
  },
  map: {
    flex: 1,
  },
  capas: {
    position: 'absolute',
    zIndex: 999,
    right: 10,
    top: '33%',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0,
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 10,
    borderRadius: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  imgPin: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  imgTar: {
    height: '100%',
    width: '33%',
    borderRadius: 5,
    marginRight: 5,
  },
  
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    width: '100%',
  },
  description: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  barButton: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  buttons: {
    zIndex: 9999,
    position: 'absolute',
    height: 145,
    justifyContent: 'space-between',
    right: 3,
    top: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: "white",
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: "white",
    minHeight: '100%',
    width: '100%',
  },
  textDescription: {
    fontWeight: 'bold',
    fontSize: 14,
    color: "black",
  },
});

export default Ubucacion;