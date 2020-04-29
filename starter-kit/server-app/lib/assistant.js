const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

const assistantId = process.env.ASSISTANT_ID || '<assistant_id>'
const apiKey = process.env.ASSISTANT_IAM_APIKEY || '<assistant_apikey>';
const apiUrl = process.env.ASSISTANT_URL || 'https://gateway.watsonplatform.net/assistant/api/';
const apiVersion = process.env.ASSISTANT_VERSION || '2019-02-28';

const assistant = new AssistantV2({
  version: apiVersion,
  authenticator: new IamAuthenticator({ apikey: apiKey }),
  url: apiUrl
});

checkConnection(assistant)

function checkConnection(assistant){
  assistant.createSession({
    assistantId: assistantId
  })
    .then(res =>{
      console.log('✅ Watson Assistant correctly connected!')
      console.log(res.result.session_id)
    })
    .catch(err => {
      console.log('❌ an error occured while connecting to Watson Assistant. Please check your parameters.')
      console.log(err)
    });
  }

const message = (text, sessionId) => {
  if (!assistantId || assistantId === '<assistant_id>') {
    return Promise.reject('ASSISTANT_ID has not been configured.')
  } else if (!sessionId) {
    return Promise.reject('sessionId has not been provided.')
  } else if (!text) {
    return Promise.reject('No user input provided.')
  }

  const payload = {
    assistantId: assistantId,
    sessionId: sessionId,
    input: {
      message_type: 'text',
      text: text
    }
  };

  return new Promise((resolve, reject) => {
    assistant.message(payload, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.result.output);
      }
    });
  });
};

const session = () => {
  if (!assistantId || assistantId === '<assistant_id>') {
    return Promise.reject('ASSISTANT_ID has not been configured');
  }

  return assistant.createSession({
    assistantId: assistantId
  }).then(response => response.result['session_id']);
};

module.exports = {
  message: message,
  session: session
};
