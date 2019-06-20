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
import {createSwitchNavigator, createAppContainer} from 'react-navigation'


class SellBuy extends Component {
  render() {
    const userdata = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={()=>this.props.navigation.navigate('Sellp',userdata)}>
          <Text style={styles.loginText}>Seller</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={()=>this.props.navigation.navigate('Buyp',userdata)}>
          <Text style={styles.loginText}>Buyer</Text>
        </TouchableHighlight>

       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
  loginText: {
    color: 'white',
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

