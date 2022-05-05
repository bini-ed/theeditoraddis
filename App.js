import React, { Component } from "react";
import {
  View,
  BackHandler,
  ActivityIndicator,
  Platform,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

import { WebView } from "react-native-webview";
import NetInfo from "@react-native-community/netinfo";
import LandingPage from "./components/landingPage";

const { width, height } = Dimensions.get("screen");
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isNetWorking: false,
    };
  }
  unsubscribe = null;
  webView = {
    canGoBack: false,
    ref: null,
  };
  ActivityIndicatorElement() {
    return (
      <View>
        <ActivityIndicator color="#009688" size="large" />
      </View>
    );
  }
  onAndroidBackPress = () => {
    if (this.webView.canGoBack && this.webView.ref) {
      this.webView.ref.goBack();
      return true;
    }
    return false;
  };

  componentDidMount() {
    unsubscribe = NetInfo.addEventListener((netInfo) =>
      this.setState({
        ...this.state,
        isNetWorking: netInfo.isInternetReachable,
      })
    );
    if (Platform.OS === "android") {
      BackHandler.addEventListener(
        "hardwareBackPress",
        this.onAndroidBackPress
      );
    }
  }

  componentWillUnmount() {
    unsubscribe === null ? unsubscribe() : null;
    if (Platform.OS === "android") {
      BackHandler.removeEventListener("hardwareBackPress");
    }
  }

  render() {
    const { isNetWorking } = this.state;

    return (
      // <SafeAreaView style={{ flex: 1 }}>
      //   <View style={styles.container}>
      //     {/* {isNetWorking ? (
      //     <View style={{ alignSelf: "center", justifyContent: "center" }}>
      //     <Text style={{ fontSize: 15, marginVertical: 5 }}>
      //     Oops! Seems like you lost your connection
      //       </Text>
      //       <TouchableOpacity
      //       style={styles.tryAgainBtn}
      //       onPress={() =>
      //           this.setState({
      //             ...this.state.visible,
      //             isNetWorking: !isNetWorking,
      //           })
      //         }
      //         >
      //         <Text style={styles.netErrorText}>Try Again</Text>
      //         </TouchableOpacity>
      //         </View>
      //         ) : (
      //         <> */}
      //     {this.state.visible && (
      //       <View style={styles.activityIndicatorStyle}>
      //         <ActivityIndicator
      //           color="grey"
      //           size={50}
      //           style={styles.activityIndicatorStyle}
      //         ></ActivityIndicator>
      //       </View>
      //     )}
      //     <WebView
      //       ref={(webView) => {
      //         this.webView.ref = webView;
      //       }}
      //       onNavigationStateChange={(navState) => {
      //         this.webView.canGoBack = navState.canGoBack;
      //       }}
      //       onError={() => (
      //         <TouchableOpacity
      //           style={styles.tryAgainBtn}
      //           onPress={() =>
      //             this.setState({
      //               ...this.state.visible,
      //               isNetWorking: !isNetWorking,
      //             })
      //           }
      //         >
      //           <Text style={styles.netErrorText}>Try Again</Text>
      //         </TouchableOpacity>
      //       )}
      //       automaticallyAdjustContentInsets={false}
      //       source={{ uri: "https://theeditoraddis.com" }}
      //       javaScriptEnabled={true}
      //       domStorageEnabled={true}
      //       // renderLoading={this.ActivityIndicatorElement}
      //       startInLoadingState={true}
      //       onLoadStart={() => {
      //         this.setState({ visible: true });
      //       }}
      //       onLoad={() => {
      //         this.setState({ visible: false });
      //       }}
      //       style={styles.WebViewStyle}
      //     />
      //     {/* </>
      //   )} */}
      //   </View>
      // </SafeAreaView>
      <LandingPage />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  modal: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  WebViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  tryAgainBtn: {
    backgroundColor: "tomato",
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: "50%",
    alignSelf: "center",
  },
  netErrorText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    // zIndex: 1,
  },
});
