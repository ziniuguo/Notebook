import React from "react";
import { View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import detailsScreen from "./screens/Details";
import storageScreen from "./screens/Storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import notesScreen from "./screens/Notes";

class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
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
            <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

// 我并不需要badge，所以我在下面badgeCount写0了

const HomeIconWithBadge = (props) => {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  return <IconWithBadge {...props} badgeCount={0} />;
};

const TabNavigator = createBottomTabNavigator(
  {
    Storage: storageScreen,
    Notes: notesScreen,
    Details: detailsScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // 暂停一下我讲两句，这些icons是从react-native-vector-icons/Ionicons里搞的
      // 和react-navigation-tabs没关系。
      // 找icons的地方：https://ionicframework.com/docs/v3/ionicons/
      // 还有个地方要注意，这个ionicons版本是v3，有的v4的icons就用不了
      // 那个网站顶部都写着一句话：
      // Need help upgrading to Ionic Framework 4.0?
      // Get assistance with our Enterprise Migration Services
      // 好了不废话了，以后有钱了可能有机会都买下来用
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
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
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: "blue",
      inactiveTintColor: "gray",
    },
  }
);

export default createAppContainer(TabNavigator);
