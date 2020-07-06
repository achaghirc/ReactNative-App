import React, {Component} from 'react';
import { Text, View, StyleSheet } from 'react-native';

class MainScreen extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         integrantes: []
      };
    };
    render(){ 
    return (
        <View style={styles.container}>
            <Text style= {styles.title}>Integrantes de los pumas</Text>
        </View>
    )
    }
}
hola
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        
    }
  });

  export default (MainScreen)