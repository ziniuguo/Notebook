import React from "react";
import {Linking, SafeAreaView, Text} from "react-native";
import {createStackNavigator} from "react-navigation-stack";
import Br from "../tags";

class detailsScreen extends React.Component {
    static navigationOptions = {
        title: "About",
        safeAreaInsets: {top: 0}
    };

    render() {
        return (
            <SafeAreaView style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#eaeaea",
            }}>
                <Text style={{
                    fontSize: 35,
                    fontFamily: "JosefinSans-Regular"
                }}>
                    A Notebook
                </Text>
                <Br/>
                <Text style={{fontFamily: "JosefinSans-Regular"}}>Written in React Native</Text>
                <Text style={{color: 'blue', fontFamily: "JosefinSans-Regular"}}
                      onPress={() => Linking.openURL('https://github.com/ziniuguo/Notebook'
                      )}
                >
                    GitHub Repository
                </Text>
            </SafeAreaView>
        );
    }
}

export default createStackNavigator(
    {Home: detailsScreen}
)
