import React, { Component } from 'react'
import QRCode from 'react-native-qrcode';
 
import {
    View,
    TextInput
} from 'react-native';
 
class HelloWorld extends Component {
  state = {
    text: '{dsgsg}',
  };
 
  render() {
    return (
        <View style={styles.contain}>
            <QRCode
            value={this.state.text}
            size={200}
            bgColor='black'
            fgColor='white'/>
        </View>

        // {/* <TextInput
        //   style={styles.input}
        //   onChangeText={(text) => this.setState({text: text})}
        //   value={this.state.text}
        // /> */}
        
    
    );
  };
}
 
const styles =({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },
    contain: {
        alignItems: 'center',
        borderWidth: 3,
        // backgroundColor: 'rgb(0,255,0)',
        // borderColor: 'red'
    }
});

export default HelloWorld