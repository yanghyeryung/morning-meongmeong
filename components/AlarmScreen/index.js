import React, { Component } from "react";
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from "react-native";

import colors from "../../styles/colors";

const data = {
    dogCounts: {
        two: false, four: false, six: false, eight: true
    },
    dogSpeeds: {
        slow: false, normal: true, fast: false
    },
};

class AlarmScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            dogs: [],
        };

        this.dogCount = this.getDogCount(data.dogCounts);
        this.dogSpeed = this.getDogSpeed(data.dogSpeeds);
        this.windowWidth = Dimensions.get('window').width;
        this.widowHeight = Dimensions.get('window').height;
    }

    componentDidMount() {
        this.initDog();

        this.interval = setInterval(() => {
            console.log('interval');

            let dogs = JSON.parse(JSON.stringify(this.state.dogs));

            dogs.map((dog) => {
                let position = this.randomPosition();

                dog.left = position.left;
                dog.top = position.top;
            });

            this.setState({dogs: dogs});
        }, this.dogSpeed);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    initDog = () => {
        let dogs = [];

        for(let i=0; i<this.dogCount; i++){
            let position = this.randomPosition();
            dogs.push({key: i + '', left: position.left, top: position.top});
        }

        this.setState({dogs: dogs});
    };

    randomPosition = () => {
        let left = Math.random() * (this.windowWidth - 60);
        let top = Math.random() * (this.widowHeight - 150) + 30;

        return {left: left, top: top};
    };

    getDogCount = (dogCounts) => {
        if(dogCounts.two) {
            return 2;
        }else if(dogCounts.four) {
            return 4;
        }else if(dogCounts.six) {
            return 6;
        }else if(dogCounts.eight) {
            return 8;
        }

        return 0;
    };

    getDogSpeed = (dogSpeeds) => {
        if(dogSpeeds.slow) {
            return 2000;
        }else if(dogSpeeds.normal) {
            return 1000;
        }else if(dogSpeeds.fast) {
            return 500;
        }

        return 0;
    };

    removeDog = (key) => {
        let dogs = JSON.parse(JSON.stringify(this.state.dogs));
        let delIdx = null;


        dogs.map((dog, idx) => {
            if(dog.key === key) {
                delIdx = idx;
            }
        });

        delIdx !== null && dogs.splice(delIdx, 1);

        this.setState({dogs: dogs});

        if(dogs.length === 0) {
            // 앱 종료

        }
    };


    render() {
        let dogs = [];

        this.state.dogs.map((dog, idx) => {
            dogs.push(
                <TouchableOpacity key={idx} onPress={() => {this.removeDog(dog.key);}}
                                  style={[styles.dogContainer, {left: dog.left, top: dog.top}]}>
                    <Image source={require("../../assets/icon.png")} style={styles.dog}/>
                </TouchableOpacity>
            );
        });

        return (
            <View style={styles.container}>
                {dogs}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.base,
    },
    dogContainer: {
        position: 'absolute',
        borderRadius: 30,
    },
    dog: {
        width: 60,
        height: 60,
    },
});

export default AlarmScreen;
