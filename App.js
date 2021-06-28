import React from "react";
import {Text, View} from "react-native";
import {createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";
import detailsScreen from "./screens/Details";
import storageScreen from "./screens/Storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import notesScreen from "./screens/Notes";

class IconWithBadge extends React.Component {
    render() {
        const {name, badgeCount, color, size} = this.props;
        return (
            <View style={{width: 24, height: 24, margin: 5}}>
                <Ionicons name={name} size={size} color={color}/>
                {badgeCount > 0 && (
                    <View
                        style={{
                            // If you're using react-native < 0.57 overflow outside of parent
                            // will not work on Android, see https://git.io/fhLJ8
                            position: "absolute",
                            right: -6,
                            top: -3,
                            backgroundColor: "red",
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Text style={{color: "white", fontSize: 10, fontWeight: "bold"}}>
                            {badgeCount}
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

// I don't need badge, so badgeCount = {0}

const HomeIconWithBadge = (props) => {
    // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
    return <IconWithBadge {...props} badgeCount={0}/>;
};

const TabNavigator = createBottomTabNavigator(
    {
        Storage: {
            screen: storageScreen,
            navigationOptions: {
                title: 'Home'
            }
        },
        Notes: notesScreen,
        Details: {
            screen: detailsScreen,
            navigationOptions: {
                title: 'About'
            }
        },
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            // react-native-vector-icons/Ionicons
            // https://ionicframework.com/docs/v3/ionicons
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === "Notes") {
                    iconName = focused ? "list" : "list";
                    // Sometimes we want to add badges to some icons.
                    // You can check the implementation below.
                    IconComponent = HomeIconWithBadge;
                } else if (routeName === "Details") {
                    iconName = focused ? "information-circle" : "information-circle";
                } else if (routeName === "Storage") {
                    iconName = focused ? "home" : "home";
                }
                // You can return any component that you like here!
                return <IconComponent name={iconName} size={25} color={tintColor}/>;
            },
        }),
        tabBarOptions: {
            activeTintColor: "blue",
            inactiveTintColor: "gray",
        },
    }
);

export default createAppContainer(TabNavigator);
