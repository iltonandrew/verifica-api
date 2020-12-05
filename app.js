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
  const verifica = 'QUESTIONÁVEL';
  const { sender, message } = resquest.body;
  console.log(message);

  if (message.toLowerCase().includes('#verifica')) {
    message.toLowerCase().includes('robo') ? (verifica = 'FAKE NEWS') : (verifica = 'VERDADE');
    message = message.replace('#verifica', '');

    return response.json({ reply: `Olá ${sender}, sua mensagem" ${message} " foi VERIFICADA e isso é ${verifica}` });
  }
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
