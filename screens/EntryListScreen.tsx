import { Button, FlatList, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../entities/RootStackParamList";
import Entry from "../components/EntryItem";
import { EntryProps } from "../components/EntryItem";
import { deleteEntry, fetchEntries } from "../store/entrySlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import Toast from "react-native-toast-message";

type Props = NativeStackScreenProps<RootStackParamList, "EntryList">;
export default function EntryListScreen({ navigation }: Props) {
  const entries = useAppSelector((state) => state.entry.entries);
  const dispatch = useAppDispatch();

  const handleCreateEntry = () => {
    navigation.navigate("AddEntry");
  };

  const handleDeleteEntry = async (id: number) => {
    dispatch(deleteEntry(id));
    Toast.show({
      type: "success",
      text1: "Entry has been deleted!",
    });
  };

  useEffect(() => {
    dispatch(fetchEntries());
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title="Create new entry"
          onPress={() => handleCreateEntry()}
          color={"white"}
        ></Button>
      </View>
      <FlatList
        data={entries}
        renderItem={({ item }) => (
          <Entry
            amount={item.amount}
            date={item.date}
            currency={item.currency}
            name={item.name}
            comment={item.comment}
            actionEdit={() =>
              navigation.navigate("EntryEdit", { entryId: item.id })
            }
            actionDelete={() => handleDeleteEntry(item.id!)}
          />
        )}
        keyExtractor={(item) => item.name}
        style={{ width: "100%" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    marginBottom: 20,
    borderRadius: 5,
  },
});
