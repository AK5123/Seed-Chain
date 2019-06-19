import React, {Component} from "react";
import {AppRegistry,Text,View} from 'react-native';
import { RNCamera } from 'react-native-camera';


class Cams extends Component{
    render(){
        return(
        <View style={styles.container}>
            <RNCamera
            ref={ref => {
                this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.front}
            flashMode={RNCamera.Constants.FlashMode.on}
            androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
            }}
            onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
            }}
            />
        </View>
        )
    }
}

const styles = {
    container: {
    //   flex: 1,
    //   borderWidth:3,
      marginTop: 100,
      height:400,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    //   backgroundColor: 'black',
    },
    preview: {
      width: 250,
      height: 250,
    //   flex:1,   
    //   justifyContent: 'space-around',
    //   position: 'relative'
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  };

export default Cams;