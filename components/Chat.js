import React                       from 'react';
import { View, Button, Text }      from 'react-native';
import { getBackgroundLightColor } from 'react-native/Libraries/LogBox/UI/LogBoxStyle';

export default class Chat extends React.Component {
	constructor(props){
		super();
		this.state = {
			name: '',
			bgColor: '',
		}
	};
	render() {
		// sets color selected in start screen
		let bgColor  = this.props.route.params.color;
		this.props.navigation.setOptions = function (param) {
			this.props.navigation.setOptions({ bgColor: color});
		}

		// Sets Name Entered in Start Screen
		let name = this.props.route.params.name;
		this.props.navigation.setOptions = function (param) {
			
		};
		this.props.navigation.setOptions({ title: name });


		return (
			<View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: bgColor ? bgColor: "#FFFFFF"}}>

				<Button
				title={name}
				onPress={() => this.props.navigation.navigate("Start")} />
			</View>
		)
	}
}
