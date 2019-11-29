import React, {Component} from 'react'
import {View, ActivityIndicator, Text,TouchableOpacity,StyleSheet} from 'react-native'
import {Header,Avatar} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NetInfo from '@react-native-community/netinfo'

export default class Check extends Component{
    constructor(props){
        super(props)
        this.state=({isloading:true})
    }

    componentDidMount=()=>{
        setTimeout(() => {
            this.checkNetwork();
        }, 3000);
    }
    
    checkNetwork=()=>{
        NetInfo.fetch().then((state)=>{
            if(state.isConnected==true){
                this.props.navigation.navigate("Patients");
                //this.setState({isloading:false})
            }else{
                this.setState({isloading:false})
            }
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Avatar
                    rounded
                    size="xlarge"
                    source={require("../images/logo.jpeg")}
                    ></Avatar>
                </View>
                <View>
                    {
                        this.state.isloading && (
                            <View>
                                <ActivityIndicator
                                color="gray"
                                size={50}
                                ></ActivityIndicator>
                                <Text>Loading...</Text>
                            </View>
                        )
                    }
                    {
                        !this.state.isloading && (
                            <View style={styles.errorBody}>
                                <Text style={styles.errorText}>No internet connection</Text>
                            </View>
                        )
                    }
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        paddingTop:150,
        alignItems:'center',
        justifyContent:"center"
    },
    errorBody:{
        marginTop:20,
        borderColor:'red',
        borderWidth:1,
        borderRadius:10
    },
    errorText:{
        padding:20,
        color:'red'
    }
})