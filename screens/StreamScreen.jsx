import {
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useState, useRef } from "react";
import { NodeCameraView } from "react-native-nodemediaclient";

const StreamScreen = () => {
  const [isPublish, setIsPublish] = useState(false);
  const [publishBtnTitle, setPublishBtnTitle] = useState("Start Publish");
  const vbRef = useRef(null);

  const togglePublish = () => {
    if (isPublish) {
      setPublishBtnTitle("Start Publish");
      setIsPublish(false);
      vbRef.current.stop();
    } else {
      setPublishBtnTitle("Stop Publish");
      setIsPublish(true);
      vbRef.current.start();
    }
  };

  return (
    <View>
      {/* <NodeCameraView
        style={{ height: 400 }}
        ref={(vb) => {
          this.vb = vb;
        }}
        outputUrl={"rtmp://192.168.0.10/live/stream"}
        camera={{ cameraId: 1, cameraFrontMirror: true }}
        audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
        video={{
          preset: 12,
          bitrate: 400000,
          profile: 1,
          fps: 15,
          videoFrontMirror: false,
        }}
        autopreview={true}
      /> */}

      {/* <Button title="request permissions" onPress={requestCameraPermission} /> */}
      {/* <Button
        onPress={() => {
          if (this.state.isPublish) {
            this.setState({
              publishBtnTitle: "Start Publish",
              isPublish: false,
            });
            this.vb.stop();
          } else {
            this.setState({ publishBtnTitle: "Stop Publish", isPublish: true });
            this.vb.start();
          }
        }}
        title={this.state.publishBtnTitle}
        color="#841584"
      /> */}

      <NodeCameraView
        style={{ height: 400 }}
        ref={vbRef}
        outputUrl={"rtmp://192.168.0.10/live/stream"}
        camera={{ cameraId: 1, cameraFrontMirror: true }}
        audio={{ bitrate: 32000, profile: 1, samplerate: 44100 }}
        video={{
          preset: 12,
          bitrate: 400000,
          profile: 1,
          fps: 15,
          videoFrontMirror: false,
        }}
        autopreview={true}
      />
      <Button onPress={togglePublish} title={publishBtnTitle} color="#841584" />
    </View>
  );
};

export default StreamScreen;
