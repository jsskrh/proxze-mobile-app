import React, {
  useLayoutEffect,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { Controller, useForm } from "react-hook-form";

const RequestContext = createContext();

const RequestProvider = ({ children }) => {
  const [userType, setUserType] = useState("");

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
    requestType,
    description,
    startDate,
    endDate,
    location,
  }) => {
    const data = {
      requestType,
      description,
      startDate,
      endDate,
      location,
    };
    console.log(data);
    // dispatch(makeRequest(data));
  };

  return (
    <RequestContext.Provider
      value={{
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
    </RequestContext.Provider>
  );
};

export { RequestContext, RequestProvider };
