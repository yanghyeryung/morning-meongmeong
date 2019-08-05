import { AsyncStorage } from "react-native";

const STORAGE_KEY = '@MorningMeongmeong:alarm';

setList = (list) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

getList = () => {
    return AsyncStorage.getItem(STORAGE_KEY).then(value => JSON.parse(value));
};

add = (data) => {
    this.getList()
        .then(value => {
            value = value ? value : [];

            value.push(data);

            value.map((item, idx) => {item.key = idx+'';});

            this.setList(value);
        })
        .catch(error => console.error('AsyncStorage error: ' + error.message))
        .done();
};

edit = (data) => {
    this.getList()
        .then(value => {
            value = value ? value : [];

            value.map((item) => {
                if(item.key === data.key) {
                    Object.assign(item, data);

                };
            });

            this.setList(value);
        })
        .catch(error => console.error('AsyncStorage error: ' + error.message))
        .done();
};

export default {
    setList: setList,
    getList: getList,
    add: add,
    edit: edit,
}