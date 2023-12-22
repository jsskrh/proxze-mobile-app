import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import { useLayoutEffect, useState, useEffect, useContext } from "react";
import { Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { RegisterContext } from "../../components/RegisterProvider";
import { useSelector, useDispatch } from "react-redux";

const RegisterTwoScreen = ({ navigation: { navigate, goBack } }) => {
  const {
    setValue,
    getValues,
    watch,
    control,
    errors,
    trigger,
    submitHandler,
    registerHandler,
    handleSubmit,
  } = useContext(RegisterContext);

  const { loading, error, registerSuccess } = useSelector(
    (state) => state.auth
  );

  const userType = watch("userType");

  const validationChecker = async () => {
    if ((await trigger(["password", "confirmPassword"])) === false)
      return false;
    return true;
  };

  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [isMinChar, setIsMinChar] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);

  const password = watch("password");

  useEffect(() => {
    setIsMinChar(password && password.length >= 9);
    setHasUppercase(password && /[A-Z]/.test(password));
    setHasLowercase(password && /[a-z]/.test(password));
    setHasNumber(password && /\d/.test(password));
  }, [password]);

  useEffect(() => {
    if (registerSuccess) navigate("Login");
  }, [loading, registerSuccess]);

  return (
    <SafeAreaView
      className={`flex-1 ${
        userType === "proxze"
          ? "bg-[#91e6b3]"
          : userType === "principal"
          ? "bg-[#135446]"
          : ""
      }`}
    >
      <View className="mx-5 mt-5">
        <TouchableOpacity onPress={() => goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView className="m-5 mt-0">
        <KeyboardAvoidingView behavior="position">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="mt-0">
              <Text className="mt-10 font-bold text-2xl mb-2">
                Please enter a secure password
              </Text>
              <View className="flex-row">
                <Text
                  className={`text-sm font-poppins text-center ${
                    userType === "proxze" ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigate("Login")}>
                  <Text className="text-sm font-poppins text-center font-semibold ml-2 text-black relative after:content-[''] after:bg-[#757575] after:absolute after:w-full after:top-5 after:h-0.5 after:left-0 after:right-0">
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
              {error && (
                <Text className="mt-3 text-[#ff0000] text-xs">{error}</Text>
              )}

              <View className="mt-5 justify-between">
                {/* <KeyboardAvoidingView className=" justify-start"> */}
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Please enter your password",
                    minLength: {
                      value: 6,
                      message: "Password should be more than 5 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password should be less than 20 characters",
                    },
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/,
                      message: "Please enter valid password",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <TextInput
                        value={field.value}
                        onChangeText={field.onChange}
                        id="password"
                        name="password"
                        placeholder="Password"
                        placeholderTextColor={"grey"}
                        autoCapitalize="none"
                        secureTextEntry
                        className={`p-5 border rounded-md ${
                          errors.password
                            ? "border-red-500 border-2 mt-5"
                            : "mt-7"
                        }`}
                      />
                      {errors.password && (
                        <Text className={`text-[#ff0000] text-xs`}>
                          {errors.password.message}
                        </Text>
                      )}
                    </>
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "Please confirm your password",
                    validate: (value) => value === getValues("password"),
                  }}
                  render={({ field }) => (
                    <>
                      <TextInput
                        value={field.value}
                        onChangeText={field.onChange}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        placeholderTextColor={"grey"}
                        autoCapitalize="none"
                        secureTextEntry
                        className={`p-5 border rounded-md ${
                          errors.confirmPassword
                            ? "border-red-500 border-2 mt-5"
                            : "mt-7"
                        }`}
                      />
                      {errors.confirmPassword && (
                        <Text className={`text-[#ff0000] text-xs`}>
                          {errors.confirmPassword.message}
                        </Text>
                      )}
                    </>
                  )}
                />
                <View className="mt-10">
                  <Text className="font-semibold text-secondary mb-3">
                    At least:
                  </Text>
                  <View className="flex-row gap-2 mb-2">
                    <View
                      className={`border border-secondary rounded p-1 px-2 ${
                        isMinChar && "bg-black"
                      }`}
                    >
                      <Text
                        className={`text-xs text-secondary ${
                          isMinChar && "text-white"
                        }`}
                      >
                        8 characters
                      </Text>
                    </View>
                    <View
                      className={`border border-secondary rounded p-1 px-2 ${
                        hasUppercase && "bg-black"
                      }`}
                    >
                      <Text
                        className={`text-xs ${hasUppercase && "text-white"}`}
                      >
                        An uppercase letter
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row gap-2">
                    <View
                      className={`border border-secondary rounded p-1 px-2 ${
                        hasLowercase && "bg-black"
                      }`}
                    >
                      <Text
                        className={`text-xs ${hasLowercase && "text-white"}`}
                      >
                        A lowercase letter
                      </Text>
                    </View>
                    <View
                      className={`border border-secondary rounded p-1 px-2 ${
                        hasNumber && "bg-black"
                      }`}
                    >
                      <Text className={`text-xs ${hasNumber && "text-white"}`}>
                        A number
                      </Text>
                    </View>
                  </View>
                </View>
                {/* </KeyboardAvoidingView> */}
                <View className="mt-14">
                  <TouchableOpacity
                    onPress={async () => {
                      if ((await validationChecker()) && !loading)
                        registerHandler();
                    }}
                    className={`items-center p-4 rounded-xl ${
                      hasNumber && hasUppercase && hasLowercase && isMinChar
                        ? "bg-black"
                        : "bg-black opacity-75"
                    }`}
                    disabled={
                      !hasLowercase && !hasNumber && !hasUppercase && !isMinChar
                    }
                  >
                    {loading ? (
                      <ActivityIndicator color="white" />
                    ) : (
                      <Text className="text-white">Register</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterTwoScreen;
