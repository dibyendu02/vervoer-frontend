import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
} from "react-native";
import React from "react";
import FocusAwareStatusBar from "../../components/FocusAwareStatusBar";
import { Colors } from "../../global";
import Header from "../../components/Header";
import { POSTCALL } from "../../global/server";
import CustomButton from "../../components/CustomButton";
import { retrieveData } from "../../utils/Storage";
import Spinner from "react-native-loading-spinner-overlay";
import { hideMessage, showMessage } from "react-native-flash-message";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDryCleanerImages,
  setDryCleanerImages,
} from "../../state/reducers/DrycleanerReducer";

const { height } = Dimensions.get("screen");

const DryCleaningImage = ({ navigation }) => {
  const [loader, setLoader] = React.useState(false);
  const { dryCleanerProfile } = useSelector((state) => state.drycleanerreducer);
  const disPatch = useDispatch();

  const openPrompt = () => {
    Alert.alert("Upload Image", "Upload Image From Camera Or Gallery", [
      {
        text: "Camera",
        onPress: async () => {
          let result = await launchCamera({
            mediaType: "photo",
            quality: 1,
          });
          uploadFile({
            uri: result.assets[0].uri,
            name: result.assets[0].fileName,
            type: result.assets[0].type,
          });
        },
        style: "default",
      },
      {
        text: "Gallery",
        onPress: async () => {
          let result = await launchImageLibrary({
            mediaType: "photo",
            quality: 1,
          });
          uploadFile({
            uri: result.assets[0].uri,
            name: result.assets[0].fileName,
            type: result.assets[0].type,
          });
        },
        style: "default",
      },
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
    ]);
  };

  const BASE_URL = "http://165.22.62.238";

  const uploadFile = async (imageData) => {
    setLoader(true);
    let formData = new FormData();
    let data = await retrieveData("userdetails");
    formData.append("userFile", imageData);
    try {
      let fileResponse = await POSTCALL(
        "api/user-file-upload",
        formData,
        data.token,
        "media"
      );
      disPatch(
        setDryCleanerImages({ imageName: fileResponse.responseData.filePath })
      );
      setLoader(false);
    } catch (error) {
      setLoader(false);
      showMessage({
        message: `${error.message}`,
        type: "danger",
        style: {
          alignItems: "center",
        },
        autoHide: true,
        duration: 1500,
      });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#4C4C4C" }}>
      <FocusAwareStatusBar isLightBar={false} isTopSpace={true} />
      {/* <Spinner visible={loader} textContent={'Loading...'} /> */}
      <View style={styles.screen}>
        <Header />
        <View
          style={{
            marginTop: 20,
          }}
        />
        <TouchableOpacity
          onPress={openPrompt}
          style={{
            width: 150,
            alignSelf: "flex-end",
            margin: 20,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              color: Colors.BLUE,
            }}
          >
            Upload Image
          </Text>
        </TouchableOpacity>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: height * 0.5,
          }}
        >
          {dryCleanerProfile.images.map((image, index) => {
            return (
              <View
                key={index}
                style={{
                  height: 150,
                  marginVertical: 20,
                  marginHorizontal: 10,
                  borderRadius: 20,
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{
                    uri: `${BASE_URL}${image.imageName}`,
                  }}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert("Delete Image", "Are you sure?", [
                      {
                        text: "Delete",
                        onPress: async () => {
                          disPatch(removeDryCleanerImages(index));
                        },
                        style: "default",
                      },
                      {
                        text: "Cancel",
                        onPress: async () => {
                          return;
                        },
                        style: "default",
                      },
                    ]);
                  }}
                  style={{
                    position: "absolute",
                    zIndex: 9999,
                    top: 10,
                    right: 20,
                  }}
                >
                  <Image
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                    source={require("../../assets/delete_button.png")}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
          <View style={{ height: height * 0.1 }} />
          <CustomButton
            customStyle={{
              backgroundColor: "#F99025",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              borderRadius: 25,
              marginHorizontal: 20,
            }}
            buttonText={"Next"}
            onPress={() => {
              navigation.navigate("About");
              // updateMerchantProfile();
            }}
            textStyle={{
              color: Colors.WHITE,
              fontSize: 20,
              fontWeight: "bold",
            }}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default DryCleaningImage;

const styles = StyleSheet.create({});
