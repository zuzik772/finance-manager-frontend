import {
  Button,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CategoryItem, { CategoryItemProps } from "../components/CategoryItem";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  createCategory,
  deleteCategory,
  fetchCategories,
} from "../store/categorySlice";
import { CreateCategoryDto } from "../dtos/CreateCategoryDto";

// type Props = NativeStackScreenProps<CategoryParam, "Category">;
export default function CategoryScreen() {
  const [text, onChangeText] = useState("");
  const [error, setError] = useState("");
  const categories = useAppSelector((state) => state.category.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleCreateCategory = () => {
    if (!text.trim()) {
      setError("Category name is required");
      return;
    }

    const category: CreateCategoryDto = { name: text };
    dispatch(createCategory(category));
    onChangeText(""); // This will clear the TextInput
  };

  const handleDeleteCategory = (id: number) => {
    console.log("deleting id", id);
    dispatch(deleteCategory(id));
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <TextInput
          onChangeText={(text) => {
            onChangeText(text);
            setError(""); // Clear error when user types
          }}
          value={text}
          placeholder="Enter category name"
          style={styles.input}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.button}>
          <Button
            title="Create category"
            onPress={() => handleCreateCategory()}
            color={"white"}
          ></Button>
        </View>

        <FlatList
          data={categories}
          renderItem={({ item }: { item: CategoryItemProps }) => (
            <CategoryItem
              name={item.name}
              action={() => handleDeleteCategory(item.id!)}
            />
          )}
          keyExtractor={(item) => item.id!.toString()}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    marginBottom: 60,
    borderRadius: 5,
  },
  title: {
    fontSize: 32,
  },
  iconText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
});
