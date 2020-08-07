import uuid from "uuid/dist/v1";
import {AsyncStorage} from "react-native";
const INTEGRANTES_KEY = "@MyStore:integrantes";

const delay = ms => new Promise(res => setTimeout(res, ms))

const getIntegrantes = async () => {
    await delay(1000);
    return [
    newIntegrante({ name: "Tarea 1", done: true}),
    newIntegrante({ name: "Tarea 2", done: false}),
    newIntegrante({ name: "Tarea 3", done: false}),
    newIntegrante({ name: "Tarea 4", done: true}),
    newIntegrante({ name: "Tarea 5", done: false}),
    newIntegrante({ name: "Tarea 6", done: false}),
   ]};

   const newIntegrante = integrante => ({
       id: uuid(),
       name: integrante.name,
       done: integrante.done,
       createdAt: new Date()
   });

   const updateIntegrante = (list,integrante) => {
       const updateIndex = list.findIndex(t => t.id == integrante.id);
       const newIntegrantesList = [... list];
       newIntegrantesList[updateIndex] = integrante;
       return newIntegrantesList;
   };
   const saveIntegrantes = async integrantes => {
       try {
           const resp = await AsyncStorage.setItem(INTEGRANTES_KEY,JSON.stringify(integrantes));
       }catch (error){
           console.log(error.message);
       }
   }
//   const deleteIntegrante = (list,integrante) => {
//       const newList = list.filter(t => t.id !== integrante.id);
//       save
//   }
   const addIntegrante = (list,integrante) => [...(list || []), newIntegrante(integrante)];

   const deleteIntegrante = (list,integrante) => list.filter(t => t.id !== integrante.id);



export {getIntegrantes, newIntegrante,updateIntegrante,addIntegrante,deleteIntegrante};