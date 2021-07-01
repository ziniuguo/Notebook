import React from "react";
import {Alert, SafeAreaView, ScrollView, Text, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createStackNavigator} from "react-navigation-stack";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {styles} from "../styles/basic";
import Toast from "react-native-simple-toast";

class notesScreen extends React.Component {
    static navigationOptions = {
        title: "Things to do...",
        safeAreaInsets: {top: 0}
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
            '',
            'Do you want to delete this note?',
            [
                {
                    text: 'Delete',
                    onPress: async () => {
                        const tempVal = this.state.list;
                        tempVal.splice(i, 1);
                        await AsyncStorage.setItem('key', JSON.stringify(tempVal))
                        this.setState(
                            {
                                list: tempVal,
                                placeholder: tempVal.length === 0 ? 'Nothing is here...' : '',
                            }
                        );
                        Toast.show("Deleted")
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
            ? Toast.show("Here is already empty...")
            : Alert.alert(
            'Delete All',
            'All notes you saved will be deleted. Please long press to delete one item.',
            [
                {
                    text: 'Delete',
                    onPress: async () => {
                        await AsyncStorage.removeItem('key');
                        this.setState({
                            list: [],
                            placeholder: 'Nothing is here...'
                        });
                        Toast.show("All notes deleted")
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
            <SafeAreaView style={{
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
            </SafeAreaView>
        );
    }
}

export default createStackNavigator(
    {Home: notesScreen}
)
