import React, { Component } from "react";
import { StyleSheet, View, Text, Button, Switch } from "react-native";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";
const totalDay = ['월', '화', '수', '목', '금', '토', '일'];

class ListItem extends Component {
    toggle = (newValue) => {
        this.props.changeSwitch(this.props.listKey, newValue);
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={[fonts.normal, styles.ampm]}>{this.props.ampm}</Text>
                <Text style={[fonts.big, styles.time]}>{this.props.hour}:{this.props.second}</Text>
                <View style={[fonts.normal, styles.days]}>{
                    totalDay.map((day, idx) => <Text key={idx} style={[styles.day, this.props.day.indexOf(day) !== -1 && styles.activeDay]}>{day}</Text>)
                }</View>
                <Switch value={this.props.toggle} thumbColor={this.props.toggle ? colors.dark : '#f3f3f3'}
                        onValueChange={this.toggle}
                        trackColor={{true: colors.base, false: '#e1e1e1'}}
                ></Switch>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    ampm: {
        flex: .5,
    },
    time: {
        flex: 1,
    },
    days: {
        flexDirection: 'row',
        flex: 2,
    },
    day: {
        flex: 1,
        textAlign: 'center',
    },
    activeDay: {
        color: colors.darker,
    },
    toggle: {
        backgroundColor: colors.darker,
    }
});

export default ListItem;
