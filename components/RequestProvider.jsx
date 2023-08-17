import React, {
  useLayoutEffect,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
// import { makeRequest } from "../redux/task/taskActions";

const RequestContext = createContext();

const RequestProvider = ({ children }) => {
  const { location } = useSelector((state) => state.task);
  const { userToken } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    formState: { errors },
    watch,
    control,
    trigger,
    setValue,
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      type: "Confirmation/Validation",
      description: "",
      startDate: "",
      endDate: "",
    },
  });

  return (
    <RequestContext.Provider
      value={{
        handleSubmit,
        // submitHandler,
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
