// redux
import { connect } from "react-redux";
import {
  fetchLeaders,
  fetchDishes,
  fetchComments,
  fetchPromos,
} from "../redux/ActionCreator";

const mapDispatchToProps = (dispatch) => ({
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
});

import React, { Component } from "react";
import { View, Text, Linking } from "react-native";
import { Icon, Image } from "react-native-elements";

import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./HomeComponent";
import About from "./AboutComponent";
import Menu from "./MenuComponent";
import Dishdetail from "./DishdetailComponent";
import Contact from "./ContactComponent";
import Reservation from "./ReservationComponent";
import Favorites from "./FavoriteComponent";
import Login from "./LoginComponent";
import Register from "./RegisterComponent";
import Cart from "./CartComponent";
import { baseUrl } from "../shared/baseUrl";

const TabNavigator = createBottomTabNavigator();
function TabNavigatorScreen() {
  return (
    <TabNavigator.Navigator
      initialRouteName="Login"
      tabBarOptions={{
        activeBackgroundColor: "#00802b",
        inactiveBackgroundColor: "#fff",
        activeTintColor: "#fff",
        inactiveTintColor: "gray",
      }}
    >
      <TabNavigator.Screen
        name="Login"
        component={Login}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <TabNavigator.Screen
        name="Register"
        component={Register}
        options={{
          tabBarLabel: "Register",
          tabBarIcon: ({ color, size }) => (
            <Icon
              name="user-plus"
              type="font-awesome"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </TabNavigator.Navigator>
  );
}
const HomeNavigator = createStackNavigator();
function HomeNavigatorScreen() {
  return (
    <HomeNavigator.Navigator
      initialRouteName="Trang Chủ"
      screenOptions={{
        headerStyle: { backgroundColor: "#00802b" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <HomeNavigator.Screen
        name="Trang Chủ"
        component={Home}
        options={({ navigation }) => ({
          headerTitle: "Trang Chủ",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </HomeNavigator.Navigator>
  );
}

const LoginNavigator = createStackNavigator();
function LoginNavigatorScreen() {
  return (
    <LoginNavigator.Navigator
      initialRouteName="LoginRegister"
      screenOptions={{
        headerStyle: { backgroundColor: "#00802b" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <LoginNavigator.Screen
        name="LoginRegister"
        component={TabNavigatorScreen}
        options={({ navigation }) => ({
          headerTitle: "Login | Register",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </LoginNavigator.Navigator>
  );
}

const AboutNavigator = createStackNavigator();
function AboutNavigatorScreen() {
  return (
    <AboutNavigator.Navigator
      initialRouteName="About"
      screenOptions={{
        headerStyle: { backgroundColor: "#00802b" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <AboutNavigator.Screen
        name="Thông Tin"
        component={About}
        options={({ navigation }) => ({
          headerTitle: "Thông Tin",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </AboutNavigator.Navigator>
  );
}

const CartNavigator = createStackNavigator();
function CartNavigatorScreen() {
  return (
    <CartNavigator.Navigator
      initialRouteName="Cart"
      screenOptions={{
        headerStyle: { backgroundColor: "#00802b" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <CartNavigator.Screen
        name="Cart"
        component={Cart}
        options={({ navigation }) => ({
          headerTitle: "Giỏ Hàng",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </CartNavigator.Navigator>
  );
}

const MenuNavigator = createStackNavigator();
function MenuNavigatorScreen() {
  return (
    <MenuNavigator.Navigator
      initialRouteName="Menu"
      screenOptions={{
        headerStyle: { backgroundColor: "#00802b" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <MenuNavigator.Screen
        name="Menu"
        component={Menu}
        options={({ navigation }) => ({
          headerTitle: "Menu",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <MenuNavigator.Screen
        name="Dishdetail"
        component={Dishdetail}
        options={{
          headerTitle: "Chi tiết món ăn",
        }}
      />
    </MenuNavigator.Navigator>
  );
}

const ContactNavigator = createStackNavigator();
function ContactNavigatorScreen() {
  return (
    <ContactNavigator.Navigator
      initialRouteName="Liên Hệ"
      screenOptions={{
        headerStyle: { backgroundColor: "#00802b" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <ContactNavigator.Screen
        name="Liên Hệ"
        component={Contact}
        options={({ navigation }) => ({
          headerTitle: "Liên Hệ",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </ContactNavigator.Navigator>
  );
}

const ReservationNavigator = createStackNavigator();
function ReservationNavigatorScreen() {
  return (
    <ReservationNavigator.Navigator
      initialRouteName="Đặt Lịch"
      screenOptions={{
        headerStyle: { backgroundColor: "#00802b" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <ReservationNavigator.Screen
        name="Đặt Lịch"
        component={Reservation}
        options={({ navigation }) => ({
          headerTitle: "Đặt Bàn",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
    </ReservationNavigator.Navigator>
  );
}

const FavoritesNavigator = createStackNavigator();
function FavoritesNavigatorScreen() {
  return (
    <FavoritesNavigator.Navigator
      initialRouteName="Yêu Thích"
      screenOptions={{
        headerStyle: { backgroundColor: "#00802b" },
        headerTintColor: "#fff",
        headerTitleStyle: { color: "#fff" },
      }}
    >
      <FavoritesNavigator.Screen
        name="Yêu Thích"
        component={Favorites}
        options={({ navigation }) => ({
          headerTitle: "Yêu Thích",
          headerLeft: () => (
            <Icon
              name="menu"
              size={36}
              color="#fff"
              onPress={() => navigation.toggleDrawer()}
            />
          ),
        })}
      />
      <MenuNavigator.Screen
        name="Chi Tiết Món Ăn"
        component={Dishdetail}
        options={{
          headerTitle: "Chi Tiết Món Ăn",
        }}
      />
    </FavoritesNavigator.Navigator>
  );
}

const MainNavigator = createDrawerNavigator();
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          backgroundColor: "#00802b",
          height: 80,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: baseUrl + "images/logo1.png" }}
            style={{ margin: 10, width: 80, height: 80 }}
          />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "bold" }}>
            Cơm Tấm Sài Gòn
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Giúp Đỡ"
        icon={({ focused, color, size }) => (
          <Icon name="help" size={size} color={focused ? "#00802b" : "#ccc"} />
        )}
        onPress={() =>
          Linking.openURL("https://www.facebook.com/quan68ComTamSaiGon")
        }
      />
    </DrawerContentScrollView>
  );
}
function MainNavigatorScreen() {
  return (
    <MainNavigator.Navigator
      initialRouteName="Trang Chủ"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <MainNavigator.Screen
        name="Home"
        component={HomeNavigatorScreen}
        options={{
          title: "Trang Chủ",
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="home"
              size={size}
              color={focused ? "#00802b" : "#ccc"}
            />
          ),
        }}
      />

      <MainNavigator.Screen
        name="Menu"
        component={MenuNavigatorScreen}
        options={{
          title: "Menu",
          drawerIcon: ({ focused, size }) => (
            <Icon name="menu" size={size} color={focused ? "#7cc" : "#ccc"} />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Cart"
        component={CartNavigatorScreen}
        options={{
          title: "Giỏ Hàng",
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="shopping-cart"
              size={size}
              color={focused ? "#00802b" : "#ccc"}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Yêu Thích"
        component={FavoritesNavigatorScreen}
        options={{
          headerShown: false,
          title: "Yêu Thích",
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="heart"
              type="font-awesome"
              size={size}
              color={focused ? "#00802b" : "#ccc"}
            />
          ),
        }}
      />

      <MainNavigator.Screen
        name="Đặt Bàn"
        component={ReservationNavigatorScreen}
        options={{
          title: "Đặt Bàn",
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="cutlery"
              type="font-awesome"
              size={size}
              color={focused ? "#00802b" : "#ccc"}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Đăng Nhập"
        component={LoginNavigatorScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="sign-in"
              type="font-awesome"
              size={size}
              color={focused ? "#00802b" : "#ccc"}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Contact"
        component={AboutNavigatorScreen}
        options={{
          title: "Về Chúng Tôi",
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="info"
              size={size}
              color={focused ? "#00802b" : "#ccc"}
            />
          ),
        }}
      />
      <MainNavigator.Screen
        name="Liên Hệ"
        component={ContactNavigatorScreen}
        options={{
          title: "Liên Hệ",
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="contacts"
              size={size}
              color={focused ? "#00802b" : "#ccc"}
            />
          ),
        }}
      />
    </MainNavigator.Navigator>
  );
}

class Main extends Component {
  componentDidMount() {
    // redux
    this.props.fetchLeaders();
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
  }

  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen />
      </NavigationContainer>
    );
  }
}

export default connect(null, mapDispatchToProps)(Main);
