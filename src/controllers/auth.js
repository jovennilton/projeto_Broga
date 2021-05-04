const express = require("express"); //importar o express
const bcrypt = require("bcrypt");//importação da biblioteca para encryptar os dados

const { Account } = require("../models");
const { accountSignUp, accountSignIn } = require("../validators/account");
const { getMessage } = require("../helpers/messages");

const {
    generateJwt,
    generateRefreshJwt,
    getTokenFromHeaders,
    verifyRefreshJwt,
} = require("../helpers/jwt");

const router = express.Router(); //importar uma constante do express

const saltRounds = 10;

router.post("/sign-in", accountSignIn, async (req, res) => { //ao invés de usar o app.get, agora fica mais fácil utilizar a constante que foi importada
    const { email, password } = req.body;//busca email e senha

    const account = await Account.findOne({ where: { email } }); //verifica se o usuário existe
    //validar a senha
    const match = account ? bcrypt.compareSync(password, account.password) : null;//faz a comparação das duas senhas: password(senha que está tentando logar) e a account.password (senha no banco)
    if (!match)
        return res.jsonBadRequest(null, getMessage("account.signin.invalid"));//se não existir é retornado credenciais invalidas
    //geração dos tokens
    const token = generateJwt({ id: account.id });
    const refreshToken = generateRefreshJwt({
        id: account.id,
        version: account.jwtVersion,
    });//<-------, version: account.jwtVersion

    return res.jsonOK(account, getMessage("account.signin.success"), {
        token,
        refreshToken,
    });
});

router.post("/sign-up", accountSignUp, async (req, res) => {// rota para quem quiser fazer cadastro na aplicação
    const { email, password } = req.body;//vai ler o corpo dessa requisição e trazer isso

    const account = await Account.findOne({ where: { email } });
    if (account)
        return res.jsonBadRequest(null, getMessage("account.signup.email_exists"));

    const hash = bcrypt.hashSync(password, saltRounds);
    const result = await Account.create({ email, password: hash });//cria um novo usuário

    const token = generateJwt({ id: result.id });
    const refreshToken = generateRefreshJwt({
        id: result.id,
        version: result.jwtVersion,
    });//<------- , version: newAccount.jwtVersion

    return res.jsonOK(result, getMessage("account.signup.success"), {
        token,
        refreshToken,
    });
});
router.post("/refresh", async (req, res) => {
    const token = getTokenFromHeaders(req.headers);

    if (!token) {
        return res.jsonUnauthorized(null, "Token invalid");
    }

    try {
        const decoded = verifyRefreshJwt(token);
        const account = await Account.findByPk(decoded.id);

        if (!account) return res.jsonUnauthorized(null, "Token invalid");

        if (decoded.version !== account.jwtVersion)
            return res.jsonUnauthorized(null, "Token invalid");

        const meta = {
            token: generateJwt({ id: account.id }),
        };

        return res.jsonOK(null, null, meta);
    } catch (error) {
        return res.jsonUnauthorized(null, "Token invalid");
    }
});

module.exports = router; //ok