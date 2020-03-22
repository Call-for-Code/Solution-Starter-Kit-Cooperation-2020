import React, { useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import Config from 'react-native-config';
import Geolocation from '@react-native-community/geolocation';

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1
  }
});

const hereApikey = Config.HERE_APIKEY;

const Map = () => {
  const webView = useRef(null);

  const onMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data);

    if (message.status && message.status === 'initialized') {
      Geolocation.getCurrentPosition((position) => {
        sendMessage(position);
      });
    }
  };

  const sendMessage = (data) => {
    const message = 
      `(function() {
        document.dispatchEvent(new MessageEvent('message', {data: ${JSON.stringify(data)}}));
      })()`;

    webView.current.injectJavaScript(message);
  }

  const sourceUri = (Platform.OS === 'android' ? 'file:///android_asset/' : '') + 'Web.bundle/loader.html';
  const injectedJS = `
    if (!window.location.search) {
      var link = document.getElementById('progress-bar');
      link.href = './site/here.html?apikey=${hereApikey}';
      link.click();
    }
  `;

  return (
    <View style={styles.mapContainer}>
      <WebView          
        injectedJavaScript={injectedJS}
        source={{ uri: sourceUri }}
        javaScriptEnabled={true}
        originWhitelist={['*']}
        allowFileAccess={true}
        onMessage={onMessage}
        ref={webView}
      />
    </View>
  );
};

export default Map;
