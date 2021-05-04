const express = require("express"); //inicialização do servidor express, o require importa o express
const cors = require("cors");
const db = require("./models"); //importando o models
const response = require("./middlewares/response");
const checkJwt = require("./middlewares/jwt");

const authController = require("./controllers/auth");// importando o arquivo auth
const linkController = require("./controllers/link");

const app = express();//inicializa a aplicação
//metodos HTTP -> GET, POST, PUT, DELETE, PATCH ...
app.use(cors()); //irá aceitar as requisiçoes que vierem do frontend

app.use(response);//abaixo temos dois middleware do express
app.use(checkJwt);

app.use(express.json());//pra receber os dados em json
app.use(express.urlencoded({ extended: false })); //receber o body da requisição e entender ele
// /auth/sign-in  e /auth/sign-up
app.use("/auth", authController);//informa para o express a rota base 

app.use("/link", linkController);//Informa para o express a rota do link

app.get('/', (req, res) => {//definir uma rota; a / está se referindo a barra após o .com exemplo https://meusite.com/; Irá receber dois parametros request = req e o response = res
    return res.json('Api running...');//retorno o texto na página
});

db.sequelize.sync().then(() => { //o sync serve parar sincronizar
    app.listen(3001, () => { //excutar todas as requisições que chegarem na porta 3001; => arron function (expressão mais curta)
        console.log("Listening on port 3001");
    });
});//ok*