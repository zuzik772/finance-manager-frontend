import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

export type CategoryItemProps = {
  id?: number | undefined;
  name: string;
  action?: () => void;
};

const CategoryItem = ({ name, action }: CategoryItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.text}>{name}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={action}>
            <FontAwesome name="remove" size={24} color="#ff0000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
  },

  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 10,
    width: 20,
  },
});

export default CategoryItem;
