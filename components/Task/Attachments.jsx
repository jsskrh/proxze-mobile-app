// import { Link } from "react-router-dom";
import { PlayIcon, PlusCircleIcon } from "react-native-heroicons/outline";
// import Attachment from "./Attachment";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const style = {
  subSection: `py-7 border-b mx-5 border-gray-600`,
  subSectionHeader: `text-xl mb-5 text-white`,
  attachments: `text-sm flex-row gap-x-6`,
  addAttachmentContainer: `justify-center flex-row`,
  addAttachment: `h-28 w-[88px] border-4 border-primary flex-row justify-center items-center`,
  heroIcon: `h-12 w-12`,
};

const Attachments = ({
  setPopup,
  attachments,
  isProxzi,
  started,
  isPrincipal,
  task,
  proxzeStream,
}) => {
  return (
    <View className={style.subSection}>
      <Text className={`${style.subSectionHeader} text-white`}>Streams</Text>
      <View className={style.attachments}>
        {/* {isPrincipal && (
          <>
            <Link to={`/tasks/${task}/zegolive`}>
              <View
                className={`h-28 border mb-1 relative bg-black cursor-pointer overflow-hidden flex justify-center items-center`}
              >
                <p className="text-white bg-red-700 absolute top-0 right-0 px-2 py-1">
                  LIVE
                </p>

                <View
                  className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`}
                >
                  <PlayIcon className={`h-6 w-6 text-primary`} />
                </View>
              </View>
            </Link>

            {proxzeStream.isLive && (
              <Link to={`/tasks/${task}/live`}>
                <View
                  className={`h-28 border mb-1 relative bg-black cursor-pointer overflow-hidden flex justify-center items-center`}
                >
                  <p className="text-white bg-red-700 absolute top-0 right-0 px-2 py-1">
                    LIVE
                  </p>

                  <View
                    className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`}
                  >
                    <PlayIcon className={`h-6 w-6 text-primary`} />
                  </View>
                </View>
              </Link>
            )}
          </>
        )} */}
        {/* {started && isProxzi && (
          <View className={style.addAttachmentContainer}>
            <TouchableOpacity
              className={style.addAttachment}
              // onClick={() => setPopup("upload")}
            >
              <PlusCircleIcon className={style.heroIcon} />
            </TouchableOpacity>
          </View>
        )} */}
        {/* {attachments.map((attachment) => (
          <Attachment attachment={attachment} />
        ))} */}
      </View>
    </View>
  );
};

export default Attachments;
