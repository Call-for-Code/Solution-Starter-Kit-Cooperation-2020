import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import Config from 'react-native-config';
import { ScrollView } from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    elevation: 2,
    marginBottom: 25
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 18,
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
  }
});

const serverUrl = Config.STARTER_KIT_SERVER_URL;
// const serverUrl = 'http://localhost:3000';

const DonateSupplies = function ({ navigation }) {
  const [item, setItem] = React.useState({ type: 'Food', name: '', description: '', location: '', contact: ''});


  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error(response.statusText || response.message || response.status);
    } else {
      return response.json().then(response => {
        alert('Thank you! You item has been uploaded.')
      })
    }
  }

  const postItem = (payload) => {
    return fetch(`${serverUrl}/api/supplies`, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  }

  const sendItem = () => {
    const payload = {
      ...item
    };

    postItem(payload)
      .then(handleResponse)
      .then(() => {
        setItem({ type: 'Food', name: '', description: '', location: '', contact: ''});
      })
      .catch(err => {
        console.log(err)
        alert('ERROR: Please try again. If the poblem persists contact an administrator.');
      });
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Type</Text>
      <PickerSelect
        style={{ inputIOS: {
          fontFamily: 'IBMPlexSans-Medium',
          backgroundColor: '#fff',
          padding: 16,
          marginBottom: 25
        } }}
        value='Food'
        onValueChange={(t) => setItem({ ...item, type: t })}
        items={[
            { label: 'Food', value: 'Food' },
            { label: 'Help', value: 'Help' },
            { label: 'Other', value: 'Other' }
        ]}
      />
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.textInput}
        value={item.name}
        onChangeText={(t) => setItem({ ...item, name: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., Tomotatoes'
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textInput}
        value={item.description}
        onChangeText={(t) => setItem({ ...item, description: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='e.g., 100 cans of tomatoes'
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.textInput}
        value={item.location}
        onChangeText={(t) => setItem({ ...item, location: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='street address, city, state'
        blurOnSubmit={false}
      />
      <Text style={styles.label}>Contact</Text>
      <TextInput
        style={styles.textInput}
        value={item.contact}
        onChangeText={(t) => setItem({ ...item, contact: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='user@domain.com'
        blurOnSubmit={false}
      />
      {
        item.type !== '' && item.name.trim() !== '' && item.contact.trim() !== '' &&
        <TouchableOpacity onPress={sendItem}>
          <Text style={styles.button}>Add item</Text>
        </TouchableOpacity>
      }
    </ScrollView>
  );
};

export default DonateSupplies;
