const express = require("express"); //importar o express
const { Account } = require("../models");

const router = express.Router(); //importar uma constante do express

router.get('/sign-in', (req, res) => { //ao invés de usar o app.get, agora fica mais fácil utilizar a constante que foi importada
    return res.json('Sign in');
});

router.get('/sign-up', async (req, res) => {// rota para quem quiser fazer cadastro na aplicação
    const result = await Account.create({email: 'niltonsoares19gmail.com',password:'1234'}); //esse Account.create retorna uma promise
    console.log(result); //caso aconteça algum erro será recebido na constante result através do async e await
    return res.json('Sign up');
});

module.exports = router; //exportando 