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
import React, { RefObject, useState } from "react";
import { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { updateEntry } from "../store/entrySlice";
import { UpdateEntryDTO } from "../dtos/UpdateEntryDto";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../entities/RootStackParamList";
import { useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";

type Props = NativeStackScreenProps<RootStackParamList, "EntryEdit">;
const EntryEditScreen = React.forwardRef((props: Props, ref) => {
  const { entryId } = props.route.params;

  const item = useAppSelector((state: RootState) =>
    state.entry.entries.find((entry) => entry.id === entryId)
  );
  const [date, setDate] = useState(new Date(item?.date || ""));

  const { register, handleSubmit, setValue, watch } = useForm<UpdateEntryDTO>({
    defaultValues: {
      amount: item?.amount || 0,
      date: item?.date
        ? new Date(item.date).toISOString()
        : new Date().toISOString(),
      currency: item?.currency || "",
      name: item?.name || "",
      comment: item?.comment || "",
    },
  });
  const formValues = watch();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleUpdateEntry = handleSubmit(async (data) => {
    const updateEntryDTO: UpdateEntryDTO = {
      id: entryId,
      amount: data.amount,
      date: data.date,
      currency: data.currency,
      name: data.name,
      comment: data.comment,
    };
    dispatch(updateEntry({ entry: updateEntryDTO, id: entryId }));
    Toast.show({
      type: "success",
      text1: "Entry has been updated!",
    });
    navigation.goBack();
  });

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      ref={ref as RefObject<TouchableWithoutFeedback> | null}
    >
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.label}>*Amount:</Text>
          <TextInput
            style={styles.input}
            value={formValues?.amount.toString()}
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
            value={formValues?.currency}
            {...register("currency")}
            onChangeText={(text) => setValue("currency", text)}
          />
          <Text style={styles.label}>*Name:</Text>
          <TextInput
            style={styles.input}
            value={formValues?.name}
            {...register("name")}
            placeholder="Enter name"
            onChangeText={(text) => setValue("name", text)}
          />
          <Text style={styles.label}>Comment:</Text>
          <TextInput
            style={styles.input}
            value={formValues?.comment}
            {...register("comment")}
            placeholder="Enter comment"
            onChangeText={(text) => setValue("comment", text)}
          />
          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={handleUpdateEntry} color={"white"} />
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
});

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

export default EntryEditScreen;
