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

  