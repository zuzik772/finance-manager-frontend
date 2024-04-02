import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
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
import Toast from "react-native-toast-message";

const AddEntryScreen = () => {
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateEntryDto>({
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
    console.log("create entry data", data);
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
    Toast.show({
      type: "success",
      text1: "New Entry added!",
    });
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.label}>*Amount:</Text>
          {errors.amount && (
            <Text style={styles.errorMessage}>Amount is required.</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter amount"
                onChangeText={(text) => onChange(Number(text))}
                value={value.toString()}
              />
            )}
            name="amount"
            rules={{ required: true, min: 1 }}
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
          {errors.currency && (
            <Text style={styles.errorMessage}>Currency is required.</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter currency"
                onChangeText={(text) => onChange(text)}
                value={value}
              />
            )}
            name="currency"
            rules={{ required: true }}
          />

          <Text style={styles.label}>*Name:</Text>
          {errors.name && (
            <Text style={styles.errorMessage}>Name is required.</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter name"
                onChangeText={(text) => onChange(text)}
                value={value}
              />
            )}
            name="name"
            rules={{ required: true }}
          />

          <Text style={styles.label}>Comment:</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter optional comment"
                onChangeText={(text) => onChange(text)}
                value={value}
              />
            )}
            name="comment"
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

  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});
export default AddEntryScreen;
function register(
  arg0: string
): React.JSX.IntrinsicAttributes &
  React.JSX.IntrinsicClassAttributes<TextInput> &
  Readonly<import("react-native").TextInputProps> {
  throw new Error("Function not implemented.");
}
