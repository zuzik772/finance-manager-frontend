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
import Toast from "react-native-toast-message";
import { signUp } from "../store/userSlice";
import { CreateUserDto } from "../dtos/CreateUserDto";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { UserAPI } from "../api/userAPI";
import { RootState } from "../store/store";

type SignUpSchema = {
  email: string;
  password: string;
  confirmPassword: string;
};
type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;
export default function SignUpScreen({ navigation }: Props) {
  const { isLoading } = useAppSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();
  const onSubmit = async (credentials: SignUpSchema) => {
    const { email, password, confirmPassword } = credentials;
    try {
      const existingUser = await UserAPI.fetchUser(email);
      if (existingUser) {
        Toast.show({
          type: "error",
          text1: "Invalid credentials",
        });
      } else {
        dispatch(
          signUp(new CreateUserDto(email, password, confirmPassword))
        ).then((res) => {
          if (res) {
            navigation.navigate("Login");
            reset({
              email: "",
              password: "",
              confirmPassword: "",
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Sign up failed",
            });
          }
        });
      }
    } catch (error) {
      console.log("Sign up failed", error);
      Toast.show({
        type: "error",
        text1: "Sign up failed",
      });
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<SignUpSchema>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const password = watch("password");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.label}>*Email:</Text>
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
                message: "Invalid email address",
              },
            }}
          />

          <Text style={styles.label}>*Password:</Text>
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

          <Text style={styles.label}>*Confirm password:</Text>
          {errors.confirmPassword && (
            <Text style={styles.errorMessage}>
              {errors.confirmPassword.message}
            </Text>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Repeat your password"
                onChangeText={(text) => onChange(text)}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="confirmPassword"
            rules={{
              required: "Confirm password is required",
              validate: (value) =>
                value === password || "The passwords do not match",
            }}
          />

          <View style={styles.button}>
            <Button
              title={`${isLoading ? "Loading..." : "Sign Up"}`}
              onPress={handleSubmit(onSubmit)}
              color={"white"}
            ></Button>
          </View>
          <Text style={styles.textCenter}>Already have an account?</Text>

          <Button title="Login" onPress={() => navigation.navigate("Login")} />
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
