import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('', (request, response) => {
  return response.json('Salve');
});

app.post('', (resquest, response) => {
  const { sender, message } = resquest.body;

  return response.json({ reply: `Olá ${sender}, sua mensagem foi: ${message}` });
});

app.listen(3333);
