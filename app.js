const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

// const { google } = require('googleapis');

// const factchecktools = google.factchecktools('v1alpha1');

const key = 'AIzaSyCeHDHIdVJr1a9z-YJU-Io8K8b_I4CQNmY';

const productRoute = require('./routes/product-route');
const categoryRoute = require('./routes/category-route');
const orderRoute = require('./routes/order-route');
const userRoute = require('./routes/user-route');
const imageRoute = require('./routes/image-route');
const { query } = require('express');

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

app.post('', async (resquest, response) => {
  // const verificador = google.factchecktools({
  //   auth: key,
  //   version: 'v1alpha1',
  // });
  // console.log(verificador.claims.search());
  const keywords = ['#verifique', '#verifica'];
  let verifica = 'QUESTIONÁVEL';
  console.log(resquest.body);
  let { sender, message } = resquest.body;

  const hasKeyword = message.toLowerCase().includes(keywords[0]) || message.toLowerCase().includes(keywords[1]) ? true : false;
  const helloKeyword = message.toLowerCase() == keywords[0] || message.toLowerCase() == keywords[1] ? true : false;

  if (helloKeyword) {
    return response.json({
      reply:
        'Olá! Eu sou a Vera do Verifique!  ✅\n\nEstou aqui para ajudar você a saber se uma notícia é *VERDADE* ✨ ou *FAKE NEWS* 💣\n\nAqui vão algum das minhas funcionalidades:\n\n*#verifica* _<mensagem>_, verifica a veracidade de alguma informação, e também sugere alguns locais onde você pode se informar mais sobre o assunto! 💡\n\n*#noticias* Retorna as principais notícias do dia! 📰 \n\nE aí, bora espalhar apenas notícias *VERIFICADAS*? 💚💚',
    });
  }

  if (hasKeyword) {
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
