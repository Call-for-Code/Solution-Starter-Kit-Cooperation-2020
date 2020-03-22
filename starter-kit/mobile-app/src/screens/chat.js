import React from 'react';
import { StyleSheet, SafeAreaView, KeyboardAvoidingView, ScrollView, View, Text, TextInput, Button } from 'react-native';
import Config from 'react-native-config';

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF'
  },
  innerContainer: {
    width: '100%',
    height: '100%'
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingBottom: 5
  },
  messageContainer: {
    flexDirection: 'column',
    marginTop: 10,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  waText: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#D0E2FF',
    padding: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%'
  },
  myText: {
    fontFamily: 'IBMPlexSans-Medium',
    backgroundColor: '#F1F0EE',
    padding: 10,
    alignSelf: 'flex-end',
    maxWidth: '75%'
  },
  inputContainer: {
    backgroundColor: '#F1F0EE',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  textInput: {
    fontFamily: 'IBMPlexSans-Medium',
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    elevation: 2,
    paddingRight: 70,
    marginBottom: 25
  },
  submitButton: {
    fontFamily: 'IBMPlexSans-Medium',
    position: 'absolute',
    right: 24,
    bottom: 47
  },
});

const serverUrl = Config.STARTER_KIT_SERVER_URL;
// const serverUrl = 'http://localhost:3000';

const Message = (props) => {
  const style = props.fromInput ? styles.myText : styles.waText;

  return (
    <View style={styles.messageContainer}>
      <Text style={style}>{props.text}</Text>
    </View>
  );
};

const Chat = function ({ navigation }) {
  const [input, setInput] = React.useState('');
  const [session, setSession] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  const getSession = () => {
    return fetch(`${serverUrl}/api/session`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          return response.text();
        }
      })
      .then(sessionId => {
        setSession(sessionId);
        return sessionId;
      })
  };

  const fetchMessage = (payload) => {
    return fetch(`${serverUrl}/api/message`, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  }

  const handleMessageResponse = (response) => {
    if (!response.ok) {
      throw new Error(response.statusText || response.message || response.status);
    } else {
      return response.json().then(response => {
        addMessages(response.generic);
      })
    }
  }

  const sendMessage = () => {
    const payload = {
      text: input.trim(),
      sessionid: session
    };

    addMessages([{ text: input }], true);

    setInput('');

    fetchMessage(payload)
      .then(handleMessageResponse)
      .catch(e => {
        getSession()
          .then((sessionId) => {
            return fetchMessage({
              text: payload.text,
              sessionid: sessionId
            });
          })
          .then(handleMessageResponse)
          .catch(err => {
            console.log(err)
            addMessages([{
              text: 'ERROR: Please try again. If the poblem persists contact an administrator.'
            }]);
          });
      });
  };

  const addMessages = (messages, fromInput) => {
    const date = (new Date()).getTime();
    const result = messages.map((r, i) => {
      return {
        text: r.text,
        fromInput: fromInput
      };
    });

    setMessages(msgs => [
      ...msgs,
      ...result
    ]);
  };

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      getSession();
    })
  }, []);

  return (
    <View style={styles.outerContainer}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior='height'
        keyboardVerticalOffset={Platform.select({
          ios: 78,
          android: 0
        })} >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {messages.map((message, i) => {
            message.key = `${(new Date()).getTime()}-${i}`;
            return <Message {...message} />
          })}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            returnKeyType='send'
            enablesReturnKeyAutomatically={true}
            placeholder='Ask a question...'
            blurOnSubmit={false}
          />
          <View style={styles.submitButton}>
            {input !== '' && <Button title='Send' onPress={sendMessage} />}
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Chat;
