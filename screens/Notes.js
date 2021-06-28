import React from "react";
import {Alert, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createStackNavigator} from "react-navigation-stack";
import {styles} from "../styles/basic";
import BouncyCheckbox from "react-native-bouncy-checkbox";

class notesScreen extends React.Component {
    static navigationOptions = {
        title: "Things to do...",
    };

    constructor(props) {
        super(props);
        this.state = {
            val: "",
            st: false
        };
    }

    saveCheckState = async (btnState) => {
        try {
            this.setState({st: btnState});
            await AsyncStorage.setItem('btn', JSON.stringify(btnState))
        } catch (e) {
            // save error
        }
    }

    getStringValue = async () => {
        try {
            this.setState(
                {
                    val: await AsyncStorage.getItem("key"),
                    st: await AsyncStorage.getItem("btn") === 'true'
                }
            );
        } catch (e) {
            // save error
        }
    };

    removeValue() {
        Alert.alert(
            'Delete notes you save',
            'You can not recover any content after this action.',
            [
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            await AsyncStorage.setItem("key", "");
                            this.setState(
                                {
                                    val: ""
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
                paddingTop: 20,
                paddingBottom: 20,
                paddingHorizontal: 30,
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <BouncyCheckbox
                    fillColor="#61dafb"
                    iconStyle={{borderColor: "#61dafb"}}
                    textContainerStyle={{marginLeft: 10}}
                    text={this.state.val}
                    isChecked={this.state.st}
                    disableBuiltInState={true}
                    onPress={() => this.saveCheckState(!this.state.st)}
                />
                <View>
                    <Text>{'state is: ' + this.state.st}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.removeValue()}
                    >
                        <Text>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default createStackNavigator(
    {Home: notesScreen}
)
