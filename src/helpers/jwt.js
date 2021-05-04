require("dotenv").config();
const jwt = require("jsonwebtoken");

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;
const options = { expiresIn: "30 minutes" };
const refreshOptions = { expiresIn: "30 days" };

const generateJwt = (payload) => {//função que gera o token jwt
    return jwt.sign(payload, tokenPrivateKey, options);
};

const generateRefreshJwt = (payload) => {//função que gera o token jwt
    return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);
};

const verifyJwt = (token) => {//função para vefiricar o token JWT
    return jwt.verify(token, tokenPrivateKey);
};

const verifyRefreshJwt = (token) => {//função para vefiricar o token JWT
    return jwt.verify(token, refreshTokenPrivateKey);
};

const getTokenFromHeaders = (headers) => {
    let token = headers["authorization"];
    token = token ? token.slice(7, token.length) : null;

    return token;
};

module.exports = {
    generateJwt,
    verifyJwt,
    generateRefreshJwt,
    verifyRefreshJwt,
    getTokenFromHeaders,
};//ok