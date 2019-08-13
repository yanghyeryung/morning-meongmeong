import React, { Component } from "react";
import { StyleSheet, View, Text, Switch, TouchableOpacity, Image } from "react-native";

import fonts from "../../styles/fonts";
import colors from "../../styles/colors";

const totalDays = [
    {label: '월', key: 'mon'},
    {label: '화', key: 'tue'},
    {label: '수', key: 'wen'},
    {label: '목', key: 'thu'},
    {label: '금', key: 'fri'},
    {label: '토', key: 'sat'},
    {label: '일', key: 'sun'}];

class ListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };
    }

    toggle = (newValue) => {
        this.props.changeSwitch(this.props.listKey, newValue);
    };

    onPress = () => {
        if(this.state.editing) {
            this.setState({ editing: false });
        }else{
            this.props.moveEditScreen(this.props);
        }
    };

    showDeleteButton = () => {
        this.setState({ editing: true });
    };

    deleteData = () => {
        this.props.deleteData(this.props.listKey);
        this.setState({ editing: false });
    };

    render() {
        return (
            <TouchableOpacity onPress={this.onPress} onLongPress={this.showDeleteButton}>
                <View style={styles.container}>
                    {
                        this.state.editing &&  <View style={styles.overlay}>
                            <TouchableOpacity onPress={this.deleteData}>
                                <Image name='rocket' source={require("../../assets/delete.png")} style={styles.img}></Image>
                            </TouchableOpacity>
                        </View>
                    }
                    <Text style={[fonts.normal, styles.ampm]}>{this.props.ampm}</Text>
                    <Text style={[fonts.big, styles.time]}>{this.props.hour}:{this.props.second}</Text>
                    <View style={[fonts.normal, styles.days]}>{
                        totalDays.map((day, idx) => <Text key={idx} style={[styles.day, this.props.days[day.key] && styles.activeDay]}>{day.label}</Text>)
                    }</View>
                    <Switch value={this.props.toggle} thumbColor={this.props.toggle ? colors.darker : '#f3f3f3'}
                            onValueChange={this.toggle} trackColor={{true: colors.base, false: '#e1e1e1'}}></Switch>
                </View>
            </TouchableOpacity>
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
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        color: colors.font,
    },
    activeDay: {
        color: colors.darker,
    },
    toggle: {
        shadowColor: 'transparent'
    },
    img: {
        height: 50,
        width: 50,
    }
});

export default ListItem;
