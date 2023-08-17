import React, {
  useLayoutEffect,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/auth/authActions";

const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [email, setEmail] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [password, setPassword] = useState("");

  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
    trigger,
    setValue,
    getValues,
    reset,
  } = useForm();

  const submitHandler = async ({
    userType,
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  }) => {
    console.log("test");
    const data = {
      userType,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };
    console.log(data);
    // dispatch(makeRequest(data));
  };

  const registerHandler = async () => {
    // console.log(
    const userType = watch("userType");
    const firstName = watch("firstName");
    const lastName = watch("lastName");
    const email = watch("email");
    const phoneNumber = watch("phoneNumber");
    const password = watch("password");
    // );

    const data = {
      userType,
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };

    console.log(data);
    dispatch(registerUser(data));
    handleSubmit(submitHandler);
  };

  return (
    <RegisterContext.Provider
      value={{
        // userType,
        // setUserType,
        // firstName,
        // setFirstName,
        // lastName,
        // setLastName,
        // email,
        // setEmail,
        // phoneNumber,
        // setPhoneNumber,
        // password,
        // setPassword,
        handleSubmit,
        submitHandler,
        setValue,
        getValues,
        errors,
        watch,
        control,
        trigger,
        reset,
        registerHandler,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterContext, RegisterProvider };
