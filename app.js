const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoute = require('./routes/product-route');
const categoryRoute = require('./routes/category-route');
const orderRoute = require('./routes/order-route');
const userRoute = require('./routes/user-route');
const imageRoute = require('./routes/image-route');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false })); // apenas dados simples
app.use(bodyParser.json()); // json de entrada no body

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).send({});
  }
  next();
});
app.get('', (request, response) => {
  return response.json('Salve');
});

app.post('', (resquest, response) => {
  const keywords = ['#verifique', '#verifica'];
  let verifica = 'QUESTIONÁVEL';
  console.log(resquest.body);
  let { sender, message } = resquest.body;

  if (message.toLowerCase() == keywords[0] || message.toLowerCase() == keywords[1]) {
    return response.json({ reply: 'Olá! Eu sou o Verifique! :white_check_mark:\n\nEstou aqui para ajudar você a saber se uma notícia é *VERDADE* :sparkles: ou *FAKE NEWS* :bomb:\n\n E aí, bora espalhar apenas notícias *VERIFICADAS*? :green_heart::green_heart:' });
  }

  if (message.toLowerCase().includes(keywords[0]) || message.toLowerCase().includes(keywords[1])) {
    message.toLowerCase().includes('robo') ? (verifica = '*FAKE NEWS*') : (verifica = '*VERDADE*');
    message = message.replace(keywords[0], '');
    message = message.replace(keywords[1], '');
    if (message != '') return response.json({ reply: `Olá ${sender}, sua mensagem '${message} ' foi *VERIFICADA* e isso é ${verifica}` });
  }
  return response.status(200).send({});
});

// Quando não encontra rota, entra aqui:
app.use((req, res, next) => {
  const erro = new Error('Não encontrado');
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

module.exports = app;
