import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation'


class SellBuy extends Component {
  render() {
    const userdata = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        

        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={()=>this.props.navigation.navigate('Sellp',userdata)}>
          <Text style={styles.loginText}>SELL</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
        <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={()=>this.props.navigation.navigate('Buyf',userdata)}>
          <Text style={styles.loginText}>BUY</Text>
        </TouchableOpacity>

       
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
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:200,
    borderRadius:4,
    shadowOffset: {width:0,height:2},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation:5,
  },
  loginButton: {
    backgroundColor: "white",
  },
  loginText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'leaguespartan'
  },
  divider:{
    height: 3,
    width: 150,
    borderBottomWidth: 2,
    borderColor: 'white',
    marginBottom: 20
  }
});
 



// const AppSwitchNavigator = createSwitchNavigator({
//     SellBuy: {screen: SellBuy },
//     Sell : {screen: Sell},
//     Buy: {screen: Buy}
// });

// const AppContainer = createAppContainer(AppSwitchNavigator)

// class App extends Component{
     
//      render(){
//          userdata = this.props.navigation.state.params
//          console.log(userdata)
//          return(
//            <AppContainer data={userdata} /> 
//          )
//      }
// }


// export default App;
export default SellBuy;

