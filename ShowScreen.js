import React, { Component } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Linking,
} from 'react-native';
import {
  InputWithLabel
} from './UI';
import { FloatingAction } from 'react-native-floating-action';

type Props = {};
export default class ShowScreen extends Component<Props> {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('headerTitle')
    };
  };

  constructor(props) {
    super(props)

    this.state = {
      id: this.props.navigation.getParam('id'),
      member: '',
    };

    this._load = this._load.bind(this);
  }

  componentDidMount() {
    this._load();
  }

  _load() {
    let url = 'http://lkcfesnotification.000webhostapp.com/api/notifications/' + this.state.id;

    fetch(url)
    .then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());
        throw Error('Error ' + response.status);
      }

      return response.json()
    })
    .then((member) => {
      this.setState({member});
      this.setState({loading: false, link: member})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    let member = this.state.member;
   // let af = 'http://lkcfesnotification.000webhostapp.com/storage/';
    let image = member && JSON.parse(member.image);
    let attachment = member && JSON.parse(member.attachment);
    if(attachment["0"] != null){
    console.log(attachment["0"]['download_link']);
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <InputWithLabel style={styles.output}
            label={'Title'}
            value={member ? member.title : ''}
            orientation={'vertical'}
            multiline={true}
            editable={false}
          />
          <InputWithLabel style={styles.output}
            label={'Department'}
            value={member ? member.department : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel style={styles.output}
            label={'Publish'}
            value={member ? member.updated_at : ''}
            orientation={'vertical'}
            editable={false}
          />
          <InputWithLabel style={[styles.output, {height: 600, textAlignVertical: 'top'}]}
            label={'Description'}
            value={member ? member.description : ''}
            orientation={'vertical'}
            editable={false}
            multiline={true}
          />          
          <Text>
          {image && image.length && image.map(image => {
      return <Image 
            source={{uri: 'http://lkcfesnotification.000webhostapp.com/storage/' + image}}
            style={{width: 300, height: 300}}
            orientation={'vertical'}
          />  
   })
}
</Text>
{attachment != "" ? (<Text style={styles.TextStyle} onPress={ ()=> Linking.openURL('http://lkcfesnotification.000webhostapp.com/storage/' + attachment["0"]['download_link']) } >Click here for to Download file</Text>) : (<Text></Text>)}  
{member.link != null ? (<Text style={styles.TextStyle} onPress={ ()=> Linking.openURL(member.link) } >Click here for More Detail </Text>) : (<Text></Text>)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  output: {
    fontSize: 24,
    color: '#000099',
    marginTop: 10,
    marginBottom: 10,
  },
    TextStyle: {
 
    color: '#E91E63',
    textDecorationLine: 'underline',
    fontSize: 30
 
  },
});