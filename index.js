/**
 * @format
 */
import React from "react";
import {AppRegistry,Text,View} from 'react-native';
import {name as appName} from './app.json';
import Header from "./src/header";
import Albumrender from "./src/Albumrender";
import { RNCamera } from 'react-native-camera';
import Cams from './src/camera'
import Qr from './src/qrcode'
import Qrgen from './src/qrgen'
import Login from './src/home'
import SellBuy from './src/sellbuy'
import Sellp from './src/Sellp'
import Sellf from './src/Sellf'
import Buyp from './src/Buyp'
import Buyf from './src/Buyf'
import {createSwitchNavigator, createAppContainer} from 'react-navigation'


const AppSwitchNavigator = createSwitchNavigator({
    Login: {screen: Login },
    SB : {screen: SellBuy},
    Sellp: {screen: Sellp},
    Sellf:{screen: Sellf},
    Buyp : {screen: Buyp},
    Buyf : {screen: Buyf}
});

const AppContainer = createAppContainer(AppSwitchNavigator)


const App = () =>{
    return(
        // <View style={{ height: 20,width: 40,left:0, bottom:0, position: 'absolute',borderWidth: 1, borderColor:'green'}}>
        //         <Text>hii</Text>
        // </View>
        // <Login />
        // <SellBuy />
        // <Sellp />
         <AppContainer />
        // <Buyf />
        // {/* <View style={{ borderColor:'black', borderWidth: 3,justifyContent:'center',alignItems:'center', height:'100%'}}>    
        // <View style={{borderColor:'red', borderWidth: 3,width: '80%'}}>
        // <Text>hiii</Text>
        // </View>
        // </View> */}
        // {/* <Header text="HI there" /> */}
        //   {/* <Cams /> */}
        // <Qr /> 
        // <Qrgen />
    );
}




AppRegistry.registerComponent(appName, () => App);
