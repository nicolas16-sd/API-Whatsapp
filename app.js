/*********************************************************************************************
 * Objetivo: Criação de endPoints referentes a Api do Whatsapp
 * Data: 24/09/2025
 * Versão: 1.0
 * Autor: Nicolas dos Santos Durão
 **********************************************************************************************/

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const contatos = require('./modulo/funcoes.js')

const PORT = process.PORT || 8080

app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*') 
    response.header('Acess-Control-Allow-Methods', 'GET') 

    app.use(cors())
    next()
}) 

//getAllDadosUsuario
app.get('/v1/usuarios', function(request, response){
    let users = contatos.getAllDadosUsuario()

    response.status(users.status_code)
    response.json(users)
})

//getAllDadosByNumero
app.get('v1/:number', function(request, response){
    let number = request.params.number
    let dados = contatos.getAllDadosByNumero(number)

    response.status(dados.status_code)
    response.json(dados)
})