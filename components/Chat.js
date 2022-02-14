import React                                                                           from 'react';
import { View, Button, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble }                                                          from 'react-native-gifted-chat';
import ViewabilityHelper
                                                                                       from 'react-native-web/dist/vendor/react-native/ViewabilityHelper';


export default class Chat extends React.Component {
	constructor(props) {
		super();
		this.state = {
			messages: []
		};
	};

	componentDidMount() {
		this.setState({
			messages: [
				{
					id: 1,
					text: 'Hello Developer',
					createdAt: new Date(),
					user: {
						_id: 2,
						name: 'React Native',
						avatar: 'https://placeimg.com/140/140'
					},
				},
				{
					_id: 2,
					text: "This is a system message",
					createdAt: new Date(),
					system: true,
				},
			]
		});
	}


	onSend(messages = []) {
		this.setState(previousState => ({
			messages: GiftedChat.append(previousState.messages, messages)
		}));
	}

	renderBubble(props) {
		return (
			<Bubble
				{...props}
				wrapperStyle={{
					right: {
						backgroundColor: '#000'
					}
				}}
			/>
		);
	}


	render() {
		// Sets Name Entered in Start Screen
		let name = this.props.route.params.name;
		this.props.navigation.setOptions = function (param) {
			this.props.navigation.setOptions({title: name});
		};
		// sets color selected in start screen
		let bgColor = this.props.route.params.color;
		this.props.navigation.setOptions = function (param) {
			this.props.navigation.setOptions({bgColor: color});
		};


		return (
			<View title={name}
			      style={{flex: 1,}}>
				<View style={{flex: 1}}>
					<GiftedChat
						renderBubble={this.renderBubble.bind(this)}
						messages={this.state.messages}
						onSend={messages => this.onSend(messages)}
						user={{
							_id: 1
						}}
					/>
					{Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height"/> : null}
				</View>

				<View style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: bgColor ? bgColor : '#FFFFFF'}}>
						<Button
							title={name}
							onPress={() => this.props.navigation.navigate('Start')}/>
					</View>
			</View>
		);
	}
}

