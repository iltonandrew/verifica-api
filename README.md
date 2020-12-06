# Verifica-API

![img](https://github.com/iltonandrew/verifica-api/blob/main/logo%20verifique.png?raw=true 'Logo Verifique')

# Autores:

**Gabriel Paganini**

**Ilton Andrew**

**Marina Mesquita**

**Victor Ye**

# Visagio Hackathon

API construida durante o **Visagio Hackathon** para um ChatBot de Whatsapp com o propósito de verificar a probabilidade de uma resposta ser verdadeira, bem como recomendar assuntos correlatos ao tema **verificado**!

# Funcionamento

O protótipo consite na integração da API, criada em Node.JS, com um aplicativo chamado [WhatsAuto](https://play.google.com/store/apps/details?id=com.guibais.whatsauto&hl=pt_BR&gl=US), responsável por realizar as chamadas na API e enviar as mensagens para os usuários.
A idéia central seria realizar a integração do aplicativo, responsável por enviar as mensagens ao servidor, e o servidor repassar essas mensagens a serem verificadas para possiveis APIs de verificação, como por exemplo a [FactCheckTools](https://developers.google.com/fact-check/tools/api/) do google.

[A API encontra-se disponível no Heroku e pode ser consultada aqui](https://verifica-api.herokuapp.com/)

## Request Exemplo:

![img](https://github.com/iltonandrew/verifica-api/blob/main/request.png?raw=true)

## Exemplo de funcionamento:

![img](https://github.com/iltonandrew/verifica-api/blob/main/screen.png?raw=true)

# Agradecimentos

Gostaria de agradecer e reconhecer o trabalho de
[Fernando Silva Maransatto](https://github.com/Maransattos)
por fornecer a estrutura base dessa API, que pode ser encontrada [aqui.](https://github.com/Maransatto/rest-api-node-js)
