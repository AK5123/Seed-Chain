import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import Card from './assets/card'
import Header from './header'
import QRCodeScanner from 'react-native-qrcode-scanner';
// import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

// class Name extends Component{
//     render(){
//         console.log(this.props.navigation.dangerouslyGetParent().getParam('userdata'))
//         return(
//         <Text>Hiii</Text>
//         )
//     }
// }

// class Details extends Component{
//     render(){
//         return(
//         <Text>Byee</Text>
//         )
//     }
// }

// const AppTabNavigator = createBottomTabNavigator({
//     Name,
//     Details
//   },
//   {
//     defaultNavigationOptions: ({ navigation }) => ({
//       tabBarIcon: ({ focused, horizontal, tintColor }) => {
//         const { routeName } = navigation.state;
//         if (routeName === 'Name') {
//           return (
//             <Image
//               source={ require('./assets/home.png') }
//               style={{ width: 20, height: 20, }} />
//           );
//         } else {
//           return (
//             <Image
//               source={ require('./assets/settings.png') }
//               style={{ width: 20, height: 20 }} />
//           );
//         }
//       },
//     }),
//     tabBarOptions: {
//       activeTintColor: '#FF6F00',
//       inactiveTintColor: '#263238',
//     },
//   }
// )

// const AppContainer = createAppContainer(AppTabNavigator)

class Sell extends Component{
    state = {
        show: true,
        data: false
    }

    onSuccess = (e) => {
        
        // this.scanner.reactivate();
        axios.post('http://192.168.0.104:3000/login', {
        email: 'sfs',
        password: 'affgg'
      })
      .then(function (response) {
        console.log('example'+response.data.fname);
        console.log('example'+response.data.lname);
        return (response.data)
      }).then( (data) => {
        this.scanner.reactivate();
        this.setState({show: false,data})
        
      })
      .catch(function (error) {
        this.scanner.reactivate();
        Alert.alert("Alert", "Not verified ");
      });
        
    
      }

    renderQr(){
        return(
           <View style={{alignItems:'center'}}>   
            <Text style={styles.centerText}>
                Scan <Text style={styles.textBold}>QR_code</Text> of the Buyer.
            </Text>
            <Text style={styles.centerText}>
                 <Text style={styles.textBold}>       </Text> 
            </Text>
            <QRCodeScanner
            ref={(node) => { this.scanner = node }}
            // reactivate = { true }
            showMarker = {true}
            markerStyle = {{ borderColor: 'rgb(0,122,255)'}}
            // containerStyle = { styles.outer}
            // cameraStyle={styles.inner}
            onRead={this.onSuccess}
            // topContent={
            //   <Text style={styles.centerText}>
            //     Scan <Text style={styles.textBold}>QR_code</Text> of the Buyer.
            //   </Text>
            // }
            // bottomContent={
            //   <TouchableOpacity style={styles.buttonTouchable} onPress={() => this.scanner.reactivate()}>
            //     <Text style={styles.buttonText}>OK. Got it!</Text>
            //   </TouchableOpacity>
            // }
          />
        </View>  
        )
    }

    renderCard(data){
         return(
            <Card>
            <Text >Buyer Details:</Text>
            <Text >{'FName :'+ data.fname}</Text>
            <View style={styles.img}>
            <Image 
            style={{ height: 150, width: 150}}
            source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/61McsadO1OL.jpg'}}/>
            </View>
            </Card>
            
         )
    }
     
    renderPay(data){
        return(
            <TouchableOpacity style={{position: 'relative',justifyContent:'center',alignItems:'center'}} onPress={()=> this.props.navigation.navigate('Sellf',data)}>
                <Text>Proceed To Sell</Text>
            </TouchableOpacity>
        )
    }
    render(){
        console.log(this.state.data)
        const userdata = this.props.navigation.state.params
        return(
         <View style={{flex: 1}}>
            <Header text=' Profile'/>
            <ScrollView>
                <Card>
                <Text >User Details:</Text>
                <Text >{'Name :'+ userdata.fname+' '+userdata.lname}</Text>
                <View style={styles.img}>
                <Image 
                style={{ height: 150, width: 150}}
                source={{ uri: 'https://images-na.ssl-images-amazon.com/images/I/61McsadO1OL.jpg'}}/>
                </View>
                </Card>
                {(this.state.show)?this.renderQr() : null}
                {(this.state.data)?this.renderCard(this.state.data) : null}
                {(this.state.data)?this.renderPay(this.state.data) : null}
            </ScrollView> 

            <View style = {styles.navbox}>
              <TouchableOpacity style={styles.icon1} onPress={()=> console.log('hi')}>
                <Image
                    source={ require('./assets/home.png') }
                    style={{ width: 25, height: 25,paddingHorizontal: 5, }} />
                <Text>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon2} onPress={()=> console.log('hi')}>
                <Image
                    source={ require('./assets/settings.png') }
                    style={{ width: 25, height: 25,paddingHorizontal: 5, }} />
                <Text>Profile</Text>
              </TouchableOpacity>
            </View>
         </View>
            
        
            
            
        )
    }
}
export default Sell;

var highlight = true;
styles = {
    navbox: {
        borderTopWidth: 3,
        position: 'absolute',
        bottom:0,
        left:0,
        height: 50,
        backgroundColor: "#FFFFFF",
        width:Dimensions.get('window').width,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txt:{
        height: 50,

    },
    icon1:{
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems:'center',
        // borderWidth: 2,
        borderRadius:8,
        backgroundColor: (highlight)? 'grey':'#ffffff00'
    },
    icon2:{
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems:'center',
        // borderWidth: 2,
        borderRadius:8,
        backgroundColor: (!highlight)? 'grey':'#ffffff00' 
    },
    img:{
        position: 'relative',
        justifyContent:'center',
        alignItems:'center'
    },
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
}