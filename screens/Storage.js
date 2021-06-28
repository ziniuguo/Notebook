import React from "react";
import {Alert, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import Br from "../tags";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {styles} from "../styles/basic";
import {createStackNavigator} from "react-navigation-stack";

class storageScreen extends React.Component {
    static navigationOptions = {
        title: "To do list App",
    };

    constructor(props) {
        super(props);
        this.state = {
            content: "",
        };
    }

    setStringValue = async (content) => {
        try {
            await AsyncStorage.setItem("key", content);
            ToastAndroid.show("Content saved successfully.", ToastAndroid.SHORT)
        } catch (e) {
            // save error
        }
    }

    render() {
        return (
            <View
                style={styles.container}
            >
                <Text style={styles.title}> What's the plan today? </Text>
                <Br/>
                <TextInput
                    style={{
                        height: 35,
                        borderColor: "blue",
                        borderWidth: 1,
                        width: 300,
                        paddingHorizontal: 6
                    }}
                    placeholder="Write something here..."
                    onChangeText={(text) => this.setState({content: text})}
                    value={this.state.content}
                />
                <Br/>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.setStringValue(this.state.content)}
                    >
                        <Text>Save</Text>
                    </TouchableOpacity>
                    <Text>        </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() =>
                            Alert.alert(
                                'Clear what you write?',
                                'You can not recover any content after this action.',
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
                        <Text>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default createStackNavigator(
    {Home: storageScreen}
)
