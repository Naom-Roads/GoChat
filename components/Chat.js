import React from 'react';
import {View, Platform, KeyboardAvoidingView} from 'react-native';
import {GiftedChat, Bubble, Actions} from 'react-native-gifted-chat';
import * as firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from '@react-native-community/netinfo';
import CustomActions from '/components/CustomActions';

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
            loggedInText: "Please wait, you will be logged in shortly",
        };

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
// reference to the Firestore messages collection
        this.referenceChatMessages = firebase.firestore().collection('messages');
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

    async getMessages() {
        let messages = '';
        try {
            messages = await AsyncStorage.getItem('messages') || [];
            this.setState({
                messages: JSON.parse(messages)
            });
        } catch(e) {
            console.log(e.message);
        }
    };

    async saveMessages() {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
        } catch(e) {
            console.log(e.message);
        }
    }

    async deleteMessage() {
        try {
            await AsyncStorage.removeItem('messages');
            this.setState({
                messages: []
            })
        } catch(e) {
            console.log(e.message);
        }
    }

    async componentDidMount() {
        NetInfo.fetch().then(connection => {
            if (connection.isConnected) {
                console.log('online');
            } else {
                console.log('offline');
            }
        });

       await this.getMessages();
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
                    messages: [],
                            user: {
                                _id: user.uid,
                                name: name,
                                avatar: "https://placeimg.com/140/140/any",
                        },
                });

                    // References message of current user
                    // this.referenceChatMessages = await firebase
                    //     .firestore()
                    //     .collection("messages")
                    //     .where('uid', '==', this.state.uid);

            },

        this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate))
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
                this.saveMessages();
                this.addMessage();

            }
        );
    }

    componentWillUnmount() {
        // stops listening for authentication
        this.authUnsubscribe();
        // stops listening for changes
        this.unsubscribe();
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

    renderCustomActions = (props) => {
        return <CustomActions {...props} />
    };


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
                        renderActions={this.renderCustomActions}
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

