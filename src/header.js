import React from "react";
import {Text,View} from 'react-native';

const App = (props) =>{
    return(
        <View style={styles.viewStyle}>
        <Text style={styles.textStyle}>{props.text}</Text>
        </View>
    );
}

const styles= {
    textStyle:{
        fontSize :20
    },
    viewStyle:{
        backgroundColor: '#F8F8F8',
        // borderWidth: 2,
        // borderColor: '#98989C',
        height: 60,
        alignItems:"center",
        justifyContent:"center",
        shadowColor:'#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.5,
        elevation: 8,
        position: "relative" 
    }
};
export default App;