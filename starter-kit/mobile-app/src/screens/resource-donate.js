import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';
import { CheckedIcon, UncheckedIcon } from '../images/svg-icons';
import Geolocation from '@react-native-community/geolocation';

import { add, userID } from '../lib/utils'

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
  textInputDisabled: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#eee',
    color: '#999',
    flex: 1,
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
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  typeArea: {
    width: '40%'
  },
  quantityArea: {
    width: '40%'
  }
});

const DonateResource = function ({ navigation }) {
  const clearItem = { userID: userID(), type: 'Food', name: '', description: '', location: '', contact: '', quantity: '1' }
  const [item, setItem] = React.useState(clearItem);
  const [useLocation, setUseLocation] = React.useState(true);
  const [position, setPosition] = React.useState({})

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      Geolocation.getCurrentPosition((pos) => {
        setPosition(pos)
        if (useLocation) {
          setItem({
            ...item,
            location: `${pos.coords.latitude},${pos.coords.longitude}`
          })
        }
      });
    })
  }, []);

  const toggleUseLocation = () => {
    if (!useLocation && position) {
      setItem({
        ...item,
        location: `${position.coords.latitude},${position.coords.longitude}`
      })
    }
    setUseLocation(!useLocation);
  };

  const sendItem = () => {
    const payload = {
      ...item,
      quantity: isNaN(item.quantity) ? 1 : parseInt(item.quantity)
    };

    add(payload)
      .then(() => {
        alert('Thank you! You item has been uploaded.');
        setItem(clearItem);
      })
      .catch(err => {
        console.log(err)
        alert('ERROR: Please try again. If the poblem persists contact an administrator.');
      });
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.typeArea}>
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
        </View>
        <View style={styles.quantityArea}>
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.textInput}
            value={item.quantity}
            onChangeText={(t) => setItem({ ...item, quantity: t})}
            onSubmitEditing={sendItem}
            returnKeyType='send'
            enablesReturnKeyAutomatically={true}
            placeholder='e.g., 10'
            keyboardType='numeric'
          />
        </View>
      </View>
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
      <Text style={styles.label}>Contact</Text>
      <TextInput
        style={styles.textInput}
        value={item.contact}
        onChangeText={(t) => setItem({ ...item, contact: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='user@domain.com'
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
      />
      <Text style={styles.label}>Location</Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleUseLocation}>
          {
            (useLocation)
              ?
              <CheckedIcon height='18' width='18'/>
              :
              <UncheckedIcon height='18' width='18'/>
          }
        </TouchableOpacity>
        <Text> Use my current location </Text>
      </View>
      <TextInput
        style={useLocation ? styles.textInputDisabled : styles.textInput}
        value={item.location}
        onChangeText={(t) => setItem({ ...item, location: t})}
        onSubmitEditing={sendItem}
        returnKeyType='send'
        enablesReturnKeyAutomatically={true}
        placeholder='street address, city, state'
        editable={!useLocation}
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

export default DonateResource;
