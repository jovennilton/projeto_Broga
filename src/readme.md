- criei uma parta "projetos" em c:
- abri esse diretório no prompt e digitei--> npm init
- Instalação do Express --> npm install --save express
- criação da pasta SRC e do arquivo INDEX.JS 
- no prompt digitar--> node src/index.js
- após conferir que está funcionando no browser no endereço localhost:3001

- vamos inicializar um repositório--> git init
- -->  git config user.name "Jovennilton Soares"
- --> git config user.email "niltonsoares19@gmail.com"
- para verificar o status --> git status
- agora vamos criar o arquivo .gitignore na pasta do projeto para ignorar alguns arquivos e dentro desse arquivo digitar --> node_modules/ 
- agora vamos adicionar os arquivos --> git add .
- ver os arquivos adicionados --> git status
- comitando os arquivos --> git commit -m"Initial express setup"
- pode verificar que os arquivos foram comitados --> git status
e vai aparecer a mensagem (nothing to commit, working tree clean)

# CONFIGURANDO ROTAS DE AUTENTICAÇÃO E O NODEMON
- criando a pasta controllers e um arquivo dentro dela auth.js; será um controllers responsavel pela autenticação
--------------------
- ARQUIVO INDEX.JS ESTÁ ASSIM:
const express = require('express'); //inicialização do servidor express, o require importa o express

const authController = require('./controllers/auth');// importando o arquivo auth

const app = express();//inicializa a aplicação
//metodos HTTP -> GET, POST, PUT, DELETE, PATCH ...

// /auth/sign-in
// /auth/sign-up
app.use('/auth',authController);//informa para o express a rota base 

app.get('/', (req,res)=>{//definir uma rota; a / está se referindo a barra após o .com exemplo https://meusite.com/; Irá receber dois parametros request = req e o response = res
    return res.json('Api running...');//retorno o texto na página
});

app.listen(3001, () => { //excutar todas as requisições que chegarem na porta 3001; => arron function (expressão mais curta)
    console.log('Listening on port 3001');
});

-------------
- E O ARQUIVO AUTH.JS ESTÁ ASSIM
const express = require('express'); //importar o express

const router = express.Router(); //importar uma constante do express

router.get('/sign-in', (req, res) => { //ao invés de usar o app.get, agora fica mais fácil utilizar a constante que foi importada
    return res.json('Sign in');
});

router.get('/sign-up', (req, res) => {// rota para quem quiser fazer cadastro na aplicação
    return res.json('Sign up');
});

module.exports = router; //exportando 

--------------
- rodando o node novamente no prompt --> node src/index.js ;é possível testar no navegador acessando http://localhost:3001/auth/sign-up e http://localhost:3001/auth/sign-in


# UTILIZANDO O NODEMON
- Instalando no prompt --> npm install --save nodemon

- vamos atualizar o script no arquivo package.json para 
 "scripts": {
    "start": "nodemon src/index.js"
  },

  - e agora para rodar basta apenas no prompt digitar --> npm start

# CONFIGURANDO O DOTENV E O SEQUILIZE
- utilizando o MySQL com a biblioteca sequelize
- Intalando a biblioteca
- no prompt --> npm install -g sequelize-cli
- no prompt entrar na pasta src e digitar --> npx sequelize-cli init:models 
isso irá carregar os módulos da biblioteca
- no prompt --> npx sequelize-cli init:config
isso irá criar uma pasta config e um arquivo config.jsaon no src do projeto

- No prompt vontando para a pasta do projeto, vamos instalar o dotenv --> npm install --save dotenv
- instalar um driver para o mysql --> npm install --save mysql2
- agora na pasta do projeto vamos criar um arquivo .env e adicionar as linhas
DB_USER=root
DB_PASS=1234
DB_NAME=links
DB_HOST=127.0.0.1

- agora no arquivo gitignore vamos adicionar o .env
.env
node_modules/

- agora vamos renomear o arquivo config.json para config.js
e fazer as modificações abaixo
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: '0',
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: '0',
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: '0',
  }
}


# CONFIGURANDO OS MODELS DO SEQUELIZE E CRIPTOGRAFANDO SENHAS
- na pasta models vamos criar um arquivo account.js

