import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


// Fixes an issues on react native's side with the timer warning
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);

// DataBase
const firebase = require('firebase');
require('firebase/firestore');

// Imports Screens
import Start from './components/Start';
import Chat from './components/Chat';

const Tab = createBottomTabNavigator();

export default class App extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator initialRouteName="Start">
                    <Tab.Screen
                        name="Start"
                        component={Start}/>
                    <Tab.Screen
                        name="Chat"
                        component={Chat}/>
                </Tab.Navigator>
            </NavigationContainer>
        );
    }

}
