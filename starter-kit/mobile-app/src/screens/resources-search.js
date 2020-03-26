import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';

import { search } from '../lib/utils';

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%'
  },
  inputContainer: {
    backgroundColor: '#F1F0EE',
    padding: 16,
    padding: 22,
  },
  scrollContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    backgroundColor: '#FFF'
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 10
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 14,
    paddingBottom: 5
  },
  button: {
    backgroundColor: '#1062FE',
    color: '#FFFFFF',
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 16,
    overflow: 'hidden',
    padding: 12,
    textAlign:'center',
    marginTop: 15
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
    paddingTop: 10,
    color: '#1062FE'
  }
});

const SearchResources = function ({ route, navigation }) {
  const [query, setQuery] = React.useState({ type: 'Food', name: '' });
  const [items, setItems] = React.useState([]);

  const Item = (props) => {
    return (
      <View>
        <TouchableOpacity style={styles.itemContainer}
          onPress={() => {
            navigation.navigate('Map', { item: props });
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

  const searchItem = () => {
    const payload = {
      ...query
    };

    search(payload)
      .then(setItems)
      .catch(err => {
        console.log(err)
        alert('ERROR: Please try again. If the poblem persists contact an administrator.');
      });
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Type</Text>
        <PickerSelect
          style={{ inputIOS: {
            fontFamily: 'IBMPlexSans-Medium',
            backgroundColor: '#fff',
            padding: 8,
            marginBottom: 10
          } }}
          value='Food'
          onValueChange={(t) => setQuery({ ...query, type: t })}
          items={[
              { label: 'Food', value: 'Food' },
              { label: 'Help', value: 'Help' },
              { label: 'Other', value: 'Other' }
          ]}
        />
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.textInput}
          value={query.name}
          onChangeText={(t) => setQuery({ ...query, name: t})}
          onSubmitEditing={searchItem}
          returnKeyType='send'
          enablesReturnKeyAutomatically={true}
          placeholder='e.g., Tomotatoes'
          blurOnSubmit={false}
        />
        {
          query.type !== '' &&
          <TouchableOpacity onPress={searchItem}>
            <Text style={styles.button}>Search</Text>
          </TouchableOpacity>
        }
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        { items.length > 0 && <Text style={styles.textResult}>Search results</Text> }
        {items.map((item, i) => {
          item.key = `${(new Date()).getTime()}-${i}`;
          return <Item {...item} />
        })}
      </ScrollView>
    </View>
  );
};

export default SearchResources;