module.exports = (sequelize, DataTypes) => {//nessa função que recebe o sequelize e o DataTypes do arquivo models/index.js
    const Account = sequelize.define('Account', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Account;
};

- vamos instalar uma biblioteca para encriptar os dados
no prompt--> npm install --save bcrypt
- no arquivo auth.js vamos importar a biblioteca

-------- AUTH.JS -------------
const express = require("express"); //importar o express
const bcrypt = require('bcrypt');//importação da biblioteca para encryptar os dados
const { Account } = require("../models");

const router = express.Router(); //importar uma constante do express

const saltRounds = 10;

router.get('/sign-in', (req, res) => { //ao invés de usar o app.get, agora fica mais fácil utilizar a constante que foi importada
    return res.json('Sign in');
});

router.get('/sign-up', async (req, res) => {// rota para quem quiser fazer cadastro na aplicação

    const email = 'niltonsoares19gmail.com';
    const password = '1234';

    const hash = bcrypt.hashSync(password,saltRounds);
    const result = await Account.create({email,password: hash}); //esse Account.create retorna uma promise
       
    return res.json(result);
});

module.exports = router; //exportando 




----------------------- ACCOUNT.JS ------------------------
module.exports = (sequelize, DataTypes) => {//nessa função que recebe o sequelize e o DataTypes do arquivo models/index.js
    const Account = sequelize.define('Account', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Account.prototype.toJSON = function(){
        const values = {...this.get() }
        delete values.password;
        return values;
    }
    return Account;
};


# RECEBENDO REQUISIÇÕES JSON E USANDO O PLUGIN REST CLIENT
- instalando plugin no VS Code --> Rest Client

-------- AUTH.JS -------------
const express = require("express"); //importar o express
const bcrypt = require('bcrypt');//importação da biblioteca para encryptar os dados
const { Account } = require("../models");

const router = express.Router(); //importar uma constante do express

const saltRounds = 10;

router.get('/sign-in', (req, res) => { //ao invés de usar o app.get, agora fica mais fácil utilizar a constante que foi importada
    return res.json('Sign in');
});

router.get('/sign-up', async (req, res) => {// rota para quem quiser fazer cadastro na aplicação

    const { email, password } = req.body;//vai ler o corpo dessa requisição e trazer isso

    const account = await Account.findOne({ where: {email}});
    if( account) return res.json('Account alresady exists');

    const hash = bcrypt.hashSync(password,saltRounds);
    const newAccount = await Account.create({email,password: hash}); //esse Account.create retorna uma promise
       
    return res.json( newAccount );
});

module.exports = router; //exportando 



----------------------- ACCOUNT.JS ------------------------
module.exports = (sequelize, DataTypes) => {//nessa função que recebe o sequelize e o DataTypes do arquivo models/index.js
    const Account = sequelize.define('Account', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Account.prototype.toJSON = function(){
        const values = {...this.get() }
        delete values.password;
        return values;
    }
    return Account;
};


--------------- GITINGORE -------------------
.env
node_modules/
api.rest



# CRIANDO MIDDLEWARE DO EXPRESS E PADRONIZANDO RESPOSTAS

esse middleware servirá para colocar nossas respostas json de forma padronizada

- Criando uma pasta em SRC chamada de middlewares e com um arquivo response.js


const TYPE_JSON = 'application/json';
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_SERVER_ERROR = 500;

const jsonOK = function(data, message, metadata){
    const status = STATUS_CODE_OK;
    message = (message) ? message : 'Successful request.';
    metadata = (metadata) ? metadata : {};

    this.status(status);
    this.type(TYPE_JSON);
    return this.json({message, data, metadata, status: status});
};

const jsonBadRequest = function(data, message, metadata){
    const status = STATUS_CODE_BAD_REQUEST;
    message = (message) ? message : 'Bad request.';
    metadata = (metadata) ? metadata : {};

    this.status(status);
    this.type(TYPE_JSON);
    return this.json({message, data, metadata, status: status});
};

const jsonUnauthorized = function(data, message, metadata){
    const status = STATUS_CODE_UNAUTHORIZED;
    message = (message) ? message : 'Unauthorized.';
    metadata = (metadata) ? metadata : {};

    this.status(status);
    this.type(TYPE_JSON);
    return this.json({message, data, metadata, status: status});
};

const jsonNotFound = function(data, message, metadata){
    const status = STATUS_CODE_NOT_FOUND;
    message = (message) ? message : 'Not Found.';
    metadata = (metadata) ? metadata : {};

    this.status(status);
    this.type(TYPE_JSON);
    return this.json({message, data, metadata, status: status});
};

const jsonServerError = function(data, message, metadata){
    const status = STATUS_CODE_SERVER_ERROR;
    message = (message) ? message : 'Server Error.';
    metadata = (metadata) ? metadata : {};

    this.status(status);
    this.type(TYPE_JSON);
    return this.json({message, data, metadata, status: status});
};

const response = (req, res, next) => {
    
    res.jsonOK = jsonOK;
    res.jsonBadRequest = jsonBadRequest;
    res.jsonUnauthorized = jsonUnauthorized;
    res.jsonNotFound = jsonNotFound;
    res.jsonServerError = jsonServerError;
    next();
};

module.exports = response;





--------------- AUTH.JS --------------------
const express = require("express"); //importar o express
const bcrypt = require('bcrypt');//importação da biblioteca para encryptar os dados
const { Account } = require("../models");

const router = express.Router(); //importar uma constante do express

const saltRounds = 10;

router.get('/sign-in', (req, res) => { //ao invés de usar o app.get, agora fica mais fácil utilizar a constante que foi importada
    return res.json('Sign in');
});

router.get('/sign-up', async (req, res) => {// rota para quem quiser fazer cadastro na aplicação

    const { email, password } = req.body;//vai ler o corpo dessa requisição e trazer isso
   
    const account = await Account.findOne({ where: {email}});
    if( account) return res.jsonBadRequest(null, 'Account alresady exists');

    const hash = bcrypt.hashSync(password,saltRounds);
    const newAccount = await Account.create({email,password: hash}); //esse Account.create retorna uma promise
       
    return res.jsonOK( newAccount, 'Account created.' );
});

module.exports = router; //exportando 


# VALIDAÇÃO DE DADOS COM MENSAGENS TRADUZIDAS

- instalação da biblioteca JOI para validação dos dados de email e senha
npm install --save @hapi/joi

- na pasta SRC criar uma pasta VALIDATORS em um arquivo dentro account.js





