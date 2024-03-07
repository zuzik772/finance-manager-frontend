import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export type EntryProps = {
  id?: number | undefined;
  amount: number;
  date: string;
  currency: string;
  name: string;
  comment: string;
  actionEdit?: () => void;
  actionDelete?: () => void;
};
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`; // format as you want
};
const EntryItem = ({
  amount,
  date,
  currency,
  name,
  comment,
  actionEdit,
  actionDelete,
}: EntryProps) => {
  formatDate(date);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.bold}>{formatDate(date)}</Text>
        <View style={styles.wrapper}>
          <Text style={styles.bold}>{name}</Text>
          <Text style={styles.bold}>
            {amount}
            {currency}
          </Text>
        </View>

        <Text style={styles.comment}>*{comment}</Text>
      </View>
      <View style={styles.iconsWrapper}>
        <TouchableOpacity onPress={actionDelete}>
          <FontAwesome name="remove" size={24} color="#ff0000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={actionEdit}>
          <Feather name="edit" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EntryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  bold: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  comment: {
    fontStyle: "italic",
  },
  iconsWrapper: {
    justifyContent: "space-between",
    paddingVertical: 5,
  },
});
