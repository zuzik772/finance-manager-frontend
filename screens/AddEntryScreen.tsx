import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddEntryScreen = () => {
  const { register, handleSubmit, setValue } = useForm<CreateEntryDto>({
    defaultValues: {
      amount: 0,
      date: new Date().toISOString(),
      currency: "",
      name: "",
      comment: "",
    },
  });
  const [date, setDate] = useState(new Date());
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const onSubmit = (data: CreateEntryDto) => {
    dispatch(
      createEntry(
        new CreateEntryDto(
          data.amount,
          data.date,
          data.currency,
          data.name,
          data.comment
        )
      )
    );
    console.log("submitting", data);
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.label}>*Amount:</Text>
          <TextInput
            style={styles.input}
            {...register("amount")}
            keyboardType="numeric"
            placeholder="Enter amount"
            onChangeText={(text) => setValue("amount", Number(text))}
          />
          <View style={styles.dateContainer}>
            <Text style={styles.label}>*Choose date: </Text>
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setDate(currentDate);
                setValue("date", currentDate.toISOString());
              }}
            />
          </View>
          <Text style={styles.label}>*Currency:</Text>
          <TextInput
            style={styles.input}
            {...register("currency")}
            placeholder="Enter currency"
            onChangeText={(text) => setValue("currency", text)}
          />
          <Text style={styles.label}>*Name:</Text>
          <TextInput
            style={styles.input}
            {...register("name")}
            placeholder="Enter name"
            onChangeText={(text) => setValue("name", text)}
          />
          <Text style={styles.label}>Comment:</Text>
          <TextInput
            style={styles.input}
            {...register("comment")}
            placeholder="Enter optional comment"
            onChangeText={(text) => setValue("comment", text)}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Submit"
              onPress={handleSubmit(onSubmit)}
              color={"white"}
            />
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

// ... rest of your code

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
