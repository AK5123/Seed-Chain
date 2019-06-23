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
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';

class Sell extends Component{
    state = {
        show: true,
        button: false,
        count: 0,
        resp: false,
        dispdetail: false,
        items: []
    }

    onSuccess = (e) => {

        const ubdata = this.props.navigation.state.params
        console.log(ubdata);
        axios.post('http://192.168.137.97:5000/product', {
        seller: ubdata.seller,
        product: e.data
      })
      .then( (data) => {
        let item = this.state.items.concat(data)  
        this.setState({button: true, items: item, resp: false})
        
      })
      .catch( (error)=> {
        this.scanner.reactivate();
        Alert.alert("Alert", "Not verified ");
      });
        
        
      }

    renderQr(){
        return(
           <View style={{alignItems:'center'}}>   
            <Text style={styles.centerText}>
                Scan <Text style={styles.textBold}>Products QR Code        </Text> 
            </Text>
            <Text style={styles.centerText}>
                 {/* <Text style={styles.textBold}>       </Text>  */}
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
          <Text style={styles.centerText}>
                 <Text style={styles.textBold}>       </Text> 
            </Text>
        </View>  
        )
    }

   renderbuttonpart1(){
       return(

        <RectangleButton
        text="Next"
        type="primary"
        shape="rectangle"
        backgroundColors={['#4DC7A4', '#66D37A']}
        gradientStart={{ x: 0.5, y: 1 }}
        gradientEnd={{ x: 1, y: 1 }}
        height={60}
        width={300}
        onPress={() => {
            this.setState({button: false,resp: true, count: this.state.count +1 })
        }}/>
        
    
    )
   }
   renderbuttonpart2(){
     return(
        <Text style={styles.centerText}>
        </Text>  
     )   
   }
     renderCard(){
        return this.state.items.map( data => {
              console.log(data)
              return(
                <View style={styles.card} key={data.data.assetMeta.name}> 
                  <View style={{backgroundColor: (data.data.isVerified)?"green":"red" ,flexDirection:'row',justifyContent:'space-between',height:40}} >
                    <Text style={styles.tpt} >{data.data.assetMeta.name +'('+ data.data.assetMeta.weight+'g)'}</Text>
                    <Text style={styles.tpt} >{'Rs.'+data.data.assetMeta.price}</Text>
                </View>
                </View>
                
              )
         })
     }
   
    render(){
        console.log(this.state.count,this.state.items,this.state.dispdetail)
        if(this.state.resp)
          this.scanner.reactivate()
        return(
         <View style={{flex: 1}}>
            <Header text=' Products'/>
            <ScrollView>
                { (this.state.dispdetail)? null : this.renderQr()}
           
                { (this.state.dispdetail)? this.renderCard() : 
                    <View style={styles.img}> 
                        {(this.state.button)? this.renderbuttonpart1(): null}
                        {(this.state.button)? this.renderbuttonpart2(): null}
                        <RectangleButton
                            text={(this.state.count!=0)? 'DONE('+this.state.count+'items)' : 'DONE'}
                            type="primary"
                            shape="rectangle"
                            backgroundColors={['#4DC7A4', '#66D37A']}
                            gradientStart={{ x: 0.5, y: 1 }}
                            gradientEnd={{ x: 1, y: 1 }}
                            height={60}
                            width={300}
                            onPress={() => this.setState({dispdetail: true})}/>
                        <Text style={styles.centerText}>
                        <Text style={styles.textBold}>       </Text> 
                        </Text>    
                    </View>
                }
                
            </ScrollView> 
            {/* <View style={styles.navbox1}>
            <Text>hii</Text>
            </View> */}

            <View style={styles.navbox}>
              <TouchableOpacity style={styles.icon2} onPress={()=> console.log('hi')}>
                <Image
                    source={ require('./assets/home.png') }
                    style={{ width: 25, height: 25,paddingHorizontal: 5, }} />
                <Text style={styles.txt}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon1} onPress={()=> console.log('hi')}>
                <Image
                    source={ require('./assets/settings.png') }
                    style={{ width: 25, height: 25,paddingHorizontal: 5, }} />
                <Text style={styles.txt}>Products</Text>
              </TouchableOpacity>
            </View>
         </View>
            
        
            
            
        )
    }
}


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
        fontFamily: 'SEGOEUI',

    },
    tpt:{
      fontFamily:'leaguespartan',
      color:'white',
      fontSize:15,
      padding: 3
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
        color: '#777',
      },
      textBold: {
        fontWeight: '500',
        color: '#000',
      },
      card:{
        borderWidth:1,
        borderRadius:2,
        // borderColor:'green',
        borderColor:'#ddd',
        borderBottomWidth: 1,
        shadowColor:"#000",
        shadowOffset: {width:0,height:2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation:3,
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        flexDirection: 'column',
        height:40
        // paddingBottom: 5
      }
}

export default Sell;