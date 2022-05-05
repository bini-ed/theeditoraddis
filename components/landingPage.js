// import React, {Component} from 'react';
// import {
//   View,
//   BackHandler,
//   Platform,
//   StyleSheet,
//   StatusBar,
//   Text,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';

// import {WebView} from 'react-native-webview';
// import NetInfo from '@react-native-community/netinfo';

// export default class LandingPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {visible: true, isNetWorking: false};
//   }

//   hideSpinner = () => {
//     this.setState({visible: false});
//   };
//   showSpinner = () => {
//     this.setState({visible: true});
//   };

//   unsubscribe = null;
//   webView = {
//     canGoBack: false,
//     ref: null,
//   };
//   ActivityIndicatorElement() {
//     return (
//       <View>
//         <ActivityIndicator color="#009688" size="large" />
//       </View>
//     );
//   }
//   onAndroidBackPress = () => {
//     if (this.webView.canGoBack && this.webView.ref) {
//       this.webView.ref.goBack();
//       return true;
//     }
//     return false;
//   };

//   componentDidMount() {
//     unsubscribe = NetInfo.addEventListener(netInfo =>
//       this.setState({
//         isNetWorking: netInfo.isInternetReachable,
//       }),
//     );
//     if (Platform.OS === 'android') {
//       BackHandler.addEventListener(
//         'hardwareBackPress',
//         this.onAndroidBackPress,
//       );
//     }
//   }

//   componentWillUnmount() {
//     unsubscribe === null ? unsubscribe() : null;
//     if (Platform.OS === 'android') {
//       BackHandler.removeEventListener('hardwareBackPress');
//     }
//   }

//   render() {
//     const {isNetWorking} = this.state;
//     console.log(this.state.isNetWorking);
//     return (
//       <View
//         style={{
//           flex: 1,
//         }}>
//         <WebView
//           onLoadStart={() => this.showSpinner()}
//           onLoad={() => this.hideSpinner()}
//           style={styles.WebViewStyle}
//           ref={webView => {
//             this.webView.ref = webView;
//           }}
//           onError={
//             error =>
//               Alert.alert(
//                 'No Internet connection',
//                 'you are offline check your connection',
//                 [
//                   {
//                     text: 'Try Again',
//                     onPress: () => this.setState({visible: true}),
//                   },
//                 ],
//                 {cancelable: false},
//               )
//             // <TouchableOpacity
//             //   style={styles.tryAgainBtn}
//             //   onPress={() =>
//             //     this.setState({
//             //       ...this.state.visible,
//             //       // isNetWorking: !isNetWorking,
//             //     })
//             //   }>
//             //   <Text style={styles.netErrorText}>{error}Try Again</Text>
//             // </TouchableOpacity>
//           }
//           // renderError={error => (
//           //   <TouchableOpacity
//           //     style={styles.tryAgainBtn}
//           //     onPress={() =>
//           //       this.setState({
//           //         ...this.state.visible,
//           //         // isNetWorking: !isNetWorking,
//           //       })
//           //     }>
//           //     <Text style={styles.netErrorText}>Try Again</Text>
//           //   </TouchableOpacity>
//           // )}
//           onNavigationStateChange={navState => {
//             this.webView.canGoBack = navState.canGoBack;
//           }}
//           source={{uri: 'https://theeditoraddis.com'}}
//         />

//         {this.state.visible && (
//           <ActivityIndicator
//             color="grey"
//             style={styles.activityIndicatorStyle}
//             size={50}
//           />
//         )}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   WebViewStyle: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   activityIndicatorStyle: {
//     flex: 1,
//     left: 0,
//     right: 0,
//     top: 0,
//     bottom: 0,
//     position: 'absolute',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   tryAgainBtn: {
//     backgroundColor: 'tomato',
//   },
// });

import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, StatusBar, View, BackHandler } from "react-native";
import { WebView } from "react-native-webview";

import Error from "./Error";
import LoadingIndicator from "./LoadingIndicator";

const LandingPage = () => {
  const uri = "https://theeditoraddis.com";
  const webview = useRef(null);
  const canGoBackRef = useRef(false);

  const [spinner, setSpinner] = useState(false);

  const onAndroidBackPress = () => {
    if (canGoBackRef.current && webview.current) {
      webview.current.goBack();
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
    }
    return () => {
      if (Platform.OS === "android") {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          onAndroidBackPress
        );
      }
    };
  }, []);
  const onNavigationStateChange = ({ canGoBack }) => {
    canGoBackRef.current = canGoBack;
  };
  const reload = () => webview.current.reload();

  return (
    <View style={styles.wrapper}>
      <WebView
        ref={webview}
        source={{ uri }}
        style={styles.webView}
        onNavigationStateChange={onNavigationStateChange}
        javaScriptEnabled
        domStorageEnabled
        renderLoading={() => <LoadingIndicator />}
        renderError={() => <Error reload={reload} />}
        startInLoadingState
        onLoadStart={() => setSpinner(true)}
        onLoad={() => setSpinner(false)}
      />
      {spinner && <LoadingIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default LandingPage;
