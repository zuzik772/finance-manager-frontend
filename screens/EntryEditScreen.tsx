import {
  Alert,
  Button,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { updateEntry } from "../store/entrySlice";
import DateTimePickerComponent from "../components/DateTimePickerComponent";
import { UpdateEntryDTO } from "../dtos/UpdateEntryDto";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../entities/RootStackParamList";
import { Entry } from "../entities/Entry";
import { EntryAPI } from "../api/entryAPI";

type Props = NativeStackScreenProps<RootStackParamList, "EntryEdit">;
export default function EntryEditScreen({ route }: Props) {
  const { entryId } = route.params;
  console.log("Edit View, entryId", entryId);

  const item = useAppSelector((state: RootState) =>
    state.entry.entries.find((entry) => entry.id === entryId)
  );
  const [amount, setAmount] = useState(item?.amount);
  // const [date, setDate] = useState(new Date(item?.date));
  const [date, setDate] = useState(
    item?.date ? new Date(item.date) : new Date()
  );

  const [currency, setCurrency] = useState(item?.currency);
  const [name, setName] = useState(item?.name);
  const [comment, setComment] = useState(item?.comment);

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleUpdateEntry = async () => {
    const updateEntryDTO: UpdateEntryDTO = {
      amount: amount,
      date: date.toISOString(),
      currency: currency,
      name: name,
      comment: comment,
    };
    dispatch(updateEntry({ entry: updateEntryDTO, id: entryId }));
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
            value={amount?.toString()}
            onChangeText={(text) => setAmount(Number(text))}
            keyboardType="numeric"
            placeholder="Enter amount"
          />
          <View style={styles.dateContainer}>
            <Text style={styles.label}>*Choose date: </Text>
            <DateTimePickerComponent
              value={date}
              onChangeText={(date: Date | undefined) => date && setDate(date)}
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
            <Button title="Save" onPress={handleUpdateEntry} color={"white"} />
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  dateContainer: {
    gap: 10,
    justifyContent: "center",
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
