import * as React from 'react';
import { StyleSheet, Text, View,Image,ToastAndroid,KeyboardAvoidingView  } from 'react-native';
import ReadStoryScreen from './screens/ReadStoryScreen';
import WriteStoryScreen from './screens/WriteStoryScreen';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

export default class App extends React.Component{
render(){
  return(
    <View style={styles.container}>
      <AppContainer/>
    </View>
  );
}
}

const TabNavigator = createBottomTabNavigator({
  
  Write : {screen : WriteStoryScreen},
  Read : {screen : ReadStoryScreen}
},

{
  defaultNavigationOptions : ({navigation}) => ({
    tabBarIcon : ({}) => {
      const routeName = navigation.state.routeName
      if(routeName === 'Write'){
        return(
          <Image
          source = {require('./assets/write.png')}
          style = {{
            width : 30,
            height : 30
          }}
          />
        )
      } 
      else if(routeName === 'Read'){
        return(
          <Image
          source = {require('./assets/read.png')}
          style = {{
            width : 30,
            height : 30
          }}
          />
        )
      }
    }
  })
  })

const AppContainer = createAppContainer(TabNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
