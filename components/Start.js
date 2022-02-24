import React from 'react';
import {
    View,
    Text,
    TextInput,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Pressable
} from 'react-native';
import SVGUserIcon from '../assets/usericon.svg';


export default class Start extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            bgColor: '',
        };
    }

    changeColor = (color) => {
        this.setState({bgColor: color});
    };

    changeName = (name) => {
        this.setState({name: name});
    };

    navigateToChat = () => {
        this.props.navigation.navigate('Chat', {
            name: this.state.name,
            color: this.state.bgColor
        });
    }

    // Color Choices
    color = {
        black: "#090C08",
        mauvePurple: "#474056",
        paleBlue: "#8A95A5",
        pastelGreen: "#B9C6AE",
    }

    render() {


        // Return of Components Starts Here

        return (
            <View style={styles.container}>
                <ImageBackground resizeMode="cover" style={styles.image}
                                 source={require('../assets/Background-Image.png')}>

                    {/*All elements contained in entire screen, except background image*/}

                    {/*Title of app at center of main page*/}
                    <View styles={styles.titleBox}
                          accessible={false}
                          accessibilityLabel="GoChat"
                          accessibilityHint="Title of App"
                          accessibilityRole="header">
                        <Text style={styles.title}>GoChat</Text>
                    </View>

                    {/* All items contained in white box*/}
                    <View style={styles.optionsContainer}
                          accessible={true}
                          accessibilityLabel="container"
                          accessibilityHint="Application Options"
                          accessibilityRole="menu">

                        {/*Input box for name*/}
                        <View style={styles.inputBox}>
                            <View style={styles.inputText}>
                                <SVGUserIcon style={styles.iconImg}/>
                                <TextInput
                                    accessible={true}
                                    accessibilityLabel="input field for name with user icon"
                                    accessibilityHint="Type your name"
                                    accessibilityRole="none"
                                    onChangeText={this.changeName}
                                    value={this.state.name}
                                    placeholder="Your Name"/>
                            </View>
                        </View>

                        {/*Module to Pick Color*/}
                        <View styles={styles.colorPicker}>

                            <Text style={styles.colorTitle}>Choose Background Color</Text>

                            {/*container for individual color options*/}
                            <View style={styles.colorOptions}>

                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Black as background"
                                    accessibilityHint="Press on to set background color to black"
                                    accessibilityRole="combobox"
                                    onPress={() => {
                                        this.changeColor(this.color.black)
                                    }}
                                >
                                    <View style={styles.circle1}>
                                    </View>
                                </TouchableOpacity>


                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Mauve Purple as background"
                                    accessibilityHint="Press on to set background color to mauve purple"
                                    accessibilityRole="combobox"
                                    onPress={() => {
                                        this.changeColor(this.color.mauvePurple)
                                    }}
                                >
                                    <View style={styles.circle2}>
                                    </View>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Grayish Blue as background"
                                    accessibilityHint="Press on to set background color to grayish blue"
                                    accessibilityRole="combobox"
                                    onPress={() => {
                                        this.changeColor(this.color.paleBlue)
                                    }}
                                >
                                    <View style={styles.circle3}>
                                    </View>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    accessible={true}
                                    accessibilityLabel="Pastel Green as background"
                                    accessibilityHint="Press on to set background color to pastel green"
                                    accessibilityRole="combobox"
                                    onPress={() => {
                                        this.changeColor(this.color.pastelGreen)
                                    }}
                                >
                                    <View style={styles.circle4}>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>

                        {/*Module to Submit Name and color*/}

                        <Pressable style={styles.button}
                                   onPress={this.navigateToChat}
                        >
                            <Text style={styles.buttonText}>Start Chatting</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        );

    }
}

// CSS Styles for Main Page
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    titleBox: {
        flex: 1,
        width: '60%',
        height: 'auto',
        alignItems: 'center',
        resizeMode: 'contain' // sets the image uniformly and sets aspect ratio
    },

    title: {
        color: '#FFFFFF',
        fontSize: 50,
        fontWeight: '600',
    },

    image: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignItems: "center"
    },

    text: {
        color: "black"
    },

    button: {
        backgroundColor: '#757083',
        width: '88%',
        height: 40,
        marginBottom: 20,
        marginTop: 5,
    },

    buttonText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
        color: 'white',
        padding: 10,
    },

    optionsContainer: {
        height: '44%',
        width: '88%',
        marginBottom: 30,
        backgroundColor: '#FFFFFF',
        flexGrow: 1,
        flexShrink: 0,
        justifyContent: 'space-evenly',
        flexDirection: "column",
        alignItems: "center",
        minHeight: 260,
        maxHeight: 300,
        padding: 10,
        paddingBottom: 30,
        paddingTop: 30,
    },

    inputBox: {
        marginTop: 25,
        paddingTop: 10,
        marginBottom: 25,
        width: '88%',
        height: 40,
    },

    inputText: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderColor: "gray",
        padding: 10,
        paddingRight: 80,
        borderWidth: 1,
        fontWeight: '300',
        color: '#757083',
        opacity: .5,
        fontSize: 16,
    },

    iconImg: {
        width: 15,
        height: "auto",
        marginRight: 10,
    },

    colorTitle: {
        textAlign: "center",
        paddingTop: 40,
        fontSize: 15,
        fontWeight: '300',
        color: '#736357',
        opacity: 1,
        marginBottom: 10,
        marginTop: 10,
    },

    colorPicker: {
        flex: 1,
        width: '88%',

    },

    colorOptions: {
        flex: 1,
        flexDirection: 'row',


    },

    circle1: {
        backgroundColor: '#090C08',
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5,
    },

    circle2: {
        backgroundColor: '#474056',
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5,
    },

    circle3: {
        backgroundColor: '#8A95A5',
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5,
    },

    circle4: {
        backgroundColor: '#B9C6AE',
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 5,
    }
});
