import React, {useState} from 'react';
import {View, Button, Platform,StyleSheet} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";



const MyDateTimePicker = (date,onChange2) => {
  
    const [newdate, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [DisplayDate, setDisplayDate] = useState(false);
    
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || newdate;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
      setDisplayDate(true);
    };
    
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
    
    const showDatepicker = () => {
      showMode('date');
    };

  render () 
  {
    const {newDate, mode,show,DisplayDate} = useState();
    return (
      <React.Fragment>
        <View>
          <View>
            Button onPress={showDatepicker} title="Show date picker!" />
          </View>
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={newdate}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={newdate => onChange2({newdate})}
        />
      )}
        {DisplayDate &&  (
          <View style={styles.block}>
             <TouchableOpacity style = {styles.listItem} onPress = {this.showDatepicker} > 
                 <Text style={styles.textFecha} >Fecha Limite </Text>
                 <Text style={styles.text}>
                     {moment(date)
                         .format('YYYY-MM-DD')}
                 </Text> 
             </TouchableOpacity>
          </View>

      )}
    </View>
  </React.Fragment> 
    );
  };
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

