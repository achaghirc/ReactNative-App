import React, {Component} from 'react';
import { Text, 
  View, 
  StyleSheet, 
  TextInput,
  Button, 
  Alert,
  ActivityIndicator, 
  SafeAreaView} from 'react-native';
import Integrantes from "application/src/components/integrantes";
import AddTarea from "application/src/components/AddTarea";
import {getIntegrantes, newIntegrante,updateIntegrante,addIntegrante,deleteIntegrante} from "application/src/data/integrantes";


class MainScreen extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        integrantes: [],
        nuevoIntegrante : "",
        loading: true,
        addModalVisible: false
      };
    };
    //SE HACE ASINCRONA PARA SIMULAR LA ESPERA DE CARGA DE DATOS Y QUE SALGA LA RULETITA
    componentDidMount = async () => {
      const integrantes = await getIntegrantes();
      this.setState({integrantes:integrantes, loading:false});
    };

    handleAdd = (nuevaTarea) => {
      const {integrantes} = this.state;
      const newList = addIntegrante(integrantes, nuevaTarea);
      this.setState({integrantes:newList, nuevoIntegrante:null});
    };

    handleUpdate = integrante => {
      const { integrantes } = this.state;
      const newList = updateIntegrante(integrantes,integrante);
      this.setState({integrantes:newList});
    };

    handleDelete = integrante => { 
      Alert.alert("Quieres eliminar la Tarea", integrante.name, [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text:"OK",
          onPress: () => {
            const{integrantes} = this.state;
            const newList = deleteIntegrante(integrantes,integrante);
            this.setState({integrantes:newList});
          }
        }
      ])
    };
    toggleModal = () => {
      this.setState({addModalVisible : !this.state.addModalVisible})
    };
    render(){ 
      const {integrantes, nuevoIntegrante, loading, addModalVisible} = this.state;
    return (
        <SafeAreaView style={styles.container}>
          <Text selectable style= {styles.title}>Tareas a realizar</Text>
          <View style={styles.addRow}>
            <TextInput 
              placeholder = "Nueva Tarea"
              value = {nuevoIntegrante}
              onChangeText = {integrante => this.setState({nuevoIntegrante: integrante})}
              autoCapitalize = "words"
              editable 
              returnKeyType = "done"
              style = {styles.textBox}/>
            <Button title="añadir" onPress = {this.toggleModal} />
          </View>
          { //Si el loading esta a True es decir no se han cargado los datos aun
          //entonces mostramos el Activity Indicator es decir la ruletita de carga
            loading && <ActivityIndicator style={styles.loading} size ="large" color="#0000ff"/> }
          {//Si el loading esta a false es decir ya se han cargado los datos entonces 
          //Mostramos los datos
            !loading &&
          <Integrantes integrantes={integrantes} onUpdate={this.handleUpdate} onDelete={this.handleDelete}  />
          }
          <AddTarea visible={addModalVisible}
          onCloseModal = {this.toggleModal}
          onAddTarea = {this.handleAdd}
          />
          </SafeAreaView>
    )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: "center"
    },
    title: {
        marginTop: 20,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        fontSize:30
    },
    textBox: {
      borderWidth:1,
      borderBottomWidth:1,
      padding: 5,
      flex:1,
      
    },
    addRow: {
      flexDirection : "row",
      width: "80%"
    },
    loading: {
      flex: 1
    }

  });

  export default (MainScreen)