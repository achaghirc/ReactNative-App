import React,{Component}from "react";
import {Modal, Text, View, TextInput,StyleSheet,Button, TouchableOpacity} from "react-native";

const initialState = {
    name: "",
    description: "",
    priority: 2
};
export default class AddTarea extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
         ... initialState
      };
    };
    addTarea = () => {
        const {onAddTarea, onCloseModal} = this.props;
        const {name, description} = this.state;
        onAddTarea({name, description});
        //reset initialState for next Add
        this.setState(initialState);
        onCloseModal();
    };
    render () {
        const { visible, onCloseModal } = this.props;
        const { name, priority, description} = this.state;
        return ( 
            <Modal visible={visible} transparent={true} animationType="slide">
                <View style = {styles.container}>
                    <View style={styles.content}>
                        <View style = {styles.block}>
                            <Text>Titulo</Text>
                            <TextInput 
                                placeholder="Titulo"
                                style = {styles.text}
                                value={name}
                                onChangeText={name => this.setState({name:name})}
                                clearButtonMode="always"
                            />
                        </View>
                        <View  style={styles.block}>
                            <Text>Description</Text>
                            <TextInput
                                placeholder="Descripcion"
                                style={styles.text}
                                value={description}
                                onChangeText={description => this.setState({description:description})}
                                clearButtonMode="always"
                            />
                        </View>
                        <View style={{flexDirection:"row",paddingBottom:28,justifyContent:"space-around"}}>
                            <Button title="Cancelar" onPress={onCloseModal} color="#ff0000"/>
                            <Button title="Añadir" onPress={this.addTarea}/>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex:1, 
        alignItems: "center",
        flexDirection: "row",
        backgroundColor:"rgba(0,0,0,0.55)"
    },
    content : {
        padding: 20,
        paddingBottom: 30,
        flex: 1,
        backgroundColor: "#ffffff",
        shadowOffset: {width:0, height:-3},
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation:30
    },
    text: { 
        borderBottomWidth: 1,
        padding: 5
    },
    closeIcon:{
        color:"#fff"
    },
    buttonRow: { 
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom:"28",
    },
    block: {
        margin: 10
    }
})