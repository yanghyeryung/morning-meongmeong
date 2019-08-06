import { AsyncStorage } from "react-native";

const STORAGE_KEY = '@MorningMeongmeong:alarm';

setList = (list) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

getList = () => {
    return AsyncStorage.getItem(STORAGE_KEY).then(value => JSON.parse(value));
};

export default {
    setList: setList,
    getList: getList,
}