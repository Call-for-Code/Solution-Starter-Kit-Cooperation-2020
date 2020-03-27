import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Button, Linking } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF'
  },
  scroll: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 25,
    paddingTop: 75
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
    fontFamily: 'IBMPlexSans-Light',
    fontSize: 24,
    color: '#323232',
    textDecorationColor: '#D0E2FF',
    textDecorationLine: 'underline',
    paddingBottom: 5,
    paddingTop: 20
  },
  content: {
    fontFamily: 'IBMPlexSans-Light',
    color: '#323232',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16
  },
  buttonGroup: {
    flex: 1,
    paddingTop: 15,
    width: 175
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
    <ScrollView style={styles.scroll}>
      <Image
        style={styles.image}
        source={require('../images/2020-cfc-512.png')}
      />
      <Text style={styles.subtitle}>Starter Kit</Text>
      <Text style={styles.title}>Community Collaboration</Text>
      <Text style={styles.content}>
        There is a growing interest in enabling communities to cooperate among
        themselves to solve problems in times of crisis, whether it be to
        advertise where supplies are held, offer assistance for collections, or
        other local services like volunteer deliveries.
      </Text>
      <Text style={styles.content}>
        What is needed is a solution that empowers communities to easily connect
        and provide this information to each other.
      </Text>
      <Text style={styles.content}>
        This solution starter kit provides a mobile application, along with
        server-side components, that serves as the basis for developers to build
        out a community cooperation application that addresses local needs for
        food, equipment, and resources.
      </Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={() => Linking.openURL('https://developer.ibm.com/callforcode')}>
          <Text style={styles.button}>Learn more</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Call-for-Code/Solution-Starter-Kit-Cooperation-2020')}>
          <Text style={styles.button}>Get the code</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
);

export default Home;
