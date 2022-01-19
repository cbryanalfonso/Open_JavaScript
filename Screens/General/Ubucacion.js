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
  Modal,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapViewDirections from 'react-native-maps-directions'
import Geolocation from '@react-native-community/geolocation'
import { getDistance } from 'geolib'
import CardFilterGom from '../commons/cards/CardFilterGom';

import { Icon as Ic } from 'react-native-elements';
import { getCompanies, getFilterCategory } from '../DB/api_request'
// import {useDispatch, useSelector} from 'react-redux';
function Ubucacion({ navigation }) {
  //const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [cat, setCat] = useState(1);
  const [points, setPoints] = useState([]);
  const [company, setCompany] = useState(null);
  const [textSearch, setTextSearch] = useState('');
  const [dataSetSearch, setDataSetSearch] = useState([]);
  const keyExtractor = (item, index) => index.toString();
  const [mapView, setMapView] = useState(false)
  const [showAler, setShowAlert] = useState(false);
  const [safe, setSafe] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [newUserValue, setNewUserValue] = useState();
  const [loading, setLoading] = useState(false);
  const [lat, setLat] = useState(0)
  const [lon, setLon] = useState(0)
  const [latitudeEmpresa, setLatitudeEmpresa] = useState(0)
  const [longitudeEmpresa, setLongitudeEmpresa] = useState(0)
  // Se agrega esta constante
  const [category, setCategory] = useState([])
  const [dataSetCategory, setDataSetCategory] = useState([]);
  const [showCardFIlter, setShowCardFilter] = useState(false);
  const [tiempo, setTiempo] = useState(0)
  const [distancia, setDistancia] = useState(0)
  const [horas, setHoras] = useState(0)
  const [minutos, setMinutos] = useState(0)
  const renderItem = ({ item }) => (
    <CardFilterGom navigation={navigation} dataSet={item} />
  );


  const [filtrosCategorias, setFiltrosCategorias] = useState(false)

  const coordinates = [
    {
      latitude: lat,
      longitude: lon,
    },
    {
      latitude: latitudeEmpresa,
      longitude: longitudeEmpresa,
    }
  ]

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(info => console.log(info.coords));
    Geolocation.getCurrentPosition(info => setLat(info.coords.latitude));
    Geolocation.getCurrentPosition(info => setLon(info.coords.longitude));
    handleFilter()
  }, [])

  const calculateDistance = () => {
    var dis = getDistance(
      { latitude: lat, longitude: lon },
      { latitude: coordinates[1].latitude, longitude: coordinates[1].longitude },
    );
    alert(
      `Distance\n\n${dis} Meter\nOR\n${dis / 1000} KM`
    );
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


  function handleFilter() {
    getFilterCategory()
      .then(response => {
        console.log(response);
        setDataSetCategory(response)
      })
      .catch(error => console.log('Error Filter GOM :>> ', error));
  }


  // Funcion para filtrar todas las categorias

  function filterCompanies(category) {
    getCompanies(category)
      .then(response => {
        setCategory(response)
      })
      .catch(error => console.log('Error Filter GOM :>> ', error));
  }

  const [time, setTime] = useState(0)
  const [tiempoMin, setTiempoMin] = useState(false)

  const correciones = () => {
    console.log("El tiempo que se tiene registrado es de ", tiempo);
    if (tiempo > 59) {
      //setTiempo(tiempo/60)
      console.log("Tiempo redondeado ", (tiempo / 60).toFixed(0));
      console.log("Tiempo en decimal ", (tiempo / 60) - tiempo.toFixed);

    }
  }

  function categoryFilter() {
    return dataSetCategory.map(function (news, i) {
      return (
        <View key={i} style={
          {
            width: 150,
            paddingHorizontal: 10,
            marginBottom: 10,
          }
        }>
          <View style={{
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

          }}>
            <TouchableOpacity style={{ height: 35, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => {
                //Alert.alert(news.category_english)
                //console.log("Esta es la categoria ", news);
                filterCompanies(news.id_category)
                //console.log(news);
                setFiltrosCategorias(false)
                console.log("Cargando las compañias nuevamente")
                // startLoadingMarker()
                //console.log(loadingMarker);
                //setLoadingMarker(true)

              }}
            >
              <Text style={{ color: 'black' }}>{news.category_english}</Text>
            </TouchableOpacity>


          </View>
        </View>
      );
    });
  }


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
            <Text style={[styles.textDescription, { marginBottom: 20 }]}>
              Loading GOM
            </Text>
            <ActivityIndicator color="#05A8F3" size="large" />
          </SafeAreaView>
        ) : (
          <>
            <View style={styles.main}>
              <TouchableOpacity style={{ backgroundColor: 'red', height: 40 }} onPress={calculateDistance}>
                <Text>Hola amigos </Text>
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={filtrosCategorias}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >

                <SafeAreaView style={{ justifyContent: 'center', marginTop: 100, paddingVertical: 20, alignSelf: 'flex-end', flex: 0.8, marginRight: 60 }}>
                  <View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'flex-start', margin: 15, marginBottom: 40, marginLeft: -30 }}>
                    <TouchableOpacity style={styles.btnIcono}
                      onPress={() => {
                        setFiltrosCategorias(false)
                      }}
                    >
                      <Ic name="keyboard-backspace" type="material-community" size={22} />
                    </TouchableOpacity>
                  </View>
                  {categoryFilter()}
                </SafeAreaView>
              </Modal>
              <TouchableOpacity style={styles.filtros}
                onPress={() => setFiltrosCategorias(true)}
              >
                <Ic type="material-community" name="filter-outline" size={25} color="#05A8F3" />
              </TouchableOpacity>


              {company && (
                <View style={styles.targetCompany}>
                  <View style={styles.buttons}>
                    <View style={styles.barButton}>
                      <TouchableOpacity onPress={() => zoomout(company)}>
                        <Icon name="times-circle" color="#485056" size={30} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.barButton}>
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate('ProfileCompany', {
                          //   id_company: company.id_company,
                          //   titleCompanyGOM: company.title,
                          // });
                          //console.log("Name Company", company.title);
                        }}>
                        <Icon
                          name="chevron-circle-right"
                          color="#485056"
                          size={30}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Image
                    style={styles.imgTar}
                    source={{ uri: company.logo }}
                    resizeMode="contain"
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{company.title}</Text>
                    <Text style={styles.description}>
                      {company.category_english}
                    </Text>
                    <Text style={styles.description}>{company.location}</Text>
                    <Text style={styles.description}>Km</Text>
                    <Text style={styles.description}>minutos</Text>
                    <View style={{ flexDirection: 'row',  marginTop: 5, alignItems: 'center' }}>
                      <Ic type='material-community' name='car' color='#485056' size={22}></Ic>
                      <Text style={{ color: 'black', marginLeft: 5 }}>{distancia.toFixed(0)} km</Text>


                      {tiempoMin ? (
                        <>
                        <Ic type='material-community' name='alarm' color='#485056' size={22} style={{ marginLeft: 10 }}></Ic>
                        <Text style={{ color: 'black', alignItems: 'center', marginLeft:5 }}>{horas} hrs. </Text>
                        <Text style={{ color: 'black' }}>{minutos} min.</Text>

                        </>
                      ) : (
                        <>
                          <Ic type='material-community' name='alarm' color='#485056' size={22} style={{ marginLeft: 15 }}></Ic>
                          <Text style={{ color: 'black' }}>{tiempo.toFixed(0)} min.</Text>
                        </>
                      )}

                    </View>
                  </View>
                </View>
              )}

              <MapView
                ref={mapRef}
                style={styles.map}
                provider={Platform.OS === 'ios' ? null : PROVIDER_GOOGLE}
              //showsUserLocation
              //loadingEnabled

              >
                {mapView && (
                  <>
                    <MapViewDirections
                      origin={coordinates[0]}
                      destination={coordinates[1]}
                     
                      strokeWidth={0}
                      onReady={result => {
                        setDistancia(result.distance)
                        setTiempo(result.duration)
                        console.log("Es la distancia que se obtiene entre estos dos puntos", result.distance)
                        console.log("Es tiempo de recorrido entre estos dos puntos", result.duration, " min")

                        if (result.duration > 59) {
                          //setTiempo(tiempo/60)
                          console.log("Tiempo redondeado ", (result.duration / 60).toFixed(2));
                          console.log("Horas", Math.floor(result.duration / 60));
                          setHoras(Math.floor(result.duration / 60))
                          console.log("Tiempo en decimal ", (result.duration / 60).toFixed(2) - Math.floor(result.duration / 60));
                          setMinutos((60 * ((result.duration / 60).toFixed(2) - Math.floor(result.duration / 60))).toFixed(0))
                          console.log("Tiempo en minutos", (60 * ((result.duration / 60).toFixed(2) - Math.floor(result.duration / 60))).toFixed(0));
                          console.log("horas ", 60 * 2);
                          setTiempoMin(true)

                        }
                      }}

                    />

                  </>
                )}
                {category.map(function (news, i) {
                  if (news?.lat && news?.lng) {
                    {
                      return (
                        <Marker
                          key={i}
                          title={news.title}
                          pinColor={`#${news.color}`}
                          onPress={() => {
                            if (showCardFIlter) {
                              setShowCardFilter(false);
                            }

                            setCompany(news);
                            setLatitudeEmpresa(news.lat)
                            setLongitudeEmpresa(news.lng)
                            setMapView(true)
                            console.log(news.lat, "  Longitude ", news.lng)


                          }
                          }
                          coordinate={{
                            latitude: news.lat,
                            longitude: news.lng,
                          }}
                        >
                          {news?.marketplace && news?.logo ? (
                            <View style={styles.shadow}>
                              <Image
                                style={styles.imgPin}
                                source={{ uri: news?.logo }}
                                resizeMode="contain"
                              />
                            </View>
                          ) : null}
                        </Marker>
                      )
                    }
                  }
                  return null
                })}


                {/* <Marker coordinate={coordinates[0]}/>
                  <Marker coordinate={coordinates[1]}
                    title="Destino"
                  />
                  <MapViewDirections
                    origin={coordinates[0]}
                    destination={coordinates[1]}
                    apikey={"AIzaSyCnQqNuvMB3OR2jjkNT1seu7d80CTKt3NE"}
                    strokeWidth={3}
                    strokeColor="hotpink"
                    onReady={result =>{
                      
                      console.log("Es la distancia que se obtiene entre estos dos puntos",result.distance)
                      console.log("Es tiempo de recorrido entre estos dos puntos",result.duration," min")
                    }}
                  />*/}


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
    color: 'black'
  },
  description: {
    fontWeight: 'bold',
    fontSize: 12,
    color: 'black'
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
  targetCompany: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 150,
    right: '10%',
    position: 'absolute',
    zIndex: 999,

    bottom: 40,
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0,
    //backgroundColor: 'rgba(255,255,255,0.6)',
    //backgroundColor: '#ecf0f1',
    backgroundColor: 'white',
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
  textDescription: {
    fontWeight: 'bold',
    fontSize: 14,
    color: "black",
  },
  btnIcono: {
    borderRadius: 50 / 2,
    backgroundColor: "#ecf0f1",
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Ubucacion;