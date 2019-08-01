import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import fonts from "../../styles/fonts";
import colors from "../../styles/colors";

class AddEditScreen extends Component {
    render() {
        const { navigation } = this.props;
        const ampm = navigation.getParam('ampm');

        return (
            <View style={styles.container}>
                <Text style={[fonts.normal, styles.label]}>시간</Text>
                <View style={styles.value}></View>

                <Text style={[fonts.normal, styles.label]}>일</Text>
                <View style={styles.value}></View>

                <Text style={[fonts.normal, styles.label]}>멍멍이 수</Text>
                <View style={styles.value}></View>

                <Text style={[fonts.normal, styles.label]}>멍멍이 속도</Text>
                <View style={styles.value}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    label: {
        padding: 10,
        color: colors.font
    },
    value: {
        backgroundColor: '#aeaeae',
        padding: 10,
    }
});

export default AddEditScreen;
