import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Header from "./components/Header";
import ListScreen from "./components/ListScreen";
import AddEditScreen from "./components/AddEditScreen";
import AlarmScreen from "./components/AlarmScreen";
import utils from "./utils";

import BackgroundJob from "react-native-background-job";
import moment from "moment";

const backgroundJob = {
    jobKey: "myJob",
    job: () => {
        let now = new moment();
        utils.getList()
            .then(alarmList => {
                if (alarmList) {
                    alarmList.map((alarm) => {
                        if(now.format('A') === alarm.ampm &&
                            now.format('hh') === alarm.hour &&
                            now.format('mm') === alarm.minute &&
                            alarm.days[now.format('ddd').toLowerCase()] === true) {
                                utils.navigate('Alarm', alarm);
                        }
                    });
                }
            })
            .catch(error => console.error('AsyncStorage error: ' + error.message))
            .done();
    }
};

BackgroundJob.register(backgroundJob);

const headerOptions = {
    headerTitle: <Header />,
    headerLeft: null
};

const navigator = createStackNavigator({
    List: { screen: ListScreen, navigationOptions: headerOptions },
    Edit: { screen: AddEditScreen, navigationOptions: headerOptions },
    Alarm: { screen: AlarmScreen, navigationOptions: { header: null } },
});

const AppContainer = createAppContainer(navigator);

class App extends React.Component {
    componentDidMount() {
        BackgroundJob.schedule({
            jobKey: "myJob",
            period: 1000,
            exact: true,
            allowExecutionInForeground: true
        });
    }

    render() {
        return (
            <AppContainer
                ref={navigatorRef => {
                    utils.setTopLevelNavigator(navigatorRef);
                }}
            />
        );
    }
}

// export default AlarmScreen;
export default App;
