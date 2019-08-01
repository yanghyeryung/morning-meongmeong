import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Header from "./components/Header";
import ListScreen from "./components/ListScreen";
import AddEditScreen from "./components/AddEditScreen";
import AlarmScreen from "./components/AlarmScreen";

let headerOptions = {
    headerTitle: <Header />,
    headerLeft: null
};

let navigator = createStackNavigator({
    List: { screen: ListScreen, navigationOptions: headerOptions },
    Edit: { screen: AddEditScreen, navigationOptions: headerOptions },
    Alarm: { screen: AlarmScreen }
});

export default createAppContainer(navigator);
