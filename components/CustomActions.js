//This handles the custom actions available when selecting the + button to the left of the chat
// It handles the actions, take photo, pick photo, share location, and record audio
import PropTypes from "prop-types";
import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// Imports for Permissions and imagePicker
// import * as Permissions from 'expo-permissions'; Deprecated
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

// Requires firebase
import firebase from 'firebase';
import 'firebase/firestore';

export default class CustomActions extends React.Component {
// Allows user to select an image from their existing photos
    pickImage = async () => {
        // CAMERA_ROLL is being deprecated, the correct const is MEDIA_LIBRARY
        // Expo has moved towards module based permissions
        const status  = await ImagePicker.requestMediaLibraryPermissionsAsync();
        try {
            if (status.accessPrivileges !== 'none') {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images, // will only allow images
                }).catch((error) => {
                    console.error(error);
            });
                if (!result.cancelled) {
                    const imageUrl = await this.uploadImage(result.uri);
                    this.props.onSend({ image: imageUrl });
                }
            }
            } catch (e) {
                console.error(e.message);
                    }
                };

// Allows a user to take and send a photo with their mobile device camera
    takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        try {
            if (status === 'granted') {
                const result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                }).catch((error) => console.error(error));

                if (!result.cancelled) {
                    const imageUrl = await this.uploadImage(result.uri);
                    this.props.onSend({ image: imageUrl});
                }
            }
        } catch (e) {
            console.error(e.message);
        }
    };

    // Allows user to share location to another user
    getLocation = async() => {
            // LOCATION has been deprecated, LOCATION FOREGROUND appears to be the most versatile and consistent option for both ios and Android
            // LOCATION_FOREGROUND will only access location when app is in use
            const { status } = await Location.requestForegroundPermissionsAsync();
            try {
            if ( status === 'granted') {
                const result = await Location.getCurrentPositionAsync({}
                ).catch((error) => { console.error(error);
              }
            );
                console.log(result);
// Send latitude and longitude to find position on map
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
    uploadImage = async (uri) => {
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
                        return this.pickImage();
                    case 1:
                        console.log('User wants to take a photo');
                        return this.takePhoto();
                    case 2:
                        console.log('User wants to get their location');
                    return this.getLocation();
                }
            }
        );
    };

    render() {
        return (
            <TouchableOpacity
                accessible={true}
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