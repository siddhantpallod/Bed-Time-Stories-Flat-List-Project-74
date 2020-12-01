import * as React from 'react';
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,FlatList } from 'react-native';
import {SearchBar,Header} from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

export default class ReadStoryScreen extends React.Component{

    constructor(){
        super();
        this.state = {
        search : '',
        dataSource : [],
        allStories : []
    }
    }

    retriveStories = async () => {
        var allStories = [];
        var storiesRef = await db.collection('stories').get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            allStories.push(doc.data())
          })
        })
        
        this.setState({
            allStories : allStories
        })
    }

    filterSearch = (searchText) => {
        var results = this.state.allStories.filter((story)=>{
            const storyData = story.title ? story.title.toUpperCase() : ''.toUpperCase()
            return storyData.indexOf(searchText.toUpperCase()) > -1
        })

        this.setState({
            dataSource : results,
            search : searchText    
        })
    }    

    componentDidMount = () => {
        this.retriveStories()
    }

    render(){
        return (
          <View style={{backgroundColor: '#03b898', height:'100%'}}>
            <Header
            containerStyle={{backgroundColor: '#03b898', borderBottomWidth: 0}}
            centerComponent={{
              text: "Bedtime Stories",
              style:{
                color: "#ffffff",
                fontSize: 24,
                fontWeight: '600',
              }}} />
              
            <SearchBar placeholder="Search for Stories" round lightTheme
            containerStyle={{backgroundColor:'#03b898',borderBottomColor:'transparent',borderTopColor:'transparent'}}
            inputContainerStyle={{backgroundColor:'#ffffff', borderRadius: 50}}
            inputStyle={{color:'#000000'}}
            onChangeText={(text)=>{this.filterSearch(text)}} 
            value={this.state.search} 
            />
    
            <ScrollView contentContainerStyle={{paddingBottom: 20}}>
              {this.state.search == ""
              ? this.state.allStories.map((data, index)=>(
                  <View style={styles.container} key={index}>
                    <Text style={styles.title}>Title: {data.title}</Text>
                    <Text style={styles.author}>Author: {data.author}</Text>
                  </View>))
    
              : this.state.dataSource.map((data, index)=>(
                <View style={styles.container} key={index}>
                  <Text style={styles.title}>Title: {data.title}</Text>
                  <Text style={styles.author}>Author: {data.author}</Text>
                </View>))
              }
              <TouchableOpacity style={styles.submitButton} onPress={this.retriveStories}>
                <Text style={styles.buttonText}>Refresh</Text>
              </TouchableOpacity>

              <FlatList 
          data={this.state.dataSource}
          extraData = {this.state.search}
          renderItem={({item})=>(
            <View>

            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.getStories}
          onEndReachedThreshold={1}
        />

            </ScrollView>
          </View>    
        );
      }
    }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    submitButton : {
      backgroundColor : 'pink',
      margin : 20,
      borderWidth : 3,
      borderRadius : 20,
      width : 90,
      alignSelf : 'center'
  },
  buttonText : {
    color : 'black',
    fontSize : 20,
    fontFamily : 'bold',
    alignSelf : 'center'
},
  });