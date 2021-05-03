const express = require('express');//esse arquivo Link.js criará o nosso CRUD - Create, Read, Delete e Update
const { Link } = require('../models');//importa o banco de dados
const router = express.Router();
//FAZER LISTAGEM
router.get('/', async (req, res) => {
    const  accountId  = 1;
    const links = await Link.findAll({ where: { accountId }});

    return res.jsonOK(links);
});
//BUSCAR UM ID
router.get("/:id", async (req, res) => {
    const  accountId  = 1;
    const { id } = req.params;
    const link = await Link.findOne({ where: { id, accountId } });
    if (!link) return res.jsonNotFound();
    return res.jsonOK(link);
  });
//INSERIR
router.post("/", async (req, res) => { 
    const accountId = 1; //const { accountId } = req;
    const { label, url, isSocial } = req.body;
  
    const image = "fsafa";
  
    const link = await Link.create({ label, url, isSocial, image, accountId });
  
    return res.jsonOK(link);
  });
//EDITAR
router.put("/:id", async (req, res) => {
    const accountId = 1; 
    const { id } = req.params;
    const { body } = req;//const {label, url, isSocial } = req.body;// const { accountId, body } = req;
    const fields = ['label', 'url', 'isSocial'];

    const link = await Link.findOne({ where: { id, accountId } });//aqui será busca links que somente pertençam a esse usuário
    if (!link) return res.jsonNotFound();

    fields.map((fieldName) => {
        const newValue = body[fieldName];//const newValue = req.body[fieldName];
        if (newValue !== undefined) link[fieldName] = newValue;
    });

    await link.save();

    return res.jsonOK(link);
});
//DELETAR
router.delete("/:id", async (req, res) => {
    const  accountId  = 1;
    const { id } = req.params;
  
    const link = await Link.findOne({ where: { id, accountId } });
    if (!link) return res.jsonNotFound();
  
    await link.destroy();
  
    return res.jsonOK();
  });

module.exports = router;