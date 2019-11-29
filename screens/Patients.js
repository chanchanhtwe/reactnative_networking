import React, {Component} from 'react'
import {View, Text,TouchableOpacity, FlatList, StyleSheet} from 'react-native'
import {Header,Card} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NetInfo from '@react-native-community/netinfo'

import FetchPatient from './FetchPatient'
import ShowPatient from './ShowPatient'

//split class ShowPatient.js
/*
class ShowPatient extends Component{
    render(){
        return(
            <View>
                <Card title={this.props.p_name}>
                    <View style={styles.subContainer}>
                        <View style={styles.subContainerOne}>
                            <Text style={styles.subTitle}>Age</Text>
                            <Text style={styles.subText}>{this.props.p_age}</Text>
                        </View>
                        <View style={styles.subContainerOne}>
                            <Text style={styles.subTitle}>Bed No</Text>
                            <Text style={styles.subText}>{this.props.p_no}</Text>
                        </View>
                    </View>
                    <View style={styles.subContainer}>
                        <View style={styles.subContainerOne}>
                            <Text style={styles.subTitle}>Doctor</Text>
                            <Text style={styles.subText}>{this.props.p_doctor}</Text>
                        </View>
                        <View style={styles.subContainerOne}>
                            <Text style={styles.subTitle}>disease</Text>
                            <Text style={styles.subText}>{this.props.p_disease}</Text>
                        </View>
                    </View>
                </Card>
            </View>
        )
    }
}
*/

export default class Patients extends Component{

    constructor(props){
        super(props)
        this.state=({
            patients:[],
            loading:false
        })
       // this.state=({isConnect: false})
    }

    getPatients=()=>{
        FetchPatient()
        .then((res)=>{
            this.setState({patients:res})
           // console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }


    componentDidMount=()=>{
        this.getPatients();
        //this.CheckNetwork();
    }

    /*
    CheckNetwork=()=>{
        NetInfo.fetch().then(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            if(state.isConnected==true){
                this.setState({isConnect: true})
            }
          });
          
    }*/

    goNewPatient=()=>{
        this.props.navigation.navigate("Newpatient")
    }
    render(){
        return(
            <View>
            <Header
            rightComponent={
                <TouchableOpacity onPress={()=>this.goNewPatient()}>
                    <Text>
                        <Icon name="user-plus" size={15} color="#fff"></Icon>
                    </Text>
                </TouchableOpacity>
            }
            centerComponent={{text:'Patients', style:{color: '#fff'}}}
            >
            </Header>
            <View>
                <FlatList
                refreshing={this.state.loading}
                onRefresh={()=>this.getPatients()}
                keyExtractor={(p)=>p.id.toString()}
                data={this.state.patients}
                renderItem={(p)=>{//if written with "{}",you will be "return"
                   // console.log(p) // it apperars with object
                   return(
                       <ShowPatient 
                       p_name={p.item.patient_name}
                       p_age={p.item.age}
                       p_no={p.item.table_no}
                       p_doctor={p.item.doctor.doctor_name}
                       p_disease={p.item.category.category_name}
                       ></ShowPatient>
                   )
                }}
                ></FlatList>
            </View>
        </View>
        )
    }
}

// split into ShowPatient.js 
/*
const styles=StyleSheet.create({
    subContainer:{
        flexDirection:"row"
    },
    subContainerOne:{
        width:"50%",
        justifyContent:"center",
        alignItems:"center"
    },
    subTitle:{
        color:"#ccc",
        fontSize:11
    },
    subText:{
        padding:5
    }
})
*/