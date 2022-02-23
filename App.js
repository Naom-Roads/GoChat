import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { MaterialIcons } from "@expo/vector-icons";




// Fixes an issues on react native's side with the timer warning
import {Button, LogBox, StyleSheet} from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

// DataBase
const firebase = require('firebase');
require('firebase/firestore');

// Imports Screens
import Start from './components/Start';
import Chat from './components/Chat';
import {View} from "react-native-web";


const Tab = createBottomTabNavigator();

export default class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (

            <NavigationContainer>
                <Tab.Navigator initialRouteName="Start" tabBarOptions={{ showIcon: true}}>
                    <Tab.Screen
                        name="Start"
                        component={Start}
                        options={{
                            tabBarIcon: (tabInfo) => (
                                <MaterialIcons name="home" size={20} color={tabInfo.tintColor} />
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Chat"
                        component={Chat}
                        options={{
                            tabBarIcon: (tabInfo) => (
                                <MaterialIcons name="chat" size={20} color={tabInfo.tintColor} />
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}
