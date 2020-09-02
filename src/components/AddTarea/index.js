import React,{Component}from "react";
import {Modal, Text, View, TextInput,StyleSheet,Button, Picker} from "react-native";
import BasicAddItems from "application/src/components/BasicAddItems";
import DateTimePicker from '@react-native-community/datetimepicker';
const initialState = {
    name: "",
    description: "",
    priority: 2
};
class AddTarea extends Component {
    constructor(props) {
      super(props);
    
      this.state = {
         ... initialState,
         mode:'date',
         show:false
      };
    };
    addTarea = () => {
        const {onAddTarea, onCloseModal} = this.props;
        const {name, description,priority,date} = this.state;
        onAddTarea({name, description, priority,date});
        //reset initialState for next Add
        this.setState(initialState);
        onCloseModal();
    };

    render () {
        const { visible, onCloseModal } = this.props;
        const { name, priority, description} = this.state;
        
        return ( 
            <Modal 
                visible={visible} 
                transparent={true} 
                animationType="slide"
                onRequestClose={onCloseModal}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <BasicAddItems 
                            name = {name}
                            description ={description}
                            priority={priority}
                            onChange = {newState => this.setState(newState)}
                        />
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
        alignItems: "flex-end",
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
});

export default AddTarea;