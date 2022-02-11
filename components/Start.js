import React                  from 'react';
import { View, Text, Button, Pressable, TextInput, ImageBackground, StyleSheet } from 'react-native';


export default class Start extends React.Component {
	constructor(props) {
		super(props);
		this.state = { name: ''};
	}

	render() {

		const styles = StyleSheet.create({
			container: {
				height: '44%',
				width: '88%',
				justifyContent: 'space-evenly',
				alignItems: 'center',
				backgroundColor: '#FFFFFF',
				margin: 20,
			},
			image: {
				flex: 1,
				justifyContent: "center"
			},
			text: {
				color: "white"
			},

			button: {
				position: 'relative',
				backgroundColor: '#757083',
				width: '88%'
			},

			buttonText: {
				fontSize: 16,
				textAlign: 'center',
				fontWeight: '600',
				color: 'white',
				padding: 10
			},

			inputBox: {
				height: 40,
				width: '88%',
				borderColor: "gray",
				borderWidth: 1,
				margin: 10,
				fontWeight: '300',
				color: '#757083',
				opacity: .5,
				fontSize: 16

			},

		});

		return (

				<ImageBackground resizeMode="cover" style={styles.image}
				                 source={require('../assets/Background-Image.png')} >
					<View style={styles.container}>
				<Text style={styles.text}>Hello this is the Start Screen</Text>
				<TextInput style={styles.inputBox}
				onChangeText={(name) => this.setState({name})}
					value={this.state.name}>Your Name
				</TextInput>
				<Pressable style={styles.button}
				           onPress={() => this.props.navigation.navigate('Chat', {name: this.state.name})} >
					<Text style={styles.buttonText}>Start Chatting</Text>
				</Pressable>
					</View>
				</ImageBackground>

		);

	}
}
