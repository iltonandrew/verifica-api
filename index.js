import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('', (request, response) => {
  return response.json('Salve');
});

app.post('', (resquest, response) => {
  const { sender, message } = resquest.body;

  return response.json({ reply: `Olá ${sender}, sua mensagem foi: ${message}` });
});

app.listen(3333, () => {
  console.log('Server started!');
});
