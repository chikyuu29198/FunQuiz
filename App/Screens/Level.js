// import React, { Component } from 'react';
// import { StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';
// import Sound from 'react-native-sound'
// import store from '../redux/store'
// import Spinner from 'react-native-spinkit'
// import Images from '../Assets/Images'

// Sound.setCategory('Ambient')

// class FlatListItem extends Component {
//     render(){
//         return(
//             <View style = {{
//                 flex: 1,
//                 backgroundColor: "green",
//                 borderRadius: 5
//             }}>
//                 <Image
//                     source = {Images.bird}
//                     style = {{
//                         width: 70,
//                         height: 70,
//                         margin: 5
//                     }}
//                 />
//                 <Text> Level + {this.props.item.level} </Text>

//             </View>
//         )
//     }
// }

// class Home extends Component {
//   constructor(props){
//     super(props)
//   }
  
//   render() {
//     return (
//       <View >
//         <ImageBackground
//         source = {Images.loadingbg}
//         style = {{width: '100%', height: '100%'}}
//         >
//         <FlatList
//             data = {this.props.listLevel}
//             renderItem = {({item, index}) => {
//                 return {

//                 }
//             }}
//         >

//         </FlatList>

//         </ImageBackground>
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
   
//   });
// export default Home; 