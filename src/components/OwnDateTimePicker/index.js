import React from 'react';
import {View, Text,Button, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";


class OwnDateTimePicker extends React.Component {
    
    state = {
        DateDisplay: false,
        date: new Date(),
        mode: 'date',
        show: false
  }

    onChange2 = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        this.setState({date:currentDate});
        this.setState({DateDisplay:true});
        console.log("Estoy entrando aqui");
        console.log("Estoy entrando aqui y la fecha es: ",currentDate);
        
  };

    showMode = (currentMode) => {
        this.setState({show: true});
        this.setState({mode:currentMode});
  };

    showDatepicker = () => {
        this.showMode('date');
  };

    handleConfirm = (newdate) => {
        this.setState({DateDisplay:newdate});
        this.setState({show:false});
  }
    render() {
        const {DateDisplay, date,mode,show} = this.state;  
        return (
         <View>
             {(!DateDisplay && 
             <View style={{marginTop: "5%"}}>
                <Button onPress={this.showDatepicker} title="Selecciona Fecha" />
             </View>
             )}
             {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.onChange2}
                    onConfirm={this.handleConfirm()}
                    />
                )}
                {DateDisplay && (
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


export default OwnDateTimePicker;