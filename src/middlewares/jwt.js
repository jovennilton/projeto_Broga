const { verifyJwt } = require('../helpers/jwt');//ESTE É O MEDDLEWARE RESPONSÁVEL POR VALIDAR OS TOKENS E QUAL É O ID DA REQUISIÇÃO

const checkJwt = (req, res, next) => {

    let token = headers['authorization'];
    token = token ? token.slice(7, token.length) : null; //o slice(7, token.length) irá retirar os sete primeiros caracteres do token

    console.log('Token', token);


    next();
};

module.exports = checkJwt;

