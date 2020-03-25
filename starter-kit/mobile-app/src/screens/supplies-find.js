import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import { ScrollView } from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';

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
  itemDescription: {
    fontSize: 24,
    fontFamily: 'IBMPlexSans-Medium',
  },
  itemContact: {
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

const serverUrl = Config.STARTER_KIT_SERVER_URL;
// const serverUrl = 'http://localhost:3000';

const FindSupplies = function ({ route, navigation }) {
  const [query, setQuery] = React.useState({ type: 'Food', name: '' });
  const [items, setItems] = React.useState([]);

  const Item = (props) => {
    return (
      <View>
        <TouchableOpacity style={styles.itemContainer}
          onPress={() => {
            navigation.navigate('Map');
          }}
        >
          <Text style={styles.itemDescription}>{props.name}</Text>
          <Text style={styles.itemContact}>{props.description}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error(response.statusText || response.message || response.status);
    } else {
      return response.json().then(res => {
        setItems(res)
      })
    }
  }

  const findItem = (payload) => {
    return fetch(`${serverUrl}/api/supplies?type=${payload.type}&name=${payload.name}`, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  const searchItem = () => {
    const payload = {
      ...query
    };

    findItem(payload)
      .then(handleResponse)
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
          query.type !== '' && query.name.trim() !== '' &&
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

export default FindSupplies;
