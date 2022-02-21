//This handles the custom actions available when selecting the + button to the left of the chat
// It handles the actions, take photo, pick photo, share location, and record audio
import PropTypes from "prop-types";
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// Requires firebase
import firebase from 'firebase';
import firestore from 'firebase';

// Imports for Permissions and imagePicker
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default class CustomActions extends React.Component {
// Allows user to select an image from their existing photos
    imagePicker = async () => {
        // CAMERA_ROLL is being deprecated, the correct const is MEDIA_LIBRARY
        const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
        try {
            if (status === 'granted') {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images, // will only allow images
                }).catch(error => console.log(error));

                if (!result.cancelled) {
                    const imageUrl = await this.uploadImageFetch(result.uri);
                    this.props.onSend({image: imageUrl});
                }
            }
            } catch (e) {
                console.log(e.message);
                    }
                };

// Allows a user to take and send a photo with their mobile device camera
    takePhoto = async () => {
        const { status } = await Permissions.askAsync(
            Permissions.CAMERA,
            Permissions.MEDIA_LIBRARY
        );
        try {
            if (status === 'granted') {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                }).catch((error) => console.log(error));

                if (!result.cancelled) {
                    const imageUrl = await this.uploadImageFetch(result.uri);
                    this.props.onSend({ image: imageUrl});
                }
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    // Allows user to share location to another user
    getLocation = async() => {
        try {
            // LOCATION has been deprecated, LOCATION FOREGROUND appears to be the most versatile and consistent option for both ios and Android
            // LOCATION_FOREGROUND will only access location when app is in use
            const { status } = await Permissions.askAsync(Permissions.LOCATION_FOREGROUND);
            if ( status === 'granted') {
                const result = await Location.getCurrentPositionAsync({}
                ).catch((error) => console.log(error));
                const longitude = JSON.stringify(result.coords.longitude);
                const altitude = JSON.stringify(result.coords.latitude);
                if (result) {
                    this.props.onSend({
                        location: {
                            longitude: result.coords.longitude,
                            latitude: result.coords.latitude,
                        },
                    });
                }
            }
            } catch (e) {
                console.log(e.message);
            }
        };

// Converts image to binary large object aka "Blob" and uploads images to firebase
    uploadImageFetch = async(uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                console.log(e);
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
        const imageNameBefore = uri.split("/");
        const imageName = imageNameBefore[imageNameBefore.length - 1];

        const ref = firebase.storage().ref().child(`images/${imageName}`
        );
        const snapshot = await ref.put(blob);
        blob.close();
        return await snapshot.ref.getDownloadURL();
    };

    onActionPress = () => {
        const options = ['Choose From Library', 'Take Picture', 'Send Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;
        this.context.actionSheet().showActionSheetWithOptions({
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        console.log('User wants to pick an image');
                        return;
                    case 1:
                        console.log('User wants to take a photo');
                        return;
                    case 2:
                        console.log('User wants to get their location');
                    default:
                }
            },
        );
    };

    render() {
        return (
            <TouchableOpacity
                accesible={true}
                accessibilityLabel="More Options"
                accessibilityHint= "Let's you choose to send an image or your geolocation"
                style={[styles.container]}
                onPress={this.onActionPress}
            >
                <View style={[styles.wrapper, this.props.wrapperStyle]}>
                    <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: 'transparent',
        textAlign: 'center',
    }
});

CustomActions.contextTypes = {
    actionSheet: PropTypes.func,
};