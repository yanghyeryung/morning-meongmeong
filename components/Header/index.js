import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

import colors from "../../styles/colors";

class Header extends Component {
    render() {
        return (
            <View style={styles.header}>
                <Image source={require("../../assets/icon.png")} style={styles.logo} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.base,
    },
    logo: {
        height: 65,
        width: 65,
    },
});

export default Header;
