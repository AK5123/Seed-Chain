import React from 'react';
import {View} from 'react-native'

const card = (props) => {
    return(
        <View style = {styles.container}>
            {props.children}
        </View>
    )
}

const styles={
    container:{
        borderWidth:1,
        borderRadius:2,
        // borderColor:'green',
        borderColor:'#ddd',
        borderBottomWidth: 1,
        // borderBottomColor: "#47315a",
        shadowColor:"#000",
        shadowOffset: {width:0,height:2},
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation:3,
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        flexDirection: 'column',
        paddingBottom: 5
    }
}

export default card;