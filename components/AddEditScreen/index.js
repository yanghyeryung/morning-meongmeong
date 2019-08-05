import React, { Component } from "react";
import { StyleSheet, View, Text, Picker } from "react-native";
import { CheckBox, Button, Icon } from 'react-native-elements';

import utils from "../../utils";
import fonts from "../../styles/fonts";
import colors from "../../styles/colors";

class AddEditScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            ampm: 'AM',
            hour: '01',
            second: '00',
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
            const ampm = navigation.getParam('ampm');

            if(ampm) {
                this.setState({
                    ampm: ampm,
                    hour: navigation.getParam('hour'),
                    second: navigation.getParam('second'),
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

    save = () => {
        utils.add(this.state);
        this.props.navigation.navigate('List');
    };

    render() {
        let i, hourPickerItems = [], secondPickerItems = [];

        for(i=1; i<=12; i++){
            let str = i.toString();

            str.length === 1 && (str = '0' + str);
            hourPickerItems.push(<Picker.Item key={i} label={str} value={str} />);
        }

        for(i=0; i<=59; i++){
            let str = i.toString();

            str.length === 1 && (str = '0' + str);
            secondPickerItems.push(<Picker.Item key={i} label={str} value={str} />);
        }

        return (
            <View style={styles.container}>
                <View styles={styles.form}>
                    <Text style={[fonts.normal, styles.labelContainer]}>시간</Text>
                    <View style={styles.valueContainer}>
                        <Picker selectedValue={this.state.ampm} style={{height: 50, width: 100}}
                            onValueChange={(itemValue) => this.setState({ampm: itemValue})}>
                            <Picker.Item label="AM" value="AM" />
                            <Picker.Item label="PM" value="PM" />
                        </Picker>

                        <Picker selectedValue={this.state.hour} style={{height: 50, width: 100}} mode="dialog"
                                onValueChange={(itemValue) => this.setState({hour: itemValue})}>
                            {hourPickerItems}

                        </Picker>

                        <Picker selectedValue={this.state.second} style={{height: 50, width: 100}}
                                onValueChange={(itemValue) => this.setState({second: itemValue})}>
                            {secondPickerItems}
                        </Picker>
                    </View>

                    <Text style={[fonts.normal, styles.labelContainer]}>일</Text>
                    <View style={styles.valueContainer}>
                        <CheckBox title='월' checked={this.state.days.mon} checkedColor={colors.darker}
                                  onPress={() => this.changeDays('mon')} containerStyle={styles.check}/>
                        <CheckBox title='화' checked={this.state.days.tue} checkedColor={colors.darker}
                                  onPress={() => this.changeDays('tue')} containerStyle={styles.check}/>
                        <CheckBox title='수' checked={this.state.days.wen} checkedColor={colors.darker}
                                  onPress={() => this.changeDays('wen')} containerStyle={styles.check}/>
                        <CheckBox title='목' checked={this.state.days.thu} checkedColor={colors.darker}
                                  onPress={() => this.changeDays('thu')} containerStyle={styles.check}/>
                    </View>
                    <View style={styles.valueContainer}>
                        <CheckBox title='금' checked={this.state.days.fri} checkedColor={colors.darker}
                                  onPress={() => this.changeDays('fri')} containerStyle={styles.check}/>
                        <CheckBox title='토' checked={this.state.days.sat} checkedColor={colors.darker}
                                  onPress={() => this.changeDays('sat')} containerStyle={styles.check}/>
                        <CheckBox title='일' checked={this.state.days.sun} checkedColor={colors.darker}
                                  onPress={() => this.changeDays('sun')} containerStyle={styles.check}/>
                        <View style={styles.empty}></View>
                    </View>
                    <Text style={[fonts.normal, styles.labelContainer]}>멍멍이 수</Text>
                    <View style={styles.valueContainer}>
                        <CheckBox title='2' checked={this.state.dogCounts.two} checkedColor={colors.darker}
                                  checkedIcon='dot-circle-o' uncheckedIcon='circle-o'
                                  onPress={() => this.changeDogCounts('two')} containerStyle={styles.check}/>
                        <CheckBox title='4' checked={this.state.dogCounts.four} checkedColor={colors.darker}
                                  checkedIcon='dot-circle-o' uncheckedIcon='circle-o'
                                  onPress={() => this.changeDogCounts('four')} containerStyle={styles.check}/>
                        <CheckBox title='6' checked={this.state.dogCounts.six} checkedColor={colors.darker}
                                  checkedIcon='dot-circle-o' uncheckedIcon='circle-o'
                                  onPress={() => this.changeDogCounts('six')} containerStyle={styles.check}/>
                        <CheckBox title='8' checked={this.state.dogCounts.eight} checkedColor={colors.darker}
                                  checkedIcon='dot-circle-o' uncheckedIcon='circle-o'
                                  onPress={() => this.changeDogCounts('eight')} containerStyle={styles.check}/>
                    </View>

                    <Text style={[fonts.normal, styles.labelContainer]}>멍멍이 속도</Text>
                    <View style={styles.valueContainer}>
                        <CheckBox title='느림' checked={this.state.dogSpeeds.slow} checkedColor={colors.darker}
                                  checkedIcon='dot-circle-o' uncheckedIcon='circle-o'
                                  onPress={() => this.changeSpeeds('slow')} containerStyle={styles.check}/>
                        <CheckBox title='보통' checked={this.state.dogSpeeds.normal} checkedColor={colors.darker}
                                  checkedIcon='dot-circle-o' uncheckedIcon='circle-o'
                                  onPress={() => this.changeSpeeds('normal')} containerStyle={styles.check}/>
                        <CheckBox title='빠름' checked={this.state.dogSpeeds.fast} checkedColor={colors.darker}
                                  checkedIcon='dot-circle-o' uncheckedIcon='circle-o'
                                  onPress={() => this.changeSpeeds('fast')} containerStyle={styles.check}/>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <Button icon={<Icon name='save' type='font-awesome' size={15} color='white' iconStyle={styles.buttonIcon}/>}
                            title='저장' buttonStyle={styles.button} onPress={this.save}/>
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
        color: colors.darkerFont,
    },
    check: {
        margin: 0,
        padding: 0,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        flex: 1,
    },
    empty: {
        flex: 1,
        marginRight: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
    },
    button: {
        flex: 1,
        backgroundColor: colors.darker,
    },
    buttonIcon: {
        marginRight: 4,
    }
});

export default AddEditScreen;
