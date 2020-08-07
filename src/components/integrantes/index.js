import React, { Fragment } from 'react';
import { Text, View,Image,TouchableOpacity, StyleSheet,SectionList } from 'react-native';
import deleteImage from "application/assets/delete.png";

const Integrantes  = ({ integrantes,onUpdate,onDelete }) => {
    renderItem = (integrante) => (
        <TouchableOpacity 
            onPress= {() => 
                onUpdate({... integrante, done:!integrante.done})} style = {styles.listItem} key={integrante.name}>
            <Text style = {[styles.textBox, integrante.done && styles.textDone]} >
                {integrante.name}
            </Text>
            <TouchableOpacity style = {styles.delete} onPress = {() => onDelete(integrante)}>
                <Image style = {styles.iconDelete} source ={deleteImage}/>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    renderSeperator = () => {
        return  <View style={styles.separator} />
    };
    renderEmptyComponent = () => {
        return (
        <View style={styles.emptyList}> 
        <Image source={require ('application/assets/check.png')}/>
            <Text>Lista Vacia</Text>
        </View>
        )
    };
    renderSectionHead = ({section: {title,data}}) => {
        return (
        <View style={styles.sectionHeader}>
            <Text>{title} ({data.length}) </Text>
        </View>
        )
    };
    
    return (
    <SectionList
        style={styles.container}
        sections = {integrantes && integrantes.length ? [
            {title: 'Sin hacer',data: integrantes.filter(integrante => !integrante.done)},
            {title: 'Finalizadas', data: integrantes.filter(integrantes => integrantes.done)}
        ] : []} 
        renderItem = {({item}) => renderItem(item)}
        renderSectionHeader = {renderSectionHead}
        ItemSeparatorComponent = {renderSeperator}
        ListEmptyComponent = {renderEmptyComponent}
        stickySectionHeadersEnabled = {true}
        />

)};


const styles = StyleSheet.create ({ 
    container: {
        width:"100%"
    },

    contentContainer: {
        flexGrow: 1,
    },
    listItem: {
        margin: 5,
        padding:5,
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    bullet: {
        width:"100%"
    },
    textBox: {
        flex:1,
        padding: 5,
        fontWeight: "bold",
    },
    textDone: {
        color: "#aaa",
        textDecorationLine:"line-through",
        fontWeight:"normal"
    },
    delete: {
        width:40, 
        height:40,
        alignItems:"center",
        justifyContent: "center"
    },
    iconDelete:{
        width:20,
        height:20
    },
    separator : {
        height:1,
        width: "90%",
        backgroundColor:"#CED0CE",
        marginLeft:"4%"
    },
    emptyList : {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    sectionHeader : {
        backgroundColor: "#ddd",
        padding: 10
    }
})
export default Integrantes ;
