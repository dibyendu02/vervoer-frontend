import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  ProgressBarAndroid,
  Dimensions,
} from "react-native";
import React, { useRef } from "react";
import { WebView } from "react-native-webview";
import { Colors } from "../../global";

const Width = () => {
  return Dimensions.get("window").width / 100;
};

const Webview = ({ navigation, route: { params } }) => {
  //   console.log(params);
  const { url, title } = params;
  const [progress, setProgress] = React.useState(0);
  const webViewRef = useRef(null);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* header */}
      <View style={styles.container1}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: Width() * 4,
          }}
        >
          {/* <Pressable
              android_ripple={{
                color: "#fff",
                borderless: false,
                radius: Width() * 6,
              }}
              style={{
                height: Width() * 12,
                width: Width() * 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="left" size={24} color={"#fff"} />
            </Pressable> */}
          <Text
            style={{
              color: "#fff",
              fontSize: Width() * 5,
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
        </View>
      </View>

      {progress < 1 ? (
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={progress}
          color={Colors.PRIMARY}
          style={{
            height: Width() * 2,
            backgroundColor: "#fff",
          }}
        />
      ) : null}

      {progress < 1 ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator color={Colors.PRIMARY} size="large" />
        </View>
      ) : null}

      {/* webview */}
      <WebView
        source={{
          uri: url + "",
        }}
        ref={webViewRef}
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator color={Colors.PRIMARY} />}
        onLoadProgress={(e) => {
          setProgress(e.nativeEvent.progress);
        }}
        onNavigationStateChange={(e) => {
          if (
            e.url.includes(
              "https://keder-code-hash.github.io/vorzo_web_pages/error"
            )
          ) {
            navigation.navigate("Home");
          } else if (
            e.url.includes(
              "https://keder-code-hash.github.io/vorzo_web_pages/success"
            )
          ) {
            navigation.goBack();
          }
          console.log("url: ", e.url);
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default Webview;

const styles = StyleSheet.create({
  container1: {
    backgroundColor: "#fff",
    height: Width() * 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Width(),
    justifyContent: "space-between",
  },
});
