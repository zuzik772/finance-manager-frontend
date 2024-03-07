import { View, Button, SafeAreaView, Text } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useState } from "react";

const DateTimePickerComponent = ({ onChange }: any) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    // const currentDate = selectedDate || date;
    const currentDate = selectedDate
      ? new Date(selectedDate.toISOString().substring(0, 10))
      : date;
    setShow(false);
    setDate(currentDate);
    onChange(event, selectedDate);
  };

  return (
    <SafeAreaView>
      <Text>Date: {date.toLocaleString()}</Text>
      <Button onPress={() => setShow(true)} title="Change Date" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(date)}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
    </SafeAreaView>
  );
};

export default DateTimePickerComponent;
