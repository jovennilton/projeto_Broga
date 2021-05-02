const express = require("express"); //importar o express
const bcrypt = require('bcrypt');//importação da biblioteca para encryptar os dados
const { Account } = require("../models");
const {accountSignUp} = require('../validators/account');
const {getMessage} = require('../helpers/validator');

const router = express.Router(); //importar uma constante do express

const saltRounds = 10;

router.get('/sign-in', (req, res) => { //ao invés de usar o app.get, agora fica mais fácil utilizar a constante que foi importada
    return res.jsonOK(null);
});

router.get('/sign-up', accountSignUp, async (req, res) => {// rota para quem quiser fazer cadastro na aplicação

    const { email, password } = req.body;//vai ler o corpo dessa requisição e trazer isso
   
    const account = await Account.findOne({ where: {email}});
    if( account) return res.jsonBadRequest(null, 'account.signup.email.exists');

    const hash = bcrypt.hashSync(password,saltRounds);
    const newAccount = await Account.create({email,password: hash}); //esse Account.create retorna uma promise
       
    return res.jsonOK( newAccount, getMessage('account.signup.success'));
});

module.exports = router; //exportando 