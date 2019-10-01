import React, { Component } from "react";
import { StyleSheet, View, Text, Picker, Button } from "react-native";
import ReactNativePickerModule from 'react-native-picker-module';

import utils from "../../utils";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";

class AddEditScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            key: null,
            ampm: 'AM',
            hour: '01',
            minute: '00',
            days: {
                mon: false, tue: false, wen: false, thu: false,
                fri: false, sat: false, sun: false,
            },
            dogCounts: {
                two: true, four: false, six: false, eight: false
            },
            dogSpeeds: {
                slow: true, normal: false, fast: false
            },
            toggle: true,
        };
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('willFocus', () => {
            const { navigation } = this.props;
            const key = navigation.getParam('listKey');

            if(key) {
                this.setState({
                    key: key,
                    ampm: navigation.getParam('ampm'),
                    hour: navigation.getParam('hour'),
                    minute: navigation.getParam('minute'),
                    days: navigation.getParam('days'),
                    dogCounts: navigation.getParam('dogCounts'),
                    dogSpeeds:navigation.getParam('dogSpeeds'),
                    toggle: navigation.getParam('toggle'),
                });
            }
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    changeDays = (day) => {
        let days = Object.assign({}, this.state.days);
        days[day] = !this.state.days[day];

        this.setState({days: days})
    };

    changeDogCounts = (dogCount) => {
        let dogCounts = {two: false, four: false, six: false, eight: false};
        dogCounts[dogCount] = true;

        this.setState({dogCounts: dogCounts})
    };

    changeSpeeds = (dogSpeed) => {
        let dogSpeeds = {slow: false, normal: false, fast: false};
        dogSpeeds[dogSpeed] = true;

        this.setState({dogSpeeds: dogSpeeds})
    };

    saveData = () => {
        utils.getList()
            .then(value => {
                let data = Object.assign({}, this.state);

                value = value ? value : [];

                if(this.state.key){
                    // edit
                    value.map((item) => {
                        if(item.key === data.key) {
                            Object.assign(item, data);
                        };
                    });
                }else{
                    // add
                    value.push(data);
                    value.map((item, idx) => {item.key = idx+'';});
                }

                utils.setList(value);

                this.props.navigation.navigate('List');
            })
            .catch(error => console.error('AsyncStorage error: ' + error.message))
            .done();
    };

    render() {
        let i, hourPickerItems = [], minutePickerItems = [];

        for(i=1; i<=12; i++){
            let str = i.toString();

            str.length === 1 && (str = '0' + str);
            hourPickerItems.push(str);
        }

        for(i=0; i<=59; i++){
            let str = i.toString();

            str.length === 1 && (str = '0' + str);
            minutePickerItems.push(str);
        }

        return (
            <View style={styles.container}>
                <View styles={styles.form}>
                    <Text style={[fonts.normal, styles.labelContainer]}>시간</Text>
                    <View style={styles.valueContainer}>
                        <View style={styles.value}>
                            <Button title={this.state.ampm} color={colors.base}
                                    onPress={() => this.amPickerRef.show()} style={styles.value}/>
                        </View>
                        <View style={styles.value}>
                            <Button title={this.state.hour} color={colors.base}
                                    onPress={() => this.hourPickerRef.show()} style={styles.value}/>
                        </View>
                        <View style={styles.value}>
                            <Button title={this.state.minute} color={colors.base}
                                    onPress={() => this.minutePickerRef.show()} style={styles.value}/>
                        </View>
                        <ReactNativePickerModule pickerRef={e => this.amPickerRef = e} value={this.state.ampmIdx} style={styles.value}
                             onValueChange={(itemValue, index) => this.setState({ampm: itemValue, ampmIdx: index})}
                             title='AM/PM' items={['AM', 'PM']}>
                        </ReactNativePickerModule>
                        <ReactNativePickerModule pickerRef={e => this.hourPickerRef = e} value={this.state.hourIdx} style={styles.value}
                             onValueChange={(itemValue, index) => this.setState({hour: itemValue, hourIdx: index})}
                             title='Hour' items={hourPickerItems}>
                        </ReactNativePickerModule>
                        <ReactNativePickerModule pickerRef={e => this.minutePickerRef = e} value={this.state.minuteIdx} style={styles.value}
                             onValueChange={(itemValue, index) => this.setState({minute: itemValue, minuteIdx: index})}
                             title='Minute' items={minutePickerItems}>
                        </ReactNativePickerModule>
                    </View>

                    <Text style={[fonts.normal, styles.labelContainer]}>일</Text>
                    <View style={styles.valueContainer}>
                        <View style={styles.value}>
                            <Button title='월' color={this.state.days.mon ? colors.darker : colors.font}
                                    onPress={() => this.changeDays('mon')} style={styles.value}/>
                        </View>
                        <View style={styles.value}>
                            <Button title='화' color={this.state.days.tue ? colors.darker : colors.font}
                                    onPress={() => this.changeDays('tue')} style={styles.value}/>
                        </View>
                        <View style={styles.value}>
                            <Button title='수' color={this.state.days.wen ? colors.darker : colors.font}
                                    onPress={() => this.changeDays('wen')} style={styles.value}/>
                        </View>
                        <View style={styles.value}>
                            <Button title='목' color={this.state.days.thu ? colors.darker : colors.font}
                                    onPress={() => this.changeDays('thu')} style={styles.value}/>
                        </View>
                        <View style={styles.value}>
                            <Button title='금' color={this.state.days.fri ? colors.darker : colors.font}
                                    onPress={() => this.changeDays('fri')} style={styles.value}/>
                        </View>
                        <View style={styles.value}>
                            <Button title='토' color={this.state.days.sat ? colors.darker : colors.font}
                                    onPress={() => this.changeDays('sat')} style={styles.value}/>
                        </View>
                        <View style={styles.value}>
                            <Button title='일' color={this.state.days.sun ? colors.darker : colors.font}
                                    onPress={() => this.changeDays('sun')} style={styles.value}/>
                        </View>
                    </View>
                    <Text style={[fonts.normal, styles.labelContainer]}>멍멍이 수</Text>
                    <View style={styles.valueContainer}>
                        <View style={styles.value}>
                            <Button title='2' color={this.state.dogCounts.two ? colors.darker : colors.font}
                                    onPress={() => this.changeDogCounts('two')} style={styles.value}/>
                        </View>
                        <View style={styles.value}>
                            <Button title='4' color={this.state.dogCounts.four ? colors.darker : colors.font}
                                    onPress={() => this.changeDogCounts('four')} style={styles.value}/>
                        </View>
                        <View style={styles.value}>
                            <Button title='6' color={this.state.dogCounts.six ? colors.darker : colors.font}
                                    onPress={() => this.changeDogCounts('six')} style={styles.value}/>
                        </View>
                        <View style={styles.value}>
                            <Button title='8' color={this.state.dogCounts.eight ? colors.darker : colors.font}
                                    onPress={() => this.changeDogCounts('eight')} style={styles.value}/>
                        </View>
                    </View>
                    <Text style={[fonts.normal, styles.labelContainer]}>멍멍이 속도</Text>
                    <View style={styles.valueContainer}>
                        <View style={styles.value}>
                            <Button title='느림' color={this.state.dogSpeeds.slow ? colors.darker : colors.font}
                                    onPress={() => this.changeSpeeds('slow')} />
                        </View>
                        <View style={styles.value}>
                            <Button title='보통' color={this.state.dogSpeeds.normal ? colors.darker : colors.font}
                                    onPress={() => this.changeSpeeds('normal')} />
                        </View>
                        <View style={styles.value}>
                            <Button title='빠름' color={this.state.dogSpeeds.fast ? colors.darker : colors.font}
                                    onPress={() => this.changeSpeeds('fast')} />
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button title='저장' style={styles.button} color={colors.darker} onPress={this.saveData}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        flex: 1,
    },
    labelContainer: {
        padding: 10,
        color: colors.font
    },
    valueContainer: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row',
    },
    value: {
        flex: 1,
        padding: 2,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
    },
    button: {
        flex: 1,
    },
});

export default AddEditScreen;
