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
  const verifica = 'QUESTIONÁVEL';
  const { sender, message } = resquest.body;
  console.log(message);

  if (message.toLowerCase().includes('#verifica')) {
    message.toLowerCase().includes('robo') ? (verifica = 'FAKE NEWS') : (verifica = 'VERDADE');
    message = message.replace('#verifica', '');

    return response.json({ reply: `Olá ${sender}, sua mensagem" ${message} " foi VERIFICADA e isso é ${verifica}` });
  }
});

app.listen(3333);
