import React                  from 'react';
import { View, Button } from 'react-native';


export default class Chat extends React.Component {
	render() {
		let name = this.props.route.params.name;
		this.props.navigation.setOptions = function (param) {
			
		};
		this.props.navigation.setOptions({ title: name});

		return (
			<View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
				<Button
				title="Go to Start"
				onPress={() => this.props.navigation.navigate("Start")} />
			</View>
		)
	}
}
