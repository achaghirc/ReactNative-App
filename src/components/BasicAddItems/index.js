import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet, Button, Picker } from "react-native";
import PriorityPicker from "application/src/components/PriorityPicker";
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import Integrantes from "application/src/components/integrantes";
import {getIntegrantes } from "application/src/data/integrantes"

const priorities = ["Urgente", "Importante", "Normal", "No Urgente"];


const BasicAddItems = ({ name, description, priority, date, onChange }) => {
    const [dateFormated, setDate] = useState(date);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [displayDate, setDisplayDate] = useState(false);
    const [resDate, setResDate] = useState(' '); 

    const onSelectDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        date = formatedDate(currentDate);
        setResDate(date);
        setDisplayDate(true);
        setShow(false);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const formatedDate = (dateFormated) => {
        const fecha = moment(dateFormated).format('DD-MM-YYYY');
        return fecha;
    };

    const setParams = () => {
        console.log('Estoy entrando aqui socio');
        setShow(false);
        setDisplayDate(true);
    }

    return ( 
        <View>
            <View style = { styles.block } >
                <Text>Titulo</Text> 
                <TextInput style = { styles.text }
                    value = { name }
                    onChangeText = { name => onChange({ name }) }
                    clearButtonMode = "always" />
            </View> 
            <View style = { styles.block } >
                <Text> Descripcion </Text> 
                <TextInput style = {[styles.text, styles.textArea]}
                    value = { description }
                    onChangeText = { description => onChange({ description }) }
                    numberOfLines = { 4 }
                    multiline = { true }
                    clearButtonMode = "always" />
            </View> 
                <View style = { styles.block } >
                    <Text> Prioridad </Text> 
                    <Picker selectedValue = { priority }
                        onValueChange = { priority => onChange({ priority }) }
                        style = {{ borderWidth: 2, borderColor: "red", elevation: 2 }}> 
                    {
                        priorities.map((item, idx) => ( 
                        <Picker.Item key = { idx }
                            label = { item }
                            value = { idx }/>
                        ))
                    } 
                    </Picker> 
                </View> 
            <View style = {styles.block}>
                
                <Button onPress = {showDatepicker}
                    title = "Selecciona Fecha"/>
                {
                    show && ( 
                        <DateTimePicker testID = "dateTimePicker"
                            value = { new Date() }
                            mode = { mode }
                            is24Hour = { true }
                            display = "default"
                            display = "spinner"
                            onChange = { onSelectDate }
                            onConfirm = { setParams }/>
                            )
                } 
                {
                    displayDate && ( 
                        <View style = { styles.block } >
                            <Text> Fecha Seleccionada </Text> 
                            <TextInput style = {[styles.text, styles.textArea]}
                                    value = { date[0] = resDate }
                                    onChangeText = { date => onChange({ date }) }
                                    numberOfLines = { 1 }
                                    multiline = { true }
                                    editable = { false }
                                    clearButtonMode = "always" />
                        </View>
                    )
                } 
            </View>  
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-end",
        flexDirection: "row",
        backgroundColor: "rgba(0,0,0,0.55)"
    },
    content: {
        padding: 20,
        paddingBottom: 30,
        flex: 1,
        backgroundColor: "#ffffff",
        shadowOffset: { width: 0, height: -3 },
        shadowColor: "black",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 30
    },
    text: {
        borderBottomWidth: 1,
        padding: 5
    },
    closeIcon: {
        color: "#fff"
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingBottom: "28",
    },
    block: {
        margin: 10
    },
    textArea: {
        height: 80
    }
});

export default BasicAddItems;