import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';
import axios from 'axios'


export default class LoginView extends Component {

  
    state = {
      email   : '',
      password: '',
      verified: false
    }
  

  onClickListener = (email,pass) => {
          
      //  this.props.navigation.navigate('Sellp',{});
    // this.props.navigation.navigate('SB',{name : 'abc'})
    axios.get('http://192.168.137.97:3000/api/Seller/'+email)
      .then( (response) => {
        console.log(response.data);
        // 
          if(response.data.error){
            Alert.alert("Alert", "Invalid User ");
            return ;
          }
        // console.log(response.data,response.data.password == pass);
        if(response.data.password == pass){
          if(response.data.isFarmer)
            this.props.navigation.navigate('Sellp',response.data);
          else
            this.props.navigation.navigate('SB',response.data);
        }
        else{
          Alert.alert("Alert", "Wrong Password ");
        }
        
      })
      .catch(function (error) {

        Alert.alert("Alert", "Invalid ");
      });

  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Image style={styles.inputIcon} source={require('./assets/fertilizer.png')}/>
          <View style={{justifyContent:'center'}}>
          <Text style={styles.txt}> SeedChain</Text>
          </View>
        </View>
        <View style={styles.card} >
        <View style={styles.inputContainer}>
          {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/> */}
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="#d4d9dc"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          {/* <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/> */}
          <TextInput style={styles.inputs}
              placeholder="Password"
              placeholderTextColor="#d4d9dc"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener(this.state.email,this.state.password)}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
      </View>
        {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight> */}

        {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
            <Text>Register</Text>
        </TouchableHighlight> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7BCA86',
  },
  title:{
    // borderWidth:2,
    position: 'absolute',
    top: '10%',
    flexDirection:'row'
  },
  card:{
    backgroundColor:'white',
    shadowColor:"#000",
    borderRadius:5,
    shadowOffset: {width:0,height:2},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation:5,
    alignItems:'center'
  },
  inputContainer: {
      borderColor: '#d4d9dc',
      backgroundColor: '#FFFFFF',
      // borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      marginTop: 5,
      marginHorizontal:15,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:40,
      marginLeft:16,
      borderBottomColor: '#000',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    justifyContent: 'center'
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
  loginButton: {
    backgroundColor: "#7BCA86",
  },
  loginText: {
    color: 'white',
  },
  txt:{
    fontSize: 20,
    color: 'white',
    fontFamily: 'leaguespartan'
  }
});
 