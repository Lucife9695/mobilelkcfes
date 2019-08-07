import React, { Component } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { FloatingAction } from 'react-native-floating-action';


type Props = {};
export default class IndexScreen extends Component<Props> {
  static navigationOptions = {
    title: 'Announcements',
    headerStyle: {
        backgroundColor: '#33FF99'
    },
  };

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      isFetching: false,
     // value: ''
    };
    this._load = this._load.bind(this);
  }

  componentDidMount() {
    this._load();
  }
  searchFilterFunction = text => {
    this.setState({
      value: text
    });

    const newData = this.state.data.filter(item => {
      console.log(item.type)
      const itemData = `${item.title.toUpperCase()} ${item.department.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.includes(textData);
    });
    
    this.setState({
      data: newData
    });
  };


  _load() {
    this.setState({isFetching: true});

    fetch("http://lkcfesnotification.000webhostapp.com/api/notifications")
    .then((response) => {
      if(!response.ok) {
        Alert.alert('Error', response.status.toString());
        throw Error('Error ' + response.status);
      }

      return response.json()
    })
.then(({ data }) => {
    this.setState({data});
    this.setState({isFetching: false});
})
    .catch((error) => {
      console.log(error)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.searchFilterFunction(text)}
          value={this.state.value}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        <FlatList

          data={this.state.data}
          showsVerticalScrollIndicator={true}
          refreshing={this.state.isFetching}
          onRefresh={this._load}
          renderItem={({item}) =>
            <TouchableHighlight
              underlayColor={'#cccccc'}
              onPress={() => {
                this.props.navigation.navigate('Show', {
                  id: item.id,
                  headerTitle: item.title,
                  refresh: this._load,
                })
              }}
            >
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.department}</Text>
                <Text style={styles.itemSubtitle}>{item.title}</Text>
                <Text style={styles.itemDate}>{item.updated_at}</Text>                
              </View>
            </TouchableHighlight>
          }
          keyExtractor={(item, index) => {item.title}}
          extraData={this.state} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },

  item: {
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },

  itemTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
  },

  itemSubtitle: {
    fontSize: 18,
  },
  itemDate: {
    fontSize: 15,
    flex: 5,
    paddingLeft: 200,
  },
})