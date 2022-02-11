import React                                                                     from 'react';
import {
	View,
	Text,
	TextInput,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	Pressable
}                           from 'react-native';
import SVGUserIcon          from '../assets/usericon.svg';


export default class Start extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			bgColor: '',
		};
	}

	changeColor = (color) => {
		this.setState({ bgColor: color});
	};

	// Color Choices
	color = {
		black: "#090C08",
		mauvePurple: "#474056",
		paleBlue: "#8A95A5",
		pastelGreen: "#B9C6AE",
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

			titleBox: {
                height: '20%',
				width: '88%',
				alignItems: 'center',
			},

			title: {
				color: '#FFFFFF',
				fontSize: 45,
				fontWeight: '600',
			},

			image: {
				flex: 1,
				justifyContent: "center"
			},

			text: {
				color: "black"
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
				flexDirection: "row",
				alignItems: "center",
				height: 50,
				width: '88%',
				borderColor: "gray",
				borderWidth: 1,
				margin: 10,
				paddingLeft: 8,
				fontWeight: '300',
				color: '#757083',
				opacity: .5,
				fontSize: 16,
				backgroundColor: '#FFFFFF',

			},

			iconImg: {
				width: 15,
				height: "auto",
				marginRight: 10,
			},

			colorPicker: {
					height: 50,
					width: '80%',
					flexDirection: 'row',
					justifyContent: 'space-between',

				},

			colorSelect: {
				alignSelf: 'center',
				borderRadius: 40,
				borderWidth: 2,
				borderColor: 'white'
			},

				circle1: {
					backgroundColor: '#090C08',
					width: 50,
					height: 50,
					borderRadius: 25

				},

				circle2: {
					backgroundColor: '#474056',
					width: 50,
					height: 50,
					borderRadius: 25
				},

				circle3: {
					backgroundColor: '#8A95A5',
					width: 50,
					height: 50,
					borderRadius: 25
				},

				circle4: {
					backgroundColor: '#B9C6AE',
					width: 50,
					height: 50,
					borderRadius: 25
				}
		});

		return (

				<ImageBackground resizeMode="cover" style={styles.image}
				                 source={require('../assets/Background-Image.png')} >
					<View
						accessible={false}
					    accesibilityLabel="GoChat"
						accesibilityHint="Title of App"
						accesibilityRole="header"
						style={styles.titleBox}>
						<Text style={styles.title}>GoChat</Text>

					</View>
					<View
						accessible={false}
						accesibilityLabel="container"
						accesibilityHint="Application Options"
						accesibilityRole="main view"
						style={styles.container}>
				<View
					accessible={true}
					accesibilityLabel="input field for name with usericon"
					accesibilityHint="Type name"
					accesibilityRole="input field"
					style={styles.inputBox}>
					<SVGUserIcon style={styles.iconImg}/>
						<TextInput
				onChangeText={(name) => this.setState({name})}
					value={this.state.name}
						placeholder={"Your Name"} >
				</TextInput>
				</View>

						<View style={styles.colorPicker}>
							<TouchableOpacity
								accessible={true}
								accesibilityLabel="Black as background"
								accesibilityHint="Press on to set background color to black"
								accesibilityRole="combobox"
							onPress={()=> { this.changeColor(this.color.black)}}
							style={styles.colorSelect}>
								<View style={styles.circle1}>
								</View>
							</TouchableOpacity>


							<TouchableOpacity
								accessible={true}
								accesibilityLabel="Mauve Purple as background"
								accesibilityHint="Press on to set background color to mauve purple"
								accesibilityRole="combobox"
								onPress={()=> { this.changeColor(this.color.mauvePurple)}}
								style={styles.colorSelect}>
								<View style={styles.circle2}>

								</View>
							</TouchableOpacity>

							<TouchableOpacity
								accessible={true}
								accesibilityLabel="Grayish Blue as background"
								accesibilityHint="Press on to set background color to grayish blue"
								accesibilityRole="combobox"
								onPress={()=> { this.changeColor(this.color.paleBlue)}}
								style={styles.colorSelect}>
								<View style={styles.circle3}></View></TouchableOpacity>

							<TouchableOpacity
								accessible={true}
								accesibilityLabel="Pastel Green as background"
								accesibilityHint="Press on to set background color to pastel green"
								accesibilityRole="combobox"
								onPress={()=> { this.changeColor(this.color.pastelGreen)}}
								style={styles.colorSelect}>
								<View style={styles.circle4}>
								</View>
								</TouchableOpacity>
						</View>


				<Pressable style={styles.button}
				           onPress={() => this.props.navigation.navigate('Chat', {
							   name: this.state.name,
					           color: this.state.bgColor
						   })}
				>
					<Text style={styles.buttonText}>Start Chatting</Text>
				</Pressable>
					</View>
				</ImageBackground>

		);

	}
}
