import React from "react";
import { Text, TextInput, View, ToastAndroid, Alert, TouchableOpacity } from "react-native";
import Br from "../tags";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {styles} from "../styles/basic";

export async function setStringValue(content) {
    try {
        await AsyncStorage.setItem("key", content);
        ToastAndroid.show("Content saved successfully.", ToastAndroid.SHORT)
    } catch (e) {
      // save error
    }
}

export default class storageScreen extends React.Component {
    static navigationOptions = {
        title: "To do list App",
    };
    constructor(props) {
        super(props);
        this.state = {
            content: "",
        };
    }
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                }}
            >
                <Text style = {styles.title}>  What's the plan today?  </Text>
                <Br />
                <TextInput
                    style={{
                        height: 35,
                        borderColor: "blue",
                        borderWidth: 1,
                        width: 300,
                    }}
                    placeholder="Write something here..."
                    onChangeText={(text) => this.setState({ content: text })}
                    // 也可以这样写：
                    // onChangeText = {(content) => this.setState({content})}
                    // 从书上抄的，并不知道为什么
                    value={this.state.content}
                />
                <Br />
                <View style = {{flexDirection: 'row'}}>
                    <TouchableOpacity
                        style = {styles.button}
                        onPress={() => setStringValue(this.state.content)}
                    >
                        <Text>SAVE</Text>
                    </TouchableOpacity>
                    <Text>    </Text>
                    <TouchableOpacity
                        style = {styles.button}
                        onPress={() =>
                            Alert.alert(
                                'Clear what you write?',
                                'You can not recover any content after this action.',
                                [
                                    {
                                        text: 'Yes',
                                        onPress: () => this.setState({ content: "" })
                                    },
                                    {
                                        text: 'Cancel',
                                    },
                                ],
                                { cancelable: false }
                            )
                        }
                    >
                        <Text>CLEAR</Text>
                    </TouchableOpacity>
                </View>
            </View>
    );
  }
}
