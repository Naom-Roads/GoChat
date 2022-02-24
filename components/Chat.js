import React from 'react';
import 'react-native-gesture-handler';
import {View, Platform, KeyboardAvoidingView} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';
import {ActivityIndicator} from "react-native-web";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebase = require('firebase'); //Connects to firebase
require('firebase/firestore');

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVQYwqs8YVT9ocCmWasCbGitnGyA-kzRc",
    authDomain: "gochat-41237.firebaseapp.com",
    projectId: "gochat-41237",
    storageBucket: "gochat-41237.appspot.com",
    messagingSenderId: "83562723847",
    appId: "1:83562723847:web:70471cceecf4bce95f48a2",
    measurementId: "G-H2SGRF1JL4",
};

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            uid: 0,
            loggedInText: "Logging in...",
            user: {
                _id: "",
                name: "",
                avatar: "",
            },
            isConnected: false,
            image: null,
            location: null,
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
// reference to the Firestore messages collection
        this.referenceChatMessages = firebase.firestore().collection("messages");
    };

    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch (e) {
            console.log(e.message);
        }
    };

    componentDidMount() {
        // Sets page title
        let {name} = this.props.route.params;
        //Adds name to top of screen
        this.props.navigation.setOptions({ title: name })
        // Looks at user's connection Status
        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                this.setState({isConnected: true});
                console.log('online');
                // Listens for updates in collection
                // Allows user to sign in anonymously
                this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
                    if (!user) {
                        await firebase.auth().signInAnonymously();
                    }
                    this.unsubscribe = this.referenceChatMessages
                        .orderBy("createdAt", "desc")
                        .onSnapshot(this.onCollectionUpdate);

                    // Updates user state with current user
                    this.setState({
                        uid: user.uid,
                        messages: [],
                        user: {
                            _id: user.uid,
                            name: name,
                            avatar: "https://placeimg.com/140/140/any",
                        },
                        isConnected: true,
                    });
                });
                this.saveMessages();
            } else {
                this.setState({isConnected: false});
                console.log('offline');
                // Retrieves messages from AsyncStorage
                this.getMessages();
            }
        });
    }

    componentWillUnmount() {
        if (this.state.isConnected) {
            // stops listening for authentication
            this.authUnsubscribe();
            // stops listening for changes
            this.unsubscribe();
        }
    }


    addMessages() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            _id: message._id,
            text: message.text || "",
            createdAt: message.createdAt,
            user: this.state.user,
            image: message.image || "",
            location: message.location || null,
        });
    }

    async saveMessages() {
        try {
            await AsyncStorage.setItem("messages", JSON.stringify(this.state.messages)
            );
        } catch (e) {
            console.log(e.message);
        }
    };


    onSend(messages = []) {
        this.setState((previousState) => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }),
            () => {
                this.addMessages();
                this.saveMessages();
            }
        );
    }


    onCollectionUpdate = (querySnapShot) => {
        const messages = [];
        // go through each doc
        querySnapShot.forEach((doc) => {
            // get the query DocSnapShot data
            let data = doc.data();
            messages.push({
                _id: data._id,
                text: data.text,
                createdAt: data.createdAt.toDate(),
                user: {
                    _id: data._id,
                    name: data.user.name,
                    avatar: data.user.avatar,
                },
                image: data.image || null,
                location: data.location || null,
            });
        });
        this.setState({
            message: messages,
        });
        this.saveMessages();
    };

    async deleteMessage() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch (e) {
            console.log(e.message);
        }
    }

    renderCustomView(props) {
        const {currentMessage} = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{width: 150, height: 100, borderRadius: 13, margin: 3}}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            );
        }
        return null;
    }

    renderCustomActions = (props) => {
        return <CustomActions {...props} />
    };

    renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#000'
                    },
                    left: {
                        backgroundColor: 'lightblue'
                    }
                }}
            />
        );
    }


    render() {
        // Sets Name Entered in Start Screen
        let name = this.props.route.params.name;
        // sets color selected in start screen
        let bgColor = this.props.route.params.color;


        return (
            <View title={name}
                  style={{backgroundColor: bgColor ? bgColor : '#FFFFFF', flex: 1,}}>
                <View style={{flex: 1}}>
                    <GiftedChat
                        renderBubble={this.renderBubble.bind(this)}
                        messages={this.state.messages}
                        renderActions={this.renderCustomActions}
                        isConnected={this.state.isConnected}
                        renderCustomView={this.renderCustomView}
                        onSend={(messages) => this.onSend(messages)}
                        user={{
                            _id: this.state.user._id,
                            name: this.state.name,
                            avatar: this.state.user.avatar
                        }}
                    />
                    {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height"/> : null}
                </View>
            </View>
        );
    }
}

