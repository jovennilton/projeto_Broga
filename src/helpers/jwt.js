require('dotenv').config();
const jwt = require('jsonwebtoken');

const tokenPrivatekey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivatekey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;

const options = { expiresIn: '30 minutos'};
const refreshOptions = { expiresIn: '30 days'};

const generateJwt = (payload) => {//função que gera o token jwt
    return jwt.sign(payload, tokenPrivatekey, options);
};

const generateRefreshJwt = (payload) => {//função que gera o token jwt
    return jwt.sign(payload, refreshTokenPrivatekey, refreshOptions);
};

const verifyJwt = (token) => {//função para vefiricar o token JWT
    return jwt.verify(token, tokenPrivatekey);
};

const verifyRefreshJwt = (token) => {//função para vefiricar o token JWT
    return jwt.verify(token, refreshTokenPrivatekey);
};

module.exports = { generateJwt, generateRefreshJwt, verifyJwt, verifyRefreshJwt };