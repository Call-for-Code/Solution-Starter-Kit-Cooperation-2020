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
    paddingBottom: 15
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
    color: '#323232',
    marginTop: 8,
    marginBottom: 8
  },
  buttonGroup: {
    flex: 1,
    paddingTop: 15
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
    <Text style={styles.title}>Community Collaboration</Text>
    <Text style={styles.content}>
      In times of crisis, such as COVID-19, while federal and local government
      may be rolling out broad programs, cooperation at the local level is
      usually the most effectibe way of getting help to where it is most needed.
      While traditional social media is one way of communicating within a
      community, this is (by its very design) not locally focused, and often not
      sufficently structured to enable rapid discover of help needed.
    </Text>
    <Text style={styles.content}>
      This solution starter kit builds out a community cooperation application
      that could address the local needs in aspects of food, equipment and
      resources scarcity.
    </Text>
    <View style={styles.buttonGroup}>
      <TouchableOpacity onPress={() => Linking.openURL('https://developer.ibm.com/callforcode')}>
        <Text style={styles.button}>Learn more</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Call-for-Code/Solution-Starter-Kit-Cooperation-2020')}>
        <Text style={styles.button}>Get the code</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Home;
