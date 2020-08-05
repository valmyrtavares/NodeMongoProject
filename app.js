//Carregando Modulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require ('body-parser');
const app = express();
const admin = require("./routes/admin")
const path = require("path")
const mongoose = require("mongoose")
const session = require('express-session')
const flash = require("connect-flash")
require("./models/Postagem")
const Postagem = mongoose.model("postagens")

//Configurações
//Sessção
app.use(session({
    secret:"CursoDeNode",
    resave: true,
    saveUninitialized: true
}))
app.use(flash())
//Middleware
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next();
})
// BODY PARSER
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//HANDLEBARS
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');
//Mongose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/blogapp").then(()=>{
    console.log("Conectado ao mongo")
}).catch((err)=>{
    console.log("Erro ao se conectar" + err) 
})
// Public
    app.use(express.static(path.join(__dirname, "public")))

    app.use((req, res, next)=>{
        console.log("OI EU SOU UM MIDWARE")
        next();
    })
//Rotas
app.get('/', (req, res) =>{
    Postagem.find().lean().populate("categoria").sort({data: "desc"}).then((postagens) => {
        res.render("index", {postagens: postagens})
    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro interno")
        res.redirect("/404")
    } )

})

app.get("/404", (req, res) => {
    res.send ('Erro 404')
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