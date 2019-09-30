import AsyncStorage from '@react-native-community/async-storage';
import { NavigationActions } from 'react-navigation';

const STORAGE_KEY = '@MorningMeongmeong:alarm';
let _navigator;

setList = (list) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

getList = () => {
    return AsyncStorage.getItem(STORAGE_KEY).then(value => JSON.parse(value));
};

setTopLevelNavigator = (navigatorRef) => {
    _navigator = navigatorRef;
};

navigate = (routeName, params) => {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
};

export default {
    setList: setList,
    getList: getList,
    setTopLevelNavigator: setTopLevelNavigator,
    navigate: navigate,
}