import React from "react";
import {SafeAreaView, Text} from "react-native";
import {createStackNavigator} from "react-navigation-stack";
import Br from "../tags";

class detailsScreen extends React.Component {
    static navigationOptions = {
        title: "About",
        safeAreaInsets: {top: 0}
    };

    render() {
        return (
            <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text style={{fontSize: 35}}>A Notebook</Text>
                <Br/>
                <Text>Written in React Native</Text>
            </SafeAreaView>
        );
    }
}

export default createStackNavigator(
    {Home: detailsScreen}
)
