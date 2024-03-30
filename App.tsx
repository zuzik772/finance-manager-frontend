import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { RootStackParamList } from "./entities/RootStackParamList";
import EntryDeleteScreen from "./screens/EntryDeleteScreen";
import EntryEditScreen from "./screens/EntryEditScreen";
import EntryListScreen from "./screens/EntryListScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoryScreen from "./screens/CategoryScreen";
import { CategoryParam } from "./entities/CategoryParam";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AddEntryScreen from "./screens/AddEntryScreen";
import Toast from "react-native-toast-message";

export default function App() {
  const RootStack = createNativeStackNavigator<RootStackParamList>();
  const CategoryStack = createNativeStackNavigator<CategoryParam>();
  const Tab = createBottomTabNavigator();

  const EntryStackNavigator = () => {
    return (
      <>
        <RootStack.Navigator initialRouteName="EntryList">
          <RootStack.Screen name="EntryList" component={EntryListScreen} />
          <RootStack.Screen name="AddEntry" component={AddEntryScreen} />
          <RootStack.Screen name="EntryEdit" component={EntryEditScreen} />
          <RootStack.Screen name="EntryDelete" component={EntryDeleteScreen} />
        </RootStack.Navigator>
        <Toast />
      </>
    );
  };
  const CategoryNavigator = () => {
    return (
      <CategoryStack.Navigator>
        <CategoryStack.Screen name="Category" component={CategoryScreen} />
      </CategoryStack.Navigator>
    );
  };
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={EntryStackNavigator} />
          <Tab.Screen name="Categories" component={CategoryNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
