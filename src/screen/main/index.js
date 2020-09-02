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
import FAB from "application/src/components/FAB";
import {getIntegrantes, newIntegrante,updateIntegrante,addIntegrante,deleteIntegrante} from "application/src/data/integrantes";


class MainScreen extends Component {
  static navigationOptions  = {
    title: "Agenda Personal"
  };
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

    componentWillUnmount() {
      this._isMounted = false;
    }

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

    openEditTarea = tarea => {
      this.props.navigation.navigate("Edit",{
        tarea,
        onSave: this.handleUpdate
      });
    };
    
    render(){ 
      const {integrantes, nuevoIntegrante, loading, addModalVisible} = this.state;
    return (
        <SafeAreaView style={styles.container}>
          { //Si el loading esta a True es decir no se han cargado los datos aun
          //entonces mostramos el Activity Indicator es decir la ruletita de carga
            loading && <ActivityIndicator style={styles.loading} size ="large" color="#0000ff"/> }
          {//Si el loading esta a false es decir ya se han cargado los datos entonces 
          //Mostramos los datos
            !loading &&
          <Integrantes 
            integrantes={integrantes} 
            onUpdate={this.handleUpdate} 
            onDelete={this.handleDelete}
            onEdit = {this.openEditTarea}  
            />
          }
          {/* El FAB es el Floating Action Botton que es el boton que 
          usaremos para añadir una nueva Tarea 
          Es un componente aparte que esta en src/components*/}
          <FAB 
          text = "+"
          fabStyle={{backgroundColor:"#0066ff"}}
          textStyle= {{color:"#fff"}}
          onPress = {this.toggleModal}
          />
          {/*El AddTarea es la logica que utilizaremos para añadir una tarea nueva
          mediante una ventana Modal es decir una ventana emergente */}
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
    loading: {
      flex: 1
    }

  });

  export default (MainScreen)