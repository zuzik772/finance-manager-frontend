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
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../entities/RootStackParamList";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import Toast from "react-native-toast-message";

type LoginSchema = {
  email: string;
  password: string;
};
type Props = NativeStackScreenProps<RootStackParamList, "Login">;
export default function LoginScreen({ navigation }: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await axios.post(
        "http://192.168.1.156:3000/auth/login",
        {
          email: data.email,
          password: data.password,
        }
      );
      if (response.status === 200) {
        console.log("Login successful");
        navigation.navigate("EntryList");
        reset({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log("Login failed", error);
      Toast.show({
        type: "error",
        text1: "Login failed",
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.label}>Email:</Text>
          {errors.email && (
            <Text style={styles.errorMessage}>{errors.email.message}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                onChangeText={(text) => onChange(text)}
                value={value.toString()}
              />
            )}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "invalid email address",
              },
            }}
          />

          <Text style={styles.label}>Password:</Text>
          {errors.password && (
            <Text style={styles.errorMessage}>{errors.password.message}</Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                onChangeText={(text) => onChange(text)}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            }}
          />

          <View style={styles.button}>
            <Button
              title="Login"
              onPress={handleSubmit(onSubmit)}
              color={"white"}
            ></Button>
          </View>
          <Text style={styles.textCenter}>Don't have an account?</Text>

          <Button
            title="Sign Up"
            onPress={() => navigation.navigate("SignUp")}
          />
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
  button: {
    backgroundColor: "#007AFF",
    marginBottom: 20,
    borderRadius: 5,
  },
  textCenter: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
  errorMessage: {
    color: "red",
    marginBottom: 10,
  },
});
