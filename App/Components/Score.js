import React, { Component } from "react";
import { View , Text, StyleSheet, Image } from "react-native";
import Images from '../Assets/Images';
import Constants from './Constants';
import store from '../redux/store';
import { connect } from 'react-redux';
var RNFS = require('react-native-fs');
class Score extends Component {
    downloadImage = (linkDownload) => {
    // download(this.props.image.url, '_Subiz/image_' + this.props.image.name);
    //'https://i.pinimg.com/474x/c8/a9/9e/c8a99eb00f3269dc7673400b65f59e62--games-images-for-kids.jpg'
    var destination = linkDownload.replace(/\//g, "");
    destination = `${RNFS.DocumentDirectoryPath}`+ "/" + destination
    this.download(linkDownload, destination)
   };
   download = async (target, destination) => {
     try{
       let options = {
         fromUrl: target,
         toFile: destination,
         begin: (res) => {
          //  console.log(res)
          //  console.log(`${RNFS.DocumentDirectoryPath}/react-native.jpg`)
         },
         progress: (data) => {
          //  console.log(data)
         },
         background: true,
         progressDivider: 1
       };
       console.log("options");
       const request = await RNFS.downloadFile(options).promise

       console.log(request)
     }catch(e){
       console.log("error")
       console.log(e)
     }
   };

   UNSAFE_componentWillMount() {
    this.downloadImage('https://i.pinimg.com/474x/c8/a9/9e/c8a99eb00f3269dc7673400b65f59e62--games-images-for-kids.jpg')
    // console.log(`file://${RNFS.DocumentDirectoryPath}` + '/react-native.jpg')
    // console.log()
    // RNFS.readDir(RNFS.DocumentDirectoryPath).then((res)=>{console.log(res)});
   }
  render() {
    return (     
      <View>
        <Image
            style={styles.img_test}
            source={{
              uri: 'file://' + `${RNFS.DocumentDirectoryPath}` + '/' + 'https:i.pinimg.com474xc8a99ec8a99eb00f3269dc7673400b65f59e62--games-images-for-kids.jpg'
            }}
      />
      </View>
    );
  }
}
export default Score;
const styles = StyleSheet.create({
  img_test: {
    width: 100,
    height: 100
  },
 
});