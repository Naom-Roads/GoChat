import React from 'react';
import {View, Button, Platform, KeyboardAvoidingView} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import firebase from "firebase";
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

        this.referenceChatMessages = firebase.firestore().collection("messages");
        this.refMsgsUser = null;

    componentDidMount()
        {
            let {name} = this.props.route.params.name;
            this.props.navigation.setOptions({title: name})
        }
            // Allows user to sign in anonymously
        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
            this.setState({
                uid: user.uid,
                messages: [],
                text: `${name} has entered the chat"`,
                    user: {
                        _id: user.uid,
                        name: data.name,
                        avatar: "https://placeimg.com/140/140/any",
                    },
                    createdAt: new Date(),
                    system: true,
                  },
                ],
            });
            this.unsubscribe = this.referencesMessages
                .orderBy("createdAt", "desc")
                .onSnapshot(this.onCollectionUpdate);
        });
    }


    addMessage() {
     this.referencesMessages.add({
         _id: data._id,
         user: data.name,
         text: data.text,
         createdAt: data.createdAt.toDate(),
     })
    }


    componentWillUnmount() {
        this.unsubscribe();
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
                user: data.name,
            });
        });
    };

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
                            _id: 1
                        }}
                    />
                    {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height"/> : null}
                </View>
            </View>
        );
    }
}

