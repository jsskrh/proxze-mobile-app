import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MapPinIcon, NoSymbolIcon } from "react-native-heroicons/solid";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
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
import AboutProxzi from "../components/Task/AboutProxzi";
// import Offers from "../components/Task/Offers";
import { timeAgo, shortenId } from "../utils/helpers";

const task = {
  id: "64391815e99e092cf77b97ad",
  type: "Consultation",
  description:
    "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
  timeline: [
    {
      status: "created",
      timestamp: "2023-04-14T09:08:37.481Z",
      _id: "64391815e99e092cf77b97ae",
    },
    {
      status: "approved",
      timestamp: "2023-04-14T09:09:36.364Z",
      _id: "64391850e99e092cf77b97d6",
    },
    {
      status: "assigned",
      timestamp: "2023-04-19T07:47:52.038Z",
      _id: "643f9ca9261473e60da204a2",
    },
    {
      status: "started",
      timestamp: "2023-04-19T07:48:47.382Z",
      _id: "643f9cdf261473e60da2052f",
    },
    {
      status: "completed",
      timestamp: "2023-04-19T07:52:14.139Z",
      _id: "643f9daf261473e60da20645",
    },
  ],
  lga: "Apapa",
  state: "Lagos",
  bill: 4572288,
  occupation: "Physicists",
  educationLevel: "OND",
  skillLevel: "Skilled",
  isCertified: true,
  searchRange: "LGA",
  timeBlock: "Day",
  paymentStatus: true,
  yearsOfExperience: "4-6 years",
  startDate: "2023-04-15T00:00:00.000Z",
  endDate: "2023-04-17T00:00:00.000Z",
  principalReview: false,
  proxziReview: false,
  principal: {
    id: "641a27bd5bb881c39313c9ea",
    name: "Jesse Akorah",
    rating: 3,
    reviews: 1,
    createdAt: "2023-03-21T21:55:09.132Z",
  },
  proxzi: {
    id: "642aa17e47159b317ef5cbbe",
    name: "Test1 Akorah",
    rating: 4,
    reviews: 1,
    createdAt: "2023-04-03T09:50:54.244Z",
  },
  offers: [
    {
      proxzi: {
        id: "642aa17e47159b317ef5cbbe",
        name: "Test1 Akorah",
        rating: null,
        reviews: 1,
        createdAt: "2023-04-03T09:50:54.244Z",
      },
      coverLetter:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi veniam laudantium ducimus! Debitis exercitationem eius possimus suscipit laboriosam atque tempore non repudiandae blanditiis sit. Voluptatem saepe est eaque maiores dolor?\nQuisquam vitae enim voluptates asperiores dolore mollitia iure magnam ab, saepe molestias omnis sapiente iusto, ea, perferendis exercitationem recusandae. Nam sint ipsum voluptate voluptas amet quo similique asperiores illo dolores.\nAssumenda totam nemo accusantium sed. Id delectus rem at nam maxime, minus reprehenderit dicta doloremque provident a deserunt dolor explicabo hic illum, magni nobis. Optio sint tempore velit odio quos!",
      timestamp: "2023-04-19T07:45:20.774Z",
    },
  ],
  attachments: [
    {
      url: "https://images.unsplash.com/photo-1681238339230-ad333583139e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1097&q=80",
      location: "Apapa",
      timestamp: "2023-04-19T07:52:00.033Z",
      _id: "643f9da1261473e60da20631",
    },
  ],
  live: false,
  createdAt: "2023-04-14T09:08:37.489Z",
};

const style = {
  topSubSection: `text-sm mb-1 flex-row justify-between mx-5`,
  occupation: `mb-[5px] text-white`,
  sinceTime: `mb-5 text-gray-400`,
  locationContainer: `flex-row items-center`,
  bill: `font-semibold text-white`,
};

const TasksScreen = ({ navigation: { navigate, goBack } }) => {
  const [taskStatus, setTaskStatus] = useState("");
  const [isTabVisible, setTabVisible] = useState(true);

  const bottomContentRef = useRef(null);

  // Function to handle ScrollView scroll event
  const handleScroll = (event) => {
    const { y } = event.nativeEvent.contentOffset;
    const windowHeight = Dimensions.get("window").height;
    const scrollViewHeight = event.nativeEvent.contentSize.height;

    // Measure the position of the bottomContent
    bottomContentRef.current.measure((x, y, width, height, pageX, pageY) => {
      const bottomContentPosition = pageY + height;

      // Hide the BlurView when the bottomContent comes into view
      setTabVisible(y < bottomContentPosition);
    });
  };

  useEffect(() => {
    if (task) {
      setTaskStatus(task.timeline[task.timeline.length - 1].status);
    }
    // setReviewFormState(
    //   taskStatus === "confirmed" &&
    //     (task.proxzi.id === userInfo.id
    //       ? !task.proxziReview
    //       : task.principal.id === userInfo.id && !task.principalReview)
    // );
  }, [task]);

  const tabConfig = { title: "Task", headerTitle: "Tasks" };

  return (
    <TabLayout config={tabConfig}>
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
        <View>
          <View className={style.topSubSection}>
            <View>
              <Text className={style.occupation}>{task.occupation}</Text>
              <Text className={style.sinceTime}>
                Posted{" "}
                {timeAgo(
                  task.timeline.length === 1
                    ? task.timeline.find((block) => block.status === "created")
                        .timestamp
                    : task.timeline.find((block) => block.status === "approved")
                        .timestamp
                )}
              </Text>
              <Text className={style.locationContainer}>
                <MapPinIcon size={16} color="#91e6b3" />
                <Text className="text-gray-500 ml-2">
                  {task.lga}, {task.state}
                </Text>
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
            // (task.proxzi.id === userInfo.id ||
            //   task.principal.id === userInfo.id ||
            //   userInfo.userType === "admin") &&
            <Attachments
              // setPopup={setPopupState}
              attachments={task.attachments}
              isProxzi={
                // userInfo.id === task.proxzi.id || userInfo.userType === "admin"
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

          <Details task={task} />

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
                      isProxzi={userInfo.userType === "proxzi"}
                    /> */}
              {/* )} */}
            </>
          )}

          <Timeline timeline={task.timeline} />

          <View className="py-7 mx-5 border-b border-gray-600">
            <AboutPrincipal principal={task.principal} />
            {task.timeline.find((block) => block.status === "assigned") && (
              <AboutProxzi proxzi={task.proxzi} />
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
            <TouchableOpacity className="p-4 items-center bg-[#38a139] rounded-lg">
              <Text className="text-white capitalize font-semibold text-base">
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {isTabVisible && (
        <BlurView
          tint="dark"
          intensity={65}
          className="pt-5 px-5 absolute left-0 right-0 bottom-0"
        >
          <TouchableOpacity className="p-3 items-center bg-[#38a139] rounded-lg">
            <Text className="text-white capitalize font-semibold text-base">
              Confirm
            </Text>
          </TouchableOpacity>
        </BlurView>
      )}
    </TabLayout>
  );
};

export default TasksScreen;
