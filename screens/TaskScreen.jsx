import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import {
  MapPinIcon,
  NoSymbolIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import TabLayout from "../components/TabLayout";
import Attachments from "../components/Task/Attachments";
import Details from "../components/Task/Details";
import Activity from "../components/Task/Activity";
import Timeline from "../components/Task/Timeline";
import AboutPrincipal from "../components/Task/AboutPrincipal";
import AboutProxze from "../components/Task/AboutProxze";
// import Offers from "../components/Task/Offers";
import { timeAgo, shortenId } from "../utils/helpers";
import { getTask } from "../redux/task/taskActions";
import { Paystack } from "react-native-paystack-webview";
import { PAYSTACK_PUBLIC_KEY } from "@env";
import { NodePlayerView } from "react-native-nodemediaclient";

const style = {
  topSubSection: `text-sm mb-1 flex-row justify-between mx-5`,
  occupation: `mb-[5px] text-white`,
  sinceTime: `mb-5 text-gray-400`,
  locationContainer: `flex-row gap-x-2 items-center`,
  bill: `font-semibold text-white`,
};

const TasksScreen = ({
  navigation: { navigate, goBack },
  route: {
    params: { taskId },
  },
}) => {
  const { userInfo, userToken } = useSelector((state) => state.auth);
  // const { success, error, loading, task } = useSelector((state) => state.task);

  const [loading, setLoading] = useState(true);
  const [task, setTask] = useState(null);
  const [pay, setPay] = useState(false);

  const fetcher = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.get(
        `https://proxze-backend-app.onrender.com/api/task/view/${taskId}`,
        config
      );
      setTask(data.data);
      setLoading(false);
      return data;
    } catch (error) {
      return error;
      // if (error.response && error.response.data.message) {
      //   return rejectWithValue(error.response.data.message);
      // } else {
      //   return rejectWithValue(error.message);
      // }
    }
  };

  const startTask = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `https://proxze-backend-app.onrender.com/api/task/view/${taskId}/admin/start-task`,
        { task: taskId, timestamp: Date.now() },
        config
      );
      setTask(data.data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return error;
    }
  };

  const completeTask = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `https://proxze-backend-app.onrender.com/api/task/view/${taskId}/proxze/complete-task`,
        { timestamp: Date.now() },
        config
      );
      setTask(data.data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return error;
    }
  };

  const makeRequestPayment = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        `https://proxze-backend-app.onrender.com/api/transaction/deposit/task/${taskId}`,
        { taskId },
        config
      );
      setTask(data.data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return error;
    }
  };

  const confirmTask = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const { data } = await axios.put(
        // `/api/task/view/${task}/principal/confirm-task`,
        `https://proxze-backend-app.onrender.com/api/transaction/transfer/task/${taskId}`,
        { timestamp: Date.now() },
        config
      );
      setTask(data.data);
      setLoading(false);
      return data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      return error;
    }
  };

  useEffect(() => {
    const test = fetcher();
    console.log(test);
    if (!loading) {
      setRefreshing(false);
      console.log("ongoingTasks", task);
    }
  }, [loading]);

  useEffect(() => {
    console.log("test", task);
  }, [task]);

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  const [taskStatus, setTaskStatus] = useState("");
  const [isTabVisible, setTabVisible] = useState(true);

  const bottomContentRef = useRef(null);

  // Function to handle ScrollView scroll event
  const handleScroll = (event) => {
    // if (task) {
    const { y } = event.nativeEvent.contentOffset;
    const windowHeight = Dimensions.get("window").height;
    const scrollViewHeight = event.nativeEvent.contentSize.height;

    // Measure the position of the bottomContent
    bottomContentRef.current.measure((x, y, width, height, pageX, pageY) => {
      const bottomContentPosition = pageY + height;

      // Hide the BlurView when the bottomContent comes into view
      setTabVisible(y < bottomContentPosition);
    });
    // }
  };

  // useEffect(() => {
  //   console.log(taskId);
  //   dispatch(getTask({ taskId, userToken: userInfo.userToken }));
  // }, [taskId]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (task) {
      console.log(task);
      setTaskStatus(task.timeline[task.timeline.length - 1].status);
    }
    // setReviewFormState(
    //   taskStatus === "confirmed" &&
    //     (task.proxze.id === userInfo.id
    //       ? !task.proxzeReview
    //       : task.principal.id === userInfo.id && !task.principalReview)
    // );
  }, [task]);

  const tabConfig = { title: "Task", headerTitle: "Tasks" };

  return (
    <TabLayout config={tabConfig}>
      {loading || !task ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <>
          <ScrollView
            className="flex-1"
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            <View className="my-3 mx-5 mb-12 flex-row items-center border-b pb-3 border-gray-600">
              <Text className="text-white text-3xl font-bold">{task.type}</Text>
              <View className="p-1 px-3 ml-5 rounded bg-blue-300">
                <Text className="text-blue-700 font-semibold">
                  {shortenId(task.id)}
                </Text>
              </View>
            </View>
            <View style={{ width }}>
              <View className={style.topSubSection}>
                <View>
                  <Text className={style.occupation}>All</Text>
                  {/* <Text className={style.occupation}>{task.occupation}</Text> */}
                  <Text className={style.sinceTime}>
                    Posted{" "}
                    {timeAgo(
                      // task.timeline.length === 1
                      //   ?
                      task.timeline.find((block) => block.status === "created")
                        .timestamp
                      // : task.timeline.find(
                      //     (block) => block.status === "approved"
                      //   ).timestamp
                    )}
                  </Text>
                  <Text className={style.locationContainer}>
                    <MapPinIcon size={16} color="#91e6b3" />
                    <Text className="text-gray-500">{task.location.label}</Text>
                  </Text>
                </View>
                <View>
                  <Text className={style.bill}>₦ {task.bill}</Text>
                </View>
              </View>
              <View className="py-5 pb-7 border-b mx-5 border-gray-600">
                <Text className="text-white leading-[22px]">
                  {task.description}
                </Text>
              </View>

              {task.timeline.find((block) => block.status === "started") && (
                // (task.proxze.id === userInfo.id ||
                //   task.principal.id === userInfo.id ||
                //   userInfo.userType === "admin") &&
                <Attachments
                  // setPopup={setPopupState}
                  attachments={task.attachments}
                  isProxze={
                    // userInfo.id === task.proxze.id || userInfo.userType === "admin"
                    true
                  }
                  isPrincipal={
                    // userInfo.id === task.principal.id ||
                    // userInfo.userType === "admin"
                    false
                  }
                  started={true}
                  // started={taskStatus === "started"}
                  task={task.id}
                  // proxzeStream={task.proxzeStream}
                />
              )}

              {/* {userInfo.userType === "principal" && (
                <NodePlayerView
                  style={{ height: 200 }}
                  ref={(vp) => {
                    this.vp = vp;
                  }}
                  inputUrl={"rtmp://192.168.0.10/live/stream"}
                  scaleMode={"ScaleAspectFit"}
                  bufferTime={300}
                  maxBufferTime={1000}
                  autoplay={true}
                />
              )} */}

              {/* {userInfo.userType === "proxze" && (
                <TouchableOpacity
                  className="py-7 mx-5 border-b border-gray-600 justify-between flex-row items-center"
                  onPress={() => navigate("Stream")}
                >
                  <Text className="text-white text-xl">Stream</Text>
                </TouchableOpacity>
              )} */}

              <Details task={task} />

              {userInfo.userType === "principal" && (
                <TouchableOpacity
                  className="py-7 mx-5 border-b border-gray-600 justify-between flex-row items-center"
                  onPress={() =>
                    navigate("Offers", { offers: task.offers, taskId: task.id })
                  }
                >
                  <Text className="text-white text-xl">Offers</Text>
                  <View className="flex-row gap-x-2 items-center">
                    <View
                      className={`h-7 w-7 items-center justify-center rounded-full ${
                        task.offers.length === 0
                          ? "bg-gray-600"
                          : "bg-[#38a139]"
                      }`}
                    >
                      <Text className="text-white">{task.offers.length}</Text>
                    </View>
                    <ChevronRightIcon color="grey" />
                  </View>
                </TouchableOpacity>
              )}

              {task.timeline.find((block) => block.status === "approved") && (
                <>
                  <Activity task={task} />
                  {/* {(task.principal.id === userInfo.id ||
              userInfo.userType === "admin") && ( */}
                  {/* <Offers
                task={task.id}
                offers={task.offers}
                assigned={task.timeline.find(
                  (block) => block.status === "assigned"
                )}
                isProxze={userInfo.userType === "proxze"}
              /> */}
                  {/* )} */}
                </>
              )}

              <Timeline timeline={task.timeline} />

              <View className="py-7 mx-5 border-b border-gray-600">
                <AboutPrincipal principal={task.principal} />
                {task.timeline.find((block) => block.status === "assigned") && (
                  <AboutProxze proxze={task.proxze} />
                )}
              </View>

              <View className="mx-5 py-7 border-b border-gray-600">
                <TouchableOpacity className="flex-row items-center gap-x-2">
                  <NoSymbolIcon color="rgb(239 68 68)" />
                  <Text className="text-xl text-red-500">Report</Text>
                </TouchableOpacity>
              </View>

              <View
                className="py-7 gap-y-5 mx-5"
                ref={bottomContentRef}
                // onLayout={() => {
                //   bottomContentRef.current.measureInWindow((x, y) => {
                //     // Update the position of the bottomContent relative to the window
                //     bottomContentRef.current.y = y;
                //   });
                // }}
              >
                {/* {taskStatus === "created" && task?.offers.length === 0 && (
                  <TouchableOpacity
                    className="p-3 items-center bg-[#38a139] rounded-lg"
                    onPress={() => navigate("Offer", { taskId })}
                  >
                    <Text className="text-white capitalize font-semibold text-base">
                      Make Offer
                    </Text>
                  </TouchableOpacity>
                )} */}
              </View>
            </View>
          </ScrollView>
          {isTabVisible && (
            <BlurView
              tint="dark"
              intensity={65}
              className="pt-5 px-5 absolute left-0 right-0 bottom-0"
            >
              {userInfo.userType === "proxze" &&
                (taskStatus === "created" && task.offers.length === 0 ? (
                  <TouchableOpacity
                    className="p-3 items-center bg-[#38a139] rounded-lg"
                    onPress={() => navigate("Offer", { taskId })}
                  >
                    <Text className="text-white capitalize font-semibold text-base">
                      Make Offer
                    </Text>
                  </TouchableOpacity>
                ) : taskStatus === "approved" &&
                  task.paymentStatus &&
                  userInfo.id === task.proxze.id ? (
                  <TouchableOpacity
                    className="p-3 items-center bg-[#38a139] rounded-lg"
                    onPress={() => startTask()}
                  >
                    <Text className="text-white capitalize font-semibold text-base">
                      Start Task
                    </Text>
                  </TouchableOpacity>
                ) : (
                  taskStatus === "started" &&
                  userInfo.id === task.proxze.id && (
                    <TouchableOpacity
                      className="p-3 items-center bg-[#38a139] rounded-lg"
                      onPress={() => completeTask()}
                    >
                      <Text className="text-white capitalize font-semibold text-base">
                        Complete Task
                      </Text>
                    </TouchableOpacity>
                  )
                ))}
              {userInfo.userType === "principal" &&
                (taskStatus === "assigned" && !task.paymentStatus ? (
                  <TouchableOpacity
                    className="p-3 items-center bg-[#38a139] rounded-lg"
                    onPress={() => setPay(true)}
                  >
                    <Text className="text-white capitalize font-semibold text-base">
                      Make Payment
                    </Text>
                  </TouchableOpacity>
                ) : (
                  taskStatus === "completed" && (
                    <TouchableOpacity
                      className="p-3 items-center bg-[#38a139] rounded-lg"
                      onPress={() => confirmTask()}
                    >
                      <Text className="text-white capitalize font-semibold text-base">
                        Confirm Task
                      </Text>
                    </TouchableOpacity>
                  )
                ))}
            </BlurView>
          )}
        </>
      )}
      {pay && (
        <View style={{ flex: 1 }}>
          <Paystack
            paystackKey={PAYSTACK_PUBLIC_KEY}
            amount={500}
            billingEmail={userInfo.email}
            billingMobile={userInfo.phone}
            activityIndicatorColor="green"
            onCancel={(e) => {
              // handle response here
              console.log(e);
              // Toast.show("Transaction Cancelled!!", {
              //   duration: Toast.durations.LONG,
              // });
            }}
            onSuccess={(response) => {
              // handle response here
              // console.log(response);
              const responseObject = response.transactionRef.message;
              console.log(responseObject);
              if (responseObject === "Approved") {
                // setTransactionRef(response.transactionRef);
                makeRequestPayment();
              } else {
                console.log("fail");
                // console.log(response);
              }
            }}
            autoStart={pay}
          />
        </View>
      )}
    </TabLayout>
  );
};

export default TasksScreen;
