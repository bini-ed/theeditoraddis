import React, { Component } from "react";
import {
  View,
  BackHandler,
  Platform,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";

import { WebView } from "react-native-webview";
import NetInfo from "@react-native-community/netinfo";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true, isNetWorking: false };
  }

  hideSpinner = () => {
    this.setState({ visible: false });
  };
  showSpinner = () => {
    this.setState({ visible: true });
  };

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
    // console.log(this.state.isNetWorking);
    return (
      <View style={{ flex: 1 }}>
        <WebView
          onLoadStart={() => this.showSpinner()}
          onLoad={() => this.hideSpinner()}
          style={styles.WebViewStyle}
          ref={(webView) => {
            this.webView.ref = webView;
          }}
          renderError={(error) => <Text>{error}</Text>}
          onNavigationStateChange={(navState) => {
            this.webView.canGoBack = navState.canGoBack;
          }}
          source={{ uri: "https://theeditoraddis.com" }}
        />
        {this.state.visible && (
          <ActivityIndicator
            color="grey"
            style={styles.activityIndicatorStyle}
            size={50}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  WebViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: StatusBar.currentHeight,
  },
  activityIndicatorStyle: {
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
