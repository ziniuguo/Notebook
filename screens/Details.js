import React from "react";
import { Text, ScrollView, View, Image } from "react-native";

const logo = {
  uri: "https://reactnative.dev/img/tiny_logo.png",
  width: 64,
  height: 64,
};

export default class detailsScreen extends React.Component {
  static navigationOptions = {
    title: "About",
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 60 }}>test test</Text>
        <ScrollView>
          <Text style={{ fontSize: 96 }}> Scroll me plz</Text>
          <Image source={logo} />
          <Text style={{ fontSize: 96 }}>If you like</Text>
          <Image source={logo} />
          <Text style={{ fontSize: 96 }}>Scrolling down</Text>
          <Image source={logo} />
          <Text style={{ fontSize: 96 }}>What's the best</Text>
          <Image source={logo} />
          <Text style={{ fontSize: 96 }}>Framework around?</Text>
          <Image source={logo} />
          <Text style={{ fontSize: 80 }}>React Native</Text>
        </ScrollView>
      </View>
    );
  }
}
