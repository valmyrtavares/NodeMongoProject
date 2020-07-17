//Carregando Modulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require ('body-parser');
const app = express();
const admin = require("./routes/admin")
const path = require("path")
//const mongoose = require("mongoose")

//Configurações
// BODY PARSER
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//HANDLEBARS
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');
// Public
    app.use(express.static(path.join(__dirname, "public")))
//Rotas
app.get('/', (req, res) =>{
    res.send("Rota Principal")
})
app.get('/valmyr', (req, res)=>{
    res.send("Fala Valmyr, agora vc vai aprender node")
})

app.use('/admin', admin)

//Outros
const PORT = 8081
app.listen(PORT, ()=>{
    console.log("Servidor Rodando")
})