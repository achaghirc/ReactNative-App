import React, {useState} from 'react';
import {View, Text, Platform,StyleSheet, Button} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import CalendarPicker from "react-native-calendar-picker";


const MyDateTimePicker = (onChange) => {  
  
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    
    
    const onSelectDate = (selectedDate) => {
      const currentDate = selectedDate || newdate;
      setDate(currentDate);
    };

    const changeShow = () => {
      setShow(true);
    }

  return (
      <View>
        <View>
          {show && (
          <CalendarPicker onDateChange= {onSelectDate} />    
          )}
          {!show && ( 
            <Button title="Selecciona fecha" onPress={changeShow}/>
          )}
          </View>

        <View>
            <Text>La fecha seleccionada es: {moment(date).format('YYYY-MM-DD')}</Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create ({
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
    block: {
        margin: 5,
    },
    textBox: {
        flex:1,
        padding: 5,
        fontWeight: "bold",
    },
    listItem: {
        margin: 5,
        padding:5,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",    
    },
});

export default MyDateTimePicker;

