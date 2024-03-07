import React, { useEffect, useState } from "react";
import {
  Button,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { CreateEntryDto } from "../dtos/CreateEntryDto";
import { createEntry } from "../store/entrySlice";
import { useAppDispatch } from "../hooks/hooks";

import DateTimePickerComponent from "../components/DateTimePickerComponent";
import { useNavigation } from "@react-navigation/native";

const AddEntryScreen = () => {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [currency, setCurrency] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleSubmit = () => {
    dispatch(
      createEntry(new CreateEntryDto(amount, date, currency, name, comment))
    );
    console.log("submitting", amount, date, currency, name, comment);
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.label}>*Amount:</Text>
          <TextInput
            style={styles.input}
            value={amount.toString()}
            onChangeText={(text) => setAmount(Number(text))}
            keyboardType="numeric"
            placeholder="Enter amount"
          />
          <View style={styles.dateContainer}>
            <Text style={styles.label}>*Choose date: </Text>
            <DateTimePickerComponent
              onChangeText={(date: React.SetStateAction<Date>) => setDate(date)}
            ></DateTimePickerComponent>
          </View>
          <Text style={styles.label}>*Currency:</Text>
          <TextInput
            style={styles.input}
            value={currency}
            onChangeText={(text) => setCurrency(text)}
            placeholder="Enter currency"
          />
          <Text style={styles.label}>*Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder="Enter name"
          />
          <Text style={styles.label}>Comment:</Text>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={(text) => setComment(text)}
            placeholder="Enter optional comment"
          />
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} color={"white"} />
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dateContainer: {
    flexDirection: "row",
    gap: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  buttonContainer: {
    backgroundColor: "#007AFF",
    fontSize: 20,
    marginVertical: 10,
  },
  button: {
    color: "black",
  },
});
export default AddEntryScreen;
