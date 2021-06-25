import React from "react";
import {Text, ScrollView, Button, Alert, ToastAndroid} from "react-native";
import Br from "../tags";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class notesScreen extends React.Component {
    static navigationOptions = {
        title: "Notes Saved",
    };
    constructor(props) {
        super(props);
        this.state = {
            val: "",
        };
    }
    getStringValue = async () => {
        try {
            this.setState({ val: await AsyncStorage.getItem("key") });
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
                            this.setState({
                                val: ""
                            })
                            ToastAndroid.show("Content deleted.", ToastAndroid.SHORT)
                        } catch (e) {
                            // remove error
                        }
                    }
                },
                {
                    text: 'Cancel',
                },
            ],
            { cancelable: false }
        )
    }
    componentDidMount() {
        this.props.navigation.addListener(
            "willFocus",
            () => this.getStringValue()
            // I got the solution here:
            // https://www.reddit.com/r/reactnative/
            // comments/9b8k4b/
            // how_to_re_render_tab_screens_after_visiting_one/
            // e517izd?utm_source=share&utm_medium=web2x&context=3
            // And... here:
            // https://aboutreact.com/refresh-previous-screen-react-navigation/
            // Brilliant solution.
        );
    }
    render() {
        return (
            <ScrollView>
                <Br />
                <Button title={"delete"} onPress={() => this.removeValue()} />
                <Br />
                <Text>Things to do:</Text>
                <Br /><Text selectable = {true} >{this.state.val}</Text>
            </ScrollView>
        );
    }
}
