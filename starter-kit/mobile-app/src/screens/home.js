import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Button, Linking } from 'react-native';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  image: {
    alignSelf: 'flex-start',
    height: '20%',
    width:'50%',
    resizeMode: 'contain'
  },
  title: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 36,
    color: '#323232',
    paddingBottom: 20
  },
  subtitle: {
    fontFamily: 'IBMPlexSans-Medium',
    fontSize: 24,
    color: '#323232',
    textDecorationColor: '#D0E2FF',
    textDecorationLine: 'underline',
    paddingBottom: 5,
    paddingTop: 30
  },
  content: {
    fontFamily: 'IBMPlexSans-Medium',
    color: '#323232'
  },
  buttonGroup: {
    flex: 1,
    paddingTop: 25
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

const Home = () => (
  <View style={styles.center}>
    <Image
      style={styles.image}
      source={require('../images/2020-cfc-512.png')}
    />
    <Text style={styles.subtitle}>Starter Kit</Text>
    <Text style={styles.title}>Disaster Resiliency</Text>
    <Text style={styles.content}>
      Due to climate change, floods are becoming more frequent and more severe,
      leading to specific issues for affected communities. This solution
      starter kit looks to aid potential victims better prepare for, act
      during, and recover from a flood. 
    </Text>
    <View style={styles.buttonGroup}>
      <TouchableOpacity onPress={() => Linking.openURL('https://developer.ibm.com/callforcode')}>
        <Text style={styles.button}>Learn more</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Call-for-Code/Solution-Starter-Kit-Disasters-2020')}>
        <Text style={styles.button}>Get the code</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Home;
