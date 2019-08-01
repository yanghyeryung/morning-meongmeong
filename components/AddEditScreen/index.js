import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

class AddEditScreen extends Component {
    render() {
        const { navigation } = this.props;
        const ampm = navigation.getParam('ampm');

        return (
            <View>
                <Text>{ampm}</Text>
            </View>
        );
    }
}

export default AddEditScreen;
