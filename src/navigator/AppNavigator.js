import React from "react"; 
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import MainScreen from "application/src/screen/main";
import EditTodo from "application/src/screen/editTodo";

export default createAppContainer(
    createStackNavigator(
    {
        Main: {
            screen: MainScreen
        },
        Edit: {
            screen: EditTodo
        }
    },
    {   
        initialRouteName: "Main",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor:'#0066ff',
            },
            headerTintColor:"#fff",
            headerTitleStyle:{
                fontWeight: 'bold'
            }
        }
    }));

//export default createAppContainer(AppNavigator);

/* export default createAppContainer(
    createStackNavigator( 
       //Dos objetos {} {} uno para las pantallas que vamos a usar y un segundo donde definimo las propiedades del Stack
        {
            Main: {screen: MainScreen}
        },
        {
            initialRouteName: "Main"
        }     
    )
); */

/* function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }

const Stack = createStackNavigator();

function MyStack () {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.screen name="Home" component={HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
} */


/* export default MyStack; */


