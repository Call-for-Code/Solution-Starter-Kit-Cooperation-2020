import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PickerSelect from 'react-native-picker-select';
import { CheckedIcon, UncheckedIcon } from '../images/svg-icons';
import Geolocation from '@react-native-community/geolocation';

import { add, userID } from '../lib/utils'

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    padding: 22,
    backgroundColor: '#FFF'
  },
  splitView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  typeArea: {
    width: '40%'
  },
  label: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#000',
    fontSize: 14,
    paddingBottom: 5
  },
  selector: {
    fontFamily: 'IBMPlexSans-Medium',
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 16,
    marginBottom: 25
  },
  quantityArea: {
    width: '40%'
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    flex: 1,
    borderColor: '#D0E2FF',
    borderWidth: 2,
    padding: 14,
    elevation: 2,
    marginBottom: 25
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  checkboxLabel: {
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 13
  },
  textInputDisabled: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#f4f4f4',
    color: '#999',
    flex: 1,
    padding: 16,
    elevation: 2,
    marginBottom: 25
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

const AddResource = function ({ navigation }) {
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
        Alert.alert('Thank you!', 'Your item has been added.', [{text: 'OK'}]);
        setItem({ ...clearItem, location: payload.location });
      })
      .catch(err => {
        console.log(err);
        Alert.alert('ERROR', 'Please try again. If the problem persists contact an administrator.', [{text: 'OK'}]);
      });
  };
  
  return (
    <ScrollView style={styles.outerView}>
      <View style={styles.splitView}>
        <View style={styles.typeArea}>
          <Text style={styles.label}>Type</Text>
          <PickerSelect
            style={{ inputIOS: styles.selector }}
            value={item.type}
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
        placeholder='e.g., cans of tomatoes'
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
        <Text style={styles.checkboxLabel}> Use my current location </Text>
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
        item.type !== '' &&
        item.name.trim() !== '' &&
        item.contact.trim() !== '' &&
        <TouchableOpacity onPress={sendItem}>
          <Text style={styles.button}>Add</Text>
        </TouchableOpacity>
      }
    </ScrollView>
  );
};

export default AddResource;
