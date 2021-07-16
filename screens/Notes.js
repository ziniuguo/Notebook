import React from "react";
import {Alert, SafeAreaView, ScrollView, Text, TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createStackNavigator} from "react-navigation-stack";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {styles} from "../styles/basic";
import Toast from "react-native-simple-toast";

class notesScreen extends React.Component {
    static navigationOptions = {
        title: "Notes",
        safeAreaInsets: {top: 0}
    };

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            placeholder: 'Nothing is here...',
            showBtn: false
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
                showBtn: itemGet.length !== 0
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
                                showBtn: tempVal.length !== 0
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

    newRemove() {
        const tmp = this.state.list;
        const newList = [];
        tmp.forEach(function (item) {
            if (item.slice(-1) === '0') {
                newList.push(item)
            }
        });
        tmp.length === newList.length
            ? Toast.show("Nothing is selected.")
            : Alert.alert(
            '',
            'Delete selected notes?',
            [
                {
                    text: 'Delete',
                    onPress: async () => {
                        await AsyncStorage.setItem('key', JSON.stringify(newList))
                        this.setState({
                            list: newList,
                            placeholder: newList.length === 0 ? 'Nothing is here...' : '',
                            showBtn: newList.length !== 0
                        })
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
                paddingHorizontal: 30,
                backgroundColor: "#eaeaea",
            }}>
                <Text
                    style={{alignSelf: 'center', fontFamily: "JosefinSans-Regular"}}
                >
                    {this.state.placeholder}
                </Text>
                <ScrollView>
                    {this.state.list.map((item, index) => (
                        <BouncyCheckbox
                            style={{
                                paddingRight: 30,
                                paddingVertical: 5,
                            }}
                            key={index}
                            fillColor="#61dafb"
                            iconStyle={{borderColor: "#61dafb"}}
                            textContainerStyle={{marginLeft: 10}}
                            textStyle={{fontFamily: "JosefinSans-Regular"}}
                            text={item.slice(0, -1)}
                            isChecked={item.slice(-1) !== '0'}
                            disableBuiltInState={true}
                            onPress={() => this.saveCheckedState(item, index)}
                            onLongPress={() => this.removeValue(index)}
                        />
                    ))}
                </ScrollView>
                {this.state.showBtn &&
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.newRemove()}
                >
                    <Text style={{fontFamily: "JosefinSans-Regular"}}>Delete</Text>
                </TouchableOpacity>
                }
            </SafeAreaView>
        );
    }
}

export default createStackNavigator(
    {Home: notesScreen}
)
