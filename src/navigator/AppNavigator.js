import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import MainScreen from "application/src/screen/main";
import EditTodo from "application/src/screen/editTodo";

export default createAppContainer(
    createStackNavigator({
        Main: {
            screen: MainScreen
        },
        Edit: {
            screen: EditTodo
        }
    }, {
        initialRouteName: "Main",
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#0066ff',
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
    }));