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

    const PORT = process.env.PORT || 8080

    const app = express()

    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*') 
        response.header('Access-Control-Allow-Methods', 'GET') 

        app.use(cors())
        next()
    }) 

    //getAllDadosUsuario
    app.get('/v1/whatsapp/usuarios', function(request, response){
        let users = contatos.getAllDadosUsuario()

        response.status(users.status_code)
        response.json(users)
    })

    //getAllDadosByNumero
    app.get('/v1/whatsapp/:number', function(request, response){
        let number = request.params.number
        let dados = contatos.getAllDadosByNumero(number)

        response.status(dados.status_code)
        response.json(dados)
    })

    //getContatosByNumero
    app.get('/v1/whatsapp/contatos/:number', function(request, response){
        let number = request.params.number
        let listaContatos = contatos.getContatosByNumero(number)

        response.status(listaContatos.status_code)
        response.json(listaContatos)
    })

    //getMensagemByNumero
    app.get('/v1/whatsapp/mensagens/:number', function(request, response){
        let number = request.params.number
        let mensagens = contatos.getMensagemByNumero(number)

        response.status(mensagens.status_code)
        response.json(mensagens)
    })

    //getMensagensTrocadasByNumero
    app.get('/v1/whatsapp/conversa', (request, response) => {
        let userNumber = request.query.userNumber
        let contactNumber = request.query.contactNumber

        if (!userNumber || !contactNumber) {
            return response.status(400).json({
                status: false,                                                                                                                                                                                                                                                                              
                status_code: 400,
                message: 'Parâmetros obrigatórios: userNumber e contactNumber'
            })
        }

        let conversa = contatos.getMensagensTrocadasByNumero(userNumber, contactNumber)
        response.status(conversa.status_code).json(conversa)
    })

    //getPalavraChave
    app.get('/v1/whatsapp/pesquisa/:userNumber/:contactNumber/:palavra', (request, response) => {
        let userNumber = request.params.userNumber
        let contactNumber = request.params.contactNumber
        let palavra = request.params.palavra

        let resultado = contatos.getPalavraChave(userNumber, contactNumber, palavra)
        response.status(resultado.status_code).json(resultado)
    })

    app.listen(PORT, function(){
        console.log(`API aguardando requisições na porta ${PORT}`)
    })
