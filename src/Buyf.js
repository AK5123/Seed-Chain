import React,{Component} from 'react'
import {Text,
        View,
        TextInput,
        Button,
        TouchableHighlight,
        Image,
        Alert,
        TouchableOpacity,
        Dimensions} from 'react-native'
import Timeline from 'react-native-timeline-listview'
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import Header from './header'
import QRCodeScanner from 'react-native-qrcode-scanner';
import ButtonComponent, { CircleButton, RoundButton, RectangleButton } from 'react-native-button-component';



class App extends Component {
        state ={
            data: [],
            istimeline: false
        }

        renderTimeline(){
            return(
                <Timeline 
                        style={styles.list}
                        data={this.state.data}
                        circleSize={20}
                        circleColor='rgb(45,156,219)'
                        // lineColor='rgb(45,156,219)'
                        timeContainerStyle={{minWidth:52, marginTop: -2}}
                        timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13}}
                        descriptionStyle={{color:'gray'}}
                        detailContainerStyle={{borderBottomColor:'rgb(45,156,219)',borderBottomWidth: 2}}
                        // separatorStyle={{borderBottomColor:'rgb(45,156,0)',borderBottomWidth: 2}}
                        options={{
                            style:{paddingTop:5}
                        }}
                        innerCircle={'dot'}
                        />
            )

        } 
        
        onSuccess = async (e) => {

           let rs= await axios.get('http://192.168.137.97:3000/api/Item/'+e.data);
           let i=0;
           let arr=[];
           rs=rs.data;
            for(seller of rs.sellers){
              let sellerinfo=await axios.get('http://192.168.137.97:3000/api/Seller/'+seller.slice(seller.indexOf("#")+1,seller.length));
              let name=sellerinfo.data.name
              // let time=rs.transactTime[i]
              var lineColor ='rgb(45,156,219)'
              
                
              // console.log(rs)
              let time = (new Date(rs.assetMeta.transactTime[i])).toLocaleTimeString()
              // assetMeta.name;
               let description = new Date(rs.assetMeta.transactTime[i]).toString().slice(4,15)
              // seller.assetMeta.name
              let title = name
                console.log(rs.assetMeta.isGrouped,rs.sellers.length)
              if(rs.assetMeta.isGrouped && i==(rs.sellers.length-1)){
                lineColor = '#F00';
                description = description + ' (ERROR Detected)Tampered Package '
              }
              arr = arr.concat({time,title,description,lineColor})
              i+=1
            }
            this.setState({data:arr,istimeline: true})
            
          }

        renderQr(){
            return(
               <View style={{alignItems:'center'}}>   
                <Text style={styles.centerText}>
                     <Text style={styles.textBold}>Scan Products QR_code for Details     </Text> 
                </Text>
                <Text style={styles.centerText}>
                     <Text style={styles.textBold}>       </Text> 
                </Text>
                <QRCodeScanner
                ref={(node) => { this.scanner = node }}
                reactivate = { true }
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

        renderButton(){
                return(
                <View style={styles.img}>
                 <RoundButton
                 text="Next"
                 type="primary"
                 shape="rectangle"
                 backgroundColors={['#4DC7A4', '#66D37A']}
                 gradientStart={{ x: 0.5, y: 1 }}
                 gradientEnd={{ x: 1, y: 1 }}
                 height={60}
                 width={300}
                 onPress={()=> this.setState({istimeline: false})}
                 />
                 <Text style={styles.centerText}>
                 </Text>  
               </View>  
             
             )
            
        }

        render(){
            return(
             <View style={styles.container}>
                <Header text='Details' />
                <ScrollView>
                       {(this.state.istimeline)? this.renderTimeline() : this.renderQr()}
                       {(this.state.istimeline)? this.renderButton(): null}
                </ScrollView>
                {/* <View style = {styles.navbox}>
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
                        <Text style={styles.txt}>Details</Text>
                    </TouchableOpacity>
                </View> */}
         
                
            </View>
            )
        }
}

var highlight = true;

const styles ={
    container: {
      flex: 1,
    //   padding: 15,
        //   paddingTop:65,
      backgroundColor:'white'
    },
    list: {
      marginTop:20,
      marginBottom: 20
    },
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

export default App