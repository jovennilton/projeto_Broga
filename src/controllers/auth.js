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