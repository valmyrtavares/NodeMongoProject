const localStrategy = require("passport-local")
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

//MODEL USUARIO

require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

module.export = function(passport){

    passport.use(new localStategy({usernameField: 'email'},(email, senha, done)=>{
        Usuario.findOne({email: email}).then((usuario)=> {
            if(!usario){
                return done(null, false, {message: "Esta conta não existe"})
            }

            bcrypt.compare(senha, usuario.senha, (erro, batem) => {

                if(batem){
                    return done(null, user)
                }else{
                    return done(null, false, {message: "Senha incorreta"})
                }
            })
        })
    }))

    passport.serializeUser((usuario, done)=> {

        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, usuario)=> {
            done(err, user)
        })
    })

}