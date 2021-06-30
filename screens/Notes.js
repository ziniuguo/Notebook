import React from "react";
import {Alert, ScrollView, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createStackNavigator} from "react-navigation-stack";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {styles} from "../styles/basic";

class notesScreen extends React.Component {
    static navigationOptions = {
        title: "Things to do...",
    };

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            placeholder: 'Nothing is here...'
        };
    }

    getStringValue = async () => {
        try {
            const itemGet =
                await AsyncStorage.getItem("key") !== null
                    ? JSON.parse(await AsyncStorage.getItem("key"))
                    : []
            console.log(await AsyncStorage.getItem("key"))
            console.log(itemGet)
            this.setState({
                list: itemGet,
                placeholder: itemGet.length === 0 ? 'Nothing is here...' : '',
            })
        } catch (e) {
            // save error
        }
    };

    removeValue(i) {
        Alert.alert(
            'Delete this note',
            'Delete this note? You can not recover this note after this action.',
            [
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const tempVal = this.state.list;
                            tempVal.splice(i);
                            await AsyncStorage.setItem('key', JSON.stringify(tempVal))
                            this.setState(
                                {
                                    list: tempVal,
                                    placeholder: tempVal.length === 0 ? 'Nothing is here...' : '',
                                }
                            );
                            ToastAndroid.show(
                                "Content deleted.",
                                ToastAndroid.SHORT)
                        } catch (e) {
                            // remove error
                        }
                    }
                },
                {
                    text: 'Cancel',
                },
            ],
            {cancelable: false}
        )
    }

    removeAll() {
        this.state.list.length === 0
            ? ToastAndroid.show("Nothing here can be deleted...", ToastAndroid.SHORT)
            : Alert.alert(
            'Delete All',
            'Delete all the notes you saved?',
            [
                {
                    text: 'Delete',
                    onPress: async () => {
                        await AsyncStorage.removeItem('key');
                        this.setState({
                            list: [],
                            placeholder: 'Nothing is here...'
                        });
                        ToastAndroid.show(
                            "All notes deleted.",
                            ToastAndroid.SHORT)
                    }
                },
                {
                    text: 'Cancel'
                }
            ],
            {cancelable: false}
            )
    }

    saveCheckedState = async (el, ind) => {
        const ori = this.state.list;
        ori[ind] = el.replace(/.$/, el.slice(-1) === '0' ? '1' : '0')
        this.setState({list: ori})
        await AsyncStorage.setItem('key', JSON.stringify(ori))
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener(
            "willFocus",
            () => this.getStringValue()
        );
    }

    componentWillUnmount() {
        this._unsubscribe.remove();
    }

    render() {
        return (
            <View style={{
                paddingTop: 5,
                paddingBottom: 20,
                flex: 1,
                justifyContent: 'space-between',
                paddingHorizontal: 30
            }}>
                <Text
                    style={{alignSelf: 'center'}}
                >
                    {this.state.placeholder}
                </Text>
                <ScrollView>
                    {this.state.list.map((item, index) => (
                        <BouncyCheckbox
                            style={{paddingRight: 30, paddingVertical: 5}}
                            key={index}
                            fillColor="#61dafb"
                            iconStyle={{borderColor: "#61dafb"}}
                            textContainerStyle={{marginLeft: 10}}
                            text={item.slice(0, -1)}
                            isChecked={item.slice(-1) !== '0'}
                            disableBuiltInState={true}
                            onPress={() => this.saveCheckedState(item, index)}
                            onLongPress={() => this.removeValue(index)}
                        />
                    ))}
                </ScrollView>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.removeAll()}
                >
                    <Text>Delete All</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default createStackNavigator(
    {Home: notesScreen}
)
