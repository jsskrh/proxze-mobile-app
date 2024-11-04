import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from "react-native";
import { NodePublisher } from "react-native-nodemediaclient";

const StreamScreen = ({
  route: {
    params: { taskId },
  },
}) => {
  const cameraRef = useRef(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [frontCamera, setFrontCamera] = useState(false);
  const [torchEnable, setTorchEnable] = useState(false);
  const [mute, setMute] = useState(false);

  const startPreview = () => {
    if (cameraRef.current) {
      cameraRef.current.startPreview();
      setIsPreviewing(true);
    }
  };

  const stopPreview = () => {
    if (cameraRef.current) {
      cameraRef.current.stopPreview();
      setIsPreviewing(false);
    }
  };

  const startStream = () => {
    if (cameraRef.current) {
      cameraRef.current.start();
      setIsStreaming(true);
    }
  };

  const stopStream = () => {
    if (cameraRef.current) {
      cameraRef.current.stop();
      setIsStreaming(false);
    }
  };

  return (
    <View style={styles.container}>
      <NodePublisher
        ref={cameraRef}
        style={{ flex: 1 }}
        url={`rtmp://172.20.10.3:1935/live/${taskId}`}
        audioParam={{
          codecid: NodePublisher.NMC_CODEC_ID_AAC,
          profile: NodePublisher.NMC_PROFILE_AUTO,
          samplerate: 48000,
          channels: 1,
          bitrate: 64 * 1000,
        }}
        videoParam={{
          codecid: NodePublisher.NMC_CODEC_ID_H264,
          profile: NodePublisher.NMC_PROFILE_AUTO,
          width: 720,
          height: 1280,
          fps: 30,
          bitrate: 2000 * 1000,
        }}
        autopreview={true}
        frontCamera={frontCamera}
        HWAccelEnable={true}
        denoiseEnable={true}
        torchEnable={torchEnable}
        keyFrameInterval={2}
        volume={mute ? 0.0 : 1.0}
        videoOrientation={NodePublisher.VIDEO_ORIENTATION_PORTRAIT}
      ></NodePublisher>
      <Button
        title={isPreviewing ? "Stop Previewing" : "Start Previewing"}
        onPress={isPreviewing ? stopPreview : startPreview}
      />
      <Button
        title={isStreaming ? "Stop Streaming" : "Start Streaming"}
        onPress={isStreaming ? stopStream : startStream}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
});

export default StreamScreen;
