import React,{Component} from "react";
import {Text, View} from "react-native";
import axios from "axios";

class playlist extends Component{

    state = {albums:[]};

    componentWillMount(){

        axios.get("https://rallycoding.herokuapp.com/api/music_albums").then((response)=>{
            
            this.setState({albums: response.data});
        })
    }

    renderalbum(){
        return this.state.albums.map(ele => <Text>{ele.title}</Text> )
    }
     
    render() {
         console.log(this.state);
         return (
             <View>
                 {this.renderalbum()}
             </View>
         )

    }
}

export default playlist