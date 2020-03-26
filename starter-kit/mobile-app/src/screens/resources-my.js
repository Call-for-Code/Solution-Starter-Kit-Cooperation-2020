import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { search, userID } from '../lib/utils'

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%'
  },
  scrollContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    backgroundColor: '#FFF'
  },
  itemContainer: {
    flexDirection: 'column',
    padding: 15,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 0.25
  },
  itemName: {
    fontSize: 24,
    fontFamily: 'IBMPlexSans-Medium',
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray'
  },
  itemQuantity: {
    fontSize: 14,
    fontFamily: 'IBMPlexSans-Medium',
    color: 'gray'
  },
  textResult: {
    fontFamily: 'IBMPlexSans-Bold',
    paddingTop: 24,
    color: '#555',
    flex: 1,
    alignSelf: 'center'
  }
});

const MyResources = function ({ navigation }) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      search({ userID: userID() })
        .then(setItems)
        .catch(err => {
          alert('ERROR: Please try again. If the poblem persists contact an administrator.');
        });
    })
  }, []);

  const Item = (props) => {
    return (
      <View>
        <TouchableOpacity style={styles.itemContainer}
          onPress={() => {
            navigation.navigate('Edit Donation', { item: props });
            // navigation.navigate('Search', { screen: 'Map', params: { item: props }});
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.itemName}>{props.name}</Text>
            <Text style={styles.itemQuantity}> ( {props.quantity} ) </Text>
          </View>
          <Text style={styles.itemDescription}>{props.description}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {
          (items.length > 0 && items.map((item, i) => {
            item.key = `${(new Date()).getTime()}-${i}`;
            return <Item {...item} />
          })) || (<Text style={styles.textResult}>You currently have no donations listed</Text>)
        }
      </ScrollView>
    </View>
  );
};

export default MyResources;
