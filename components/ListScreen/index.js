import React, { Component } from "react";
import { StyleSheet, View, TouchableHighlight, FlatList } from "react-native";
import { Icon } from "react-native-elements";

import colors from "../../styles/colors";
import utils from "../../utils";

import ListItem from "./ListItem";

utils.setList([
    {
        key: '1',
        ampm: 'AM',
        hour: 7,
        second: 40,
        day: ['월', '화', '수', '목', '금', '토', '일'],
        toggle: true,
    },
    {
        key: '2',
        ampm: 'AM',
        hour: 11,
        second: 41,
        day: ['월', '화', '수', '목'],
        toggle: false,
    }
]);

class ListScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
            pressing: false
        };

        this.getTotalData();
    }

    getTotalData = () => {
        utils.getList()
            .then(value => {
                value && this.setState({ dataList: JSON.parse(value) });
            })
            .catch(error => console.error('AsyncStorage error: ' + error.message))
            .done();
    };

    getData = (key) => {
        let returnData;

        this.state.dataList.map(data => {
            if(data.key === key) {
                returnData = data;
            }
        });

        return returnData;
    };

    setData = (key, obj) => {
        let dataList = JSON.parse(JSON.stringify(this.state.dataList));

        dataList.map(data => {
            if(data.key === key) {
                Object.assign(data, obj);
            }
        });

        this.setState({ dataList: dataList });
        utils.setList(JSON.stringify(dataList));
    };

    delData = (key) => {
        let dataList = JSON.parse(JSON.stringify(this.state.dataList));
        let delIdx;

        dataList.map((data, idx) => {
            if(data.key === key) {
                delIdx = idx;
            }
        });

        dataList.splice(delIdx, 1);

        this.setState({ dataList: dataList });
        utils.setList(JSON.stringify(dataList));
    };

    changeSwitch = (key, toggle) => {
        this.setData(key, { toggle: toggle });
    };

    renderItem = ({ item }) => {
        return (
            <ListItem listKey={item.key} ampm={item.ampm} hour={item.hour} second={item.second}
                      day={item.day} toggle={item.toggle} changeSwitch={this.changeSwitch}
                      moveEdit={this.moveEdit} delData={this.delData}></ListItem>
        );
    };

    onPressIn = () => {
        this.props.navigation.navigate('Edit');
        this.setState({ pressing: true });
    };

    onPressOut = () => {
        this.setState({ pressing: false });
    };

    moveEdit = (data) => {
        this.props.navigation.navigate('Edit', data);
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.dataList} renderItem={this.renderItem}/>
                <TouchableHighlight underlayColor='transparent' style={styles.button}
                                    onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
                    <Icon name='plus-circle' type='font-awesome'
                          color={this.state.pressing ? colors.darker : colors.dark} size={50}></Icon>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 50,
        width: 50,
    }
});

export default ListScreen;
