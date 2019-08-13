import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, FlatList, Image } from "react-native";

import utils from "../../utils";

import ListItem from "./ListItem";

class ListScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataList: [],
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

    moveEditScreen = (data) => {
        this.props.navigation.navigate('Edit', data);
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList data={this.state.dataList} renderItem={this.renderItem}/>
                <TouchableOpacity style={styles.button} onPress={this.moveEditScreen}>
                    <Image name='rocket' source={require("../../assets/plus.png")} style={styles.img}></Image>
                </TouchableOpacity>
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
    },
    img: {
        height: 50,
        width: 50,
    }
});

export default ListScreen;
