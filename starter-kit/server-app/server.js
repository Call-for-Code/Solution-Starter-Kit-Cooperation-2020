require('dotenv').config({silent: true})

const express = require('express');
const bodyParser = require('body-parser');

const assistant = require('./lib/assistant.js');
const port = process.env.PORT || 3000

const cloudant = require('./lib/cloudant.js');

const app = express();
app.use(bodyParser.json());

const handleError = (res, err) => {
  const status = err.code !== undefined && err.code > 0 ? err.code : 500;
  return res.status(status).json(err);
};

app.get('/', (req, res) => {
  return res.json({
    status: 'ok'
  });
});

app.get('/api/session', (req, res) => {
  assistant
    .session()
    .then(sessionid => res.send(sessionid))
    .catch(err => handleError(res, err));
});

app.post('/api/message', (req, res) => {
  const text = req.body.text || '';
  const sessionid = req.body.sessionid;

  assistant
    .message(text, sessionid)
    .then(result => res.json(result))
    .catch(err => handleError(res, err));
});

// GET should support a query string of ?name="tomatoes"
app.get('/api/supplies', (req, res) => {
  const type = req.query.type;
  const name = req.query.name;
  cloudant
    .find(type, name)
    .then(data => res.send(data))
    .catch(err => handleError(res, err));
});

let types = ["Food", "Other", "Help"]
app.post('/api/supplies', (req, res) => {
  if (!req.body.type) {
    return res.status(422).json({ errors: "Type of item must be provided"});
  }
  if (!types.includes(req.body.type)) {
    return res.status(422).json({ errors: "Type of item must be one of " + types.toString()});
  }
  if (!req.body.name) {
    return res.status(422).json({ errors: "Name of item must be provided"});
  }
  if (!req.body.contact) {
    return res.status(422).json({ errors: "A method of conact must be provided"});
  }
  const type = req.body.type;
  const name = req.body.name;
  const description = req.body.name || '';
  const quantity = req.body.name || 1;
  const location = req.body.name || '';
  const contact = req.body.contact;

  cloudant
    .create(type, name, description, quantity, location, contact)
    .then(data => res.send(data))
    .catch(err => handleError(res, err));
});

const server = app.listen(port, () => {
   const host = server.address().address;
   const port = server.address().port;
   console.log(`SolutionStarterKitCooperationServer listening at http://${host}:${port}`);
});
