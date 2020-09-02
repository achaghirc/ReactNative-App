import React, {useState} from "react";
import {Text, View, TextInput,StyleSheet,Button, Picker} from "react-native";
import PriorityPicker from "application/src/components/PriorityPicker";
import DateTime from 'application/src/components/DateTimePicker';


const priorities = ["Urgente", "Importante","Normal","No Urgente"];

const BasicAddItems = ({name,description,priority,onChange}) => (
    
    <React.Fragment> 
        <View style={styles.block}>
            <Text>Titulo</Text>
            <TextInput 
                style={styles.text}
                value={name}
                onChangeText={name => onChange({name})}
                clearButtonMode="always"
            />
        </View>
        <View style={styles.block}>
            <Text>Descripcion</Text>
            <TextInput 
                style={[styles.text,styles.textArea]}
                value={description}
                onChangeText={description => onChange({description})}
                numberOfLines={4}
                multiline = {true}
                clearButtonMode="always"
            />
        </View>
        <View style={styles.block}>
            <Text>Prioridad</Text>
            <Picker 
                selectedValue={priority}
                onValueChange={priority => onChange({priority})}
                style={{borderWidth: 2, borderColor:"red",elevation:2}}
            >
                {priorities.map((item,idx) => (
                    <Picker.Item key={idx} label={item} value={idx} />
                ))}
            </Picker>
        </View>
        
    </React.Fragment>   
    );

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
    },
    textArea: {
        height: 80
    }
});

export default BasicAddItems;