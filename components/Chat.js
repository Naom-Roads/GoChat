import React from 'react';
import {View, Platform, KeyboardAvoidingView} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import * as firebase from 'firebase';
import 'firebase/firestore';

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
        super();
        this.state = {
            messages: [],
            uid: 0,
            user: {
                _id: "",
                name: "",
                avatar: "",
            },
            isConnected: false,
            image: null,
            location: null,
            loggedInText: "Please wait, you will be logged in shortly",
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

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
            });
        });
        this.setState({
            message: messages,
        })
    };

    componentDidMount() {
        this.referenceChatMessages = firebase.firestore().collection("messages");
        let {name} = this.props.route.params;
        this.props.navigation.setOptions({title: name})

        // Allows user to sign in anonymously
        this.authUnsubscribe = firebase
            .auth()
            .onAuthStateChanged(async user => {
                if (!user) {
                    try {
                        await firebase.auth().signInAnonymously();

                    } catch (e) {
                        console.log(e);
                    }
                }
                this.setState({
                    uid: user.uid,
                    messages: [
                        {
                            id: 1,
                            text: 'Hello dev',
                            createdAt: new Date(),
                            user: {
                                _id: 2,
                                name: name,
                                avatar: "https://placeimg.com/140/140/any",
                            },
                        },
                        // text: `${name} has entered the chat`,
                        {
                            _id: user.uid,
                            text: "This is a system message",
                            name: data.name,
                            createdAt: new Date(),
                            system: true,
                        },
                    ]
                });
            },

        this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate))
    }

    componentWillUnmount() {
        // stops listening for authentication
        this.authUnsubscribe();
        // stops listening for changes
        this.unsubscribe();
    }

    addMessage() {
        const message = this.state.messages[0];
        this.referenceChatMessages.add({
            text: message.text || '',
            user: this.state.user,
            createdAt: message.createdAt,
        }).catch(e => console.error(e));
    }

    onSend(messages = []) {
        this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, messages),
            }),
            () => {
                this.addMessage();
            }
        );
    }

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
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: this.state.user._id,
                            name: this.state.user.name,
                            avatar: this.state.user.avatar,
                        }}
                    />
                    {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height"/> : null}
                </View>
            </View>
        );
    }
}

