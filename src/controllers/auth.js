const express = require("express"); //importar o express
const bcrypt = require('bcrypt');//importação da biblioteca para encryptar os dados
const { Account } = require("../models");
const {accountSignUp, accountSignIn} = require('../validators/account');
const {getMessage} = require('../helpers/validator');
const { generateJwt, generateRefreshJwt } = require('../helpers/jwt');

const router = express.Router(); //importar uma constante do express

const saltRounds = 10;

router.post('/sign-in', accountSignIn, async (req, res) => { //ao invés de usar o app.get, agora fica mais fácil utilizar a constante que foi importada
    const { email, password } = req.body;//busca email e senha
    const account = await Account.findOne({ where: {email}}); //verifica se o usuário existe
    //validar a senha
    const match = account ? bcrypt.compareSync(password, account.password) : null;//faz a comparação das duas senhas: password(senha que está tentando logar) e a account.password (senha no banco)
    if(!match) return res.jsonBadRequest(null, getMessage('account.signin.invalid'));//se não existir é retornado credenciais invalidas
    //geração dos tokens
    const token = generateJwt({id: account.id});
    const refreshToken = generateRefreshJwt({id: account.id, version: account.jwtVersion});//<-------, version: account.jwtVersion

    return res.jsonOK(account, getMessage('account.signin.success'), {totken, refreshToken} );
});

router.post('/sign-up', accountSignUp, async (req, res) => {// rota para quem quiser fazer cadastro na aplicação
    const { email, password } = req.body;//vai ler o corpo dessa requisição e trazer isso
   
    const account = await Account.findOne({ where: {email}});
    if( account) return res.jsonBadRequest(null, getMessage('account.signup.email.exists'));

    const hash = bcrypt.hashSync(password,saltRounds);
    const newAccount = await Account.create({email,password: hash}); //cria um novo usuário

    const token = generateJwt({id: newAccount.id});
    const refreshToken = generateRefreshJwt({id: newAccount.id, version: newAccount.jwtVersion});//<------- , version: newAccount.jwtVersion
       
    return res.jsonOK( newAccount, getMessage('account.signup.success'), {token, refreshToken});
});

module.exports = router; //exportando 