import React from "react";
import {Alert, SafeAreaView, Text, TextInput, TouchableOpacity} from "react-native";
import Br from "../tags";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {styles} from "../styles/basic";
import {createStackNavigator} from "react-navigation-stack";
import Toast from 'react-native-simple-toast';

class storageScreen extends React.Component {
    static navigationOptions = {
        title: "A Simple Notebook",
        safeAreaInsets: {top: 0}
    };

    constructor(props) {
        super(props);
        this.state = {
            content: ""
        };
    }

    setStringValue = async (myKey, myValue) => {
        const tempValue =
            await AsyncStorage.getItem("key") !== null
                ? JSON.parse(await AsyncStorage.getItem("key"))
                : []
        tempValue.unshift(myValue + '0')
        await AsyncStorage.setItem(myKey, JSON.stringify(tempValue));
        Toast.show('Saved',)
    }

    render() {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    paddingTop: 70,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    backgroundColor: "#eaeaea",
                }}
            >
                <Text style={styles.title}> What's the plan today? </Text>
                <Br/>
                <TextInput
                    style={{
                        height: 45,
                        borderColor: "blue",
                        borderWidth: 1,
                        width: 300,
                        paddingHorizontal: 6,
                        fontWeight: 'normal',
                        fontFamily: "JosefinSans-Regular"
                    }}
                    placeholder="Write something here..."
                    placeholderStyle={{fontFamily: "JosefinSans-Regular", fontWeight: 'normal'}}
                    onChangeText={(text) => this.setState({content: text})}
                    value={this.state.content}
                />
                <Br/>
                <SafeAreaView style={{
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            this.state.content !== ''
                                ? this.setStringValue("key", this.state.content)
                                : Alert.alert(
                                '',
                                'Saved content can not be empty!',
                                [
                                    {text: 'OK'}
                                ],
                                {cancelable: false}
                                )
                        }
                    >
                        <Text style={{fontFamily: "JosefinSans-Regular"}}>Save</Text>
                    </TouchableOpacity>
                    <Text>        </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            Alert.alert(
                                '',
                                'Clear what you write?',
                                [
                                    {
                                        text: 'Yes',
                                        onPress: () => this.setState({content: ""})
                                    },
                                    {
                                        text: 'Cancel',
                                    },
                                ],
                                {cancelable: false}
                            )
                        }
                    >
                        <Text style={{fontFamily: "JosefinSans-Regular"}}>Clear</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </SafeAreaView>
        );
    }
}

export default createStackNavigator(
    {Home: storageScreen}
)
