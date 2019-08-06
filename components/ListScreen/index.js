import React, { Component } from "react";
import { StyleSheet, View, TouchableHighlight, FlatList } from "react-native";
import { Icon } from "react-native-elements";

import colors from "../../styles/colors";
import utils from "../../utils";

import ListItem from "./ListItem";

class ListScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
            pressing: false
        };

        this.getList();
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.getList();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    getList = () => {
        utils.getList()
            .then(value => {
                this.setState({ dataList: value ? value : [] });
            })
            .catch(error => console.error('AsyncStorage error: ' + error.message))
            .done();
    };

    editData = (key, obj) => {
        let dataList = JSON.parse(JSON.stringify(this.state.dataList));

        dataList.map(data => {
            if(data.key === key) {
                Object.assign(data, obj);
            }
        });

        this.setState({ dataList: dataList });
        utils.setList(dataList);
    };

    deleteData = (key) => {
        let dataList = JSON.parse(JSON.stringify(this.state.dataList));
        let delIdx;

        dataList.map((data, idx) => {
            if(data.key === key) {
                delIdx = idx;
            }
        });

        dataList.splice(delIdx, 1);

        dataList.map((data, idx) => {
            data.key = idx+'';
        });

        this.setState({ dataList: dataList });
        utils.setList(dataList);
    };

    changeSwitch = (key, toggle) => {
        this.editData(key, { toggle: toggle });
    };

    renderItem = ({ item }) => {
        return (
            <ListItem listKey={item.key} ampm={item.ampm} hour={item.hour} second={item.second} toggle={item.toggle}
                      days={item.days} dogCounts={item.dogCounts} dogSpeeds={item.dogSpeeds}
                      changeSwitch={this.changeSwitch} moveEditScreen={this.moveEditScreen} deleteData={this.deleteData}></ListItem>
        );
    };

    onPressIn = () => {
        this.moveEditScreen();
        this.setState({ pressing: true });
    };

    onPressOut = () => {
        this.setState({ pressing: false });
    };

    moveEditScreen = (data) => {
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
