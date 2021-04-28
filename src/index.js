const express = require('express'); //inicialização do servidor express, o require importa o express

const app = express();//inicializa a aplicação
//metodos HTTP -> GET, POST, PUT, DELETE, PATCH ...
app.get('/', (req,res)=>{//definir uma rota; a / está se referindo a barra após o .com exemplo https://meusite.com/; Irá receber dois parametros request = req e o response = res
    return res.json('Api running...');//retorno o texto na página
});

app.listen(3001, () => { //excutar todas as requisições que chegarem na porta 3001; => arron function (expressão mais curta)
    console.log('Listening on port 3001');
});