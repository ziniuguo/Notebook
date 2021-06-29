import React from "react";
import {Alert, ScrollView, Text, ToastAndroid, TouchableOpacity, View} from "react-native";
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
            st: false,
            list: [],
            placeholder: 'Nothing is here...'
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
            const itemGet =
                await AsyncStorage.getItem("key") !== null
                    ? JSON.parse(await AsyncStorage.getItem("key"))
                    : []
            console.log(await AsyncStorage.getItem("key"))
            this.setState({
                list: itemGet,
                placeholder: itemGet.length === 0 ? 'Nothing is here...' : '',
                st: await AsyncStorage.getItem("btn") === 'true'
            })
            console.log(this.state.list)
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
                            await AsyncStorage.removeItem("key");
                            await AsyncStorage.removeItem('btn')
                            this.setState(
                                {
                                    list: [],
                                    st: false,
                                    placeholder: 'Nothing is here...'
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
                paddingTop: 5,
                paddingBottom: 20,
                paddingHorizontal: 30,
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <Text
                    style={{alignSelf: 'center'}}
                >
                    {this.state.placeholder}
                </Text>
                <ScrollView>
                    {this.state.list.map((item, index) => (
                        <BouncyCheckbox
                            key={index}
                            style={{
                                padding: 5
                            }}
                            fillColor="#61dafb"
                            iconStyle={{borderColor: "#61dafb"}}
                            textContainerStyle={{marginLeft: 10}}
                            text={item}
                            isChecked={this.state.st}
                            disableBuiltInState={true}
                            onPress={() => this.saveCheckState(!this.state.st)}
                        />
                    ))}
                </ScrollView>
                <View>
                    <Text>{'state is : ' + this.state.st}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.removeValue()
                        }}
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
