import React,  { Component }             from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer}               from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Imports Screens
import Start                    from './components/Start';
import Chat                     from './components/Chat';
const Tab = createBottomTabNavigator();

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { text:'' };
	}

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
