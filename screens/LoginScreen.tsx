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
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../entities/RootStackParamList";
import { Controller, useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../store/store";
import { login } from "../store/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type LoginSchema = {
  email: string;
  password: string;
};
type Props = NativeStackScreenProps<RootStackParamList, "Login">;
export default function LoginScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state: RootState) => state.user);
  const [token, setToken] = useState(null);

  const onSubmit = async (credentials: LoginSchema) => {
    try {
      dispatch(login(credentials)).then((res) => {
        if (res.payload) {
          setToken(res.payload);
          navigation.navigate("EntryList");
          reset({
            email: "",
            password: "",
          });
        }
      });
    } catch (error) {
      console.log("Login failed", error);
      Toast.show({
        type: "error",
        text1: "Login failed",
      });
    }
  };

  const SignOut = async () => {
    await AsyncStorage.removeItem("user");
    setToken(null);
    Toast.show({
      type: "success",
      text1: "User signed out",
    });
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("user");
      if (token !== null) {
        // The user data is stored as a string, so we parse it to an object
        const parsedToken = JSON.parse(token);
        console.log("login screen", parsedToken);
        setToken(parsedToken);
      }
    };

    fetchUser();
  }, []);

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {token ? (
          <>
            <View style={styles.button}>
              <Button
                title="Continue"
                onPress={() => navigation.navigate("EntryList")}
                color={"white"}
              ></Button>
            </View>
            <View style={styles.button}>
              <Button
                title="Sign out"
                onPress={SignOut}
                color={"white"}
              ></Button>
            </View>
          </>
        ) : (
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
                  message: "Invalid email address",
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
                title={`${isLoading ? "Loading..." : "Login"}`}
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
        )}
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
