import React from "react";
import {Image, ScrollView, Text, View} from "react-native";
import {createStackNavigator} from "react-navigation-stack";

const logo = {
    uri: "https://reactnative.dev/img/tiny_logo.png",
    width: 64,
    height: 64,
};

class detailsScreen extends React.Component {
    static navigationOptions = {
        title: "About",
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                <Text style={{fontSize: 35}}>Note.Notes.Test</Text>
                <ScrollView>
                    <Text style={{fontSize: 96}}>Scroll me plz</Text>
                    <Image source={logo}/>
                    <Text style={{fontSize: 96}}>If you like</Text>
                    <Image source={logo}/>
                    <Text style={{fontSize: 96}}>Scrolling down</Text>
                    <Image source={logo}/>
                    <Text style={{fontSize: 96}}>What's the best</Text>
                    <Image source={logo}/>
                    <Text style={{fontSize: 96}}>Framework around?</Text>
                    <Image source={logo}/>
                    <Text style={{fontSize: 80}}>React Native</Text>
                </ScrollView>
            </View>
        );
    }
}

export default createStackNavigator(
    {Home: detailsScreen}
)
