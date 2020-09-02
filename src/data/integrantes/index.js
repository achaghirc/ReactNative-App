import "react-native-get-random-values"
import uuid from "uuid/dist/v1";
import {AsyncStorage} from "react-native";
const INTEGRANTES_KEY = "@MyStore:integrantes";



const getIntegrantes = async () => {
   let tareas = [];
   try{
    tareas = await AsyncStorage.getItem(INTEGRANTES_KEY);
   }catch(error){
    console.log(error.message);
   }
   return JSON.parse(tareas);
   };

   const newIntegrante = integrante => ({
       id: uuid(),
       name: integrante.name,
       description: integrante.description,
       done: integrante.done,
       createdAt: new Date(),
       priority: integrante.priority
   });

   const updateIntegrante = (list,integrante) => {
       const updateIndex = list.findIndex(t => t.id == integrante.id);
       const newTareasList = [... list];
       newTareasList[updateIndex] = integrante;
       saveTareas(newTareasList);
       return newTareasList;
   };
   
   const deleteIntegrante = (list,integrante) => {
       const newTareaList = list.filter(t => t.id !== integrante.id);
       saveTareas(newTareaList);
       return newTareaList;
   }
   const addIntegrante = (list,integrante) => {
       const newTareaList = [...(list || []), newIntegrante(integrante)];
       saveTareas(newTareaList);
       return newTareaList;
   }

   const saveTareas = async integrantes => {
        try {
            const resp = await AsyncStorage.setItem(INTEGRANTES_KEY,JSON.stringify(integrantes));
        }catch (error){
            console.log(error.message);
        }
    };

export {getIntegrantes, newIntegrante,updateIntegrante,addIntegrante,deleteIntegrante};