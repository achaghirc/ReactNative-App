import React, { Component } from 'react';
import { View,Image,Text,StyleSheet,TouchableOpacity,Button,Linking} from 'react-native';
import BasicAddItems from "application/src/components/BasicAddItems";
import OwnDateTimePicker from "application/src/components/OwnDateTimePicker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
/* import { TouchableOpacity } from 'react-native-gesture-handler'; */
import saveImage from "application/assets/save.png";
import moment from "moment";

const styles = StyleSheet.create ({
    icon: {
      height:20,
      width:20,
      tintColor: "#fff",
      marginRight: 20
    },
    blockRow :{
      margin:20, 
      flexDirection: "row",
      alignItems: "center"
    },
    rowContent: {
      flex:3,
      alignSelf:"center",
      flexDirection:"row",
      justifyContent:"space-around",
      alignItems:"center"
    },
    imgContainer: {
      height: 50,
      width:50
    },
    img: {
      height:"100%",
      width: "100%"
    },
    block: {
      margin: 5,
    },
    textFecha: {
      alignContent:"flex-start",
      flex:1,
      textAlign: "left",
      borderBottomWidth: 1,
      padding:5
    },
    text: {
      alignContent:"flex-start",
      flex:1,
      textAlign: "right",
      color: '#CDCACA',
      borderBottomWidth: 1,
      padding: 5,
    },
    listItem: {
      margin: 5,
      padding:5,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",    
  },
});

export default class EditTodo extends Component {
  static navigationOptions  = ({navigation}) => ({
    title: "Editar",
    headerRight: () =>  
      <TouchableOpacity
        onPress = {() =>{
          navigation.getParam("onSave")(navigation.getParam("updateTarea"));
          navigation.goBack();
        }} 
      >
        <Image style={styles.icon} source={saveImage} />
      </TouchableOpacity>
    
  
  });
  constructor(props) {
    super(props);
    this.state = {
      //"integrante" sale de main/index.js openEditTarea
      tarea : props.navigation.getParam("tarea"),
      hasCameraPermission: false,
      hasLocationPermission: false,

    };
  }

  componentDidMount = async () => {
    this.props.navigation.setParams({
      updateTarea: this.state.tarea

    });
    //Preguntamos por el permiso para poder usar la camara
    const {status :cameraStatus } = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    );
    //Preguntamos por el permiso para poder usar la camara
    const {status :locationStatus } = await Permissions.getAsync(
    Permissions.LOCATION
    );

    this.setState ({
        hasCameraPermission: cameraStatus == 'granted',
        hasLocationPermission: locationStatus == 'granted'
      });
  };

  updateLocalTarea = property => {
    const newTarea = {...this.state.tarea, ...property};
    this.setState({tarea : newTarea});
    this.props.navigation.setParams({
      updateTarea:newTarea
    });
  };
  
  getPicture = async () => {
    //Solicitar Permisos 
    const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true,
      aspect:[1,1]
    });
    if(!result.cancelled) {
      this.updateLocalTarea({img:result.uri});
    }
  }

  getLocation = async () => {
    await Location.requestPermissionsAsync();
    const location = await Location.getCurrentPositionAsync({
      enableHighAcurracy: true
    });
    const {longitude, latitude } = location.coords;
    this.updateLocalTarea({location : { longitude,latitude}});
  };

  openMap = location => {
    const {longitude, latitude} = location;
    Linking.openURL(
    //  Platform.select({
    //    ios: () => `http://maps.apple.com/?11=${latitude},${longitude}`,
    //    android: () => 
          `geo:${latitude},${longitude}`
    //  })()
    );
  };

  render() {
    const {tarea} = this.state;
    const {name, description,priority,date,location,img} = tarea;
    return (
      <View>
        <BasicAddItems 
          name = {name}
          description ={description}
          priority={priority}
          date= {date}
          onChange = {property => this.updateLocalTarea(property)}
        />
        <View >
        <View style={styles.block}>
             <TouchableOpacity style = {styles.listItem} onPress = {this.showDatepicker} > 
                 <Text style={styles.textFecha} >Fecha Limite </Text>
                 <Text style={styles.text}>
                     {date[0]}
                 </Text> 
             </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.blockRow}>
          <Text style={{}}>Posicion</Text>
          {!location && (
            <View style={styles.rowContent}>
              <Button 
                style={styles.rowContent}
                title="Añadir Posicion"
                onPress={this.getLocation}
              />
            </View>
          )}
          {location && (
            <View style={styles.rowContent}>
                <TouchableOpacity onPress={() => this.openMap(location)}>
                  <Text>
                    [{location.latitude},{location.longitude}]
                  </Text>
                </TouchableOpacity>
                <Button 
                  title="Borrar" 
                  onPress={() => this.updateLocalTarea({location: null})}
                />
            </View>
          )}
        </View>
      </View>
    );
  }
}
