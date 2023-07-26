import React, {
  useLayoutEffect,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { Controller, useForm } from "react-hook-form";

const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {
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
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterContext, RegisterProvider };
