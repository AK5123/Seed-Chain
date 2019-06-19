import React, { Component } from 'react';
 
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
  Dimensions
} from 'react-native';
 
import QRCodeScanner from 'react-native-qrcode-scanner';

class ScanScreen extends Component {
  onSuccess = (e) => {
    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
    // this.scanner.reactivate();
    console.log(JSON.parse(e.data).rem)

  }
 
  render() {
    return (
     
      <QRCodeScanner
        ref={(node) => { this.scanner = node }}
        reactivate = { true }
        showMarker = {true}
        markerStyle = {{ borderColor: 'rgb(0,122,255)'}}
        containerStyle = { styles.outer}
        cameraStyle={styles.inner}
        onRead={this.onSuccess}
        // topContent={
        //   <Text style={styles.centerText}>
        //     Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
        //   </Text>
        // }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.scanner.reactivate()}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
      />
    
    );
  }
}
 
const abs = (Dimensions.get('window').width)/2 ;
const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  inner: {
    // borderWidth: 2, 
    // borderColor: 'red',
    height: Dimensions.get('window').height / 2 ,
    width: Dimensions.get('window').width 

    // paddingLeft: 20
  },
  outer: {
    //   marginLeft: '20%',
    //   paddingLeft: 60,
    //   right: 60
    height: Dimensions.get('window').height,

    
  }
});
 
export default ScanScreen;