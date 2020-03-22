import 'react-native-gesture-handler';
import * as React from 'react';

import { View, Button, Image, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoadingScreen from './src/screens/loading';
import Home from './src/screens/home';
import Chat from './src/screens/chat';
import Map from './src/screens/map';

import { HomeIcon, MapIcon } from './src/images/svg-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainStackOptions = ({ navigation }) => {
  return ({
    headerRight: () => (
      <Button
        onPress={() => navigation.navigate('Chat')}
        title='Chat'
      />
    )
  });
};

const tabBarOptions = {
  showLabel: false,
  activeTintColor: '#1062FE',
  inactiveTintColor: '#000',
  style: {
    backgroundColor: '#F1F0EE',
    paddingTop: 10
  }
};

const TabLayout = () => (
  <Tab.Navigator
    initialRouteName='Home'
    tabBarOptions={tabBarOptions} >
    <Tab.Screen
      name='Home'
      component={Home}
      options={{
        tabBarIcon: ({color}) => (<HomeIcon stroke={color}/>)
      }}
    />
    <Tab.Screen
      name='Map'
      component={Map}
      options={{
        tabBarIcon: ({color}) => (<MapIcon stroke={color} />)
      }}
    />
  </Tab.Navigator>
);

const StackLayout = () => (
  <Stack.Navigator>
    <Stack.Screen name='Starter Kit' component={TabLayout} options={MainStackOptions} />
    <Stack.Screen name='Chat' component={Chat} />
  </Stack.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (<LoadingScreen />);
  } else {
    return (
      <NavigationContainer>
        <StackLayout/>
      </NavigationContainer>
    );
  }
};

export default App;
