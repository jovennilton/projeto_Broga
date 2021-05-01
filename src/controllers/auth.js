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