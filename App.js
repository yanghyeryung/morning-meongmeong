import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Header from "./components/Header";
import ListScreen from "./components/ListScreen";
import AddEditScreen from "./components/AddEditScreen";
import AlarmScreen from "./components/AlarmScreen";

import BackgroundJob from 'react-native-background-job';

const backgroundJob = {
    jobKey: "myJob",
    job: () => console.log("Running in background")
};

BackgroundJob.register(backgroundJob);

BackgroundJob.schedule({
    jobKey: "myJob",
    period: 1000,
    exact: true,
    allowExecutionInForeground: true
});

let headerOptions = {
    headerTitle: <Header />,
    headerLeft: null
};

let navigator = createStackNavigator({
    List: { screen: ListScreen, navigationOptions: headerOptions },
    Edit: { screen: AddEditScreen, navigationOptions: headerOptions },
});

// export default AlarmScreen;
export default createAppContainer(navigator);
