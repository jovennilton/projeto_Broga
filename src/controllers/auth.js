const express = require('express'); //importar o express

const router = express.Router(); //importar uma constante do express

router.get('/sign-in', (req, res) => { //ao invés de usar o app.get, agora fica mais fácil utilizar a constante que foi importada
    return res.json('Sign in');
});

router.get('/sign-up', (req, res) => {// rota para quem quiser fazer cadastro na aplicação
    return res.json('Sign up');
});

module.exports = router; //exportando 