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

class Sell extends Component{
    state = {
        show: true,
        data: false
    }

    onSuccess = (e) => {
        
      console.log(e.data)
      // this.scanner.reactivate();
      axios.get('http://192.168.137.97:3000/api/Seller/'+e.data)
       .then((response) =>{
      console.log('example'+response.data);
      this.setState({data: response.data,show:false})
    })
    .catch((error) => {
      this.scanner.reactivate();
      Alert.alert("Alert", "Not verified ");
    });
        
    
      }

    renderQr(){
        return(
           <View style={{alignItems:'center'}}>   
            <Text style={styles.centerText}>Scan QR_Code of Seller    </Text>
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
          <Text style={styles.centerText}></Text>
        </View>  
        )
    }

    renderCard(data){
         return(
             <Card>
                <View style={{marginHorizontal: 8,marginVertical:8,paddingBottom: 5,alignItems:'center'}}>
                <Text style={{fontSize:20,color:'black',fontFamily:'leaguespartan'}}>Seller Details</Text>
                <Text style={{fontFamily:'SEGOEUI',fontSize: 20}}> {data.name}</Text>
                <Text style={{fontFamily:'SEGOEUI',fontSize: 20}}> {'ph:'+data.phone}</Text>
                </View>  
                
                {/* <View style={styles.img}>
                <Image 
                style={{ height: 200, width: 200}}
                source={{ uri: 'http://192.168.137.97:5000/getImage/'+userdata.qrcode}}/>
                 <View style={{marginTop:5}} >
                <Text style={{fontSize:17,color:'black',fontFamily:'SEGOEUI'}}>QR Code</Text>
                </View>
                </View> */}
            </Card>
            
         )
    }
     
    renderPay(data){
        console.log('example',data)
        return(
          <View style={{alignItems:'center',marginTop: 10}}>
          <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={()=> this.props.navigation.navigate('Buyf',data)}>
            <Text style={{fontFamily:'SEGOEUI',color:'white'}}> Verify Products</Text>
          </TouchableOpacity>
       </View>
        )
    }
    render(){
        console.log(this.state.data)
        const userdata = this.props.navigation.state.params
        // const userdata = {fname:'asf',lname:'sdfsf'}
        return(
         <View style={{flex: 1}}>
            <Header text=' Profile'/>
            <ScrollView>
            <Card>
                <View style={{marginHorizontal: 8,marginVertical:8, borderBottomColor:'#ddd',borderBottomWidth:1,paddingBottom: 5,alignItems:'center'}}>
                <Text style={{fontSize:20,color:'black',fontFamily:'leaguespartan'}}>Hey There!.
                <Text style={{fontFamily:'SEGOEUI',fontSize: 20}}> {userdata.name}</Text>
                </Text> 
                </View>  
                
                <View style={styles.img}>
                <Image 
                style={{ height: 200, width: 200}}
                source={{ uri: 'http://192.168.137.97:5000/getImage/'+userdata.qrcode}}/>
                 <View style={{marginTop:5}} >
                <Text style={{fontSize:17,color:'black',fontFamily:'SEGOEUI'}}>QR Code</Text>
                </View>
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
                <Text style={styles.txt}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon2} onPress={()=> this.props.navigation.navigate('Buyf',this.state.data)}>
                <Image
                    source={ require('./assets/settings.png') }
                    style={{ width: 25, height: 25,paddingHorizontal: 5, }} />
                <Text style={styles.txt}>Details</Text>
              </TouchableOpacity>
            </View>
         </View>
            
        
            
            
        )
    }
}
export default Sell;

var highlight = true;
const styles = {
    navbox: {
      borderColor: '#7BCA86',
      position: 'absolute',
      bottom:0,
      left:0,
      height: 50,
      backgroundColor: "#7BCA86",
      width:Dimensions.get('window').width,
      flexDirection: 'row',
      justifyContent: 'space-around',
      shadowColor:'#000',
      shadowOffset: {width: 0, height: 3},
      shadowOpacity: 0.8,
      elevation: 8,
    },
    txt:{
      color: 'white',
      fontFamily: 'SEGOEUI'
    },
    icon1:{
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems:'center',
        // borderWidth: 2,
        borderRadius:8,
        backgroundColor: (highlight)? 'rgba(255,255,255,0.2)':'#ffffff00'
    },
    icon2:{
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems:'center',
        // borderWidth: 2,
        borderRadius:8,
        backgroundColor: (!highlight)? 'rgba(255,255,255,0.2)':'#ffffff00'  
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
        color: '#000',
        fontWeight: '500'
      },
      textBold: {
        fontWeight: '500',
        color: '#000',
      },
      loginButton: {
        backgroundColor: "#7BCA86",
      },
      buttonContainer: {
        height:40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:100,
        // marginLeft: 15,
        borderRadius: 3
      },
}